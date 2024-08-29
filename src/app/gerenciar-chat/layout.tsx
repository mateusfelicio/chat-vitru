"use client"

import React from 'react';
import DefaultLayout from '@/components/layout/defaultLayout';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DefaultLayout children={children} />
  );
}