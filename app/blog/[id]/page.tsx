"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, User, ThumbsUp, MessageSquare, Share2, Bookmark, ChevronLeft } from "lucide-react"

// Sample blog posts data
const blogPosts = [
  {
    id: "future-of-education",
    title: "The Future of Education: How Technology is Transforming Learning",
    excerpt:
      "Explore how emerging technologies like AI, VR, and personalized learning platforms are reshaping education and creating new opportunities for students and teachers alike.",
    content: `
      <p>The landscape of education is undergoing a profound transformation, driven by rapid technological advancements that are reshaping how we teach and learn. From artificial intelligence to virtual reality, these innovations are not just changing the tools we use but fundamentally altering the educational experience itself.</p>
      
      <h2>Artificial Intelligence in Education</h2>
      <p>Artificial Intelligence (AI) is perhaps the most significant technological force reshaping education today. AI-powered systems can analyze vast amounts of data about how students learn, identifying patterns and insights that would be impossible for human teachers to discern on their own.</p>
      <p>Adaptive learning platforms use AI to personalize education at scale. These systems can adjust the difficulty of material, provide targeted feedback, and recommend resources based on individual student performance. For example, platforms like Carnegie Learning's MATHia use AI to create personalized math learning experiences, while Duolingo employs sophisticated algorithms to tailor language learning to each user's pace and style.</p>
      <p>AI is also transforming assessment. Automated grading systems can now evaluate not just multiple-choice questions but also essays and open-ended responses, providing consistent feedback and freeing teachers to focus on more complex aspects of education.</p>
      
      <h2>Virtual and Augmented Reality</h2>
      <p>Virtual Reality (VR) and Augmented Reality (AR) are breaking down the physical limitations of the traditional classroom. These technologies allow students to explore environments and concepts that would otherwise be inaccessible, dangerous, or impossible to visualize.</p>
      <p>Medical students can practice surgeries in virtual operating rooms, history classes can tour ancient civilizations, and physics students can manipulate virtual atoms to understand molecular interactions. Google Expeditions has already taken millions of students on virtual field trips to places like Machu Picchu, the Great Barrier Reef, and even Mars.</p>
      <p>The immersive nature of VR and AR doesn't just make learning more engaging—it can significantly improve retention and understanding, especially for visual and kinesthetic learners.</p>
      
      <h2>Personalized Learning at Scale</h2>
      <p>Perhaps the most revolutionary aspect of educational technology is its ability to personalize learning at an unprecedented scale. Traditional education has always faced a fundamental tension: how to provide individualized attention in a system designed for mass instruction.</p>
      <p>Technology is helping resolve this tension. Learning management systems can track individual progress across subjects and over time. Adaptive platforms can adjust content difficulty based on performance. And data analytics can help identify struggling students before they fall behind.</p>
      <p>This personalization extends beyond just academic content. Social-emotional learning platforms can help students develop crucial non-cognitive skills, while career guidance systems can help match students' interests and aptitudes with potential pathways.</p>
      
      <h2>Challenges and Considerations</h2>
      <p>Despite its promise, educational technology also presents significant challenges. The digital divide—unequal access to technology and internet connectivity—threatens to exacerbate existing educational inequalities. Privacy concerns arise as systems collect more data about students. And there's the risk of over-reliance on technology at the expense of human connection and guidance.</p>
      <p>Moreover, technology is only as effective as its implementation. Without proper teacher training, institutional support, and thoughtful integration into curriculum, even the most advanced educational technology will fail to deliver on its promise.</p>
      
      <h2>The Future of Learning</h2>
      <p>Looking ahead, the most exciting developments in educational technology may come from combining different innovations. Imagine AI-powered systems that can identify when a student is struggling with a concept, then recommend a personalized VR experience to help them visualize it. Or blockchain-based credentials that create a secure, verifiable record of a student's skills and achievements across platforms and institutions.</p>
      <p>The COVID-19 pandemic accelerated many of these trends, forcing educational institutions worldwide to embrace remote learning and digital tools. While the rapid transition was challenging, it also demonstrated the potential of technology to support learning in new and flexible ways.</p>
      <p>As we move forward, the most successful educational approaches will likely be those that thoughtfully blend technology with human guidance. Technology can provide personalization, accessibility, and engagement at scale, while teachers bring the crucial elements of mentorship, motivation, and ethical guidance that no algorithm can replace.</p>
      
      <h2>Conclusion</h2>
      <p>The future of education is not about replacing teachers with technology, but about using technology to enhance what teachers can do. By embracing these innovations thoughtfully, we can create educational experiences that are more personalized, engaging, and effective than ever before—preparing students not just for the jobs of tomorrow, but for a lifetime of learning in a rapidly changing world.</p>
    `,
    image: "/images/cb.jpg",
    author: {
      name: "Rahul Sharma",
      image: "/images/m1.jpg",
      bio: "EdTech researcher and former Stanford CS student",
    },
    date: "May 15, 2023",
    readTime: "8 min read",
    category: "Education Technology",
    tags: ["EdTech", "AI in Education", "Virtual Reality", "Future of Learning"],
    relatedPosts: [1, 2, 5],
  },
  {
    id: "1",
    title: "10 Study Techniques Backed by Science",
    excerpt:
      "Discover evidence-based study methods that can help you learn more effectively and retain information longer.",
    content: `<p>This is the full content of the blog post about study techniques...</p>`,
    image: "/images/ml.jpg",
    author: {
      name: "Priya Patel",
      image: "/images/f1.jpg",
      bio: "Learning scientist and educational researcher",
    },
    date: "June 2, 2023",
    readTime: "6 min read",
    category: "Education",
    tags: ["Study Tips", "Learning", "Productivity"],
    relatedPosts: ["future-of-education", 3, 4],
  },
  // More blog posts would be defined here
]

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<any>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching the blog post
    const fetchPost = () => {
      setIsLoading(true)
      // Find the post with the matching ID
      const foundPost = blogPosts.find((p) => p.id === params.id || p.id === params.id.toString())

      if (foundPost) {
        setPost(foundPost)

        // Get related posts
        const related = blogPosts
          .filter(
            (p) => foundPost.relatedPosts?.includes(p.id) || foundPost.relatedPosts?.includes(Number.parseInt(p.id)),
          )
          .slice(0, 3)

        setRelatedPosts(related)
      }

      setIsLoading(false)
    }

    fetchPost()
  }, [params.id])

  if (isLoading) {
    return <div className="container py-12 text-center">Loading article...</div>
  }

  if (!post) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-8 md:py-12">
      <div className="flex flex-col space-y-8">
        {/* Back button */}
        <Link href="/blog" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>Back to all articles</span>
        </Link>

        {/* Article header */}
        <div className="space-y-4">
          <Badge>{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Featured image */}
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </div>

        {/* Article content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag: string, index: number) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Article actions */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Like
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Comment
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>

        <Separator />

        {/* Author info */}
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={post.author.image || "/placeholder.svg"} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-bold">About {post.author.name}</h3>
            <p className="text-sm text-muted-foreground">{post.author.bio}</p>
            <Button variant="link" className="p-0 h-auto text-sm">
              View Profile
            </Button>
          </div>
        </div>

        {/* Related articles */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link href={`/blog/${relatedPost.id}`} key={relatedPost.id}>
                  <div className="group space-y-2">
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-bold group-hover:text-primary transition-colors">{relatedPost.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
