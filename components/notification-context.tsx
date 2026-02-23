"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  type: "success" | "info" | "warning" | "error"
  icon?: string
  persistent?: boolean
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "isRead">) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => {
        // Don't mark persistent notifications as read
        if (notification.persistent && notification.id === id) {
          return notification
        }
        return notification.id === id ? { ...notification, isRead: true } : notification
      }),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => {
        // Don't mark persistent notifications as read
        if (notification.persistent) {
          return notification
        }
        return { ...notification, isRead: true }
      }),
    )
  }

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "isRead">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
