"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MoreHorizontal, Plus, Upload, Edit, Trash2, DollarSign, Users, BookOpen, BarChart2 } from 'lucide-react'

// Dummy courses data
const courses = [
  {
    id: 1,
    title: "Advanced React Development",
    description: "Master React hooks, context API and advanced patterns",
    price: 49.99,
    image: "/images/web.jpg",
    category: "Web Development",
    students: 1245,
    revenue: 62225.55,
    status: "published",
    lastUpdated: "2 weeks ago",
  },
  {
    id: 2,
    title: "Node.js Backend Development",
    description: "Build scalable APIs and microservices with Node.js and Express",
    price: 44.99,
    image: "/images/js.jpg",
    category: "Web Development",
    students: 876,
    revenue: 39395.24,
    status: "published",
    lastUpdated: "1 month ago",
  },
  {
    id: 3,
    title: "GraphQL Masterclass",
    description: "Learn to build efficient APIs with GraphQL",
    price: 39.99,
    image: "/images/block.webp",
    category: "Web Development",
    students: 0,
    revenue: 0,
    status: "draft",
    lastUpdated: "3 days ago",
  },
]

export default function TeacherDashboardPage() {
  const [activeTab, setActiveTab] = useState("courses")
  const [isUploading, setIsUploading] = useState(false)

  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0)
  const totalRevenue = courses.reduce((sum, course) => sum + course.revenue, 0)
  const publishedCourses = courses.filter((course) => course.status === "published").length

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Manage your courses, track performance, and engage with students</p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">+180 new students this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publishedCourses}</div>
              <p className="text-xs text-muted-foreground">
                {courses.length - publishedCourses} draft{courses.length - publishedCourses !== 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">+0.2 from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="courses" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-none md:flex">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="upload">Upload Course</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="courses" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Your Courses</h2>
              <Link href="/dashboard/teacher/upload">
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> New Course
                </Button>
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-black/50 text-white hover:bg-black/70"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <Badge
                      className={`absolute bottom-2 left-2 ${
                        course.status === "published" ? "bg-green-600" : "bg-amber-600"
                      }`}
                    >
                      {course.status === "published" ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold line-clamp-1">{course.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{course.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="font-medium">${course.price}</div>
                      <div className="text-sm text-muted-foreground">{course.students} students</div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <div className="text-xs text-muted-foreground">Updated {course.lastUpdated}</div>
                    <div className="text-xs font-medium">${course.revenue.toFixed(2)} earned</div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Course</CardTitle>
                <CardDescription>Create a new course to share your knowledge with students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input id="title" placeholder="e.g. Advanced Calculus" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Course Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of your course"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="">Select a category</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="computer-science">Computer Science</option>
                      <option value="physics">Physics</option>
                      <option value="chemistry">Chemistry</option>
                      <option value="biology">Biology</option>
                      <option value="economics">Economics</option>
                      <option value="psychology">Psychology</option>
                      <option value="literature">Literature</option>
                      <option value="web-development">Web Development</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input id="price" type="number" min="0" step="0.01" placeholder="e.g. 49.99" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Course Banner</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Drag and drop your banner image here</p>
                    <p className="text-xs text-muted-foreground mb-4">PNG, JPG or GIF, max 2MB</p>
                    <Button variant="outline" size="sm">
                      Browse Files
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Course Video</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Upload your private YouTube video link</p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Ensure your video is set to unlisted or private
                    </p>
                    <Input placeholder="https://youtube.com/watch?v=..." className="max-w-md mb-4" />
                    <Button variant="outline" size="sm">
                      Validate Link
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Save as Draft</Button>
                <Button disabled={isUploading}>{isUploading ? "Uploading..." : "Publish Course"}</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Performance</CardTitle>
                <CardDescription>View detailed analytics for your courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-lg">
                  <p className="text-muted-foreground">Analytics chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses
                      .filter((course) => course.status === "published")
                      .sort((a, b) => b.revenue - a.revenue)
                      .slice(0, 3)
                      .map((course, index) => (
                        <div key={course.id} className="flex items-center gap-4">
                          <div className="font-medium text-muted-foreground">{index + 1}</div>
                          <div className="relative h-10 w-10 overflow-hidden rounded">
                            <Image
                              src={course.image || "/placeholder.svg"}
                              alt={course.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium line-clamp-1">{course.title}</div>
                            <div className="text-sm text-muted-foreground">{course.students} students</div>
                          </div>
                          <div className="font-medium">${course.revenue.toFixed(2)}</div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        type: "purchase",
                        user: "Michael Smith",
                        course: "Advanced React Development",
                        time: "2 hours ago",
                      },
                      {
                        type: "review",
                        user: "Jessica Brown",
                        course: "Advanced React Development",
                        time: "5 hours ago",
                        rating: 5,
                      },
                      {
                        type: "comment",
                        user: "David Wilson",
                        course: "Node.js Backend Development",
                        time: "1 day ago",
                      },
                      {
                        type: "purchase",
                        user: "Sarah Johnson",
                        course: "Node.js Backend Development",
                        time: "2 days ago",
                      },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="text-sm">
                            <span className="font-medium">{activity.user}</span>{" "}
                            {activity.type === "purchase" && "purchased"}
                            {activity.type === "review" && `rated ${activity.rating}★ on`}
                            {activity.type === "comment" && "commented on"}{" "}
                            <span className="font-medium">{activity.course}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
