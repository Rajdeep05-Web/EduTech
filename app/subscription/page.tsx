"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Award, Zap, Clock, Users } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { getCurrentUser, updateUserBalance } from "@/utils/auth"

export default function SubscriptionPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscriptionType, setSubscriptionType] = useState("")
  const [subscriptionEndDate, setSubscriptionEndDate] = useState<Date | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)

      // Check if user has an active subscription
      const subscription = localStorage.getItem(`subscription_${currentUser.id}`)
      if (subscription) {
        const parsedSubscription = JSON.parse(subscription)
        const endDate = new Date(parsedSubscription.endDate)

        if (endDate > new Date()) {
          setIsSubscribed(true)
          setSubscriptionType(parsedSubscription.type)
          setSubscriptionEndDate(endDate)
        } else {
          // Subscription expired
          localStorage.removeItem(`subscription_${currentUser.id}`)
        }
      }
    }
  }, [])

  const handleSubscribe = (plan: string, price: number) => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to purchase a subscription",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (user.balance < price) {
      toast({
        title: "Insufficient balance",
        description: "Please add funds to your wallet to purchase this subscription",
        variant: "destructive",
      })
      router.push("/dashboard/wallet")
      return
    }

    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      // Calculate subscription end date (1 month from now)
      const endDate = new Date()
      endDate.setMonth(endDate.getMonth() + 1)

      // Update user balance
      const newBalance = user.balance - price
      updateUserBalance(user.id, newBalance)

      // Save subscription to localStorage
      const subscription = {
        type: plan,
        startDate: new Date().toISOString(),
        endDate: endDate.toISOString(),
        price: price,
      }
      localStorage.setItem(`subscription_${user.id}`, JSON.stringify(subscription))

      // Add transaction record
      const newTransaction = {
        id: Date.now(),
        type: "payment",
        amount: price,
        date: new Date().toISOString(),
        description: `${plan} subscription purchase`,
      }

      const storedTransactions = localStorage.getItem(`transactions_${user.id}`)
      const transactions = storedTransactions ? JSON.parse(storedTransactions) : []
      const updatedTransactions = [newTransaction, ...transactions]
      localStorage.setItem(`transactions_${user.id}`, JSON.stringify(updatedTransactions))

      // Update state
      setIsSubscribed(true)
      setSubscriptionType(plan)
      setSubscriptionEndDate(endDate)
      setUser({ ...user, balance: newBalance })
      setIsProcessing(false)

      toast({
        title: "Subscription purchased",
        description: `You have successfully subscribed to the ${plan} plan`,
      })
    }, 1500)
  }

  const cancelSubscription = () => {
    if (!user) return

    // Remove subscription from localStorage
    localStorage.removeItem(`subscription_${user.id}`)

    // Update state
    setIsSubscribed(false)
    setSubscriptionType("")
    setSubscriptionEndDate(null)

    toast({
      title: "Subscription cancelled",
      description: "Your subscription has been cancelled",
    })
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Subscription Plans</h1>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            Subscribe to get unlimited access to all courses on our platform. Learn at your own pace with no limits.
          </p>
        </div>

        {isSubscribed ? (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Award className="mr-2 h-5 w-5 text-primary" />
                Active Subscription
              </CardTitle>
              <CardDescription className="text-center">
                You are currently subscribed to our {subscriptionType} plan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center space-y-2">
                <Badge variant="outline" className="px-3 py-1">
                  {subscriptionType} Plan
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Valid until: {subscriptionEndDate?.toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Unlimited access to all courses</span>
                </div>
                <div className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Certificate of completion for all courses</span>
                </div>
                <div className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Priority support from instructors</span>
                </div>
                {subscriptionType === "Premium" && (
                  <>
                    <div className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>1-on-1 mentoring sessions</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>Exclusive workshops and webinars</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={cancelSubscription}>
                Cancel Subscription
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>For casual learners</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-4xl font-bold mb-4">
                  ₹1,499<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Access to all basic courses</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Basic exercises and quizzes</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Community support</span>
                  </li>
                  <li className="flex items-center">
                    <X className="mr-2 h-4 w-4 text-red-500" />
                    <span className="text-muted-foreground">Advanced courses</span>
                  </li>
                  <li className="flex items-center">
                    <X className="mr-2 h-4 w-4 text-red-500" />
                    <span className="text-muted-foreground">1-on-1 mentoring</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleSubscribe("Basic", 1499 / 85)} disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Subscribe Now"}
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col border-primary">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Standard</CardTitle>
                  <Badge>Popular</Badge>
                </div>
                <CardDescription>For dedicated students</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-4xl font-bold mb-4">
                  ₹2,999<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Access to all courses</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Advanced exercises and projects</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Teacher Q&A access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Downloadable resources</span>
                  </li>
                  <li className="flex items-center">
                    <X className="mr-2 h-4 w-4 text-red-500" />
                    <span className="text-muted-foreground">1-on-1 mentoring</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleSubscribe("Standard", 2999 / 85)} disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Subscribe Now"}
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <CardDescription>For serious learners</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-4xl font-bold mb-4">
                  ₹5,999<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Access to all courses</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Advanced exercises and projects</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Priority teacher Q&A</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>1-on-1 mentoring sessions</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Exclusive workshops and webinars</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleSubscribe("Premium", 5999 / 85)} disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Subscribe Now"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        <div className="max-w-3xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">Why Subscribe?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Unlimited Learning</h3>
              <p className="text-sm text-muted-foreground">
                Access all courses without any restrictions. Learn as much as you want.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Learn at Your Pace</h3>
              <p className="text-sm text-muted-foreground">
                Take your time to master each course with unlimited access.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Expert Support</h3>
              <p className="text-sm text-muted-foreground">
                Get help from university students who excel in their fields.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-2">
            All subscriptions automatically renew monthly. Cancel anytime.
          </p>
          <p className="text-sm text-muted-foreground">
            Have questions?{" "}
            <a href="/contact" className="text-primary underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
