"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Clock, Award } from 'lucide-react'

// Dummy courses data
const purchasedCourses = [
  {
    id: 1,
    title: "Advanced React Development",
    description: "Master React hooks, context API and advanced patterns",
    teacher: "Alex Johnson",
    university: "Stanford",
    image: "/images/web.jpg",
    category: "Web Development",
    progress: 45,
    lastAccessed: "2 days ago",
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    description: "Learn the core concepts of ML with practical examples",
    teacher: "Sarah Williams",
    university: "Harvard",
    image: "/images/ml.jpg",
    category: "Data Science",
    progress: 80,
    lastAccessed: "Yesterday",
  },
  {
    id: 3,
    title: "Full-Stack JavaScript",
    description: "Build complete web applications with Node.js and React",
    teacher: "Michael Chen",
    university: "Berkeley",
    image: "/images/js.jpg",
    category: "Web Development",
    progress: 20,
    lastAccessed: "Just now",
  },
]

// Dummy wishlist courses
const wishlistCourses = [
  {
    id: 4,
    title: "Python for Data Science",
    description: "Master Python for data analysis and visualization",
    teacher: "Emily Rodriguez",
    university: "MIT",
    price: 44.99,
    image: "/images/python.jpeg",
    category: "Data Science",
  },
  {
    id: 5,
    title: "Introduction to Artificial Intelligence",
    description: "Learn AI fundamentals and practical applications",
    teacher: "David Kim",
    university: "Stanford",
    price: 54.99,
    image: "/images/ai.jpg",
    category: "Artificial Intelligence",
  },
]

// Recommended courses
const recommendedCourses = [
  {
    id: 6,
    title: "Blockchain Development",
    description: "Build decentralized applications with Ethereum and Solidity",
    teacher: "Jessica Lee",
    university: "Princeton",
    price: 62.99,
    image: "/images/block.webp",
    category: "Blockchain",
  },
  {
    id: 7,
    title: "Mobile App Development with swift",
    description: "Create cross-platform mobile apps with Flutter and Dart",
    teacher: "Robert Chen",
    university: "Johns Hopkins",
    price: 49.99,
    image: "/images/ios.jpg",
    category: "Mobile Development",
  },
  {
    id: 8,
    title: "DevOps and Cloud Computing",
    description: "Master CI/CD, Docker, and AWS for modern deployment",
    teacher: "Sophia Martinez",
    university: "MIT",
    price: 64.99,
    image: "/images/aws.jpeg",
    category: "DevOps",
  },
]

export default function StudentDashboardPage() {
  const [balance, setBalance] = useState(250)
  const [activeTab, setActiveTab] = useState("my-courses")

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-0.5">
            <h1 className="text-3xl font-bold tracking-tight">My Learning Dashboard</h1>
            <p className="text-muted-foreground">Track your progress and continue learning</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Wallet Balance</span>
              <span className="font-bold">₹{(balance * 85).toFixed(2)}</span>
            </div>
            <Button variant="outline">Add Funds</Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="my-courses" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-none md:flex">
            <TabsTrigger value="my-courses">My Courses</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>
          <TabsContent value="my-courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Your Courses</h2>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search your courses..." className="w-full pl-8" />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {purchasedCourses.map((course) => (
                <Link href={`/courses/${course.id}`} key={course.id}>
                  <Card className="overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
                    <div className="relative aspect-video">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute bottom-2 left-2">{course.category}</Badge>
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col">
                      <h3 className="font-bold line-clamp-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{course.description}</p>
                      <div className="flex items-center mt-2 text-sm text-muted-foreground">
                        <span>{course.teacher}</span>
                        <span className="mx-1">•</span>
                        <span>{course.university}</span>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">Last accessed: {course.lastAccessed}</div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Continue Learning</Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="wishlist" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Your Wishlist</h2>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search your wishlist..." className="w-full pl-8" />
              </div>
            </div>
            {wishlistCourses.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {wishlistCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
                    <div className="relative aspect-video">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      <div className="price-tag">₹{course.price}</div>
                      <Badge className="absolute bottom-2 left-2">{course.category}</Badge>
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col">
                      <h3 className="font-bold line-clamp-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{course.description}</p>
                      <div className="flex items-center mt-2 text-sm text-muted-foreground">
                        <span>{course.teacher}</span>
                        <span className="mx-1">•</span>
                        <span>{course.university}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex gap-2">
                      <Button className="flex-1">Purchase</Button>
                      <Button variant="outline" className="flex-1">
                        Remove
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    Save courses you're interested in to your wishlist for easy access later
                  </p>
                  <Link href="/courses">
                    <Button>Browse Courses</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="recommended" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Recommended For You</h2>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search recommendations..." className="w-full pl-8" />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recommendedCourses.map((course) => (
                <Link href={`/courses/${course.id}`} key={course.id}>
                  <Card className="overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
                    <div className="relative aspect-video">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      <div className="price-tag">₹{course.price}</div>
                      <Badge className="absolute bottom-2 left-2">{course.category}</Badge>
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col">
                      <h3 className="font-bold line-clamp-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{course.description}</p>
                      <div className="flex items-center mt-2 text-sm text-muted-foreground">
                        <span>{course.teacher}</span>
                        <span className="mx-1">•</span>
                        <span>{course.university}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex gap-2">
                      <Button className="flex-1">Purchase</Button>
                      <Button variant="outline" className="flex-1">
                        Add to Wishlist
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Certificates Section */}
        {activeTab === "my-courses" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Your Certificates</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Award className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-bold mb-1">Introduction to Psychology</h3>
                  <p />
                  <h3 className="font-bold mb-1">Introduction to Psychology</h3>
                  <p className="text-sm text-muted-foreground mb-4">Completed on April 15, 2023</p>
                  <Button variant="outline" size="sm">
                    View Certificate
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Award className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-bold mb-1">Web Development Fundamentals</h3>
                  <p className="text-sm text-muted-foreground mb-4">Completed on January 10, 2023</p>
                  <Button variant="outline" size="sm">
                    View Certificate
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-dashed">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-bold mb-1">Complete More Courses</h3>
                  <p className="text-sm text-muted-foreground mb-4">Finish your courses to earn certificates</p>
                  <Button variant="outline" size="sm">
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
