# 🇸🇦 The 95th Saudi National Day - Chat Application

A beautiful bilingual (English/Arabic) chat application celebrating Saudi Arabia's 95th National Day, featuring a ChatGPT-like interface and historical content about the Kingdom's leaders.

## 🌟 Features

- **Bilingual Support**: Full English and Arabic support with RTL layout
- **Chat Interface**: ChatGPT-style chat with Saudi Kingdom theme
- **Leader History**: Dedicated page showcasing King Salman and Crown Prince Mohammed bin Salman
- **Saudi Theme**: Authentic green and white color scheme matching the Saudi flag
- **Persistent Storage**: Chat history and language preferences saved locally
- **Responsive Design**: Works beautifully on desktop and mobile

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone and setup**
   ```bash
   npm install
   npm run dev
   ```

2. **View the application**
   - Open your browser to `http://localhost:8080`
   - The app will run in development mode with hot reloading

## 🔧 Backend Configuration

The application is designed to work with a backend API endpoint. By default, it expects:

**Endpoint**: `http://localhost:8000/api/chat`

### API Request Format
```json
{
  "conversation": [
    { "role": "user|assistant|system", "content": "...", "timestamp": "ISO8601" }
  ],
  "new_message": { "role": "user", "content": "..." }
}
```

### Expected Response Format
```json
{
  "assistant_message": { 
    "role": "assistant", 
    "content": "...", 
    "timestamp": "ISO8601" 
  },
  "status": "ok"
}
```

### Changing the Backend URL
To modify the backend endpoint, edit `src/services/chatService.ts`:

```typescript
const API_ENDPOINT = 'http://your-backend-url/api/chat';
```

## 📱 Application Structure

### Pages
- **`/` or `/chat`**: Main chat interface - "Ask About the Kingdom"
- **`/leaders`**: Historical content about Saudi leadership since 2015

### Key Components
- **Navigation**: Top navigation with language toggle
- **ChatPage**: Main chat interface with message history
- **LeadersPage**: Static content about King Salman and Crown Prince MBS
- **MessageBubble**: Individual chat message component
- **ChatInput**: Message input with send functionality

## 🎨 Design System

### Colors (Saudi National Theme)
- **Primary Green**: `#006C35` (Saudi flag green)
- **White**: `#FFFFFF`
- **Light Green**: For assistant message bubbles
- **User Messages**: White background with green border

### Typography & RTL
- Automatic RTL switching for Arabic
- Proper text alignment and spacing
- Saudi flag emoji (🇸🇦) with fallback (🟢⚪)

## 💾 Data Storage

### Local Storage Keys
- `saudi95_chat_history`: Complete chat conversation history
- `saudi95_lang`: Selected language preference ('en' | 'ar')

### Cache Behavior
- Messages persist across sessions
- Full conversation history sent with each API request
- Optimistic UI updates for smooth user experience
- Error handling with message retry capability

## 🌐 Internationalization

### Supported Languages
- **English (en)**: Left-to-right layout
- **Arabic (ar)**: Right-to-left layout with proper text direction

### Adding Translations
Edit `src/contexts/LanguageContext.tsx` to add or modify translations:

```typescript
const translations = {
  en: {
    'key': 'English text'
  },
  ar: {
    'key': 'النص العربي'
  }
}
```

## 🔄 Development Mode

The application includes a mock API service for development. When no backend is available:

1. Messages are processed with simulated network delay
2. Random Saudi-themed responses are returned
3. All caching and UI functionality works normally

To switch to production mode, ensure your backend is running and accessible.

## 🛠 Tech Stack

- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with custom Saudi theme
- **HTTP Client**: Axios for backend communication
- **UI Components**: Shadcn/ui components
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## 📦 Build & Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Run development server
npm run dev
```

## 🎯 Vision 2030 Alignment

This application embodies Saudi Arabia's Vision 2030 values:
- **Digital Transformation**: Modern web technologies
- **Cultural Preservation**: Bilingual support honoring Arabic heritage
- **Innovation**: Interactive AI-powered chat experience
- **Accessibility**: RTL support and responsive design

---

**Built with 🇸🇦 for the 95th Saudi National Day**

*"The Kingdom of Saudi Arabia is the land of the Two Holy Mosques" - المملكة العربية السعودية هي أرض الحرمين الشريفين*