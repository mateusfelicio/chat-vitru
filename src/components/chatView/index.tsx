import React, { CSSProperties, useState } from 'react';
import { format } from 'date-fns';
// import { Button } from "@material-tailwind/react";

interface ChatMessage {
    id: number;
    role: 'ai' | 'user';
    text: string;
    date: Date;
}

interface ChatProps {
    title: string;
    history: ChatMessage[];
    style?: CSSProperties | undefined;
}

export default function ChatView({ title, history, style }: ChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>(history);
    const [inputNewMessage, setInputNewMessage] = useState<string>('');

    const handleSendMessage = () => {
        if (inputNewMessage.trim() === '') return;

        const newChatMessage: ChatMessage = {
            id: 999,
            role: 'user',
            text: inputNewMessage,
            date: new Date(),
        };

        setMessages([...messages, newChatMessage]);

        // Aqui você pode adicionar a lógica para enviar a mensagem para o assistente AI e receber uma resposta
        const aiResponse: ChatMessage = {
            id: 999,
            role: 'ai',
            text: 'Esta é uma resposta automatizada.',
            date: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, aiResponse]);
        setInputNewMessage('');
    };

    function sendMessageToApi(message: string) {

        return 
    }

    function convertResponseToChatMessage(){

    }

    return (
        <div style={style} className="bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
            
            <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.role === 'ai' ? 'justify-start' : 'justify-end'
                                } items-start`}
                        >
                            {message.role === 'ai' && (
                                <img
                                    src="https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg"
                                    alt="AI Avatar"
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                            )}
                            <div
                                className={`${message.role === 'ai'
                                    ? 'bg-white text-gray-900'
                                    : 'bg-blue-500 text-white'
                                    } p-4 rounded-lg max-w-2xl shadow-md`}
                            >
                                <p>{message.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-4 border-t flex items-center">
                <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg p-2"
                    placeholder="Digite sua mensagem..."
                    value={inputNewMessage}
                    onChange={(e) => setInputNewMessage(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
                    onClick={handleSendMessage}
                >
                    <svg className="h-5 w-5 " width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="10" y1="14" x2="21" y2="3" />  <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" /></svg>
                </button>
            </div>
        </div>
    );
};