"use client"

import { X, Check, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

export interface WithdrawalInvoiceData {
  id: string
  date: string
  amount: number
  status: "pending" | "completed"
  userName: string
  userEmail: string
  method: string
  kycStatus: string
  walletAddress: string
  processingTime: string
  nextWithdrawalDate: string
  timeline: Array<{
    step: string
    status: "completed" | "pending"
  }>
}

interface WithdrawalInvoiceModalProps {
  isOpen: boolean
  onClose: () => void
  withdrawal: WithdrawalInvoiceData | null
  notificationMessage?: string
}

export function WithdrawalInvoiceModal({
  isOpen,
  onClose,
  withdrawal,
  notificationMessage,
}: WithdrawalInvoiceModalProps) {
  if (!withdrawal) return null

  const statusBadgeColor = withdrawal.status === "pending" ? "bg-yellow-500" : "bg-green-500"
  const statusText = withdrawal.status === "pending" ? "Pending" : "Completed"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-blue-600">Withdrawal Invoice</DialogTitle>
              <p className="text-sm text-gray-600 mt-1">Official Publisher Payout</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 py-4">
          {/* Notification Banner */}
          {notificationMessage && (
            <Alert className="bg-blue-50 border-blue-200">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800 ml-2">{notificationMessage}</AlertDescription>
            </Alert>
          )}

          {/* Main Info Card */}
          <div className="bg-white border rounded-lg p-6 space-y-4">
            {/* Top Row - Amount and Status */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Total Amount</p>
                <p className="text-4xl font-bold text-gray-900">${withdrawal.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <Badge className={`${statusBadgeColor} text-white px-4 py-2 text-base font-semibold`}>
                {statusText}
              </Badge>
            </div>

            {/* User Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-gray-600 mb-1">Publisher Name</p>
                <p className="font-semibold text-gray-900">{withdrawal.userName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Email Address</p>
                <p className="font-semibold text-gray-900">{withdrawal.userEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                <p className="font-semibold text-gray-900">{withdrawal.method}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">KYC Status</p>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <p className="font-semibold text-green-700">{withdrawal.kycStatus}</p>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="pt-4 border-t space-y-3">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Withdrawal ID</p>
                <p className="font-mono text-sm font-semibold text-gray-900">{withdrawal.id}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Date Requested</p>
                <p className="font-semibold text-gray-900">{withdrawal.date}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Wallet Address</p>
                <p className="font-mono text-sm font-semibold text-gray-900 truncate max-w-xs">{withdrawal.walletAddress}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Processing Time</p>
                <p className="font-semibold text-gray-900">{withdrawal.processingTime}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Next Withdrawal Date</p>
                <p className="font-semibold text-gray-900">{withdrawal.nextWithdrawalDate}</p>
              </div>
            </div>
          </div>

          {/* Transaction Timeline */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Transaction Timeline</h3>
            <div className="space-y-4">
              {withdrawal.timeline.map((item, index) => {
                const isCompleted = item.status === "completed"
                const isPending = item.status === "pending"

                return (
                  <div key={index} className="flex items-start space-x-4">
                    {/* Status Icon */}
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="h-5 w-5 text-green-600" />
                        </div>
                      ) : isPending ? (
                        <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-yellow-600" />
                        </div>
                      ) : null}
                    </div>

                    {/* Step Info */}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.step}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {isCompleted ? "Completed" : isPending ? "In Progress" : "Pending"}
                      </p>
                    </div>

                    {/* Connector Line */}
                    {index < withdrawal.timeline.length - 1 && (
                      <div className="absolute left-4 top-12 w-0.5 h-8 bg-gray-200" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Download Invoice</Button>
            <Button variant="outline" className="flex-1">
              Contact Support
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
