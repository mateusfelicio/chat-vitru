"use client"

// import type { Metadata } from "next";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Inter } from "next/font/google";
import "./globals.css";
import React from 'react';
import {
  WechatWorkOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { MenuProps, Layout, Menu } from 'antd';
import { Header, Content, Footer } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import { MessageProvider } from '@/components/messageContext/messageContext';

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

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Chat Vitru",
//   description: "Chats com inteligência artificial",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
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
                    // textAlign: 'center',
                    minHeight: "80vh",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  {children}
                </div>
              </Content>
              {/* <Footer style={{ textAlign: 'center' }}>
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer> */}
            </Layout>
          </Layout>
        </MessageProvider>
      </body>
    </html>
  );
}
