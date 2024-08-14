"use client";

import ChatView from "@/components/chatView";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";

export default function ShowChat() {
    const title = 'Chat 1';
    const history = [
        {
            id: 1,
            role: 'user',
            text: 'Olá, fazendo uma pergunta teste para a IA',
            date: new Date()
        },
        {
            id: 2,
            role: 'ai',
            text: 'Olá, teste de resposta da IA',
            date: new Date()
        },
        {
            id: 3,
            role: 'user',
            text: 'Olá, fazendo uma pergunta teste para a IA',
            date: new Date()
        },
        {
            id: 4,
            role: 'ai',
            text: 'Olá, teste de resposta da IA',
            date: new Date()
        },
    ];

    return (
        <div>
            <Title level={3} style={{ marginBottom: 24 }} >Chat Display</Title>

            <Flex justify={'center'}>
                <ChatView style={{
                    minWidth: "450px",
                    maxWidth: "1200px",
                    height: "80vh",
                    width: "100vw"
                }} title={'teste'} history={history}  />

            </Flex>
        </div>
    );
}