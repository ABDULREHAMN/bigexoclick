"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Clock } from "lucide-react"

interface Message {
  id: number
  sender: "bot" | "user"
  content: string
  timestamp: Date
  isTyping?: boolean
}

const chatScript = [
  {
    sender: "bot",
    content: "Hello 👋, welcome to ExoClick Payments Support. How may I assist you today?",
    delay: 1000,
  },
  { sender: "user", content: "I want to check about my withdrawal, it's still showing pending.", delay: 3000 },
  { sender: "bot", content: "Let me check that for you… ⏳ One moment please.", delay: 2000 },
  {
    sender: "bot",
    content:
      "I see your withdrawal request of **$100,841.00** was made on **25 August, 2025** to TRC20 wallet `TEVQ9zRdLaBX3ohHU81Xh7hDyCdUg98akz`.",
    delay: 4000,
  },
  {
    sender: "bot",
    content:
      "Unfortunately, this wallet was not accepted. The payment will be automatically refunded within **15–20 days**.",
    delay: 3000,
  },
  { sender: "user", content: "So how will I get my money then?", delay: 2500 },
  {
    sender: "bot",
    content:
      "Once the funds return, we will immediately re-process your withdrawal to your **verified wallet address**: `0xb9cE52416d589bCe1AdCd02021BAe4D14202706B`",
    delay: 4000,
  },
  {
    sender: "bot",
    content: "Please note, this is the **mandatory verified BEP-20 wallet** for all future withdrawals.",
    delay: 2000,
  },
  { sender: "user", content: "What about my next withdrawals?", delay: 2000 },
  {
    sender: "bot",
    content:
      "Your upcoming withdrawals of **$191, $550, and $18,187.42** will also be processed only to your **KYC-verified BEP-20 wallet account**.",
    delay: 3500,
  },
  { sender: "user", content: "Can I make a withdrawal on 12 September?", delay: 2500 },
  {
    sender: "bot",
    content: "✅ Yes, your next withdrawal date is set for **12 September, 2025**.",
    delay: 2000,
  },
  {
    sender: "bot",
    content:
      "But please remember: withdrawals will only be processed to your verified wallet: `0xb9cE52416d589bCe1AdCd02021BAe4D14202706B`",
    delay: 3000,
  },
  { sender: "user", content: "Do I need to submit KYC again?", delay: 2500 },
  {
    sender: "bot",
    content:
      "Yes ✅ To comply with updated security policies, please re-upload the same documents you used for KYC verification.",
    delay: 3000,
  },
  { sender: "bot", content: "You can securely upload your documents here: [Upload KYC Documents](#)", delay: 2000 },
  { sender: "user", content: "When will I get my payment after this?", delay: 2000 },
  {
    sender: "bot",
    content: "As soon as the refund clears, your withdrawal will be processed instantly to your verified wallet. 🚀",
    delay: 3000,
  },
  {
    sender: "bot",
    content: "We appreciate your cooperation. Is there anything else I can assist you with?",
    delay: 2000,
  },
  { sender: "user", content: "No, thank you.", delay: 1500 },
]

export default function LiveChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!isActive || currentMessageIndex >= chatScript.length) return

    const currentScript = chatScript[currentMessageIndex]
    const timer = setTimeout(() => {
      // Show typing indicator for bot messages
      if (currentScript.sender === "bot") {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              sender: currentScript.sender as "bot" | "user",
              content: currentScript.content,
              timestamp: new Date(),
            },
          ])
          setCurrentMessageIndex((prev) => prev + 1)
        }, 1500) // Typing duration
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: currentScript.sender as "bot" | "user",
            content: currentScript.content,
            timestamp: new Date(),
          },
        ])
        setCurrentMessageIndex((prev) => prev + 1)
      }
    }, currentScript.delay)

    return () => clearTimeout(timer)
  }, [currentMessageIndex, isActive])

  const startChat = () => {
    setIsActive(true)
    setMessages([])
    setCurrentMessageIndex(0)
    setIsTyping(false)
  }

  const resetChat = () => {
    setIsActive(false)
    setMessages([])
    setCurrentMessageIndex(0)
    setIsTyping(false)
  }

  const formatMessage = (content: string) => {
    // Handle bold text
    let formatted = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Handle code/wallet addresses
    formatted = formatted.replace(
      /`(.*?)`/g,
      '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>',
    )
    return formatted
  }

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="bg-blue-600 text-white rounded-t-lg flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium">ExoClick Support</CardTitle>
                <div className="flex items-center space-x-1 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Online</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-700 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {!isActive && messages.length === 0 && (
              <div className="text-center space-y-4">
                <div className="text-gray-500 text-sm">Welcome to ExoClick Support Chat</div>
                <Button onClick={startChat} className="w-full">
                  Start Live Chat Demo
                </Button>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }} />
                  <div className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-gray-500 text-xs ml-2">Support is typing...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>

          {isActive && (
            <div className="p-4 border-t bg-gray-50 rounded-b-lg">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  Demo Mode - 20 min session
                </Badge>
                <Button onClick={resetChat} variant="outline" size="sm" className="text-xs bg-transparent">
                  Reset Chat
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}
    </>
  )
}
