"use client";

import { Chat, chatApi } from '@/services/chatService';
import ChatForm from "../../components/chatForm"
import { useEffect, useState } from 'react';
import { useMessage } from '@/components/messageContext/messageContext';
import { useRouter } from 'next/navigation'


export default function EditChat({ params }: { params: { id: number } }) {
    const [chat, setChat] = useState<Chat>();
    const { showMessage } = useMessage();
    const router = useRouter()

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        chatApi.getDetail(params.id)
            .then(result => {
                setChat(result);
                console.log(result);
            })
            .catch(
                () => {
                    console.log('Erro ao buscar Chats!');
                    showMessage('Erro ao buscar Chat!', 'error');
                    setTimeout(() => {
                        router.push('/gerenciar-chat');
                    }, 1500);
                }
            );
    }

    return (
        <div>
            <h1>Editar Chat</h1>
            <hr />
            <br />
            <br />
            <ChatForm edit={true} chat={chat} />
        </div>
    );
}