"use client";

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import { Row, Col, Flex, Input, Switch, Button, Checkbox, Form, message } from 'antd';
import type { FormProps } from 'antd';
import { Chat, chatApi } from '@/services/chatService';
import { useMessage } from '@/components/messageContext/messageContext';

interface ChatFormProps {
    edit?: boolean;
    chat?: Chat;
}

const formStyle: React.CSSProperties = {
    maxWidth: 'none'
};

export default function ChatForm({ edit, chat }: ChatFormProps) {
    const router = useRouter()
    const { showMessage } = useMessage();
    const [buttonEnabled, setButtonEnabled] = useState<boolean>(true);

    const [formChat] = Form.useForm();

    // Preenche o formulário com os dados do item quando o componente é montado
    useEffect(() => {
        formChat.setFieldsValue(chat);
    }, [chat, formChat]);

    const onFinish: FormProps<Chat>['onFinish'] = (values) => {
        if (edit) {
            setButtonEnabled(false);
            chatApi.update(values, values.id)
                .then(() => {
                    showMessage('Chat editado com sucesso!', 'success');
                    setTimeout(() => {
                        router.push('/gerenciar-chat');
                    }, 1500);
                })
                .catch((error) => {
                    console.log("Erro ao editar chat", error);
                    showMessage('Erro ao editar chat!', 'error');
                    setButtonEnabled(true);
                });
        } else {
            setButtonEnabled(false);
            chatApi.create(values)
                .then(() => {
                    showMessage('Chat criado com sucesso!', 'success');
                    setTimeout(() => {
                        router.push('/gerenciar-chat');
                    }, 1500);
                })
                .catch((error) => {
                    console.log("Erro ao criar chat", error);
                    showMessage('Erro ao criar chat!', 'error');
                    setButtonEnabled(true);
                });
        }
    };

    const onFinishFailed: FormProps<Chat>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);

    };

    return (
        <Form
            form={formChat}
            name="formChat"
            initialValues={chat}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            style={formStyle}
        >
            <Row gutter={[16, 24]}>
                <Form.Item<Chat>
                    label="Id"
                    name="id"
                    hidden={true}
                >
                    <Input />
                </Form.Item>

                <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item<Chat>
                        label="Título"
                        name="title"
                        hasFeedback
                        validateDebounce={500}
                        rules={[{ required: true, message: 'Insira o título!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item<Chat>
                        label="Descrição"
                        name="description"
                        hasFeedback
                        validateDebounce={500}
                        rules={[{ required: true, message: 'Insira a descrição!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[16, 24]}>
                <Col xs={24} sm={24} md={12} lg={8}>
                    <Form.Item<Chat>
                        label="Ativo"
                        name="active"
                        valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[16, 24]}>
                <Col xs={24} sm={24} md={12} lg={8}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={!buttonEnabled}>
                            Salvar
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

        </Form>
    );
}