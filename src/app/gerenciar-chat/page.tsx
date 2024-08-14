"use client";

import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag, Layout, Menu, Card, Col, Row, Badge, Modal, Flex } from 'antd';
import type { TableProps } from 'antd';
import Title from "antd/es/typography/Title";
import Link from 'next/link';
import { Chat, chatApi } from '@/services/chatService';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useMessage } from '@/components/messageContext';


export default function GerenciarChat() {
    const columns: TableProps<Chat>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '8%',
        },
        {
            title: 'Título',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Ativo',
            dataIndex: 'active',
            key: 'active',
            width: '10%',
            render: (_, record) => (
                record.active ? <Badge status="success" text="Ativo" /> : <Badge status="error" text="Inativo" />
            ),
        },
        {
            title: 'Ação',
            key: 'action',
            width: '12%',
            render: (_, record) => (
                <Space size="middle">
                    <Link href={`/gerenciar-chat/edit/${record.id}`} passHref legacyBehavior>
                        Editar
                    </Link>
                    <Button onClick={() => confirmDelete(record.title, record.id)} type="primary" danger>
                        Excluir
                    </Button>
                </Space>
            ),
        },
    ];

    function deleteChat(id: number) {
        chatApi.delete(id)
            .then(() => {
                showMessage('Chat excluído com sucesso!', 'success');
                getData();
            })
            .catch((error) => {
                console.log("Erro ao excluir chat", error);
                showMessage('Erro ao excluir chat!', 'error');
            });
    }

    const [chats, setChats] = useState<Chat[]>([]);
    const { showMessage } = useMessage();

    //Modal for delete
    const [modal, contextHolder] = Modal.useModal();
    const confirmDelete = (title: string, id: number) => {
        modal.confirm({
            title: `Deseja realmente excluir o chat ${title}?`,
            icon: <ExclamationCircleOutlined />,
            okText: 'Sim',
            cancelText: 'Não',
            onOk: () => deleteChat(id)
        });
    };

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        chatApi.getAll().then(result => { setChats(result); console.log(result); }).catch(() => console.log('Erro ao buscar Chats!'));
    }

    return (
        <div>
            {contextHolder}

            <Title level={3} style={{ marginBottom: 24 }} >Gerenciar Chat</Title>

            {/* <Flex gap="middle" vertical style={{ width: "100%" }} justify={"center"}> */}

                <div className='flex justify-center'>
                    <div style={{ width: "100vw", maxWidth: "1100px"}}className='max-w-4xl'>
                        <Link href="/gerenciar-chat/create" passHref legacyBehavior>
                            <Button type={"primary"} style={{ marginBottom: "12px" }}>Novo Chat</Button>
                        </Link>
                        <Table columns={columns} dataSource={chats} />
                    </div>

                </div>

            {/* </Flex> */}
        </div>
    );
}