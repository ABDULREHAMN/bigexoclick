"use client"

import { useState } from "react"
import { Wallet, Mail, CheckCircle, Building2, XCircle, CreditCard, Plus, Eye } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function PaymentMethods() {
  const [showBankForm, setShowBankForm] = useState(false)
  const [showPayPalForm, setShowPayPalForm] = useState(false)
  const [showAddPaymentOptions, setShowAddPaymentOptions] = useState(false)
  const [showBankDetailsModal, setShowBankDetailsModal] = useState(false)
  const [showAddBankModal, setShowAddBankModal] = useState(false)
  const [newBankDetails, setNewBankDetails] = useState({
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    iban: "",
  })
  const [bankDetails, setBankDetails] = useState({
    accountHolder: "Jahnzaib Nadir",
    bankName: "Bank of America",
    accountNumber: "XXXX-9823",
    routingNumber: "026009593",
    wireRoutingNumber: "026009593",
    bankAddress: "222 Broadway, New York, NY, USA",
    country: "USA",
    swiftCode: "BOFAUS3N",
  })
  const [paypalEmail, setPaypalEmail] = useState("")
  const [isBankActive, setIsBankActive] = useState(true)
  const [isPayPalActive, setIsPayPalActive] = useState(false)
  const [isBankAdded, setIsBankAdded] = useState(true)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleBankSetup = () => {
    if (bankDetails.accountHolder && bankDetails.bankName && bankDetails.accountNumber && bankDetails.routingNumber) {
      setIsBankActive(true)
      setIsBankAdded(true)
      setShowBankForm(false)
      setShowAddPaymentOptions(false)
      setSuccessMessage("✅ Bank Account Added Successfully!")
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
    }
  }

  const handlePayPalSetup = () => {
    if (paypalEmail) {
      setIsPayPalActive(true)
      setShowPayPalForm(false)
      setShowAddPaymentOptions(false)
      setSuccessMessage("✅ PayPal Account Added Successfully!")
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
    }
  }

  const handleAddBankTransfer = () => {
    setShowAddBankModal(true)
    setShowAddPaymentOptions(false)
  }

  const handleAddPayPal = () => {
    setShowPayPalForm(true)
    setShowAddPaymentOptions(false)
  }

  const handleViewBankDetails = () => {
    setShowBankDetailsModal(true)
  }

  const handleAddBankAccount = () => {
    if (
      newBankDetails.bankName &&
      newBankDetails.accountHolder &&
      newBankDetails.accountNumber &&
      newBankDetails.iban
    ) {
      setIsBankActive(true)
      setIsBankAdded(true)
      setShowAddBankModal(false)
      setSuccessMessage("✅ Bank Account Added Successfully!")
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
      // Reset form
      setNewBankDetails({
        bankName: "",
        accountHolder: "",
        accountNumber: "",
        iban: "",
      })
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Payment Methods</h2>

      {showSuccessMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
          <CheckCircle className="text-green-500 mr-2" size={20} />
          <span className="text-green-800 font-medium">{successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PaymentMethodCard
          type="Bank Transfer (USA)"
          details={`${bankDetails.accountHolder} - ${bankDetails.accountNumber}`}
          network={`${bankDetails.bankName}, ${bankDetails.bankAddress}`}
          limit="Unlimited"
          isDefault={true}
          isVerified={true}
          isActive={true}
          icon="bank"
          onViewDetails={handleViewBankDetails}
        />

        {isPayPalActive && (
          <PaymentMethodCard
            type="PayPal"
            details={paypalEmail}
            network="PayPal Network"
            limit="$5,000 max"
            isDefault={false}
            isVerified={true}
            isActive={true}
            icon="paypal"
          />
        )}

        <PaymentMethodCard
          type="USDT (BEP20)"
          details="0xb9cE52416d589bCe1AdCd02021BAe4D14202706B"
          network="Binance Smart Chain"
          limit="Removed"
          isDefault={false}
          isVerified={false}
          isActive={false}
          isRemoved={true}
        />
      </div>

      <Card className="p-4 border-dashed">
        {!showAddPaymentOptions ? (
          <div className="flex items-center justify-center h-12">
            <Button
              variant="outline"
              className="flex items-center bg-transparent"
              onClick={() => setShowAddPaymentOptions(true)}
            >
              <Plus className="mr-2" size={16} />
              Add Payment Method
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-center mb-3">Select Payment Method to Add</h3>
            <div className="flex flex-col space-y-2">
              {!isBankAdded && (
                <Button variant="outline" className="justify-start bg-transparent" onClick={handleAddBankTransfer}>
                  <Building2 className="mr-2" size={16} />
                  Bank Transfer (USA)
                </Button>
              )}
              {!isPayPalActive && (
                <Button variant="outline" className="justify-start bg-transparent" onClick={handleAddPayPal}>
                  <CreditCard className="mr-2" size={16} />
                  PayPal
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => setShowAddPaymentOptions(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Card>

      {showPayPalForm && (
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Add PayPal Account</h3>
          <div>
            <Label htmlFor="paypalEmail">PayPal Email</Label>
            <Input
              id="paypalEmail"
              type="email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              placeholder="your.email@example.com"
            />
          </div>
          <div className="flex space-x-2 mt-4">
            <Button onClick={handlePayPalSetup}>Add PayPal</Button>
            <Button variant="outline" onClick={() => setShowPayPalForm(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <Dialog open={showAddBankModal} onOpenChange={setShowAddBankModal}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Add Bank Account</DialogTitle>
            <DialogDescription>Enter your bank account details</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 py-4">
            <div>
              <Label htmlFor="newBankName">Bank Name</Label>
              <Input
                id="newBankName"
                value={newBankDetails.bankName}
                onChange={(e) => setNewBankDetails({ ...newBankDetails, bankName: e.target.value })}
                placeholder="Enter bank name"
                required
              />
            </div>
            <div>
              <Label htmlFor="newAccountHolder">Account Holder</Label>
              <Input
                id="newAccountHolder"
                value={newBankDetails.accountHolder}
                onChange={(e) => setNewBankDetails({ ...newBankDetails, accountHolder: e.target.value })}
                placeholder="Enter account holder name"
                required
              />
            </div>
            <div>
              <Label htmlFor="newAccountNumber">Account Number</Label>
              <Input
                id="newAccountNumber"
                value={newBankDetails.accountNumber}
                onChange={(e) => setNewBankDetails({ ...newBankDetails, accountNumber: e.target.value })}
                placeholder="Enter account number"
                required
              />
            </div>
            <div>
              <Label htmlFor="newIban">IBAN / Swift Code</Label>
              <Input
                id="newIban"
                value={newBankDetails.iban}
                onChange={(e) => setNewBankDetails({ ...newBankDetails, iban: e.target.value })}
                placeholder="Enter IBAN or Swift code"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowAddBankModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddBankAccount}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showBankDetailsModal} onOpenChange={setShowBankDetailsModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Bank Transfer (USA) Details</DialogTitle>
            <DialogDescription>View your saved bank account information</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Beneficiary Name</Label>
                <p className="text-sm font-medium">{bankDetails.accountHolder}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Account Number</Label>
                <p className="text-sm font-medium">{bankDetails.accountNumber}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">ACH Routing Number</Label>
                <p className="text-sm font-medium">{bankDetails.routingNumber}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Wire Routing Number</Label>
                <p className="text-sm font-medium">{bankDetails.wireRoutingNumber}</p>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Bank Name & Address</Label>
              <p className="text-sm font-medium">{bankDetails.bankAddress}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">SWIFT Code</Label>
              <p className="text-sm font-medium">{bankDetails.swiftCode}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setShowBankDetailsModal(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface PaymentMethodCardProps {
  type: string
  details: string
  network: string
  limit: string
  isDefault: boolean
  isVerified?: boolean
  isActive?: boolean
  icon?: string
  isRemoved?: boolean
  requiresSetup?: boolean
  onSetup?: () => void
  onViewDetails?: () => void
}

function PaymentMethodCard({
  type,
  details,
  network,
  limit,
  isDefault,
  isVerified,
  isActive,
  icon,
  isRemoved,
  requiresSetup,
  onSetup,
  onViewDetails,
}: PaymentMethodCardProps) {
  const getIcon = () => {
    if (icon === "bank") return <Building2 className="mr-3" size={24} />
    if (icon === "paypal") return <CreditCard className="mr-3" size={24} />
    if (type.includes("USDT")) return <Wallet className="mr-3" size={24} />
    return <Mail className="mr-3" size={24} />
  }

  return (
    <Card
      className={`p-4 relative ${isRemoved ? "opacity-60 bg-gray-50" : !isActive && !isRemoved ? "opacity-80 bg-gray-50" : ""}`}
    >
      {isDefault && <Badge className="absolute top-2 right-2 bg-green-500">Default</Badge>}
      {isRemoved && <Badge className="absolute top-2 right-2 bg-red-500">Removed</Badge>}
      {requiresSetup && !isRemoved && <Badge className="absolute top-2 right-2 bg-blue-500">Setup Required</Badge>}
      {isActive && !isDefault && !isRemoved && <Badge className="absolute top-2 right-2 bg-green-500">Active</Badge>}

      <div className="flex items-center mb-4">
        {getIcon()}
        <h3 className="font-medium">{type}</h3>
      </div>
      <div className="text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-2">
          <span className="truncate">{details}</span>
          {isVerified && isActive && !isRemoved && (
            <Badge className="bg-green-100 text-green-800 text-xs flex items-center">
              <CheckCircle size={10} className="mr-1" />
              Verified
            </Badge>
          )}
          {isRemoved && (
            <Badge className="bg-red-100 text-red-800 text-xs flex items-center">
              <XCircle size={10} className="mr-1" />
              Inactive
            </Badge>
          )}
        </div>
        <div className="text-xs mt-1">{network}</div>
        <div
          className={`text-xs mt-1 font-medium ${isRemoved ? "text-red-600" : isActive ? "text-green-600" : "text-gray-500"}`}
        >
          {limit}
        </div>
      </div>
      <div className="flex space-x-2">
        {!isRemoved ? (
          <>
            {onViewDetails && isActive ? (
              <Button variant="outline" size="sm" onClick={onViewDetails}>
                <Eye className="mr-1" size={12} />
                View Details
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={requiresSetup ? onSetup : undefined}>
                {requiresSetup ? "Setup" : "Edit"}
              </Button>
            )}
            {!isDefault && isActive && (
              <Button variant="outline" size="sm">
                Set Default
              </Button>
            )}
          </>
        ) : (
          <Button variant="outline" size="sm" disabled>
            Removed
          </Button>
        )}
      </div>
    </Card>
  )
}
