"use client";

import ChatForm from "../components/chatForm";
import Title from "antd/es/typography/Title";

export default function CreateChat() {
    return (
        <div>
            <Title level={3} style={{marginBottom: 24}} >Criar Chat</Title>

            <ChatForm />
        </div>
    );
}