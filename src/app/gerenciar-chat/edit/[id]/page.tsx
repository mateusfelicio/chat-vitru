"use client";

import { Chat, chatApi } from '@/services/chatService';
import ChatForm from "../../components/chatForm"
import { useEffect, useState } from 'react';
import { useMessage } from '@/components/messageContext';
import { useRouter } from 'next/navigation'
import Title from "antd/es/typography/Title";


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
            })
            .catch(
                () => {
                    showMessage('Erro ao buscar Chat!', 'error');
                    setTimeout(() => {
                        router.push('/gerenciar-chat');
                    }, 1500);
                }
            );
    }

    return (
        <div>
            <Title level={3} style={{marginBottom: 24}} >Editar Chat</Title>

            <ChatForm edit={true} chat={chat} />
        </div>
    );
}