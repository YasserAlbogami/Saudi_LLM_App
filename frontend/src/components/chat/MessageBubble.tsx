import React from 'react';
import { ChatMessage } from '@/services/chatService';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { isRTL } = useLanguage();
  const isUser = message.role === 'user';
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={cn(
      "flex mb-4",
      isUser ? (isRTL ? "justify-start" : "justify-end") : (isRTL ? "justify-end" : "justify-start")
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-2 shadow-sm",
        isUser
          ? "bg-chat-user border border-chat-user-border ml-auto rtl:mr-auto rtl:ml-0"
          : "bg-chat-assistant text-chat-assistant-text mr-auto rtl:ml-auto rtl:mr-0"
      )}>
        <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
        <div className={cn(
          "text-xs opacity-70 mt-1",
          isUser ? "text-right rtl:text-left" : "text-left rtl:text-right"
        )}>
          {timestamp}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
