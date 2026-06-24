"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, ChevronDown } from "lucide-react"

interface Message {
  id: number
  sender: "bot" | "user"
  content: string
  timestamp: Date
}

interface FAQItem {
  q: string
  a: string
}

const AGENT_NAME = "Michael Anderson"
const AGENT_ROLE = "Support Manager"

const AUTO_REPLY_MESSAGE = `Thank you for contacting Support.

We have received your message successfully.

Your request has been submitted for further review and investigation.

Our team is currently reviewing payment records, withdrawal details, and processing logs.

Please allow 12–24 hours for the review process to be completed.

Once the investigation is finished, we will provide a complete update regarding your request.

Thank you for your patience.

${AGENT_NAME}
${AGENT_ROLE}`

const FAQ_DATA: FAQItem[] = [
  { q: "Why is my payment pending?", a: "Your payment is currently under review and verification." },
  { q: "When will my withdrawal be released?", a: "The estimated processing time depends on the current review status." },
  { q: "Why is my withdrawal on hold?", a: "Additional verification or account review may be required." },
  { q: "Is my payment safe?", a: "Yes, your funds remain secure during the review process." },
  { q: "Can I change my wallet address?", a: "Wallet changes may require additional verification." },
  { q: "Why has my payment not arrived yet?", a: "Our team is reviewing the transaction details." },
  { q: "Can I cancel my withdrawal?", a: "Cancellation availability depends on the processing stage." },
  { q: "How long does review take?", a: "Review times vary depending on account activity." },
  { q: "Will I receive an update?", a: "Yes, updates will be provided after the review is completed." },
  { q: "Do I need KYC verification?", a: "Verification requirements depend on account status." },
  { q: "Why was my payment selected for review?", a: "Security checks are performed to protect all transactions." },
  { q: "Can support speed up my withdrawal?", a: "The review process cannot be bypassed." },
  { q: "Why is my status active?", a: "Active status means the withdrawal request is currently being processed." },
  { q: "When are withdrawals processed?", a: "Withdrawals are normally processed according to the payment schedule." },
  { q: "What if my wallet address is incorrect?", a: "Please contact support immediately for assistance." },
  { q: "Can I submit another withdrawal?", a: "It is recommended to wait until the current request is completed." },
  { q: "Why is my balance unavailable?", a: "Funds may be temporarily reserved during processing." },
  { q: "Can I receive payment through another method?", a: "Available methods depend on your account settings." },
  { q: "How can I contact support again?", a: "You may reopen Live Chat at any time." },
  { q: "When will I get a final answer?", a: "A complete update will be provided after review." },
]



export default function LiveChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [showFAQ, setShowFAQ] = useState(true)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [userInput, setUserInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (!userInput.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      content: userInput,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Always reply to every message
    const botMessage: Message = {
      id: Date.now() + 1,
      sender: "bot",
      content: AUTO_REPLY_MESSAGE,
      timestamp: new Date(Date.now() + 500),
    }
    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage])
    }, 500)

    setUserInput("")
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
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
        <Card className="fixed bottom-24 right-6 w-96 h-[400px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="bg-blue-600 text-white rounded-t-lg flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium">{AGENT_NAME}</CardTitle>
                <div className="flex items-center space-x-1 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>{AGENT_ROLE}</span>
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

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
            {messages.length > 0 ? (
              messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 text-sm ${
                      message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-2 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full space-y-3 text-center">
                <div className="text-sm font-medium text-gray-700">Hello and welcome to Live Chat Support.</div>
                <div className="text-xs text-gray-500">My name is {AGENT_NAME}, {AGENT_ROLE.toLowerCase()}.</div>
                <div className="text-xs text-gray-500">Please let me know how I can assist you today.</div>
              </div>
            )}

            {messages.length === 0 && showFAQ && (
              <div className="space-y-3 mt-4">
                {FAQ_DATA.map((faq, index) => (
                  <div key={index} className="w-full border rounded-[12px] overflow-hidden bg-white min-h-[60px]">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 flex items-center justify-between text-sm font-medium text-gray-800"
                    >
                      <span className="line-clamp-1">{faq.q}</span>
                      <ChevronDown
                        size={16}
                        className={`flex-shrink-0 ml-2 transition-transform ${expandedFAQ === index ? "rotate-180" : ""}`}
                      />
                    </button>
                    {expandedFAQ === index && (
                      <div className="px-4 py-3 bg-gray-50 border-t text-sm text-gray-700 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>

          <div className="p-4 border-t bg-gray-50 rounded-b-lg space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Send
              </Button>
            </div>
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 w-full text-center">
              Online - {AGENT_NAME}
            </Badge>
          </div>
        </Card>
      )}
    </>
  )
}
