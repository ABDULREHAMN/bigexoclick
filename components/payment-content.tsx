"use client"
import { useState } from "react"
import { Wallet, Download } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { WithdrawalRow } from "./withdrawal-row"
import type { WithdrawalDetails } from "./withdrawal-details-modal"

export function PaymentContent() {
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("bank-usa")
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalDetails | null>(null)

  const availableBalance = 115430.0
  const totalWithdraw = 115430.0

  const withdrawalHistory: WithdrawalDetails[] = [
    {
      id: "aug-25-2025",
      date: "25 August, 2025",
      method: "Bank Transfer (USA)",
      amount: "$100,841.00",
      status: "✅ Withdrawn — Confirmed",
      details: "ExoClick - Jahnzaib Nadir (Bank of America)",
      transactionId: "TRC-9823456712",
      isVerified: true,
      note: "Company: ExoClick | Account: XXXX-9823 | PDF Receipt Available",
      confirmationTimestamp: "Reference: TRC-9823456712",
    },
    {
      id: "july-24-2025",
      date: "July 24, 2025",
      method: "Crypto (BEP20)",
      amount: "$18,187.42",
      status: "withdrawn",
      details: "0xb9cE52416d589bCe1AdCd02021BAe4D14202706B",
      transactionId: "#TX-CR18187-JULY24-REF",
      isVerified: true,
      note: "Refund completed successfully. Funds returned to available balance.",
      confirmationTimestamp: "Refund completed on August 14, 2025",
    },
    {
      id: "june-30-2025",
      date: "June 30, 2025",
      method: "PayPal",
      amount: "$150.00",
      status: "refunded",
      details: "rohanjanean56@gmail.com",
      transactionId: "#TX-PP150-JUNE30-REF",
      isVerified: true,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Main Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">AVAILABLE BALANCE</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <Wallet className="h-8 w-8 text-blue-600 opacity-20" />
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">TOTAL WITHDRAW</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${totalWithdraw.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <Download className="h-8 w-8 text-green-600 opacity-20" />
          </div>
        </Card>
      </div>

      {/* Withdrawal Section */}
      <Tabs defaultValue="form" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Withdraw Funds</TabsTrigger>
          <TabsTrigger value="history">Withdrawal History</TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Next Withdrawal</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-gray-700 font-medium">Coming Soon</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Request Withdrawal</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount" className="text-sm font-medium">
                  Withdrawal Amount
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="flex-1"
                  />
                  <span className="flex items-center px-3 bg-gray-100 rounded border border-gray-300">USD</span>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank-usa" id="bank-usa" />
                    <Label htmlFor="bank-usa" className="font-normal cursor-pointer">Bank Transfer (USA)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="font-normal cursor-pointer">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="crypto" id="crypto" />
                    <Label htmlFor="crypto" className="font-normal cursor-pointer">Crypto (BEP20/TRC20)</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
                Submit Withdrawal Request
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Withdrawal History</h3>
            <div className="space-y-2">
              {withdrawalHistory.map((withdrawal) => (
                <WithdrawalRow key={withdrawal.id} withdrawal={withdrawal} onViewDetails={() => setSelectedWithdrawal(withdrawal)} />
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
