"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { DollarSign, CreditCard, Wallet, ArrowRight, History } from "lucide-react"
import { getCurrentUser, updateUserBalance } from "@/utils/auth"

export default function WalletPage() {
  const { toast } = useToast()
  const [amount, setAmount] = useState("")
  const [balance, setBalance] = useState(0)
  const [user, setUser] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const currentUser = getCurrentUser()
    console.log("Current User:", currentUser)
    if (currentUser) {
      setUser(currentUser)
      setBalance(currentUser.balance || 0)

      // Get transactions from localStorage
      const storedTransactions = localStorage.getItem(`transactions_${currentUser.id}`)
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions))
      }
    }
  }, [])

  const handleAddFunds = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to add to your wallet",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      const amountToAdd = Number(amount)/85
      const newBalance = balance + amountToAdd

      if (user) {
        // Update user balance in localStorage
        updateUserBalance(user.id, newBalance)

        // Add transaction record
        const newTransaction = {
          id: Date.now(),
          type: "deposit",
          amount: amountToAdd,
          date: new Date().toISOString(),
          description: "Added funds to wallet",
        }

        const updatedTransactions = [newTransaction, ...transactions]
        localStorage.setItem(`transactions_${user.id}`, JSON.stringify(updatedTransactions))

        setTransactions(updatedTransactions)
        setBalance(newBalance)
        setAmount("")
        setIsProcessing(false)

        toast({
          title: "Funds added successfully",
          description: `₹${(amountToAdd * 85).toFixed(2)} has been added to your wallet`,
        })
      }
    }, 1500)
  }

  if (!user) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to access your wallet</h1>
        <Button asChild>
          <a href="/login">Log In</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">My Wallet</h1>
          <p className="text-muted-foreground">Manage your funds and view transaction history</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wallet className="mr-2 h-5 w-5" />
                Current Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">₹{(balance * 85).toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="add-funds" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-none md:flex">
            <TabsTrigger value="add-funds">Add Funds</TabsTrigger>
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          </TabsList>
          <TabsContent value="add-funds" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Funds to Your Wallet</CardTitle>
                <CardDescription>Add money to your wallet to purchase courses or subscriptions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <div className="flex">
                    <div className="flex items-center justify-center border rounded-l-md px-3 bg-muted">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="amount"
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="Enter amount"
                      className="rounded-l-none"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 border rounded-md p-3 cursor-pointer bg-muted/50">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <div className="font-medium">Credit Card</div>
                        <div className="text-xs text-muted-foreground">Visa, Mastercard, Amex</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 border rounded-md p-3 cursor-pointer">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6.5 13.5C6.5 13.5 7.5 12.5 9.5 12.5C11.5 12.5 12.5 13.5 14.5 13.5C16.5 13.5 17.5 12.5 17.5 12.5V4.5C17.5 4.5 16.5 5.5 14.5 5.5C12.5 5.5 11.5 4.5 9.5 4.5C7.5 4.5 6.5 5.5 6.5 5.5V13.5Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.5 19.5V13.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div>
                        <div className="font-medium">UPI</div>
                        <div className="text-xs text-muted-foreground">Google Pay, PhonePe, Paytm</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleAddFunds} disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Add Funds"} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="mr-2 h-5 w-5" />
                  Transaction History
                </CardTitle>
                <CardDescription>View your recent wallet transactions</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length > 0 ? (
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-start space-x-4">
                          <div
                            className={`rounded-full p-2 ${transaction.type === "deposit" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                          >
                            {transaction.type === "deposit" ? (
                              <ArrowRight className="h-4 w-4 rotate-180" />
                            ) : (
                              <ArrowRight className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{transaction.description}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(transaction.date).toLocaleDateString()} at{" "}
                              {new Date(transaction.date).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`font-medium ${transaction.type === "deposit" ? "text-green-600" : "text-red-600"}`}
                        >
                          {transaction.type === "deposit" ? "+" : "-"}₹{(transaction.amount * 85).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <History className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No transactions yet</h3>
                    <p className="text-muted-foreground mt-2">Your transaction history will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
