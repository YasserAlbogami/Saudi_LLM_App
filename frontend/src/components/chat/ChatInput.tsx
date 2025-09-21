import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const { t, isRTL } = useLanguage();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-border bg-card p-4">
      <div className="flex gap-2 items-end">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t?.('chat.placeholder')}
            disabled={isLoading}
            className={cn("min-h-[60px] max-h-[200px] resize-none", isRTL ? "text-right" : "text-left")}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!message.trim() || isLoading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
          size="icon"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">{t?.('chat.send')}</span>
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
