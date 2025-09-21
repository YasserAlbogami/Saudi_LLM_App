import axios from 'axios';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface ChatRequest {
  conversation: ChatMessage[];
  new_message: ChatMessage;
}

export interface ChatResponse {
  assistant_message: ChatMessage;
  status: 'ok' | 'error';
}

const CACHE_KEY = 'saudi95_chat_history';
const API_ENDPOINT = 'http://127.0.0.1:8000/api/chat';

export class ChatService {
  private static instance: ChatService;
  private messages: ChatMessage[] = [];

  private constructor() {
    this.loadFromCache();
  }

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  private loadFromCache(): void {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) this.messages = JSON.parse(cached);
    } catch (error) {
      console.error('Failed to load chat history from cache:', error);
      this.messages = [];
    }
  }

  private saveToCache(): void {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(this.messages));
    } catch (error) {
      console.error('Failed to save chat history to cache:', error);
    }
  }

  getMessages(): ChatMessage[] {
    return this.messages.filter(msg => msg.content.trim() !== '');
  }

  async sendMessage(content: string): Promise<{ success: boolean; error?: string }> {
    if (!content.trim()) return { success: false, error: 'Empty message' };

    const userMessage: ChatMessage = {
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    // Optimistic UI: add user message
    this.messages.push(userMessage);
    this.saveToCache();

    try {
      const request: ChatRequest = {
        conversation: this.messages.filter(msg => msg.role !== 'system'),
        new_message: userMessage,
      };

      const response = await axios.post<ChatResponse>(API_ENDPOINT, request, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.status === 'ok' && response.data.assistant_message.content.trim() !== '') {
        this.messages.push(response.data.assistant_message);
        this.saveToCache();
        return { success: true };
      } else {
        // If assistant message is empty, do not add
        return { success: false, error: 'Server returned empty message' };
      }
    } catch (error: any) {
      // Remove user message if network fails
      this.messages = this.messages.filter(msg => msg !== userMessage);
      this.saveToCache();
      console.error('Failed to send message:', error);
      return {
        success: false,
        error: error?.response?.data?.detail || error.message || 'Network error occurred',
      };
    }
  }

  clearHistory(): void {
    this.messages = [];
    this.saveToCache();
  }

  addSystemMessage(content: string): void {
    const systemMessage: ChatMessage = {
      role: 'system',
      content,
      timestamp: new Date().toISOString(),
    };
    this.messages.unshift(systemMessage);
    this.saveToCache();
  }
}
