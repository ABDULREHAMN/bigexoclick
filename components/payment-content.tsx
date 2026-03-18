"use client"
import { useState } from "react"
import { Wallet, CheckCircle, Mail, Building2, FileText, Download, AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useKyc } from "@/components/kyc-context"
import { KycPromptModal } from "./kyc-prompt-modal"
import { KycVerifiedBanner } from "./kyc-verified-banner"
import { KycInformationCard } from "./kyc-information-card"
import { WithdrawalRow } from "./withdrawal-row"
import { PaymentMethodCard } from "./payment-method-card"
import { WithdrawalDetailsModal, type WithdrawalDetails } from "./withdrawal-details-modal"
import { config } from "@/lib/config"

export function PaymentContent() {
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("crypto-trc20")
  const [paypalEmail, setPaypalEmail] = useState("")
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalDetails | null>(null)
  const [showWithdrawalDetails, setShowWithdrawalDetails] = useState(false)
  const [showBankTransferConfirmation, setShowBankTransferConfirmation] = useState(false)
  const [selectedPaymentEntry, setSelectedPaymentEntry] = useState<any>(null)
  const { kycStatus, openKycPromptModal } = useKyc()

  const availableBalance = 115342.0
  const pendingBalance = 0.0
  const totalEarnings = 115342.0
  const totalPayments = 115342.0
  const thisMonthEarnings = 657.0 // This_Month: $657.00
  const nextWithdrawalDate = ""

  const withdrawalHistory: WithdrawalDetails[] = [
    {
      id: "aug-25-2025-crypto-failed",
      date: "25 August, 2025",
      method: "Crypto (USDT-TRC20)",
      amount: "$100,841.00",
      status: "failed",
      details: "TEVQ9zRdLaBX3ohHU81Xh7hDyCdUg98akz",
      transactionId: "TRC20-TX-9823456712",
      isVerified: false,
      note: "Invalid or inactive TRC20 wallet address. Refund processing within 15-20 business days.",
      confirmationTimestamp: "Transaction rejected at blockchain validation",
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
    {
      id: "june-12-2025",
      date: "June 12, 2025",
      method: "Crypto (BEP20)",
      amount: "$550.00",
      status: "withdrawn",
      details: "0xb9cE...706B",
      transactionId: "#TX-CR550-JUNE12",
      isVerified: true,
    },
    {
      id: "june-13-2025",
      date: "June 13, 2025",
      method: "PayPal",
      amount: "$150.00",
      status: "withdrawn",
      details: "rohanjanean56@gmail.com",
      transactionId: "#TX-PP150-JUNE13",
      isVerified: true,
    },
    {
      id: "may-25-2025",
      date: "May 25, 2025",
      method: "Crypto (BEP20)",
      amount: "$191.87",
      status: "withdrawn",
      details: "0xb9cE...706B",
      transactionId: "#TX-CR191-MAY25",
      isVerified: true,
    },
  ]

  const paymentEntries = [
    {
      id: "aug-25-2025",
      date: "25 August, 2025",
      method: "Bank Transfer (USA)",
      amount: "$100,841.00",
      status: "✅ Confirmed — Withdrawn",
      confirmed_date: "27 August, 2025",
      bank: "ExoClick - Jahnzaib Nadir (Bank of America)",
      trace_number: "TRC-9823456712",
      transaction_id: "TXN-25082025-EXC",
      bank_reference: "BofA-2025-89734",
      beneficiary: "Jahnzaib Nadir",
      country: "USA",
      note: "Payment successfully confirmed and withdrawn.",
      file_name: "Payment_Receipt_25082025.pdf",
    },
    {
      id: "aug-25-2025-crypto-failed",
      date: "25 August, 2025",
      method: "Cryptocurrency (USDT - TRC20)",
      amount: "$100,841.00",
      status: "Failed",
      receipt_id: "EXO-CRYPTO-TRC20-20250825",
      wallet_address: "TEVQ9zRdLaBX3ohHU81Xh7hDyCdUg98akz",
      transaction_id: "TRC20-TX-9823456712",
      blockchain_network: "TRON (TRC20)",
      equivalent_usdt: "100,841 USDT",
      exchange_rate: "1 USDT = 1.00 USD",
      reason: "Invalid or inactive TRC20 wallet address",
      processing_notes:
        "The wallet provided does not exist or cannot accept funds. This transaction was rejected at the blockchain validation step. Refund will be processed automatically within 15–20 business days.",
      support_email: "support@exoclick.com",
      support_hotline: "+1-800-555-EXO",
      issued_by: "ExoClick Payments Department",
      verification: "Digitally Signed & Verified",
      file_name: "Crypto_Receipt_25082025.pdf",
    },
  ]

  const handleAmountChange = (value: string) => {
    setWithdrawAmount(value)
    setShowError(false)
    setErrorMessage("")
  }

  const handleMethodChange = (method: string) => {
    setPaymentMethod(method)
    setShowError(false)
    setErrorMessage("")
  }

  const handleWithdrawRequest = () => {
    if (pendingBalance > 0) {
      setShowError(true)
      setErrorMessage(
        "You have a pending withdrawal scheduled for August 25th. Please wait for it to be processed before requesting another withdrawal.",
      )
      return
    }

    if (kycStatus !== "verified") {
      openKycPromptModal()
      return
    }
    console.log("Withdrawal requested with amount:", withdrawAmount, "method:", paymentMethod)
    if (showError) {
      return
    }
    alert("Withdrawal request submitted (simulated)!")
  }

  const handleWithdrawalRowClick = (withdrawalId: string) => {
    const bankTransferIds = ["aug-25-2025"]
    const cryptoFailedIds = ["aug-25-2025-crypto-failed"]

    if (bankTransferIds.includes(withdrawalId)) {
      const paymentEntry = paymentEntries.find((entry) => entry.id === withdrawalId)
      if (paymentEntry) {
        setSelectedPaymentEntry(paymentEntry)
        setShowBankTransferConfirmation(true)
      }
      return
    }

    if (cryptoFailedIds.includes(withdrawalId)) {
      const paymentEntry = paymentEntries.find((entry) => entry.id === withdrawalId)
      if (paymentEntry) {
        setSelectedPaymentEntry(paymentEntry)
        setShowBankTransferConfirmation(true)
      }
      return
    }

    const withdrawal = withdrawalHistory.find((w) => w.id === withdrawalId)
    if (withdrawal) {
      setSelectedWithdrawal(withdrawal)
      setShowWithdrawalDetails(true)
    }
  }

  const handleDownloadPDF = (paymentEntry: any) => {
    const pdfContent = `
Payment Confirmation Receipt
ExoClick Professional Template

===========================================
TRANSACTION DETAILS
===========================================

Date: ${paymentEntry.date}
Method: ${paymentEntry.method}
Amount: ${paymentEntry.amount}
Status: ${paymentEntry.status}

===========================================
CONFIRMATION DETAILS
===========================================

Transaction ID: ${paymentEntry.transaction_id}
Bank Reference: ${paymentEntry.bank_reference}
Trace Number: ${paymentEntry.trace_number}
Confirmed On: ${paymentEntry.confirmed_date}

===========================================
BENEFICIARY INFORMATION
===========================================

Beneficiary: ${paymentEntry.beneficiary}
Bank: ${paymentEntry.bank}
Country: ${paymentEntry.country}

===========================================
CONFIRMATION NOTE
===========================================

${paymentEntry.note}

Proof: Funds have left sender's account and successfully deposited into recipient's bank.

===========================================
This is an official payment confirmation receipt.
Generated on: ${new Date().toLocaleDateString()}
===========================================
    `.trim()

    const blob = new Blob([pdfContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = paymentEntry.file_name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const recentActivity = [
    {
      id: "aug-27-confirmation",
      date: "27 August, 2025",
      activity: "All pending payments have been confirmed on 27 August, 2025.",
      status: "Confirmed",
      reference: "ExoClick - Jahnzaib Nadir (Bank of America)",
    },
  ]



  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Payments</h1>

      {config.withdrawals.hold_message && (
        <Card className="p-4 bg-yellow-50 border-yellow-300 border-2">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="text-yellow-600 mt-1 flex-shrink-0" size={24} />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Payment On Hold</h3>
              <p className="text-sm text-yellow-800 leading-relaxed">
                Your latest withdrawal of <strong>$100,841.00</strong> (TRC20 transfer) is currently{" "}
                <strong>on hold</strong>. The transaction could not be completed due to an invalid or unverified wallet
                address. Please complete your <strong>KYC verification</strong> to reactivate withdrawal eligibility. Once
                verified, your funds will be automatically reprocessed within <strong>5–7 business days</strong>.
              </p>
              <p className="text-sm text-yellow-800 mt-2">
                ⚠️ <strong>Note:</strong> Repeated unverified withdrawals may result in temporary dashboard suspension.
              </p>
            </div>
          </div>
        </Card>
      )}

      {config.ui.banners && <KycVerifiedBanner />}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard title="AVAILABLE BALANCE" value={`$${availableBalance.toFixed(2)}`} />
            <StatsCard title="TOTAL PAYMENTS" value={`$${totalPayments.toFixed(2)}`} />
            {!config.dashboard.hide_next_withdraw_section && (
              <StatsCard title="NEXT WITHDRAWAL" value="" />
            )}
          </div>

          {config.payment_section.show_recent_activity && (
            <Card className="p-4 bg-green-50 border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                Recent Activity
              </h3>
              <div className="space-y-2">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-green-800">{activity.activity}</p>
                      <p className="text-xs text-green-600">{activity.reference}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                        {activity.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {config.payment_section.show_payment_status && (
            <Card className="p-4 bg-red-50 border-red-200">
              <h3 className="text-lg font-semibold text-red-800 mb-3">Current Payment On Hold</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <strong>Date:</strong> 25 August, 2025
                </div>
                <div>
                  <strong>Amount:</strong> $100,841.00
                </div>
                <div>
                  <strong>Method:</strong> Crypto TRC20 Wallet
                </div>
                <div>
                  <strong>Status:</strong> On Hold
                </div>
                <div className="md:col-span-2">
                  <strong>Address:</strong> TEVQ9zRdLaBX3ohHU81Xh7hDyCdUg98aKz
                </div>
                <div className="md:col-span-2">
                  <strong>Reason:</strong> Transaction returned — unverified or invalid wallet address
                </div>
                <div>
                  <strong>Last Update:</strong> 6 October, 2025
                </div>
              </div>
              <div className="mt-3 p-3 bg-white border border-red-200 rounded text-sm text-red-800">
                Please complete your KYC verification to reactivate your withdrawal eligibility. Once verified, your
                payment will be reprocessed automatically within 5–7 business days.
              </div>
            </Card>
          )}

          <Tabs defaultValue="withdraw" className="space-y-6">
            <TabsList>
              <TabsTrigger value="withdraw">Withdraw Funds</TabsTrigger>
              <TabsTrigger value="history">Withdrawal History</TabsTrigger>
              <TabsTrigger value="methods">Payment Methods</TabsTrigger>
            </TabsList>

            <TabsContent value="withdraw" className="space-y-6">
              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-green-800">Available Balance</h3>
                    <p className="text-2xl font-bold text-green-600">${availableBalance.toFixed(2)}</p>
                  </div>
                  <Wallet className="text-green-600" size={32} />
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-medium mb-4">Withdraw Funds</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3">Payment Method</label>
                    <RadioGroup value={paymentMethod} onValueChange={handleMethodChange} className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="crypto-trc20" id="crypto-trc20" />
                        <Label htmlFor="crypto-trc20" className="flex items-center space-x-2 cursor-pointer">
                          <Wallet size={16} />
                          <span>USDT (TRC20)</span>
                          <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800">
                            TEVQ9zRdLaBX3ohHU81Xh7hDyCdUg98aKz
                          </Badge>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Amount (USD)</label>
                    <Input
                      type="number"
                      placeholder="Enter amount to withdraw"
                      value={withdrawAmount}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      min="1"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Available: ${availableBalance.toFixed(2)} | No Limit
                    </div>

                    {showError && (
                      <Alert className="border-red-200 bg-red-50 mt-2">
                        <AlertDescription className="text-red-800">{errorMessage}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  {paymentMethod === "crypto-trc20" && (
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">USDT (TRC20) - Active</h4>
                        <p className="text-sm text-blue-600 mb-3">
                          Send USDT to this TRC20 address
                        </p>
                        <div className="break-all font-mono text-xs text-blue-700 bg-white p-2 rounded border border-blue-100">
                          TEVQ9zRdLaBX3ohHU81Xh7hDyCdUg98aKz
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Withdrawals arrive instantly • Unlimited withdrawal limit
                      </div>
                    </div>
                  )}

                  <Button
                    className="w-full bg-green-500 hover:bg-green-600"
                    onClick={handleWithdrawRequest}
                    disabled={
                      !withdrawAmount || Number(withdrawAmount) <= 0 || (paymentMethod === "paypal" && !paypalEmail)
                    }
                  >
                    {paymentMethod === "bank-usa" ? (
                      <Building2 className="mr-2" size={16} />
                    ) : (
                      <Mail className="mr-2" size={16} />
                    )}
                    Request Withdrawal
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card className="p-4 bg-gray-50 border-gray-200">
                <h2 className="text-lg font-medium mb-3">Refund History</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <div>15 August, 2025 — Crypto Wallet (0xb9cE52416d589bCe1AdCd02021BAe4D14202706B)</div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-800">$18,187.42</span>
                      <Badge className="bg-blue-100 text-blue-800">Refunded to Balance</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <div>18 August, 2025 — PayPal (rohanjanean56@gmail.com)</div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-800">$150.00</span>
                      <Badge className="bg-blue-100 text-blue-800">Refunded to Balance</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <div>25 August, 2025 — TRC20 Wallet (TEVQ9zRdLaBX3ohHU81Xh7hDyCdUg98aKz)</div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-800">$100,841.00</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Refunded — On Hold</Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                  <Wallet className="mr-2 h-5 w-5" />
                  Withdrawal Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="text-sm text-gray-600 mb-1">Pending Withdrawal</div>
                    <div className="text-2xl font-bold text-green-600">$0.00</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="text-sm text-gray-600 mb-1">Total Earnings</div>
                    <div className="text-2xl font-bold text-blue-600">${totalEarnings.toFixed(2)}</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="text-sm text-gray-600 mb-1">Processing Time</div>
                    <div className="text-lg font-semibold text-green-600">All Confirmed</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <h2 className="text-lg font-medium mb-4">Withdrawal History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-sm">Method</th>
                        <th className="text-left py-3 px-4 font-medium text-sm">Amount</th>
                        <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-sm">Address / Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {withdrawalHistory.map((withdrawal) => (
                        <WithdrawalRow
                          key={withdrawal.id}
                          date={withdrawal.date}
                          method={withdrawal.method}
                          amount={withdrawal.amount}
                          status={withdrawal.status}
                          details={withdrawal.details}
                          isVerified={withdrawal.isVerified}
                          note={withdrawal.note}
                          onRowClick={() => handleWithdrawalRowClick(withdrawal.id)}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="methods" className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Payment Methods</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 border-dashed flex items-center justify-center h-40">
                    <Button variant="outline" className="flex items-center bg-transparent">
                      <Wallet className="mr-2" size={16} />
                      Add Payment Method
                    </Button>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1 space-y-4">
          {config.support_section.visible && (
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-3">Support</h3>
              <div className="text-sm text-gray-800">
                Need help? Contact ExoClick Finance Team:
                {config.support_section.show_email && <div className="mt-2">Email: support@exoclick.com</div>}
                {config.support_section.show_website && <div>Website: www.exoclick.com</div>}
                {config.support_section.show_response_time && (
                  <div className="text-gray-600 mt-1">Response time: 24–48 business hours</div>
                )}
              </div>
            </Card>
          )}

          {config.kyc_section.visible && <KycInformationCard />}
        </div>
      </div>

      <WithdrawalDetailsModal
        isOpen={showWithdrawalDetails}
        onClose={() => setShowWithdrawalDetails(false)}
        withdrawal={selectedWithdrawal}
      />

      {config.kyc_section.show_pending_message && <KycPromptModal />}

      <Dialog open={showBankTransferConfirmation} onOpenChange={setShowBankTransferConfirmation}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <FileText className="mr-2 h-6 w-6 text-blue-600" />
              {selectedPaymentEntry?.method?.includes("Crypto")
                ? "ExoClick Crypto Payment Receipt"
                : "ExoClick Payment Receipt"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {selectedPaymentEntry?.method?.includes("Crypto") ? (
              <>
                <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-red-800">ExoClick</h2>
                      <p className="text-sm text-red-600">Crypto Payment Receipt</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>
                        <strong>Receipt ID:</strong> {selectedPaymentEntry?.receipt_id}
                      </p>
                      <p>
                        <strong>Date:</strong> {selectedPaymentEntry?.date}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p>
                        <strong>Payment Method:</strong> {selectedPaymentEntry?.method}
                      </p>
                      <p>
                        <strong>Blockchain:</strong> {selectedPaymentEntry?.blockchain_network}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Status:</strong> <Badge className="bg-red-100 text-red-800">Failed</Badge>
                      </p>
                      <p>
                        <strong>Support:</strong> {selectedPaymentEntry?.support_email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Transaction Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Transaction ID</span>
                      <span className="text-sm font-mono text-red-800">{selectedPaymentEntry?.transaction_id}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Wallet Address</span>
                      <span className="text-sm font-mono text-red-800">{selectedPaymentEntry?.wallet_address}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Amount (USD)</span>
                      <span className="text-lg font-bold text-red-800">{selectedPaymentEntry?.amount}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Equivalent USDT</span>
                      <span className="text-sm font-semibold text-red-800">
                        {selectedPaymentEntry?.equivalent_usdt}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">Failure Information</h3>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <strong>Reason:</strong> {selectedPaymentEntry?.reason}
                    </p>
                    <p className="text-sm text-red-700">{selectedPaymentEntry?.processing_notes}</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Support Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p>
                        <strong>Email:</strong> {selectedPaymentEntry?.support_email}
                      </p>
                      <p>
                        <strong>Hotline:</strong> {selectedPaymentEntry?.support_hotline}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Issued By:</strong> {selectedPaymentEntry?.issued_by}
                      </p>
                      <p>
                        <strong>Verification:</strong> {selectedPaymentEntry?.verification}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-blue-800">ExoClick</h2>
                      <p className="text-sm text-blue-600">Payment Receipt</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>
                        <strong>Date Issued:</strong> 27 August, 2025
                      </p>
                      <p>
                        <strong>Email:</strong> support@exoclick.com
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p>
                        <strong>Company:</strong> ExoClick
                      </p>
                      <p>
                        <strong>Beneficiary:</strong> Jahnzaib Nadir
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Bank:</strong> Bank of America (USA)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Transaction Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Payment Date</span>
                      <span className="text-sm font-semibold text-blue-800">25 August, 2025</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Payment Method</span>
                      <span className="text-sm font-semibold text-blue-800">Bank Transfer (USA)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Transaction ID</span>
                      <span className="text-sm font-mono text-blue-800">
                        {selectedPaymentEntry?.transaction_id || "TXN-25082025-EXC"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Trace Number</span>
                      <span className="text-sm font-mono text-blue-800">
                        {selectedPaymentEntry?.trace_number || "TRC-9823456712"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Bank Reference</span>
                      <span className="text-sm font-mono text-blue-800">
                        {selectedPaymentEntry?.bank_reference || "BofA-2025-89734"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Payment Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Amount</span>
                      <span className="text-lg font-bold text-green-800">{selectedPaymentEntry?.amount}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Currency</span>
                      <span className="text-sm font-semibold text-green-800">USD</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Status</span>
                      <Badge className="bg-green-100 text-green-800">Withdrawn — Confirmed</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Confirmation Date</span>
                      <span className="text-sm font-semibold text-green-800">
                        {selectedPaymentEntry?.confirmed_date || "27 August, 2025"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Verification</span>
                      <Badge className="bg-blue-100 text-blue-800">Verified</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Bank Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Account Holder</span>
                      <span className="text-sm font-semibold text-gray-800">
                        {selectedPaymentEntry?.beneficiary || "Jahnzaib Nadir"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Country</span>
                      <span className="text-sm font-semibold text-gray-800">
                        {selectedPaymentEntry?.country || "USA"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Transfer Type</span>
                      <span className="text-sm font-semibold text-gray-800">ACH / Wire Transfer</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 border border-green-200 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 block mb-2">Reference Note</span>
                    <p className="text-sm text-gray-600">Funds successfully transferred via Bank of America</p>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">Payment Summary</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-800">1</div>
                      <div className="text-sm text-green-600">Total Payments Included</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-800">$100,841.00</div>
                      <div className="text-sm text-green-600">Total Amount</div>
                    </div>
                  </div>
                  <div className="p-3 bg-white border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Confirmation:</strong> This receipt confirms that the payment has been processed and funds
                      are successfully withdrawn.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-800 mb-2">
                    <strong>PDF Settings:</strong> ExoClick Professional Template | Preview Mode Enabled
                  </p>
                  <p className="text-xs text-yellow-700">Filename: Payment_Receipt_25082025.pdf</p>
                </div>

                <div className="flex space-x-2">
                  <Button disabled className="flex-1 bg-gray-300 hover:bg-gray-300 cursor-not-allowed">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF (Disabled)
                  </Button>
                  <Button onClick={() => setShowBankTransferConfirmation(false)} variant="outline" className="flex-1">
                    Close
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface StatsCardProps {
  title: string
  value: string
  date?: string
}

function StatsCard({ title, value, date }: StatsCardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-xs text-gray-500 mb-2">{title}</div>
            <div className="text-2xl font-semibold">{value}</div>
            {date && <div className="text-xs text-gray-500 mt-1">{date}</div>}
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>{title.toLowerCase()} details</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
