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

const AUTO_REPLY_MESSAGE = `Live Chat is currently closed.

Our support team is unavailable at the moment.
Please contact us again after 2 days (Monday).

Thank you for your patience.`

const SUPPORT_AGENT_MESSAGE = `Hello,

Thank you for contacting the Finance & Payments Team.

We are currently reviewing your withdrawal request and verifying all payment details, account status, and transaction records.

Please allow approximately 4–7 hours for our team to complete the verification process. After the review is completed, we will provide a detailed update explaining the current payment status and the estimated release time.

To help us investigate, please confirm the following:

1. Is your withdrawal method still active and accessible?
2. Have you recently changed your wallet address or payment method?
3. Are there any pending verification requests on your account?
4. Have you received any payment-related notifications recently?

Our finance team is checking all records. Once the review is completed, we will update you with the reason for the delay and the expected payment release schedule.

Thank you for your patience.`

export default function LiveChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [hasShownAutoReply, setHasShownAutoReply] = useState(false)
  const [showFAQ, setShowFAQ] = useState(false)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const openChat = () => {
    setIsOpen(true)
    if (!hasShownAutoReply) {
      // Show support agent message followed by auto-reply
      setMessages([
        {
          id: Date.now(),
          sender: "bot",
          content: SUPPORT_AGENT_MESSAGE,
          timestamp: new Date(),
        },
        {
          id: Date.now() + 1,
          sender: "bot",
          content: AUTO_REPLY_MESSAGE,
          timestamp: new Date(Date.now() + 1000),
        },
      ])
      setHasShownAutoReply(true)
    }
  }

  const closeChat = () => {
    setIsOpen(false)
    setMessages([])
    setHasShownAutoReply(false)
  }

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={openChat}
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
                <CardTitle className="text-sm font-medium">Support Team</CardTitle>
                <div className="flex items-center space-x-1 text-xs">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Offline</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeChat}
              className="text-white hover:bg-blue-700 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
            {messages.length > 0 ? (
              messages.map((message) => (
                <div key={message.id} className="w-full">
                  <div className="max-w-[100%] rounded-lg px-4 py-3 text-sm bg-gray-100 text-gray-900">
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs text-gray-500 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full space-y-3 text-center">
                <div className="text-sm font-medium text-gray-700">Frequently Asked Questions</div>
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
            <Button
              onClick={() => setShowFAQ(!showFAQ)}
              variant="outline"
              size="sm"
              className="w-full text-xs"
            >
              {showFAQ ? "Hide" : "Show"} FAQ
            </Button>
            <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-800 w-full text-center">
              Offline Mode - Auto-reply enabled
            </Badge>
          </div>
        </Card>
      )}
    </>
  )
}
