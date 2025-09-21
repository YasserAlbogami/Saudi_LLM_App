import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2 } from 'lucide-react';
import MessageBubble from '@/components/chat/MessageBubble';
import ChatInput from '@/components/chat/ChatInput';
import { ChatService, ChatMessage } from '@/services/chatService';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import ksaFlagImage from '@/assets/ksa-flag.png';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const chatService = ChatService.getInstance();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  // Load cached messages or show welcome message on first render
  useEffect(() => {
    const cachedMessages = chatService.getMessages();
    if (cachedMessages.length === 0) {
      chatService.addSystemMessage(
        "Welcome! I'm here to help you learn about Saudi Arabia. Ask me anything about our Kingdom, culture, history, or Vision 2030!"
      );
    }
    setMessages(chatService.getMessages());
  }, []);

  // Auto-scroll to bottom whenever new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending new user message
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      const result = await chatService.sendMessage(content);
      setMessages(chatService.getMessages());

      if (!result.success) {
        toast({
          title: t?.('chat.error') || 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: 'Unexpected error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat history
  const handleClearChat = () => {
    chatService.clearHistory();
    chatService.addSystemMessage(
      "Welcome back! I'm here to help you learn about Saudi Arabia. Ask me anything about our Kingdom!"
    );
    setMessages(chatService.getMessages());
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex justify-center py-8">
        <div className="w-full max-w-4xl bg-card shadow-2xl rounded-lg flex flex-col overflow-hidden h-full">

          {/* Flag + Header */}
          <div className="bg-gradient-to-b from-primary/5 to-transparent p-6 text-center border-b border-border/50">
            <div className="flex justify-center mb-4">
              <img
                src={ksaFlagImage}
                alt="KSA Flag"
                className="w-20 h-12 object-cover rounded-md shadow-lg border-2 border-white/20"
              />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              {t?.('nav.askKingdom')}
            </h1>
            <p className="text-sm text-muted-foreground">{t?.('nav.tagline')}</p>
          </div>

          {/* Chat Header */}
          <div className="border-b border-border p-4 flex justify-between items-center bg-card/50">
            <p className="text-sm text-muted-foreground">
              {messages.length} message{messages.length !== 1 ? 's' : ''}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearChat}
              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 hover:scale-105"
            >
              <Trash2 className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
              {t?.('chat.clear')}
            </Button>
          </div>

          {/* Messages & Input */}
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Scrollable Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background/50">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Welcome to the Kingdom Chat
                  </h3>
                  <p className="text-muted-foreground">
                    Ask me anything about Saudi Arabia, our culture, history, or Vision 2030!
                  </p>
                </div>
              )}

              {messages
                .filter(msg => msg.content.trim() !== '') // skip empty messages
                .map((message, index) => (
                  <div key={index} className="animate-fade-in">
                    <MessageBubble message={message} />
                  </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div
                  className={`flex items-center space-x-2 rtl:space-x-reverse text-muted-foreground animate-pulse ${
                    isRTL ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm">{t?.('chat.loading')}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="border-t border-border p-4 bg-card">
              <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
