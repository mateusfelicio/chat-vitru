"use client";

import { ChatMessage, ChatView } from "@/components/chatView";
import { Flex, Spin } from "antd";
import Title from "antd/es/typography/Title";
import { ChatSessionMessage, chatSessionMessageApi } from '@/services/chatSessionMessageService';
import { Chat, chatApi } from '@/services/chatService';
import { useEffect, useState } from "react";
import ShowChat from "../components/showChat";

export default function ChatPage({ params }: { params: { id: number } }) {

    const chatId: number = params.id;

    return (
        <>
            <ShowChat chatId={chatId}/>
        </>
    );
}