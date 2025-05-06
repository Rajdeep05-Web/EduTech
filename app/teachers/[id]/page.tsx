"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, BookOpen, Users, GraduationCap, Mail, MapPin, ExternalLink, ChevronLeft } from "lucide-react"
import { courses } from "@/data/courses"

// Sample teachers data
const teachers = [
  {
    id: "1",
    name: "Rahul Sharma",
    university: "Stanford University",
    department: "Computer Science",
    rating: 4.9,
    students: 1245,
    courses: [1, 5],
    image: "/images/m1.jpg",
    specialization: "Web Development",
    bio: "PhD candidate in Computer Science at Stanford with expertise in web development and machine learning. I've been teaching programming for over 5 years and have worked on several industry projects with companies like Google and Microsoft.",
    location: "Palo Alto, CA",
    email: "rahul.sharma@stanford.edu",
    website: "https://rahulsharma.dev",
    socialLinks: {
      twitter: "https://twitter.com/rahulsharma",
      linkedin: "https://linkedin.com/in/rahulsharma",
      github: "https://github.com/rahulsharma",
    },
    education: [
      {
        degree: "PhD in Computer Science",
        institution: "Stanford University",
        year: "2020-Present",
      },
      {
        degree: "MS in Computer Science",
        institution: "MIT",
        year: "2018-2020",
      },
      {
        degree: "BTech in Computer Science",
        institution: "IIT Delhi",
        year: "2014-2018",
      },
    ],
    experience: [
      {
        position: "Research Assistant",
        company: "Stanford AI Lab",
        year: "2020-Present",
      },
      {
        position: "Software Engineering Intern",
        company: "Google",
        year: "Summer 2019",
      },
      {
        position: "Teaching Assistant",
        company: "MIT",
        year: "2018-2020",
      },
    ],
  },
  {
    id: "2",
    name: "Priya Patel",
    university: "MIT",
    department: "Electrical Engineering & Computer Science",
    rating: 4.8,
    students: 987,
    courses: [2, 8],
    image: "/images/f1.jpg",
    specialization: "Machine Learning",
    bio: "Graduate student at MIT specializing in machine learning and artificial intelligence. I'm passionate about making complex AI concepts accessible to everyone.",
    location: "Cambridge, MA",
    email: "priya.patel@mit.edu",
    website: "https://priyapatel.ai",
    socialLinks: {
      twitter: "https://twitter.com/priyapatel",
      linkedin: "https://linkedin.com/in/priyapatel",
      github: "https://github.com/priyapatel",
    },
  },
  {
    id: "3",
    name: "Amit Verma",
    university: "Harvard University",
    department: "Data Science",
    rating: 4.7,
    students: 654,
    courses: [3, 6],
    image: "/images/m2.jpg",
    specialization: "Data Science",
    bio: "PhD candidate in Data Science at Harvard with a focus on big data analytics and machine learning. I have a strong background in statistics and programming.",
    location: "Cambridge, MA",
    email: "amit@gmail.com",
    website: "https://amitverma.com",
    socialLinks: {
      twitter: "https://twitter.com/amitverma",
      linkedin: "https://linkedin.com/in/amitverma",
      github:  "https://github.com/amitverma",
    },
  }
  // More teachers would be defined here
]

export default function TeacherProfilePage({ params }: { params: { id: string } }) {
  const [teacher, setTeacher] = useState<any>(null)
  const [teacherCourses, setTeacherCourses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching the teacher data
    const fetchTeacher = () => {
      setIsLoading(true)
      // Find the teacher with the matching ID
      const foundTeacher = teachers.find((t) => t.id === params.id)

      if (foundTeacher) {
        setTeacher(foundTeacher)

        // Get teacher's courses
        if (foundTeacher.courses && foundTeacher.courses.length > 0) {
          const teacherCoursesList = courses.filter((course) => foundTeacher.courses.includes(course.id))
          setTeacherCourses(teacherCoursesList)
        }
      }

      setIsLoading(false)
    }

    fetchTeacher()
  }, [params.id])

  if (isLoading) {
    return <div className="container py-12 text-center">Loading teacher profile...</div>
  }

  if (!teacher) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Teacher not found</h1>
        <p className="text-muted-foreground mb-6">
          The teacher profile you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/teachers">Back to Teachers</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col space-y-8">
        {/* Back button */}
        <Link
          href="/teachers"
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>Back to all teachers</span>
        </Link>

        {/* Teacher header */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image src={teacher.image || "/placeholder.svg"} alt={teacher.name} fill className="object-cover" />
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h1 className="text-3xl font-bold">{teacher.name}</h1>
              <Badge variant="outline" className="px-3 py-1">
                {teacher.specialization}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <GraduationCap className="h-4 w-4 mr-1" />
              <span>
                {teacher.department}, {teacher.university}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{teacher.rating}</span>
                <span className="text-muted-foreground ml-1">Rating</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="font-medium">{teacher.students}</span>
                <span className="text-muted-foreground ml-1">Students</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="font-medium">{teacher.courses?.length || 0}</span>
                <span className="text-muted-foreground ml-1">Courses</span>
              </div>
            </div>
            <p className="text-muted-foreground">{teacher.bio}</p>
            <div className="flex flex-wrap gap-2">
              {teacher.location && (
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{teacher.location}</span>
                </div>
              )}
              {teacher.email && (
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{teacher.email}</span>
                </div>
              )}
              {teacher.website && (
                <div className="flex items-center text-sm">
                  <ExternalLink className="h-4 w-4 mr-1 text-muted-foreground" />
                  <a href={teacher.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {teacher.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button>Contact Teacher</Button>
              <Button variant="outline">Follow</Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Teacher content */}
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="w-full justify-start mb-6 bg-transparent p-0 h-auto">
            <TabsTrigger
              value="courses"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Courses
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              About
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <h2 className="text-2xl font-bold">Courses by {teacher.name}</h2>
            {teacherCourses.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {teacherCourses.map((course) => (
                  <Link href={`/courses/${course.id}`} key={course.id}>
                    <Card className="overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
                      <div className="relative aspect-video">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                        <div className="price-tag">₹{(course.price * 75).toFixed(2)}</div>
                        <Badge className="absolute bottom-2 left-2">{course.category}</Badge>
                      </div>
                      <CardContent className="p-4 flex-1 flex flex-col">
                        <h3 className="font-bold line-clamp-1">{course.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{course.description}</p>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center">
                            <span className="font-medium mr-1">{course.rating}</span>
                            <span className="text-yellow-500">★</span>
                          </div>
                          <span className="mx-1 text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{course.students} students</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button className="w-full">View Course</Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted rounded-lg">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No courses available</h3>
                <p className="text-muted-foreground mt-2">This teacher hasn't published any courses yet.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <div className="grid gap-8 md:grid-cols-2">
              {teacher.education && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">Education</h2>
                  <div className="space-y-4">
                    {teacher.education.map((edu: any, index: number) => (
                      <div key={index} className="space-y-1">
                        <h3 className="font-medium">{edu.degree}</h3>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                        <p className="text-xs text-muted-foreground">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {teacher.experience && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">Experience</h2>
                  <div className="space-y-4">
                    {teacher.experience.map((exp: any, index: number) => (
                      <div key={index} className="space-y-1">
                        <h3 className="font-medium">{exp.position}</h3>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                        <p className="text-xs text-muted-foreground">{exp.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold">About Me</h2>
              <p className="text-muted-foreground">{teacher.bio}</p>
            </div>

            {teacher.socialLinks && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Connect with {teacher.name.split(" ")[0]}</h2>
                <div className="flex gap-2">
                  {Object.entries(teacher.socialLinks).map(([platform, url]: [string, any]) => (
                    <Button key={platform} variant="outline" size="sm" asChild>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <h2 className="text-2xl font-bold">Student Reviews</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-muted p-6 rounded-lg">
                <div className="flex items-center justify-center flex-col text-center">
                  <div className="text-5xl font-bold mb-2">{teacher.rating}</div>
                  <div className="flex text-yellow-500 mb-2">
                    {"★".repeat(Math.floor(teacher.rating))}
                    {teacher.rating % 1 !== 0 && "½"}
                    {"☆".repeat(5 - Math.ceil(teacher.rating))}
                  </div>
                  <p className="text-muted-foreground">{teacher.students} students</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-16">5 stars</span>
                    <div className="w-full bg-muted h-2 rounded-full mx-2">
                      <div className="bg-yellow-500 h-2 rounded-full w-[85%]"></div>
                    </div>
                    <span className="w-8 text-right">85%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-16">4 stars</span>
                    <div className="w-full bg-muted h-2 rounded-full mx-2">
                      <div className="bg-yellow-500 h-2 rounded-full w-[10%]"></div>
                    </div>
                    <span className="w-8 text-right">10%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-16">3 stars</span>
                    <div className="w-full bg-muted h-2 rounded-full mx-2">
                      <div className="bg-yellow-500 h-2 rounded-full w-[3%]"></div>
                    </div>
                    <span className="w-8 text-right">3%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-16">2 stars</span>
                    <div className="w-full bg-muted h-2 rounded-full mx-2">
                      <div className="bg-yellow-500 h-2 rounded-full w-[1%]"></div>
                    </div>
                    <span className="w-8 text-right">1%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-16">1 star</span>
                    <div className="w-full bg-muted h-2 rounded-full mx-2">
                      <div className="bg-yellow-500 h-2 rounded-full w-[1%]"></div>
                    </div>
                    <span className="w-8 text-right">1%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium">Recent Reviews</h3>
              {/* Sample reviews */}
              <div className="space-y-6">
                {[
                  {
                    name: "Amit Kumar",
                    rating: 5,
                    date: "2 months ago",
                    comment:
                      "Excellent teacher! Explains complex concepts in a very simple way. The course material was comprehensive and well-structured.",
                    course: "Full Stack Web Development Bootcamp",
                  },
                  {
                    name: "Sneha Reddy",
                    rating: 5,
                    date: "3 months ago",
                    comment:
                      "One of the best instructors I've had. Very responsive to questions and provides great additional resources.",
                    course: "Advanced React Development",
                  },
                  {
                    name: "Rajesh Verma",
                    rating: 4,
                    date: "4 months ago",
                    comment:
                      "Great course content and teaching style. Would have given 5 stars if there were more practical exercises.",
                    course: "Machine Learning Fundamentals",
                  },
                ].map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{review.name}</div>
                          <div className="text-xs text-muted-foreground">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex text-yellow-500">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="text-xs text-muted-foreground mb-1">Course: {review.course}</div>
                      <p className="text-sm">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">
                Load More Reviews
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
