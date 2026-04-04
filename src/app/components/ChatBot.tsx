import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Phone, Mail, Building, Briefcase, MessageSquare } from 'lucide-react';
import { sendLeadEnquiryEmail } from '@/lib/emailService';
import { saveEnquiry } from '@/lib/firebase';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

interface LeadData {
  name: string;
  email: string;
  phone: string;
  fatherName: string;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const questions = [
  { id: 'name', question: "Hello! Welcome to Chandrawati Education Society. What's your name?", icon: User, type: 'text' },
  { id: 'email', question: "Nice to meet you! What's your email address?", icon: Mail, type: 'email' },
  { id: 'phone', question: "Thank you! What's your contact number?", icon: Phone, type: 'tel' },
  { id: 'fatherName', question: "What's your father's name?", icon: User, type: 'text' }
];

export function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [leadData, setLeadData] = useState<LeadData>({
    name: '',
    email: '',
    phone: '',
    fatherName: ''
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && currentQuestionIndex === 0 && messages.length === 0) {
      // Start conversation
      setTimeout(() => {
        addBotMessage(questions[0].question);
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (text: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      type: 'bot',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (text: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const validateInput = (value: string, field: string): boolean => {
    if (!value.trim()) return false;
    
    switch (field) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'phone':
        return /^[6-9]\d{9}$/.test(value.replace(/\s/g, ''));
      default:
        return true;
    }
  };

  const getErrorMessage = (field: string): string => {
    switch (field) {
      case 'email':
        return 'Please enter a valid email address';
      case 'phone':
        return 'Please enter a valid 10-digit mobile number';
      default:
        return 'This field is required';
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping || isSubmitting) return;

    const currentQuestion = questions[currentQuestionIndex];
    
    if (!validateInput(inputValue, currentQuestion.id)) {
      addBotMessage(`⚠️ ${getErrorMessage(currentQuestion.id)}. Please try again.`);
      return;
    }

    // Add user message
    addUserMessage(inputValue);
    
    // Update lead data
    const updatedLeadData = { ...leadData, [currentQuestion.id]: inputValue };
    setLeadData(updatedLeadData);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        // Move to next question
        const nextQuestion = questions[currentQuestionIndex + 1];
        addBotMessage(nextQuestion.question);
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // All questions completed, submit the form
        submitLeadData(updatedLeadData);
      }
      setIsTyping(false);
    }, 1000);
  };

  const submitLeadData = async (data: LeadData) => {
    setIsSubmitting(true);
    
    try {
      // Save to Firebase
      const docId = await saveEnquiry(data);
      console.log("Lead saved to Firebase with ID:", docId);
      
      // Show simple thank you message
      addBotMessage("Thank you! Your information has been submitted successfully. Our team will contact you soon.");
      setIsCompleted(true);
      
      // Save submission timestamp for 1-hour cooldown
      localStorage.setItem('ces-last-submission-time', new Date().getTime().toString());
      
      // Auto close after 2 seconds
      setTimeout(() => {
        onClose();
        resetChat();
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting lead:', error);
      addBotMessage("❌ Sorry, there was an error submitting your information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentQuestionIndex(0);
    setLeadData({
      name: '',
      email: '',
      phone: '',
      fatherName: ''
    });
    setInputValue('');
    setIsCompleted(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getCurrentIcon = () => {
    if (currentQuestionIndex < questions.length) {
      const IconComponent = questions[currentQuestionIndex].icon;
      return <IconComponent className="w-5 h-5" />;
    }
    return <MessageCircle className="w-5 h-5" />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold">
              {isCompleted ? 'Thank You!' : 'CES Assistant'}
            </h3>
            <p className="text-xs opacity-90">
              {isCompleted ? 'Submitted Successfully' : isTyping ? 'Typing...' : 'Online'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.type === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.type === 'user' ? 'text-white/70' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
                <span className="text-sm text-gray-500">Typing...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {!isCompleted && (
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="text-gray-400">
              {getCurrentIcon()}
            </div>
            <input
              type={questions[currentQuestionIndex]?.type || 'text'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                isSubmitting ? 'Submitting...' : 
                questions[currentQuestionIndex]?.type === 'textarea' ? 'Type your message...' : 
                'Type your response...'
              }
              disabled={isSubmitting || isTyping}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              autoFocus
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isSubmitting || isTyping}
              className="bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          
          {/* Progress Indicator */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">
              {currentQuestionIndex + 1}/{questions.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
