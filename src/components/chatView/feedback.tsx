import { useState } from 'react';
import { Modal, Input, message } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { ChatSessionMessage, chatSessionMessageApi } from '@/services/chatSessionMessageService';

interface FeedbackProps {
    messageId: number;
    feedback: 'positive' | 'negative';
    sendFeedback: (messageId: number, type: "positive" | "negative", description?: string,) => Promise<any>;
}



export default function Feedback({ messageId, feedback, sendFeedback }: FeedbackProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');
    const [selectedFeedback, setSelectedFeedback] = useState<'positive' | 'negative' | null>(feedback);

    const handleThumbsUp = () => {
        chatSessionMessageApi.createFeedback({ id: messageId, feedback: 'positive', feedback_description: '' })
            .then(() => {
                setSelectedFeedback('positive');
                message.success('Feedback enviado com sucesso!');
            })
            .catch(() => {
                message.error('Erro ao enviar feedback.');
            });
    };

    const handleThumbsDown = () => {
        setIsModalOpen(true);
    };

    const handleModalOk = () => {
        chatSessionMessageApi.createFeedback({ id: messageId, feedback: 'negative', feedback_description: feedbackText })
            .then(() => {
                setSelectedFeedback('negative');
                message.success('Feedback enviado com sucesso!');
            })
            .catch(() => {
                message.error('Erro ao enviar feedback.');
            });

        setIsModalOpen(false);
        setFeedbackText('');
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
        setFeedbackText('');
    };

    return (
        <>
            <div style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
                paddingTop: '10px',
                justifyContent: 'end'
            }}>
                <LikeOutlined
                    onClick={handleThumbsUp}
                    style={{
                        cursor: 'pointer',
                        color: selectedFeedback === 'positive' ? 'green' : 'gray',
                        opacity: selectedFeedback === 'negative' ? 0.5 : 1
                    }}
                />
                <DislikeOutlined
                    onClick={handleThumbsDown}
                    style={{
                        cursor: 'pointer',
                        color: selectedFeedback === 'negative' ? 'red' : 'gray',
                        opacity: selectedFeedback === 'positive' ? 0.5 : 1
                    }}
                />
            </div>

            <Modal
                title="Enviar Feedback"
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Input.TextArea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Escreva seu feedback aqui..."
                    rows={4}
                />
            </Modal>
        </>
    );
}
