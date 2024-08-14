"use client";

import { useEffect, useState } from "react";
import { Chat, chatApi } from '@/services/chatService';
import ChatList from './components/chatList';
import Title from "antd/es/typography/Title";

export default function Chats() {
    const [chats, setChats] = useState<Chat[]>([]);

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        chatApi.getAll().then(result => { setChats(result);}).catch(() => console.log('Erro ao buscar Chats!'));
    }

    return (
        <div>
            <Title level={3}>Chats</Title>

            <ChatList chats={chats} />
        </div>
    );
}