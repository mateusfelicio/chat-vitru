"use client"

import React from 'react';
import FullSizeLayout from '@/components/layout/fullSizeLayout';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FullSizeLayout children={children} />
  );
}
