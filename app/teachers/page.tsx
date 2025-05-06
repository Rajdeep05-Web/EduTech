import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Star, BookOpen, Users } from "lucide-react"

export default function TeachersPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Our Teachers</h1>
          <p className="text-muted-foreground">Learn from passionate university students who excel in their fields</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search teachers..." className="w-full pl-8" />
          </div>
          <Tabs defaultValue="all" className="w-full md:w-auto">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="computer-science">Computer Science</TabsTrigger>
              <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
              <TabsTrigger value="science">Science</TabsTrigger>
              <TabsTrigger value="humanities">Humanities</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Featured Teachers */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Featured Teachers</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: 1,
                name: "Rahul Sharma",
                university: "Stanford University",
                department: "Computer Science",
                rating: 4.9,
                students: 1245,
                courses: 5,
                image: "/images/m1.jpg",
                specialization: "Web Development",
                bio: "PhD candidate in Computer Science at Stanford with expertise in web development and machine learning.",
              },
              {
                id: 2,
                name: "Priya Patel",
                university: "MIT",
                department: "Electrical Engineering & Computer Science",
                rating: 4.8,
                students: 987,
                courses: 3,
                image: "/images/f1.jpg",
                specialization: "Machine Learning",
                bio: "Graduate student at MIT specializing in machine learning and artificial intelligence.",
              },
              {
                id: 3,
                name: "Arjun Mehta",
                university: "Harvard University",
                department: "Mathematics",
                rating: 4.7,
                students: 756,
                courses: 4,
                image: "/images/m2.jpg",
                specialization: "Data Science",
                bio: "Mathematics graduate student at Harvard with a focus on statistical methods and data analysis.",
              },
            ].map((teacher) => (
              <Link href={`/teachers/${teacher.id}`} key={teacher.id}>
                <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
                  <div className="relative aspect-square">
                    <Image src={teacher.image || "/placeholder.svg"} alt={teacher.name} fill className="object-cover" />
                    <Badge className="absolute top-2 left-2">{teacher.specialization}</Badge>
                  </div>
                  <CardContent className="p-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{teacher.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {teacher.department}, {teacher.university}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 font-medium">{teacher.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm mt-2 line-clamp-3">{teacher.bio}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{teacher.courses} courses</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{teacher.students} students</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* All Teachers */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">All Teachers</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                id: 4,
                name: "Neha Gupta",
                university: "UC Berkeley",
                department: "Computer Science",
                rating: 4.6,
                students: 543,
                courses: 2,
                image: "/images/f2.jpg",
                specialization: "Mobile Development",
              },
              {
                id: 5,
                name: "Vikram Singh",
                university: "Princeton University",
                department: "Physics",
                rating: 4.8,
                students: 678,
                courses: 3,
                image: "/images/m1.jpg",
                specialization: "Quantum Computing",
              },
              {
                id: 6,
                name: "Ananya Desai",
                university: "Columbia University",
                department: "Economics",
                rating: 4.7,
                students: 432,
                courses: 2,
                image: "/images/f4.jpg",
                specialization: "Financial Analysis",
              },
              {
                id: 7,
                name: "Rohan Kapoor",
                university: "Yale University",
                department: "Psychology",
                rating: 4.9,
                students: 789,
                courses: 4,
                image: "/images/m2.jpg",
                specialization: "Cognitive Psychology",
              },
              {
                id: 8,
                name: "Meera Joshi",
                university: "Stanford University",
                department: "Biology",
                rating: 4.8,
                students: 567,
                courses: 3,
                image: "/images/f1.jpg",
                specialization: "Molecular Biology",
              },
              {
                id: 9,
                name: "Aditya Kumar",
                university: "MIT",
                department: "Computer Science",
                rating: 4.7,
                students: 876,
                courses: 5,
                image: "/images/m1.jpg",
                specialization: "Cybersecurity",
              },
              {
                id: 10,
                name: "Kavita Sharma",
                university: "Harvard University",
                department: "Literature",
                rating: 4.9,
                students: 345,
                courses: 2,
                image: "/images/f3.jpg",
                specialization: "Creative Writing",
              },
              {
                id: 11,
                name: "Rajiv Malhotra",
                university: "Princeton University",
                department: "Mathematics",
                rating: 4.8,
                students: 654,
                courses: 3,
                image: "/images/m1.jpg",
                specialization: "Calculus",
              },
            ].map((teacher) => (
              <Link href={`/teachers/${teacher.id}`} key={teacher.id}>
                <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
                  <div className="relative aspect-square">
                    <Image src={teacher.image || "/placeholder.svg"} alt={teacher.name} fill className="object-cover" />
                    <Badge className="absolute top-2 left-2">{teacher.specialization}</Badge>
                  </div>
                  <CardContent className="p-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{teacher.name}</h3>
                        <p className="text-xs text-muted-foreground">{teacher.university}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm font-medium">{teacher.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex items-center justify-between text-xs">
                    <div className="flex items-center">
                      <BookOpen className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>{teacher.courses} courses</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>{teacher.students} students</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
        </div>

        {/* Become a Teacher */}
        <div className="bg-muted rounded-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-2/3 space-y-2">
              <h2 className="text-2xl font-bold">Become a Teacher</h2>
              <p className="text-muted-foreground">
                Are you a university student with expertise to share? Join our platform and start teaching today.
              </p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Share your knowledge with students worldwide</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Earn income while studying</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Build your teaching portfolio and resume</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/3 w-full">
              <Link href="/signup?role=teacher">
                <Button className="w-full">Apply to Teach</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
