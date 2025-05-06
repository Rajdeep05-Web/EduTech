"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { registerUser, initializeAuth } from "@/utils/auth"

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get("role") || "student"
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    studentFirstName: "",
    studentLastName: "",
    studentEmail: "",
    studentPassword: "",
    studentConfirmPassword: "",
    teacherFirstName: "",
    teacherLastName: "",
    teacherEmail: "",
    teacherUniversity: "",
    teacherFieldOfStudy: "",
    teacherPassword: "",
    teacherConfirmPassword: "",
  })
  const [termsAccepted, setTermsAccepted] = useState({
    student: false,
    teacher: false,
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
      // Validate passwords match
      if (role === "student") {
        if (formData.studentPassword !== formData.studentConfirmPassword) {
          throw new Error("Passwords do not match")
        }
      } else {
        if (formData.teacherPassword !== formData.teacherConfirmPassword) {
          throw new Error("Passwords do not match")
        }
      }

      // Validate terms accepted
      if (!termsAccepted[role]) {
        throw new Error("You must accept the terms and conditions")
      }

      // Register user
      if (role === "student") {
        registerUser({
          firstName: formData.studentFirstName,
          lastName: formData.studentLastName,
          email: formData.studentEmail,
          role: "student",
        })
      } else {
        registerUser({
          firstName: formData.teacherFirstName,
          lastName: formData.teacherLastName,
          email: formData.teacherEmail,
          role: "teacher",
          university: formData.teacherUniversity,
          fieldOfStudy: formData.teacherFieldOfStudy,
        })
      }

      toast({
        title: "Account created",
        description: "Your account has been created successfully!",
      })

      // Redirect based on role
      if (role === "teacher") {
        router.push("/dashboard/teacher")
      } else {
        router.push("/dashboard/student")
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-8 md:py-0 flex min-h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Enter your details to create your account</p>
        </div>
        <Tabs defaultValue={defaultRole} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="teacher">Teacher</TabsTrigger>
          </TabsList>
          <TabsContent value="student">
            <Card className="form-card">
              <CardHeader>
                <CardTitle>Student Registration</CardTitle>
                <CardDescription>Create an account to start learning from university students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={(e) => handleSubmit(e, "student")} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentFirstName">First name</Label>
                      <Input id="studentFirstName" required value={formData.studentFirstName} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="studentLastName">Last name</Label>
                      <Input id="studentLastName" required value={formData.studentLastName} onChange={handleChange} />
                    </div>
                  </div>
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
                    <Label htmlFor="studentPassword">Password</Label>
                    <Input
                      id="studentPassword"
                      required
                      type="password"
                      value={formData.studentPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentConfirmPassword">Confirm password</Label>
                    <Input
                      id="studentConfirmPassword"
                      required
                      type="password"
                      value={formData.studentConfirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="studentTerms"
                      checked={termsAccepted.student}
                      onCheckedChange={(checked) =>
                        setTermsAccepted((prev) => ({ ...prev, student: checked === true }))
                      }
                    />
                    <label
                      htmlFor="studentTerms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                        terms of service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                        privacy policy
                      </Link>
                    </label>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-center text-muted-foreground w-full">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="teacher">
            <Card className="form-card">
              <CardHeader>
                <CardTitle>Teacher Registration</CardTitle>
                <CardDescription>Create an account to start sharing your knowledge</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={(e) => handleSubmit(e, "teacher")} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="teacherFirstName">First name</Label>
                      <Input id="teacherFirstName" required value={formData.teacherFirstName} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="teacherLastName">Last name</Label>
                      <Input id="teacherLastName" required value={formData.teacherLastName} onChange={handleChange} />
                    </div>
                  </div>
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
                    <Label htmlFor="teacherUniversity">University</Label>
                    <Input
                      id="teacherUniversity"
                      placeholder="e.g. Stanford University"
                      required
                      value={formData.teacherUniversity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacherFieldOfStudy">Field of study</Label>
                    <Input
                      id="teacherFieldOfStudy"
                      placeholder="e.g. Computer Science"
                      required
                      value={formData.teacherFieldOfStudy}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacherPassword">Password</Label>
                    <Input
                      id="teacherPassword"
                      required
                      type="password"
                      value={formData.teacherPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacherConfirmPassword">Confirm password</Label>
                    <Input
                      id="teacherConfirmPassword"
                      required
                      type="password"
                      value={formData.teacherConfirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="teacherTerms"
                      checked={termsAccepted.teacher}
                      onCheckedChange={(checked) =>
                        setTermsAccepted((prev) => ({ ...prev, teacher: checked === true }))
                      }
                    />
                    <label
                      htmlFor="teacherTerms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                        terms of service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                        privacy policy
                      </Link>
                    </label>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-center text-muted-foreground w-full">
                  Already have an account?{" "}
                  <Link href="/login?role=teacher" className="text-primary underline-offset-4 hover:underline">
                    Sign in
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
