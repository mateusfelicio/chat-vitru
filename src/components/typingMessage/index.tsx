import React from 'react';
import { ReactTyped } from "react-typed";

interface typingMessageProps {
    text: string;
    speed?: number;
}

export default function TypingMessage({ text, speed }: typingMessageProps) {
    return (
        <ReactTyped
            strings={[
                text
            ]}
            typeSpeed={speed ?? 1}
            showCursor={false}
        />
    );
};