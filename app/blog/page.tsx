import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Calendar, User, Clock } from "lucide-react"

export default function BlogPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">EduTech Blog</h1>
          <p className="text-muted-foreground">
            Insights, tips, and stories from the world of education and technology
          </p>
        </div>

        {/* Search and Categories */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search articles..." className="w-full pl-8" />
          </div>
          <Tabs defaultValue="all" className="w-full md:w-auto">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="career">Career</TabsTrigger>
              <TabsTrigger value="student-life">Student Life</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Featured Post */}
        <div className="relative rounded-lg overflow-hidden aspect-[2/1]">
          <Image src="/images/cb.jpg" alt="Featured blog post" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6 md:p-10">
            <Badge className="w-fit mb-2">Featured</Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-white max-w-2xl">
              The Future of Education: How Technology is Transforming Learning
            </h2>
            <p className="text-white/80 max-w-2xl mb-4 md:mb-6 hidden md:block">
              Explore how emerging technologies like AI, VR, and personalized learning platforms are reshaping education
              and creating new opportunities for students and teachers alike.
            </p>
            <div className="flex items-center gap-4 text-white/80 mb-4">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>Rahul Sharma</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>May 15, 2023</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>8 min read</span>
              </div>
            </div>
            <Link href="/blog/future-of-education">
              <Button>Read Article</Button>
            </Link>
          </div>
        </div>

        {/* Latest Posts */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Latest Articles</h2>
            <Button variant="outline">View All</Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: 1,
                title: "10 Study Techniques Backed by Science",
                excerpt:
                  "Discover evidence-based study methods that can help you learn more effectively and retain information longer.",
                image: "/images/cb.jpg",
                author: "Priya Patel",
                date: "June 2, 2023",
                readTime: "6 min read",
                category: "Education",
              },
              {
                id: 2,
                title: "How to Build a Career in Data Science",
                excerpt:
                  "A comprehensive guide for students looking to enter the field of data science, from essential skills to job hunting.",
                image: "/images/ai.jpg",
                author: "Arjun Mehta",
                date: "May 28, 2023",
                readTime: "10 min read",
                category: "Career",
              },
              {
                id: 3,
                title: "The Rise of Peer-to-Peer Learning Platforms",
                excerpt:
                  "Exploring how platforms like EduTech are changing the way knowledge is shared between students globally.",
                image: "/images/ml.jpg",
                author: "Neha Gupta",
                date: "May 20, 2023",
                readTime: "7 min read",
                category: "Technology",
              },
              {
                id: 4,
                title: "Balancing Studies and Mental Health",
                excerpt:
                  "Practical strategies for maintaining your mental wellbeing while managing academic pressures and deadlines.",
                image: "/images/block.webp",
                author: "Vikram Singh",
                date: "May 15, 2023",
                readTime: "5 min read",
                category: "Student Life",
              },
              {
                id: 5,
                title: "The Impact of AI on Education",
                excerpt:
                  "How artificial intelligence is personalizing learning experiences and helping teachers be more effective.",
                image: "/images/js.jpg",
                author: "Ananya Desai",
                date: "May 10, 2023",
                readTime: "8 min read",
                category: "Technology",
              },
              {
                id: 6,
                title: "From Student to Teacher: My Journey",
                excerpt:
                  "A personal story of how teaching others became the best way to master my own subject and build a career.",
                image: "/images/cyber.jpg",
                author: "Rohan Kapoor",
                date: "May 5, 2023",
                readTime: "6 min read",
                category: "Career",
              },
            ].map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id}>
                <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
                  <div className="relative aspect-video">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    <Badge className="absolute top-2 left-2">{post.category}</Badge>
                  </div>
                  <CardContent className="p-4 flex-1">
                    <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Topics */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Popular Topics</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Online Learning",
              "Study Tips",
              "Career Advice",
              "Technology",
              "Student Life",
              "Teaching",
              "Programming",
              "Data Science",
              "Web Development",
              "Machine Learning",
              "University Life",
              "Productivity",
              "Self-improvement",
              "Education Trends",
              "Learning Resources",
            ].map((topic, index) => (
              <Link href={`/blog/topic/${topic.toLowerCase().replace(" ", "-")}`} key={index}>
                <Badge variant="outline" className="px-3 py-1 hover:bg-muted cursor-pointer">
                  {topic}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-muted rounded-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-2/3 space-y-2">
              <h2 className="text-2xl font-bold">Subscribe to Our Newsletter</h2>
              <p className="text-muted-foreground">
                Get the latest articles, resources, and educational insights delivered to your inbox.
              </p>
            </div>
            <div className="md:w-1/3 w-full">
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="w-full" />
                <Button>Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
