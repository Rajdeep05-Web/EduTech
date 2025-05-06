"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  MessageSquare,
  ThumbsUp,
  Share2,
  BookOpen,
  Clock,
  Award,
  Users,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { getCurrentUser, purchaseCourse, hasUserPurchasedCourse, hasActiveSubscription } from "@/utils/auth"
import { courses } from "@/data/courses"

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isPurchased, setIsPurchased] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [newComment, setNewComment] = useState("")
  const [courseData, setCourseData] = useState<any>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  useEffect(() => {
    // Get course data
    const courseId = Number.parseInt(params.id)
    const course = courses.find((c) => c.id === courseId)
    if (course) {
      setCourseData(course)

      // Extract YouTube video ID if available
      if (course.videoUrl && (course.videoUrl.includes("youtube.com") || course.videoUrl.includes("youtu.be"))) {
        let videoId = ""
        if (course.videoUrl.includes("v=")) {
          videoId = course.videoUrl.split("v=")[1].split("&")[0]
        } else if (course.videoUrl.includes("youtu.be/")) {
          videoId = course.videoUrl.split("youtu.be/")[1].split("?")[0]
        }

        if (videoId) {
          setVideoUrl(`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0`)
        }
      }
    } else {
      router.push("/courses")
    }

    // Check if user is logged in
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)

      // Check if user has purchased this course
      const hasPurchased = hasUserPurchasedCourse(currentUser.id, courseId)
      setIsPurchased(hasPurchased)

      // Check if user has an active subscription
      const hasSubscription = hasActiveSubscription(currentUser.id)
      setIsSubscribed(hasSubscription)
    }
  }, [params.id, router])

  const handlePurchase = () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to purchase this course",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (!courseData) return

    if (isSubscribed) {
      setIsPurchased(true)
      toast({
        title: "Course accessed",
        description: "You have access to this course through your subscription",
      })
      return
    }

    const success = purchaseCourse(user.id, courseData.id, courseData.price)

    if (success) {
      setIsPurchased(true)
      setUser({ ...user, balance: user.balance - courseData.price })

      // Add transaction record
      const newTransaction = {
        id: Date.now(),
        type: "payment",
        amount: courseData.price,
        date: new Date().toISOString(),
        description: `Purchase: ${courseData.title}`,
      }

      const storedTransactions = localStorage.getItem(`transactions_${user.id}`)
      const transactions = storedTransactions ? JSON.parse(storedTransactions) : []
      const updatedTransactions = [newTransaction, ...transactions]
      localStorage.setItem(`transactions_${user.id}`, JSON.stringify(updatedTransactions))

      toast({
        title: "Purchase successful",
        description: `You have successfully purchased ${courseData.title}`,
      })
    } else {
      toast({
        title: "Purchase failed",
        description: "Insufficient balance. Please add funds to your wallet.",
        variant: "destructive",
      })
      router.push("/dashboard/wallet")
    }
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      toast({
        title: "Comment added",
        description: "Your comment has been added successfully",
      })
      setNewComment("")
    }
  }

  if (!courseData) {
    return <div className="container py-8 text-center">Loading course...</div>
  }

  return (
    <div className="container py-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Course Header */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{courseData.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge>{courseData.category}</Badge>
              <div className="flex items-center text-sm">
                <span className="font-medium">{courseData.rating}</span>
                <span className="text-yellow-500 ml-1">★</span>
                <span className="text-muted-foreground ml-1">({courseData.students} students)</span>
              </div>
              <div className="text-sm text-muted-foreground">Last updated: {courseData.lastUpdated}</div>
            </div>
            <div className="flex items-center mt-2">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={courseData.teacher.image || "/placeholder.svg"} alt={courseData.teacher.name} />
                <AvatarFallback>{courseData.teacher.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">{courseData.teacher.name}</div>
                <div className="text-xs text-muted-foreground">{courseData.teacher.university}</div>
              </div>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative overflow-hidden rounded-lg aspect-video bg-black">
            {(isPurchased || isSubscribed) && videoUrl ? (
              <iframe src={videoUrl} className="w-full h-full" allowFullScreen title={courseData.title}></iframe>
            ) : isPurchased || isSubscribed ? (
              <>
                <video className="w-full h-full" src={courseData.videoUrl} muted={isMuted} playsInline>
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 flex items-center justify-center">
                  {!isPlaying && (
                    <Button
                      size="icon"
                      className="h-16 w-16 rounded-full bg-primary/80 hover:bg-primary"
                      onClick={() => setIsPlaying(true)}
                    >
                      <Play className="h-8 w-8" />
                    </Button>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsMuted(!isMuted)}
                      >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </Button>
                      <div className="text-sm">00:45 / 10:30</div>
                    </div>
                    <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                      <Maximize className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="mt-2 h-1 w-full bg-white/30 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[7%]" />
                  </div>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/80">
                <div className="mb-4">
                  <Lock className="h-12 w-12 mx-auto mb-2 text-primary" />
                  <h3 className="text-xl font-bold text-white">Preview Not Available</h3>
                  <p className="text-muted-foreground mt-2">
                    {isSubscribed
                      ? "You have access to this course with your subscription"
                      : "Purchase this course or subscribe to access all video content and materials"}
                  </p>
                </div>
                <Button onClick={handlePurchase}>
                  {isSubscribed ? "Access Course" : `Purchase for ₹${(courseData.price * 75).toFixed(2)}`}
                </Button>
                {!isSubscribed && (
                  <Button variant="outline" className="mt-2" onClick={() => router.push("/subscription")}>
                    Subscribe for Unlimited Access
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Course Content Tabs */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full justify-start mb-6 bg-transparent p-0 h-auto">
              <TabsTrigger
                value="about"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                About
              </TabsTrigger>
              <TabsTrigger
                value="curriculum"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Curriculum
              </TabsTrigger>
              <TabsTrigger
                value="instructor"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Instructor
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="m-0">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">About This Course</h2>
                <p>{courseData.description}</p>
                <div dangerouslySetInnerHTML={{ __html: courseData.longDescription || "" }} className="space-y-4" />
              </div>
            </TabsContent>
            <TabsContent value="curriculum" className="m-0">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Course Curriculum</h2>
                <p className="text-muted-foreground">
                  {courseData.chapters?.length || 0} chapters • {courseData.duration} total length
                </p>
                <div className="space-y-2">
                  {courseData.chapters?.map((chapter: any, index: number) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${isPurchased || isSubscribed ? "cursor-pointer hover:bg-muted/50" : ""}`}
                      onClick={() => (isPurchased || isSubscribed) && alert(`Playing chapter: ${chapter.title}`)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {isPurchased || isSubscribed ? (
                            <Play className="h-5 w-5 text-primary" />
                          ) : (
                            <Lock className="h-5 w-5 text-muted-foreground" />
                          )}
                          <div>
                            <div className="font-medium">{chapter.title}</div>
                            <div className="text-sm text-muted-foreground">{chapter.duration}</div>
                          </div>
                        </div>
                        {chapter.completed && (
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="instructor" className="m-0">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Meet Your Instructor</h2>
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={courseData.teacher.image || "/placeholder.svg"} alt={courseData.teacher.name} />
                    <AvatarFallback>{courseData.teacher.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">{courseData.teacher.name}</h3>
                    <p className="text-muted-foreground">
                      {courseData.teacher.department} at {courseData.teacher.university}
                    </p>
                    <p>{courseData.teacher.bio}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/teachers/${courseData.teacher.id || 1}`)}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="m-0">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-1/3 space-y-4">
                    <h2 className="text-xl font-bold">Student Reviews</h2>
                    <div className="flex items-center gap-2">
                      <div className="text-4xl font-bold">{courseData.rating}</div>
                      <div className="flex flex-col">
                        <div className="flex text-yellow-500">
                          {"★".repeat(Math.floor(courseData.rating))}
                          {courseData.rating % 1 !== 0 && "½"}
                          {"☆".repeat(5 - Math.ceil(courseData.rating))}
                        </div>
                        <div className="text-sm text-muted-foreground">Course Rating</div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    {(isPurchased || isSubscribed) && (
                      <div className="space-y-2">
                        <h3 className="font-medium">Add a Review</h3>
                        <Textarea
                          placeholder="Share your experience with this course..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button onClick={handleAddComment}>Submit Review</Button>
                      </div>
                    )}
                    <Separator className="my-4" />
                    <div className="space-y-4">
                      {courseData.comments?.map((comment: any) => (
                        <div key={comment.id} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={comment.user.image || "/placeholder.svg"} alt={comment.user.name} />
                              <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{comment.user.name}</div>
                              <div className="text-xs text-muted-foreground">{comment.date}</div>
                            </div>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              <span>{comment.likes}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              <span>Reply</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Card */}
          <Card className="sticky top-20">
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={courseData.image || "/placeholder.svg"}
                  alt={courseData.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  {isSubscribed ? (
                    <div className="text-3xl font-bold text-green-600">Free</div>
                  ) : (
                    <>
                      <div className="text-3xl font-bold">₹{(courseData.price * 75).toFixed(2)}</div>
                      {courseData.originalPrice && (
                        <div className="text-muted-foreground line-through">
                          ₹{(courseData.originalPrice * 75).toFixed(2)}
                        </div>
                      )}
                    </>
                  )}
                </div>
                {!isPurchased && !isSubscribed ? (
                  <div className="space-y-2">
                    <Button className="w-full" onClick={handlePurchase}>
                      Buy Now
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => router.push("/subscription")}>
                      Subscribe for Unlimited Access
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">30-Day Money-Back Guarantee</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button className="w-full" onClick={() => router.push("/dashboard/student")}>
                      Go to My Courses
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      {isSubscribed ? "Included in your subscription" : "You already own this course"}
                    </p>
                  </div>
                )}
                <div className="space-y-4">
                  <div className="text-sm">
                    <div className="font-medium">This course includes:</div>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                        {courseData.chapters?.length || 0} chapters
                      </li>
                      <li className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        {courseData.duration} of video content
                      </li>
                      <li className="flex items-center">
                        <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                        Certificate of completion
                      </li>
                      <li className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        Access to student community
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="px-0">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm" className="px-0">
                      Gift this course
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Lock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
