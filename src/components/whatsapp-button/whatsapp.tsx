"use client"

import { useState, useEffect, useRef } from 'react'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot,
  User,
  Sparkles,
  Clock,
  CheckCheck,
  ChevronRight,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Star,
  Calendar,
  MessageCircleCheck
} from 'lucide-react'

type Message = {
  id: string;
  type: string;
  text: string;
  time: string;
  quickReplies?: boolean;
  status?: string;
  showForm?: boolean;
};

// Predefined quick replies
const QUICK_REPLIES = [
  { icon: Calendar, text: "Book a demo", color: "bg-blue-500" },
  { icon: Zap, text: "Pricing info", color: "bg-amber-500" },
  { icon: MessageCircle, text: "Talk to sales", color: "bg-emerald-500" },
  { icon: Sparkles, text: "Product features", color: "bg-violet-500" },
  { icon: Shield, text: "Support help", color: "bg-rose-500" },
]

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  type: 'bot',
  text: "👋 Welcome to OmSai!\n\nI'm your AI assistant, here to help you discover how our intelligent agents can transform your real estate business.\n\nWhat brings you here today?",
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  quickReplies: true,
  showForm: false
}

export default function WhatsAppChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Form state
  const [activeFormMessageId, setActiveFormMessageId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [formFields, setFormFields] = useState<string[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleOpen = () => {
    setShowButton(false)
    setTimeout(() => setIsOpen(true), 50)
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => setShowButton(true), 300)
  }

  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
      showForm: false
    };

    const apiMessages = [
      ...messages.map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      { role: "user", content: text },
    ];

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);
    setActiveFormMessageId(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();
      
      const botMessageId = (Date.now() + 1).toString();
      const botMessage: Message = {
        id: botMessageId,
        type: "bot",
        text: data.aiMessage || "I apologize, I couldn't process that request.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        quickReplies: true,
        showForm: data.isDemo || false
      };

      setMessages((prev) => [...prev, botMessage]);
      
      if (data.isDemo) {
        setActiveFormMessageId(botMessageId);
        setFormFields(data.formFields || ["name", "email", "phone", "message"]);
      }

    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          type: "bot",
          text: "Something went wrong ❌. Please try again.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          quickReplies: true,
          showForm: false
        },
      ]);
    }

    setIsTyping(false);
  };

  const handleDemoSubmit = async () => {
    if (!name || !email || !phone) {
      alert("Please fill all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          description,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "bot",
            text: `❌ ${data.error || "Failed to submit demo request. Please try again."}`,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            quickReplies: true,
            showForm: false
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "bot",
          text: "✅ Your demo request has been submitted!\n\n📧 Check your email for confirmation.\n\n⏰ Our team will contact you within 24 hours.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          quickReplies: true,
          showForm: false
        },
      ]);

      setActiveFormMessageId(null);
      setName("");
      setEmail("");
      setPhone("");
      setDescription("");
      setFormFields([]);

    } catch (err) {
      console.error(err);
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "bot",
          text: "❌ Something went wrong. Please try again or contact us directly at sale@OmSai.com",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          quickReplies: true,
          showForm: false
        },
      ]);
    }
  };

  const openWhatsApp = () => {
    const phone = "15551234567"
    const message = encodeURIComponent("Hi! I chatted with your AI assistant and have some questions.")
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  // Floating Button
   // Button visible state
   if (showButton && !isOpen) {
    return (
      <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-500 `}>
        {/* Main Pill Button */}
        <button
          onClick={handleOpen}
          className="relative group flex items-center cursor-pointer p-3  rounded-full shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {/* Robot Image - Peeking from left side */}
          <img 
            src="/chatbot-icon.png" 
            alt="AI Assistant" 
            className=" w-10 h-10 sm:w-16 sm:h-16 object-contain drop-shadow-xl pointer-events-none select-none"
          />
          
          {/* <span className="text-white font-bold text-sm sm:text-lg tracking-wide ml-2">
            Connect Now
          </span> */}
        </button>
            
        {/* Gold Notification Badge */}
        {/* <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-7 sm:h-7 bg-gradient-to-b from-[#FDE68A] via-[#F59E0B] to-[#B45309] rounded-full flex items-center justify-center shadow-lg border-2 border-white z-10">
          <span className="text-white font-bold text-xs sm:text-base drop-shadow-sm">1</span>
        </div> */}
      </div>
    )
  }
  // Compact Chat Widget Panel
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Chat Panel */}
      <div 
        className={`w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-7rem)] bg-white rounded-2xl shadow-2xl shadow-slate-900/20 flex flex-col overflow-hidden border border-gray-200 transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0066cc] to-[#0052a3] px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0066cc]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">OmSai Assistant</h3>
              <p className="text-blue-100 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Online now
              </p>
            </div>
          </div>
  
          <div className="flex items-center gap-2">
            <button 
              onClick={openWhatsApp}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              title="Continue on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-white" />
            </button>
            <button 
              onClick={handleClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {/* Date Divider */}
          <div className="flex items-center justify-center">
            <div className="bg-gray-200 h-px flex-1" />
            <span className="px-3 text-[11px] text-gray-400 font-medium uppercase tracking-wide">Today</span>
            <div className="bg-gray-200 h-px flex-1" />
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start gap-2 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                {msg.type === 'bot' ? (
                  <div className="w-7 h-7 bg-gradient-to-br from-[#0066cc] to-[#0052a3] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                ) : (
                  <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-3.5 h-3.5 text-gray-600" />
                  </div>
                )}

                {/* Message Bubble + Form */}
                <div className="flex flex-col gap-2">
                  {/* Bubble */}
                  <div className={`relative px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.type === 'user' 
                      ? 'bg-[#0066cc] text-white rounded-br-md' 
                      : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
                  }`}>
                    <div className="whitespace-pre-line text-[13px]">{msg.text}</div>
                    
                    {/* Time & Status */}
                    <div className={`flex items-center gap-1 mt-1.5 text-[10px] ${
                      msg.type === 'user' ? 'text-blue-200' : 'text-gray-400'
                    }`}>
                      <span>{msg.time}</span>
                      {msg.type === 'user' && <CheckCheck className="w-3 h-3" />}
                    </div>
                  </div>

                  {/* Demo Form */}
                  {msg.type === 'bot' && activeFormMessageId === msg.id && (
                    <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200 w-full">
                      <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-[#0066cc]" />
                        Book a Demo
                      </h3>
                      <p className="text-[11px] text-gray-500 mb-3">Fill in your details and we'll contact you shortly.</p>

                      <div className="space-y-2.5">
                        {formFields.includes("name") && (
                          <div>
                            <label className="text-[11px] font-medium text-gray-700 block mb-1">Name *</label>
                            <input
                              type="text"
                              placeholder="John Doe"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all"
                            />
                          </div>
                        )}

                        {formFields.includes("email") && (
                          <div>
                            <label className="text-[11px] font-medium text-gray-700 block mb-1">Email *</label>
                            <input
                              type="email"
                              placeholder="john@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all"
                            />
                          </div>
                        )}

                        {formFields.includes("phone") && (
                          <div>
                            <label className="text-[11px] font-medium text-gray-700 block mb-1">Phone *</label>
                            <input
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all"
                            />
                          </div>
                        )}

                        {formFields.includes("message") && (
                          <div>
                            <label className="text-[11px] font-medium text-gray-700 block mb-1">Message (Optional)</label>
                            <textarea
                              placeholder="Tell us about your requirements..."
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              rows={2}
                              className="w-full p-2 border border-gray-300 rounded-lg text-xs resize-none focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all"
                            />
                          </div>
                        )}

                        <button
                          onClick={handleDemoSubmit}
                          className="w-full bg-[#0066cc] hover:bg-[#0052a3] text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-xs"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Submit Request
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-[#0066cc] to-[#0052a3] rounded-full flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 border border-gray-100 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Replies */}
          {messages[messages.length - 1]?.quickReplies && !isTyping && !activeFormMessageId && (
            <div className="flex flex-wrap gap-2 pl-9">
              {QUICK_REPLIES.map((reply) => {
                const Icon = reply.icon
                return (
                  <button
                    key={reply.text}
                    onClick={() => handleSendMessage(reply.text)}
                    className="group flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-[#0066cc] hover:text-[#0066cc] transition-all shadow-sm hover:shadow-md"
                  >
                    <div className={`w-5 h-5 ${reply.color} rounded-full flex items-center justify-center`}>
                      <Icon className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="font-medium">{reply.text}</span>
                  </button>
                )
              })}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-100 p-3 shrink-0">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={activeFormMessageId ? "Type your message..." : "Type your message..."}
                className="w-full pl-4 pr-10 py-3 bg-gray-100 rounded-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:bg-white transition-all"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#0066cc] text-white rounded-full flex items-center justify-center hover:bg-[#0052a3] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-[10px] text-gray-400">Prefer WhatsApp?</span>
            <button
              onClick={openWhatsApp}
              className="flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-600 rounded-full text-[11px] font-medium hover:bg-green-100 transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              Continue on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}