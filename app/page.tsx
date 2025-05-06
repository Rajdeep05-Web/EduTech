import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Users, DollarSign, Award } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 hero-gradient">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Learn Directly from University Students
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Access exclusive courses created by top university students. Quality education at affordable prices.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/courses">
                <Button className="px-8">Browse Courses</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" className="px-8">
                  Become a Teacher
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Our platform connects university students with learners seeking quality education
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <Card className="bg-background/60 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Quality Courses</h3>
                  <p className="text-muted-foreground">
                    Access courses created by university students with deep subject knowledge
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-background/60 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Affordable Pricing</h3>
                  <p className="text-muted-foreground">
                    Get quality education at student-friendly prices with transparent pricing
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-background/60 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Community Learning</h3>
                  <p className="text-muted-foreground">
                    Engage with teachers and fellow students through comments and discussions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Courses</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Explore our most popular courses from top university students
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 course-grid">
            {[
              {
                id: 1,
                title: "Advanced React Development",
                teacher: "Alex Johnson",
                university: "Stanford",
                price: 49.99,
                image: "/images/react.jpg",
                category: "Web Development",
              },
              {
                id: 2,
                title: "Machine Learning Fundamentals",
                description: "Learn the core concepts of ML with practical examples",
                teacher: "Sarah Williams",
                university: "Harvard",
                price: 59.99,
                image: "/images/ml.jpg",
                category: "Data Science",
              },
              {
                id: 3,
                title: "Full-Stack JavaScript",
                teacher: "Michael Chen",
                university: "Berkeley",
                price: 54.99,
                image: "/images/js.jpg",
                category: "Web Development",
              },
              {
                id: 4,
                title: "Python for Data Science",
                teacher: "Emily Rodriguez",
                university: "MIT",
                price: 44.99,
                image: "/images/python.jpeg",
                category: "Data Science",
              },
              {
                id: 5,
                title: "Introduction to MongoDB",
                teacher: "Sophia Brown",
                university: "Yale",
                price: 39.99,
                image: "/images/mongo.jpeg",
                category: "Design",
              },
              {
                id: 6,
                title: "Full Stack Web Development",
                teacher: "David Smith",
                university: "Columbia",
                price: 49.99,
                image: "/images/web.jpg",
                category: "Marketing",
              },
            ].map((course) => (
              <Link href={`/courses/${course.id}`} key={course.id}>
                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative aspect-video">
                    <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                    <div className="price-tag">₹{course.price}</div>
                    <Badge className="absolute bottom-2 left-2">{course.category}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold line-clamp-1">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {course.teacher} • {course.university}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/courses">
              <Button variant="outline" className="gap-1">
                View All Courses <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Transparent Pricing</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Choose from a variety of courses at different price points
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
            <Card className="flex flex-col">
              <CardContent className="pt-6 flex-1 flex flex-col">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <Badge>Basic</Badge>
                  <h3 className="text-4xl font-bold">₹19.99</h3>
                  <p className="text-muted-foreground">Introductory courses for beginners</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Award className="mr-2 h-4 w-4 text-primary" />
                      <span>Full course access</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="mr-2 h-4 w-4 text-primary" />
                      <span>Basic exercises</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="mr-2 h-4 w-4 text-primary" />
                      <span>Community support</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto pt-6">
                  <Link href="/courses?price=basic" className="w-full">
                    <Button className="w-full">Browse Basic Courses</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card className="flex flex-col border-primary">
              <CardContent className="pt-6 flex-1 flex flex-col">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <Badge variant="secondary">Standard</Badge>
                  <h3 className="text-4xl font-bold">₹49.99</h3>
                  <p className="text-muted-foreground">Comprehensive courses for intermediate learners</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Award className="mr-2 h-4 w-4 text-primary" />
                      <span>Full course access</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="mr-2 h-4 w-4 text-primary" />
                      <span>Advanced exercises</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="mr-2 h-4 w-4 text-primary" />
                      <span>Teacher Q&A</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="mr-2 h-4 w-4 text-primary" />
                      <span>Downloadable resources</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto pt-6">
                  <Link href="/courses?price=standard" className="w-full">
                    <Button className="w-full">Browse Standard Courses</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardContent className="pt-6 flex-1 flex flex-col">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <Badge>Premium</Badge>
                  <h3 className="text-4xl font-bold">₹79.99</h3>
                  <p className="text-muted-foreground">Advanced courses for serious learners</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Award className="mr-2 h-4 w-4 text-primary" />
                      <span>Full course access</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="mr-2 h-4 w-4 text-primary" />
                      <span>Advanced exercises</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="mr-2 h-4 w-4 text-primary" />
                      <span>Teacher Q&A</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="mr-2 h-4 w-4 text-primary" />
                      <span>1-on-1 mentoring</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="mr-2 h-4 w-4 text-primary" />
                      <span>Certificate of completion</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto pt-6">
                  <Link href="/courses?price=premium" className="w-full">
                    <Button className="w-full">Browse Premium Courses</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Users Say</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Hear from students and teachers who have used our platform
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Jessica K.",
                role: "Student",
                content:
                  "The courses on this platform have helped me understand complex topics that I struggled with in my university classes.",
              },
              {
                name: "David M.",
                role: "Teacher",
                content:
                  "As a graduate student, I've been able to share my knowledge and earn extra income while helping others learn.",
              },
              {
                name: "Sophia L.",
                role: "Student",
                content:
                  "The quality of instruction is amazing. These university students really know how to explain difficult concepts clearly.",
              },
              {
                name: "Ryan T.",
                role: "Teacher",
                content:
                  "This platform has given me the opportunity to create courses on topics I'm passionate about and reach students globally.",
              },
              {
                name: "Emma W.",
                role: "Student",
                content:
                  "I've taken three courses so far and each one has exceeded my expectations. Highly recommended!",
              },
              {
                name: "James H.",
                role: "Teacher",
                content:
                  "The tools for creating and sharing courses are intuitive and powerful. It's been a great experience teaching here.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-muted/40">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <p className="text-sm italic">"{testimonial.content}"</p>
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-muted" />
                      <div>
                        <p className="text-sm font-medium">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Start Learning?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Join thousands of students learning from university students today
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/courses">
                <Button className="px-8">Browse Courses</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" className="px-8">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
