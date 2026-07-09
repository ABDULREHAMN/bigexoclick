"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Minimize2, RotateCcw, Paperclip, Smile } from "lucide-react"

interface Message {
  id: number
  sender: "bot" | "user"
  content: string
  timestamp: Date
}

interface VerificationStep {
  name: string
  status: "completed" | "in_progress" | "pending"
}

const AGENT_NAME = "Michael Anderson"
const AGENT_ROLE = "Support Manager"

const VERIFICATION_STEPS: VerificationStep[] = [
  { name: "Identity Verification", status: "completed" },
  { name: "Account Verification", status: "completed" },
  { name: "Payment Method Verification", status: "completed" },
  { name: "Security Verification", status: "completed" },
  { name: "Finance Department Review", status: "in_progress" },
  { name: "Fund Receipt Verification", status: "in_progress" },
  { name: "Payment Authorization", status: "pending" },
  { name: "Payment Release", status: "pending" },
]

// Extended realistic conversation
const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    sender: "user",
    content: "Hello, my withdrawal has been pending for 5 days now. I'm concerned about the status.",
    timestamp: new Date(Date.now() - 7200000),
  },
  {
    id: 2,
    sender: "bot",
    content: "Thank you for contacting us. I'm Michael Anderson from our Support team. Let me check your withdrawal status immediately.",
    timestamp: new Date(Date.now() - 7140000),
  },
  {
    id: 3,
    sender: "user",
    content: "Please hurry, I need this withdrawal urgently.",
    timestamp: new Date(Date.now() - 7080000),
  },
  {
    id: 4,
    sender: "bot",
    content: "I understand the urgency. I can see your withdrawal request for $15,000. This is above your average transaction amount, so it's undergoing our standard security and compliance review.",
    timestamp: new Date(Date.now() - 7020000),
  },
  {
    id: 5,
    sender: "user",
    content: "Why is it taking so long? I completed all verification already.",
    timestamp: new Date(Date.now() - 6960000),
  },
  {
    id: 6,
    sender: "bot",
    content: "Your initial verifications are complete. For larger amounts, we conduct additional finance and compliance reviews to protect your account. This is standard security procedure.",
    timestamp: new Date(Date.now() - 6900000),
  },
  {
    id: 7,
    sender: "user",
    content: "What steps are remaining?",
    timestamp: new Date(Date.now() - 6840000),
  },
  {
    id: 8,
    sender: "bot",
    content: "Your request is currently in Finance Department Review. After that, we have Fund Receipt Verification, then Payment Authorization, and finally Payment Release. We're on track to complete by tomorrow.",
    timestamp: new Date(Date.now() - 6780000),
  },
  {
    id: 9,
    sender: "user",
    content: "Can you confirm the funds were received?",
    timestamp: new Date(Date.now() - 6720000),
  },
  {
    id: 10,
    sender: "bot",
    content: "Yes, the funds were successfully received into our processing account. Everything is in order on our end. We're just completing the final compliance checks.",
    timestamp: new Date(Date.now() - 6660000),
  },
  {
    id: 11,
    sender: "user",
    content: "How much longer do you think?",
    timestamp: new Date(Date.now() - 6600000),
  },
  {
    id: 12,
    sender: "bot",
    content: "Based on our current queue, you should see your payment released within 18-24 hours. I'll personally monitor your request and notify you as soon as it's approved.",
    timestamp: new Date(Date.now() - 6540000),
  },
  {
    id: 13,
    sender: "user",
    content: "Thank you for your help and transparency.",
    timestamp: new Date(Date.now() - 6480000),
  },
  {
    id: 14,
    sender: "bot",
    content: "You're welcome. Is there anything else I can help you with regarding your withdrawal or account?",
    timestamp: new Date(Date.now() - 6420000),
  },
]

function getStatusIcon(status: string): string {
  switch (status) {
    case "completed":
      return "✅"
    case "in_progress":
      return "🔵"
    case "pending":
      return "⏳"
    default:
      return "•"
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case "completed":
      return "text-green-600"
    case "in_progress":
      return "text-blue-600"
    case "pending":
      return "text-gray-500"
    default:
      return "text-gray-400"
  }
}

export default function LiveChatPremium() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
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

  const handleSendMessage = () => {
    if (!userInput.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      content: userInput,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setUserInput("")
    setIsLoading(true)

    // Simulate bot response
    setTimeout(() => {
      const botReplies = [
        "Thank you for your message. I'm reviewing your request and will provide you with an update shortly.",
        "I understand your concern. Let me check the latest status on your account and get back to you.",
        "Your message has been noted. Our team is actively processing your withdrawal request.",
        "Thank you for reaching out. I'm here to help ensure your withdrawal is processed smoothly.",
        "I appreciate your patience. Your request is a priority for us and we're working to complete it as quickly as possible.",
      ]

      const randomReply = botReplies[Math.floor(Math.random() * botReplies.length)]

      const botMessage: Message = {
        id: messages.length + 2,
        sender: "bot",
        content: randomReply,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const completedCount = VERIFICATION_STEPS.filter((s) => s.status === "completed").length
  const totalSteps = VERIFICATION_STEPS.length

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-40"
        title="Open Live Chat"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    )
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-3"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="font-semibold text-gray-800">{AGENT_NAME}</span>
          </div>
          <span className="text-sm text-gray-600">Click to expand</span>
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[700px] rounded-xl shadow-2xl bg-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-sm">
            MA
          </div>
          <div>
            <div className="font-semibold text-sm">{AGENT_NAME}</div>
            <div className="text-xs text-blue-100">{AGENT_ROLE}</div>
            <div className="flex items-center gap-1 text-xs">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
              <span>Online • Typically replies within a few minutes</span>
            </div>
          </div>
          <span className="ml-auto text-xs bg-blue-500 px-2 py-1 rounded-full">✓ Verified</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setMessages(INITIAL_MESSAGES)}
            title="Refresh Chat"
            className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            title="Minimize"
            className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            title="Close"
            className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Verification Progress Card */}
      <div className="px-6 py-4 bg-gray-50 border-b">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800 text-sm">Verification Progress</h3>
            <span className="text-xs font-semibold text-blue-600">{completedCount} / {totalSteps} Completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(completedCount / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Finance Review Card */}
      <div className="px-6 py-3 bg-blue-50 border-b text-xs">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-gray-600 font-semibold">Finance Department</div>
            <div className="text-blue-600 font-bold">Under Review</div>
          </div>
          <div>
            <div className="text-gray-600 font-semibold">Payment Status</div>
            <div className="text-green-600 font-bold">Funds Received</div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-white">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] rounded-lg px-4 py-3 ${
                message.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-900 rounded-bl-none"
              }`}
            >
              <div className="text-sm">{message.content}</div>
              <div className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 rounded-lg rounded-bl-none px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer */}
      <div className="border-t bg-gray-50 px-6 py-4 space-y-2">
        <div className="flex items-end gap-2">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-20"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !userInput.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex gap-2">
            <button className="p-1 hover:bg-gray-200 rounded transition-colors" title="Attach">
              <Paperclip className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded transition-colors" title="Emoji">
              <Smile className="w-4 h-4" />
            </button>
          </div>
          <span>{userInput.length}/500</span>
        </div>
      </div>
    </div>
  )
}
