"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react';
import {
  WechatWorkOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { MenuProps, Layout, Menu } from 'antd';
import { Header, Content, Footer } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import { MessageProvider } from '@/components/messageContext';
import { AntdRegistry } from '@ant-design/nextjs-registry';

const colorBgContainer = "#ffffff";
const borderRadiusLG = "#ffffff";

const items: MenuProps['items'] = [
  {
    key: '/chat',
    icon: React.createElement(WechatWorkOutlined),
    label: <Link href="/chat">Chat</Link>,
  },
  {
    key: '/gerenciar-chat',
    icon: React.createElement(EditOutlined),
    label: <Link href="/gerenciar-chat">Gerenciar Chats</Link>,
  }
];

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AntdRegistry>
      <MessageProvider>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
          >
            <div className="logo-vertical"><Link href="/">Chat Vitru</Link></div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[usePathname()]} items={items} />
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header style={{ padding: 0, background: colorBgContainer }} />
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div
                style={{
                  padding: 24,
                  minHeight: "89vh",
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </MessageProvider>
    </AntdRegistry>
  );
}
