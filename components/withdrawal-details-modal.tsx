"use client"

import { X, CheckCircle, Clock, AlertCircle, Copy, ExternalLink, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface WithdrawalDetails {
  id: string
  date: string
  method: string
  amount: string
  status: "withdrawn" | "scheduled" | "failed" | "confirmed" | "refunded"
  details: string
  transactionId?: string
  isVerified?: boolean
  note?: string
  confirmationTimestamp?: string
}

interface WithdrawalDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  withdrawal: WithdrawalDetails | null
}

export function WithdrawalDetailsModal({ isOpen, onClose, withdrawal }: WithdrawalDetailsModalProps) {
  if (!withdrawal) return null

  const statusConfig = {
    withdrawn: {
      icon: CheckCircle,
      color: "text-green-600 bg-green-50 border-green-200",
      label: "Withdrawn",
      badgeColor: "bg-green-500",
    },
    confirmed: {
      icon: CheckCircle,
      color: "text-green-600 bg-green-50 border-green-200",
      label: "Confirmed",
      badgeColor: "bg-green-500",
    },
    scheduled: {
      icon: Clock,
      color: "text-orange-600 bg-orange-50 border-orange-200",
      label: "Pending",
      badgeColor: "bg-orange-500",
    },
    failed: {
      icon: AlertCircle,
      color: "text-red-600 bg-red-50 border-red-200",
      label: "Failed",
      badgeColor: "bg-red-500",
    },
    refunded: {
      icon: AlertCircle,
      color: "text-orange-600 bg-orange-50 border-orange-200",
      label: "Refunded",
      badgeColor: "bg-orange-500",
    },
  }

  const config = statusConfig[withdrawal.status] || statusConfig.scheduled
  const StatusIcon = config.icon

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadReceipt = () => {
    // Simulate receipt download
    alert("Receipt download started (simulated)")
  }

  const getTitle = () => {
    if (withdrawal.method.includes("Crypto")) {
      return `Crypto Withdrawal – ${config.label}`
    } else if (withdrawal.method.includes("PayPal")) {
      return `PayPal Withdrawal – ${config.label}`
    }
    return `${withdrawal.method} Withdrawal – ${config.label}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <StatusIcon className={`mr-2 h-5 w-5 ${config.color.split(" ")[0]}`} />
              {getTitle()}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className={`p-4 rounded-lg border ${config.color}`}>
          <div className="space-y-4">
            {/* Amount and Status */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Amount</div>
                <div className="text-2xl font-bold">{withdrawal.amount}</div>
              </div>
              <Badge className={`${config.badgeColor} text-white flex items-center`}>
                <StatusIcon size={12} className="mr-1" />
                {config.label}
              </Badge>
            </div>

            {/* Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Date</div>
                <div className="font-semibold">{withdrawal.date}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Method</div>
                <div className="font-semibold">{withdrawal.method}</div>
              </div>
            </div>

            {/* Address/Email */}
            <div>
              <div className="text-sm text-gray-600">
                {withdrawal.details.startsWith("0x") ? "Wallet Address" : "Email Address"}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`${withdrawal.details.startsWith("0x") ? "font-mono text-sm" : ""} break-all`}>
                  {withdrawal.details}
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 flex-shrink-0"
                        onClick={() => copyToClipboard(withdrawal.details)}
                      >
                        <Copy size={12} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy {withdrawal.details.startsWith("0x") ? "wallet address" : "email address"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Transaction ID */}
            <div>
              <div className="text-sm text-gray-600">Transaction ID</div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="font-mono text-sm">{withdrawal.transactionId || "(Pending)"}</span>
                {withdrawal.transactionId && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(withdrawal.transactionId!)}
                        >
                          <Copy size={12} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy transaction ID</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>

            {/* Confirmation Timestamp */}
            {withdrawal.confirmationTimestamp && (
              <div>
                <div className="text-sm text-gray-600">Confirmation Time</div>
                <div className="font-semibold">{withdrawal.confirmationTimestamp}</div>
              </div>
            )}

            {/* Verification Status */}
            {withdrawal.isVerified && (
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-700 font-medium">Verified Transaction</span>
              </div>
            )}

            {/* Additional Notes */}
            {withdrawal.note && (
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-600 mb-1">Additional Information</div>
                <div className="text-sm text-gray-800">{withdrawal.note}</div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-2">
              {withdrawal.transactionId && withdrawal.details.startsWith("0x") && (
                <Button variant="outline" size="sm" className="flex items-center bg-transparent">
                  <ExternalLink size={14} className="mr-1" />
                  View on Blockchain
                </Button>
              )}
              {withdrawal.status === "confirmed" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center bg-transparent"
                  onClick={downloadReceipt}
                >
                  <Download size={14} className="mr-1" />
                  Download Receipt
                </Button>
              )}
              <Button variant="outline" size="sm" className="flex items-center ml-auto bg-transparent">
                <Copy size={14} className="mr-1" />
                Copy Details
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
