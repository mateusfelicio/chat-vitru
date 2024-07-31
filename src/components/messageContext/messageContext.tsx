import React, { createContext, ReactNode, useContext } from 'react';
import { message } from 'antd';

type MessageType = 'success' | 'error' | 'warning';

interface MessageContextProps {
  showMessage: (text: string, type: MessageType, duration?: number) => void;
}

const MessageContext = createContext<MessageContextProps | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = (text: string, type: MessageType, duration: number = 3) => {
    messageApi.open({ content: text, type, duration });
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = (): MessageContextProps => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};