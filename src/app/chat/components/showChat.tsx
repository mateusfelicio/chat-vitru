"use client";

import { ChatMessage, ChatView } from "@/components/chatView";
import { Flex, Spin } from "antd";
import Title from "antd/es/typography/Title";
import { ChatSessionMessage, chatSessionMessageApi } from '@/services/chatSessionMessageService';
import { Chat, chatApi } from '@/services/chatService';
import { useEffect, useState } from "react";


export default function ShowChat({chatId}: {chatId: number}) {
    const [chat, setChat] = useState<Chat>();
    const [history, setHistory] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    console.log(chat, history);

    useEffect(() => {
        getHistory();
        getChat();
    }, []);

    function getChat() {
        chatApi.getDetail(chatId).then(result => setChat(result))
    }

    function getHistory() {
        chatSessionMessageApi.getAll(chatId)
            .then(result => {
                const messageFormated: ChatMessage[] = result.map((value) => {
                    return {
                        id: value.id,
                        role: (value.type === 'SYSTEM' || value.type === 'ASSISTANT') ? 'ai' : 'user',
                        text: value.message,
                        date: new Date(),
                        feedback: value.feedback
                    };

                })
                setHistory(messageFormated);
                setLoading(false);
            })
            .catch(
                (error) => {
                    console.log('error', error)
                });
    };

    const sendMessage = (message: string): Promise<ChatMessage> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const messageResult: ChatMessage = {
                    id: 777,
                    role: 'ai',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non rhoncus risus. Morbi vitae mi blandit, luctus lorem eget, tincidunt nisl. Nullam ac imperdiet orci. In rhoncus a erat porta sodales. Vestibulum porttitor nibh sed ante luctus laoreet. Curabitur condimentum sagittis dolor eu consectetur. Fusce odio diam, tristique eget massa id, lacinia eleifend urna. Nam nec posuere sem, ut auctor turpis. Ut non tempor est. Aliquam a metus tincidunt, vestibulum diam id, luctus mauris. Nunc sagittis placerat pretium. Vivamus neque risus, consequat at mauris sit amet, blandit dignissim velit. Nulla elementum, tellus cursus tincidunt malesuada, nisl ipsum porttitor nibh, id ornare lacus mi in urna. Fusce ut placerat est, at molestie dui. Aliquam sollicitudin mattis feugiat.',
                    date: new Date(),
                };

                resolve(messageResult);
            }, 2000);
        });
    };

    //TODO Fazer com que esse método seja passado para o ChatView e posteriormente para o feedback
    const sendFeedback = (messageId: number, type: "positive" | "negative", description?: string | undefined): Promise<ChatSessionMessage> => {
        const createFeedbackParams: Pick<ChatSessionMessage, 'id' | 'feedback' | 'feedback_description'> = { 
            id: messageId, 
            feedback: type, 
            feedback_description: description 
        };
        return chatSessionMessageApi.createFeedback(createFeedbackParams);
    };

    

    const getOldMessages = (messageId: number): Promise<ChatMessage[]> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const messagesResult: ChatMessage[] = [
                    {
                        id: 775,
                        role: 'user',
                        text: 'Essa é uma mensagem antiga 1',
                        date: new Date()
                    },
                    {
                        id: 774,
                        role: 'ai',
                        text: 'Essa é uma mensagem antiga 2',
                        date: new Date()
                    },
                    {
                        id: 773,
                        role: 'user',
                        text: 'Essa é uma mensagem antiga 3',
                        date: new Date()
                    },
                    {
                        id: 773,
                        role: 'ai',
                        text: 'Essa é uma mensagem antiga 3',
                        date: new Date()
                    },
                ];

                resolve(messagesResult);
            }, 1000);
        });
    };

    const contentStyle: React.CSSProperties = {
        padding: 50,
        background: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 4,
    };


    return (
        <div>
            <Title level={3} style={{ marginBottom: 24 }} >Chat View | <span className="text-blue-500">{chat?.title}</span></Title>

            {loading ? (
                <Flex style={{ height: '200px' }} justify={'center'} align={'center'}>
                    <Spin style={{ backgroundColor: '#ffffff' }} tip="Loading" size="large">
                        <div style={contentStyle} />
                    </Spin>
                </Flex>
            ) : (
                <Flex justify={'center'}>
                    <ChatView style={{
                        minWidth: "450px",
                        maxWidth: "1200px",
                        height: "80vh",
                        width: "100vw"
                    }} title={'teste'} history={history} sendAndReceiveMessage={sendMessage} fetchOlderMessages={getOldMessages} feedbackButtons={{ active:true, sendFeedback:{sendFeedback} }} />
                </Flex>
            )}
        </div>
    );
}