"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X } from "lucide-react"

interface Message {
  id: number
  sender: "bot" | "user"
  content: string
  timestamp: Date
}

const AUTO_REPLY_MESSAGE = `Live Chat is currently closed.

Our support team is unavailable at the moment.
Please contact us again after 2 days (Monday).

Thank you for your patience.`

export default function LiveChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [hasShownAutoReply, setHasShownAutoReply] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const openChat = () => {
    setIsOpen(true)
    if (!hasShownAutoReply) {
      // Show auto-reply immediately when chat opens
      setMessages([
        {
          id: Date.now(),
          sender: "bot",
          content: AUTO_REPLY_MESSAGE,
          timestamp: new Date(),
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

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col justify-center items-center">
            {messages.map((message) => (
              <div key={message.id} className="w-full">
                <div className="max-w-[100%] rounded-lg px-4 py-3 text-sm bg-gray-100 text-gray-900">
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className="text-xs text-gray-500 mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>

          <div className="p-4 border-t bg-gray-50 rounded-b-lg">
            <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-800">
              Offline Mode - Auto-reply enabled
            </Badge>
          </div>
        </Card>
      )}
    </>
  )
}
