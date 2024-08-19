import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import ChatLoading from '@/components/chatLoading'
import TypingMessage from '@/components/typingMessage'

export interface ChatMessage {
    id?: number;
    role: 'ai' | 'user';
    text: string;
    loading?: boolean;
    typing?: boolean;
    date: Date;
}

interface ChatProps {
    title: string;
    history: ChatMessage[];
    sendAndReceiveMessage: (message: string) => Promise<ChatMessage>;
    fetchOlderMessages: (beforeMessageId: number) => Promise<ChatMessage[]>;
    style?: CSSProperties | undefined;
}

export function ChatView({ title, history, sendAndReceiveMessage, fetchOlderMessages, style }: ChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>(history);
    const [inputNewMessage, setInputNewMessage] = useState<string>('');
    const [loadingOlderMessages, setLoadingOlderMessages] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const loadingMessage: ChatMessage = {
        role: 'ai',
        text: '',
        loading: true,
        date: new Date(),
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleScroll = async () => {
        const container = messagesContainerRef.current;

        if (container && container.scrollTop === 0 && !loadingOlderMessages) {

            const oldestMessage: ChatMessage = messages[0];
            if (oldestMessage) {
                setLoadingOlderMessages(true);

                const olderMessages = await fetchOlderMessages(oldestMessage.id);

                setMessages(prevMessages => {
                    const filteredMessages = olderMessages.filter(
                        (msg) => !prevMessages.some((loadedMsg) => loadedMsg.id === msg.id)
                    );

                    const scrollHeightBefore = container.scrollHeight;

                    const updatedMessages = [...filteredMessages, ...prevMessages];

                    setTimeout(() => {
                        if (container) {
                            const scrollHeightAfter = container.scrollHeight;
                            container.scrollTop = scrollHeightAfter - scrollHeightBefore;
                        }
                    }, 0);

                    return updatedMessages;
                });

                setLoadingOlderMessages(false);
            }
        }
    };

    const handleSendMessage = () => {
        if (inputNewMessage.trim() === '') return;

        const newChatMessage: ChatMessage = {
            role: 'user',
            text: inputNewMessage,
            date: new Date(),
        };

        setMessages(prevMessages => {
            const updatedMessages = [...prevMessages, newChatMessage, loadingMessage];

            sendAndReceiveMessage(inputNewMessage)
                .then((result) => {
                    setMessages(prevMessages => updatedMessages.slice(0, -1).concat({
                        ...result,
                        typing: true
                    }));
                })
                .catch((error) => {
                    console.error("Error sending message:", error);
                    setMessages(prevMessages => updatedMessages.slice(0, -1));
                });

            return updatedMessages;
        });

        setInputNewMessage('');
    };

    const handleKeyPress = (e: any) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div style={style} className="bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">

            <div
                ref={messagesContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-8 bg-gray-50"
            >

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
                                {message.loading ? <ChatLoading /> :
                                    message.typing ? (<TypingMessage text={message.text} />) : <p>{message.text}</p>
                                }
                            </div>
                        </div>
                    ))}
                </div>

                <div ref={messagesEndRef} />
            </div>

            <div className="bg-white p-4 border-t flex items-center">
                <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg p-2"
                    placeholder="Digite sua mensagem..."
                    value={inputNewMessage}
                    onChange={(e) => setInputNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
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