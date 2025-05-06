"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { loginUser, initializeAuth } from "@/utils/auth"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    studentEmail: "",
    studentPassword: "",
    teacherEmail: "",
    teacherPassword: "",
  })

  useEffect(() => {
    // Initialize auth with default users if needed
    initializeAuth()

    // Check if user is already logged in
    const user = localStorage.getItem("edutech_user")
    if (user) {
      const userData = JSON.parse(user)
      if (userData.role === "teacher") {
        router.push("/dashboard/teacher")
      } else {
        router.push("/dashboard/student")
      }
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, role: "student" | "teacher") => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const email = role === "student" ? formData.studentEmail : formData.teacherEmail
      const password = role === "student" ? formData.studentPassword : formData.teacherPassword

      const user = loginUser(email, password)

      toast({
        title: "Login successful",
        description: `Welcome back, ${user.firstName}!`,
      })

      // Redirect based on role
      if (user.role === "teacher") {
        router.push("/dashboard/teacher")
      } else {
        router.push("/dashboard/student")
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to sign in to your account</p>
        </div>
        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="teacher">Teacher</TabsTrigger>
          </TabsList>
          <TabsContent value="student">
            <Card>
              <CardHeader>
                <CardTitle>Student Login</CardTitle>
                <CardDescription>Access your purchased courses and continue learning</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={(e) => handleSubmit(e, "student")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentEmail">Email</Label>
                    <Input
                      id="studentEmail"
                      placeholder="name@example.com"
                      required
                      type="email"
                      value={formData.studentEmail}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="studentPassword">Password</Label>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="studentPassword"
                      required
                      type="password"
                      value={formData.studentPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-center text-muted-foreground w-full">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
                    Sign up
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="teacher">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Login</CardTitle>
                <CardDescription>Access your teacher dashboard to manage your courses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={(e) => handleSubmit(e, "teacher")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacherEmail">Email</Label>
                    <Input
                      id="teacherEmail"
                      placeholder="name@example.com"
                      required
                      type="email"
                      value={formData.teacherEmail}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="teacherPassword">Password</Label>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="teacherPassword"
                      required
                      type="password"
                      value={formData.teacherPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-center text-muted-foreground w-full">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup?role=teacher" className="text-primary underline-offset-4 hover:underline">
                    Sign up as a teacher
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
