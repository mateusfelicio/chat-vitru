"use client"

import React from 'react';
import { Layout } from 'antd';
import { Content } from "antd/lib/layout/layout";
import { MessageProvider } from '@/components/messageContext';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export default function FullSizeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AntdRegistry>
            <MessageProvider>
                <Layout style={{ minHeight: '100vh' }}>
                    <Content>
                        {children}
                    </Content>
                </Layout>
            </MessageProvider>
        </AntdRegistry>
    );
}
