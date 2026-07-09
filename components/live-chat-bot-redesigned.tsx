"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, CheckCircle2 } from "lucide-react"

interface Message {
  id: number
  sender: "user" | "agent"
  content: string
  timestamp: Date
}

const AGENT_NAME = "Michael Anderson"
const AGENT_ROLE = "Support Manager"

// Pre-loaded conversation
const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    sender: "user",
    content: "Hello, my withdrawal has been pending for several days.",
    timestamp: new Date(Date.now() - 7200000),
  },
  {
    id: 2,
    sender: "agent",
    content: "Thank you for contacting Support. Let me review your account and payment details.",
    timestamp: new Date(Date.now() - 7080000),
  },
  {
    id: 3,
    sender: "user",
    content: "I have already completed verification. Why am I being asked again?",
    timestamp: new Date(Date.now() - 6960000),
  },
  {
    id: 4,
    sender: "agent",
    content:
      "Your withdrawal amount is significantly higher than normal. For security and compliance, additional verification is required before payment can be released.",
    timestamp: new Date(Date.now() - 6840000),
  },
  {
    id: 5,
    sender: "user",
    content: "Which verifications have already been completed?",
    timestamp: new Date(Date.now() - 6720000),
  },
  {
    id: 6,
    sender: "agent",
    content:
      "Identity Verification, Account Verification, Payment Method Verification, and Security Review have all been completed successfully.",
    timestamp: new Date(Date.now() - 6600000),
  },
  {
    id: 7,
    sender: "user",
    content: "What is still pending?",
    timestamp: new Date(Date.now() - 6480000),
  },
  {
    id: 8,
    sender: "agent",
    content:
      "Finance Review, Compliance Review, Final Payment Authorization, and Payment Release Queue are still in progress.",
    timestamp: new Date(Date.now() - 6360000),
  },
  {
    id: 9,
    sender: "user",
    content: "Have you received all of my uploaded documents?",
    timestamp: new Date(Date.now() - 6240000),
  },
  {
    id: 10,
    sender: "agent",
    content:
      "Yes. All submitted documents have been received successfully and verified. No additional uploads are required at this time.",
    timestamp: new Date(Date.now() - 6120000),
  },
  {
    id: 11,
    sender: "user",
    content: "When will I receive the final update?",
    timestamp: new Date(Date.now() - 6000000),
  },
  {
    id: 12,
    sender: "agent",
    content:
      "Our review team is currently investigating your request. A detailed update will be provided within 12–24 hours after the review is completed.",
    timestamp: new Date(Date.now() - 5880000),
  },
  {
    id: 13,
    sender: "user",
    content: "Why is my payment taking longer than usual?",
    timestamp: new Date(Date.now() - 5760000),
  },
  {
    id: 14,
    sender: "agent",
    content:
      "Larger withdrawals require additional compliance and security checks. This helps protect your account and ensures that payments are released safely.",
    timestamp: new Date(Date.now() - 5640000),
  },
  {
    id: 15,
    sender: "user",
    content: "Will I be notified after the review?",
    timestamp: new Date(Date.now() - 5520000),
  },
  {
    id: 16,
    sender: "agent",
    content:
      "Yes. Once all verification steps are completed, your payment status will be updated automatically and you will receive a notification.",
    timestamp: new Date(Date.now() - 5400000),
  },
]

function LiveChatBotRedesigned() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [userInput, setUserInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!userInput.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      content: userInput,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setUserInput("")
    setIsLoading(true)

    // Simulate agent response delay
    setTimeout(() => {
      const agentMessage: Message = {
        id: Date.now() + 1,
        sender: "agent",
        content:
          "Thank you for your message. Our team has received your inquiry and is reviewing your case. We will provide a detailed update within 12-24 hours.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, agentMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          {/* Avatar */}
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              MA
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          {/* Agent info */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900">{AGENT_NAME}</h3>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-xs text-gray-600">Online</p>
            </div>
          </div>

          {/* Verified badge */}
          <div className="flex items-center gap-1 px-2 py-1 bg-white rounded-full">
            <CheckCircle2 className="w-3 h-3 text-blue-600" />
            <span className="text-xs font-medium text-gray-700">Verified</span>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 text-gray-500 hover:text-gray-700 flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs rounded-2xl px-4 py-3 ${
                message.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white text-gray-900 border border-gray-200 rounded-bl-none"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              <p
                className={`text-xs mt-2 ${
                  message.sender === "user" ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-900 border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>



      {/* Input area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !userInput.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default LiveChatBotRedesigned
