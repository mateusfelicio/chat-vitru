"use client";

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import { Chat, chatApi } from '@/services/chatService';
import Link from 'next/link';

interface ChatListProps {
    chats: Chat[];
}

const colors = [
    { color: "bg-blue-500", colorHover: "hover:bg-blue-600" },
    { color: "bg-green-500", colorHover: "hover:bg-green-600" },
    { color: "bg-red-500", colorHover: "hover:bg-red-600" },
    { color: "bg-yellow-500", colorHover: "hover:bg-yellow-600" },
    { color: "bg-purple-500", colorHover: "hover:bg-purple-600" },
    { color: "bg-pink-500", colorHover: "hover:bg-pink-600" },
    { color: "bg-indigo-500", colorHover: "hover:bg-indigo-600" },
    { color: "bg-teal-500", colorHover: "hover:bg-teal-600" },
    { color: "bg-orange-500", colorHover: "hover:bg-orange-600" },
    { color: "bg-lime-500", colorHover: "hover:bg-lime-600" },
    { color: "bg-rose-500", colorHover: "hover:bg-rose-600" },
    { color: "bg-cyan-500", colorHover: "hover:bg-cyan-600" },
];

export default function ChatList({ chats }: ChatListProps) {
    const listItems = chats.map((chat, index) => {
        const colorIndex = index % colors.length;
        const { color, colorHover } = colors[colorIndex];

        return (
            <Link href={`/chat/${chat.id}`} passHref legacyBehavior>
                <div className={`p-4 ${color} bg-opacity-30 shadow-lg rounded-lg ${colorHover} hover:bg-opacity-40 cursor-pointer transition-all duration-300`}>
                    <h2 className="text-xl font-semibold mb-2">{chat.title}</h2>
                    <p className="text-gray-600">{chat.description}</p>
                </div>
            </Link>
        );
    });
    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {listItems}
            </div>
        </div>
    );
}