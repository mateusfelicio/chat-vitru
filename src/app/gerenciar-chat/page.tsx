"use client";

import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag, Layout, Menu, Card, Col, Row, Badge, Modal } from 'antd';
import type { TableProps } from 'antd';
import Link from 'next/link';
import { Chat, chatApi } from '@/services/chatService';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useMessage } from '@/components/messageContext/messageContext';


export default function GerenciarChat() {
    const columns: TableProps<Chat>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Título',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <a>{text}</a>,
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
            render: (_, record) => (
                record.active ? <Badge status="success" text="Ativo" /> : <Badge status="error" text="Inativo" />
            ),
        },
        {
            title: 'Ação',
            key: 'action',
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

    function deleteChat(id: number){
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
            <Row gutter={[16, 8]}>
                <Col span={24}>
                    <Link href="/gerenciar-chat/create" passHref legacyBehavior>
                        <Button>Novo Chat</Button>
                    </Link>
                    <Table columns={columns} dataSource={chats} />
                </Col>
            </Row>
        </div>
    );
}