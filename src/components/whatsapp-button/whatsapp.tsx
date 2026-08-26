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
  MessageCircleCheck,
  Paperclip,
  ChevronLeft
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
  { icon: Calendar, text: "Get a free quote", color: "bg-blue-500" },
  { icon: Zap, text: "Pricing info", color: "bg-amber-500" },
  { icon: MessageCircle, text: "Talk to our team", color: "bg-emerald-500" },
  { icon: Sparkles, text: "Our services", color: "bg-violet-500" },
  { icon: Shield, text: "Support help", color: "bg-rose-500" },
]

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  type: 'bot',
  text: "👋 Welcome to Om Sai Packers and Movers!\n\nI'm your AI assistant, here to help you plan a smooth, stress-free move — from packing to storage to long-distance relocation.\n\nWhat brings you here today?",
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
  const [movingFrom, setMovingFrom] = useState("");
  const [movingTo, setMovingTo] = useState("");
  const [moveDate, setMoveDate] = useState("");
  const [description, setDescription] = useState("");
  const [moveType, setMoveType] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
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
        setFormFields(data.formFields || ["name", "email", "phone", "moveType", "movingFrom", "movingTo", "moveDate", "message", "agreeToTerms"]);
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
    // Required fields per the quote API schema
    if (!name || !phone || !movingFrom || !movingTo || !moveDate ) {
      alert("Please fill all required fields");
      return;
    }

    // mobileNumber must be exactly 10 digits (strip spaces, +91, dashes, etc.)
    const cleanedPhone = phone.replace(/\D/g, "").slice(-10);
    if (!/^\d{10}$/.test(cleanedPhone)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    // email is optional, but if provided must be valid
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
      }
    }

    // if (!agreeToTerms) {
    //   alert("Please accept the terms and conditions to continue");
    //   return;
    // }

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moveType,
          movingDate: moveDate,
          pickupLocation: movingFrom,
          deliveryLocation: movingTo,
          fullName: name,
          mobileNumber: cleanedPhone,
          emailAddress: email || "",
          additionalRequirements: description || "",
          agreeToTerms,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        const fieldErrors = data.errors
          ? Object.values(data.errors).flat().join(" ")
          : null;

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "bot",
            text: `❌ ${fieldErrors || data.message || "Failed to submit your quote request. Please try again."}`,
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
          text: "✅ Your quote request has been submitted!\n\n📧 Check your email for confirmation.\n\n⏰ Our team will contact you within 24 hours with a free moving quote.",
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
      setMovingFrom("");
      setMovingTo("");
      setMoveDate("");
      setDescription("");
      setMoveType("");
      setAgreeToTerms(false);
      setFormFields([]);

    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "bot",
          text: "❌ Something went wrong. Please try again or contact us directly at sale@omsaipackersandmover.com",
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
    const message = encodeURIComponent("Hi! I chatted with your AI assistant and have some questions about my move.")
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  // Floating Button
  if (showButton && !isOpen) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-end gap-2 sm:gap-3">
        {/* Tooltip & Click to Chat */}
        <div className="hidden sm:flex flex-col items-end gap-2 mb-2">
          {/* Chat Bubble */}
          <div className="relative -top-10 -right-10">
            <div className="bg-white rounded-2xl rounded-br-none shadow-lg px-4 py-2.5 border border-gray-100">
              <p className="text-sm font-semibold text-gray-800">Hi! Planning a move?</p>
              <p className="text-xs text-gray-500">We're here to help!</p>
            </div>
            {/* Small triangle */}
            <div className="absolute -bottom-1.5 right-0 w-3 h-3 bg-white border-b border-r border-gray-100 transform rotate-45 translate-x-1.5"></div>
          </div>

          {/* Click to chat text */}
          <div className="flex items-center gap-1 pr-2">
            <span className="text-sm font-medium text-[#0066cc] italic">Click to chat</span>
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" className="text-[#0066cc]">
              <path d="M0 12C8 4 16 4 24 8" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M20 5L24 8L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Main Button */}
        <button
          onClick={handleOpen}
          className="relative group w-14 h-14 sm:w-16 sm:h-16 cursor-pointer bg-[#0066cc] rounded-full shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
        >
          <img 
            src="/chatbot-icon.png" 
            alt="Om Sai Packers and Movers AI Assistant" 
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain pointer-events-none select-none"
          />
          {/* Online dot */}
          <div className="absolute top-1 right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white" />
        </button>
      </div>
    )
  }

  // Compact Chat Widget Panel
  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-4">
      {/* Chat Panel */}
      <div 
        className={`w-full sm:w-[380px] max-w-full sm:max-w-[calc(100vw-2rem)] h-full sm:h-[600px] max-h-full sm:max-h-[calc(100vh-7rem)] bg-white sm:rounded-3xl shadow-2xl shadow-slate-900/20 flex flex-col overflow-hidden border-0 sm:border sm:border-gray-100 transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#0066cc] to-[#0052a3] px-4 pt-4 pb-8 flex items-center justify-between shrink-0">
          {/* Back Button */}
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          {/* Center: Avatar + Title */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-center px-2 min-w-0">
            <div className="relative shrink-0">
              <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center p-1">
                <img 
                  src="/chatbot-icon.png" 
                  alt="Om Sai Packers and Movers AI Assistant" 
                  className="w-9 h-9 object-contain"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0066cc]" />
            </div>
            <div className="text-center min-w-0">
              <h3 className="font-bold text-white text-sm truncate">Om Sai Packers &amp; Movers</h3>
              <p className="text-blue-100 text-xs truncate">We're here to help you move!</p>
            </div>
          </div>

          {/* WhatsApp Button */}
          <button 
            onClick={openWhatsApp}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            title="Continue on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 text-white" />
          </button>

          {/* Curved bottom edge */}
          <div className="absolute -bottom-3 left-0 right-0 h-6 bg-white rounded-t-[50%]"></div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 bg-gray-50">
          {/* Date Divider */}
          <div className="flex items-center justify-center">
            <div className="bg-gray-200 h-px flex-1" />
            <span className="px-3 text-[11px] text-gray-400 font-medium uppercase tracking-wide">Today</span>
            <div className="bg-gray-200 h-px flex-1" />
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start gap-2 max-w-[92%] sm:max-w-[90%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar - Only for Bot */}
                {msg.type === 'bot' && (
                  <div className="w-8 h-8 flex-shrink-0 mt-1">
                    <img 
                      src="/chatbot-icon.png" 
                      alt="Bot" 
                      className="w-8 h-8 rounded-full object-contain"
                    />
                  </div>
                )}

                {/* Message Bubble + Form */}
                <div className="flex flex-col gap-1 min-w-0">
                  {/* Bubble */}
                  <div className={`relative px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                    msg.type === 'user' 
                      ? 'bg-[#0066cc] text-white rounded-2xl rounded-tr-none' 
                      : 'bg-white text-gray-800 rounded-2xl rounded-tl-none border border-gray-100'
                  }`}>
                    <div className="whitespace-pre-line text-[13px]">{msg.text}</div>
                  </div>

                  {/* Time & Status */}
                  <div className={`flex items-center gap-1 text-[10px] ${
                    msg.type === 'user' ? 'text-gray-400 justify-end' : 'text-gray-400 pl-1'
                  }`}>
                    <span>{msg.time}</span>
                    {msg.type === 'user' && <CheckCheck className="w-3 h-3 text-[#0066cc]" />}
                  </div>

                  {/* Quote Form */}
                  {msg.type === 'bot' && activeFormMessageId === msg.id && (
                    <div className="mt-2 p-4 bg-white rounded-xl shadow-md border border-gray-200 w-full">
                      <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-[#0066cc]" />
                        Get a Free Quote
                      </h3>
                      <p className="text-[11px] text-gray-500 mb-3">Fill in your details and we'll get back to you with a moving quote.</p>

                      <div className="space-y-2.5">
                        {formFields.includes("moveType") && (
                          <div>
                            <label className="text-[11px] font-medium text-gray-700 block mb-1">Move Type *</label>
                            <select
                              value={moveType}
                              onChange={(e) => setMoveType(e.target.value)}
                              className="w-full p-2.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all bg-gray-50"
                            >
                              <option value="">Select a service</option>
                              <option value="residential">Residential Moving</option>
                              <option value="office">Office Relocation</option>
                              <option value="vehicle">Vehicle Shipping</option>
                            </select>
                          </div>
                        )}

                        {formFields.includes("name") && (
                          <div>
                            <label className="text-[11px] font-medium text-gray-700 block mb-1">Name *</label>
                            <input
                              type="text"
                              placeholder="John Doe"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full p-2.5 border border-gray-200 rounded-xl text-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all bg-gray-50"
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
                              className="w-full p-2.5 border border-gray-200 text-gray-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all bg-gray-50"
                            />
                          </div>
                        )}

                        {formFields.includes("phone") && (
                          <div>
                            <label className="text-[11px] font-medium text-gray-700 block mb-1">Phone *</label>
                            <input
                              type="tel"
                              placeholder="+91 00000 00000"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full p-2.5 border border-gray-200 text-gray-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all bg-gray-50"
                            />
                          </div>
                        )}

                        {formFields.includes("movingFrom") && (
                          <div>
                            <label className="text-[11px] font-medium text-gray-700 block mb-1">Moving From</label>
                            <input
                              type="text"
                              placeholder="e.g. Vaishali Nagar, Jaipur"
                              value={movingFrom}
                              onChange={(e) => setMovingFrom(e.target.value)}
                              className="w-full p-2.5 border border-gray-200 rounded-xl text-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all bg-gray-50"
                            />
                          </div>
                        )}

                        {formFields.includes("movingTo") && (
                          <div>
                            <label className="text-[11px] font-medium text-gray-700 block mb-1">Moving To</label>
                            <input
                              type="text"
                              placeholder="e.g. Mansarovar, Jaipur"
                              value={movingTo}
                              onChange={(e) => setMovingTo(e.target.value)}
                              className="w-full p-2.5 border border-gray-200 rounded-xl text-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all bg-gray-50"
                            />
                          </div>
                        )}

                        {formFields.includes("moveDate") && (
                          <div>
                            <label className="text-[11px] font-medium text-gray-700 block mb-1">Preferred Move Date</label>
                            <input
                              type="date"
                              value={moveDate}
                              onChange={(e) => setMoveDate(e.target.value)}
                              className="w-full p-2.5 border border-gray-200 rounded-xl text-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all bg-gray-50"
                            />
                          </div>
                        )}

                        {formFields.includes("message") && (
                          <div>
                            <label className="text-[11px] font-medium text-gray-700 block mb-1">Message (Optional)</label>
                            <textarea
                              placeholder="Tell us about your move — home size, special items, etc."
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              rows={2}
                              className="w-full p-2.5 border border-gray-200 rounded-xl text-gray-700 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all bg-gray-50"
                            />
                          </div>
                        )}

                        {formFields.includes("agreeToTerms") && (
                          <label className="flex items-start gap-2 pt-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={agreeToTerms}
                              onChange={(e) => setAgreeToTerms(e.target.checked)}
                              className="mt-0.5 w-3.5 h-3.5 accent-[#0066cc] shrink-0"
                            />
                            <span className="text-[11px] text-gray-600 leading-snug">
                              I agree to the terms and conditions *
                            </span>
                          </label>
                        )}

                        <button
                          onClick={handleDemoSubmit}
                          className="w-full bg-[#0066cc] hover:bg-[#0052a3] text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs"
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
                <div className="w-8 h-8 flex-shrink-0">
                  <img 
                    src="/chatbot-icon.png" 
                    alt="Bot" 
                    className="w-8 h-8 rounded-full object-contain"
                  />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 border border-gray-100 shadow-sm">
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
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2 pl-0 sm:pl-10">
              {QUICK_REPLIES.map((reply) => {
                const Icon = reply.icon
                return (
                  <button
                    key={reply.text}
                    onClick={() => handleSendMessage(reply.text)}
                    className="flex items-center gap-2 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 hover:border-[#0066cc] hover:text-[#0066cc] transition-all shadow-sm"
                  >
                    <Icon className="w-4 h-4 text-gray-500 shrink-0" />
                    <span className="font-medium truncate">{reply.text}</span>
                  </button>
                )
              })}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-100 p-3 shrink-0" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-2 border border-gray-200 focus-within:border-[#0066cc] focus-within:ring-2 focus-within:ring-[#0066cc]/10 transition-all">
            <Paperclip className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors shrink-0" />
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 min-w-0 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="w-9 h-9 bg-[#0066cc] text-white rounded-full flex items-center justify-center hover:bg-[#0052a3] disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Powered By */}
          <div className="flex items-center justify-center gap-1.5 mt-2 pt-2">
            <Zap className="w-3 h-3 text-amber-500" />
            <span className="text-[10px] text-gray-400 font-medium">Powered by Om Sai Packers &amp; Movers</span>
          </div>
        </div>
      </div>
    </div>
  )
}