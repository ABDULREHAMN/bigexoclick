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

const FAQ_DATA: FAQItem[] = [
  { q: "Why is my payment on hold?", a: "Your payment is currently under finance review for verification and security checks." },
  { q: "How long does the review take?", a: "Most reviews are completed within 4–7 hours, but some cases may require additional verification." },
  { q: "Why was my withdrawal delayed?", a: "The withdrawal is being reviewed to ensure account and payment details are correct." },
  { q: "Is my payment safe?", a: "Yes, your payment remains secure while the review is in progress." },
  { q: "Can I cancel my withdrawal?", a: "Yes, if processing has not been completed yet." },
  { q: "Why is my withdrawal marked as pending?", a: "Pending status means the payment is awaiting final approval." },
  { q: "Do I need to verify my account?", a: "Additional verification may be required depending on account activity." },
  { q: "Has my payment been sent?", a: "Please wait for the review result. Once approved, the status will be updated." },
  { q: "Can I change my wallet address?", a: "Wallet changes may require a new verification review." },
  { q: "Why is the processing taking longer?", a: "Some transactions require manual finance review." },
  { q: "Will I receive a notification?", a: "Yes, you will receive an update once the review is completed." },
  { q: "What causes payment holds?", a: "Verification checks, account updates, or payment security reviews." },
  { q: "Can I submit another withdrawal?", a: "It is recommended to wait until the current review is completed." },
  { q: "Why is my balance not released?", a: "Your balance is currently being checked by the finance team." },
  { q: "What happens after approval?", a: "The withdrawal will be processed and released." },
  { q: "Can support speed up the review?", a: "Support can review your case but cannot bypass verification requirements." },
  { q: "Is there an issue with my TRC20 address?", a: "The finance team is verifying all payment details." },
  { q: "How do I know if my withdrawal is approved?", a: "The withdrawal status will change from Pending to Approved or Completed." },
  { q: "Why was my withdrawal selected for review?", a: "Random security and compliance checks may trigger a review." },
  { q: "When will I get the final update?", a: "A detailed update will be provided once all checks are completed." },
]

const PAYMENT_KEYWORDS = ["payment", "withdrawal", "pending", "review", "hold", "finance", "balance"]

const PAYMENT_RESPONSE = `Thank you for contacting Finance Support.

We have received your request and are currently reviewing your account, payment details, and withdrawal records.

Our team is checking all information and will provide an update as soon as the review is completed.

Estimated review time: 4–7 hours.

Please wait while we verify the details.`

export default function LiveChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [showFAQ, setShowFAQ] = useState(false)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [userInput, setUserInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const containsPaymentKeyword = (text: string): boolean => {
    return PAYMENT_KEYWORDS.some((keyword) => text.toLowerCase().includes(keyword))
  }

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

    // Check if message contains payment keywords and send response
    if (containsPaymentKeyword(userInput)) {
      const botMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        content: PAYMENT_RESPONSE,
        timestamp: new Date(Date.now() + 500),
      }
      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage])
      }, 500)
    }

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
                <CardTitle className="text-sm font-medium">Finance Support Team</CardTitle>
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
                <div className="text-sm font-medium text-gray-700">Welcome to Finance Support</div>
                <div className="text-xs text-gray-500">Ask us about payments, withdrawals, and account reviews</div>
              </div>
            )}

            {showFAQ && (
              <div className="space-y-2 mt-4">
                {FAQ_DATA.map((faq, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      className="w-full text-left px-3 py-2 hover:bg-blue-50 flex items-center justify-between text-xs font-medium text-gray-800"
                    >
                      <span className="line-clamp-1">{faq.q}</span>
                      <ChevronDown
                        size={16}
                        className={`flex-shrink-0 ml-2 transition-transform ${expandedFAQ === index ? "rotate-180" : ""}`}
                      />
                    </button>
                    {expandedFAQ === index && (
                      <div className="px-3 py-2 bg-gray-50 border-t text-xs text-gray-700 leading-relaxed">
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
                placeholder="Type your message..."
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
            <Button
              onClick={() => setShowFAQ(!showFAQ)}
              variant="outline"
              size="sm"
              className="w-full text-xs"
            >
              {showFAQ ? "Hide" : "Show"} FAQ
            </Button>
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 w-full text-center">
              Online - Finance Support Team
            </Badge>
          </div>
        </Card>
      )}
    </>
  )
}
