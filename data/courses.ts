export interface Course {
  id: number
  title: string
  description: string
  longDescription?: string
  teacher: {
    name: string
    university: string
    department: string
    bio?: string
    image?: string
  }
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  students: number
  duration?: string
  lastUpdated?: string
  level?: string
  videoUrl?: string
  chapters?: {
    title: string
    duration: string
    completed?: boolean
  }[]
  comments?: {
    id: number
    user: {
      name: string
      image?: string
    }
    content: string
    date: string
    likes: number
  }[]
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Full Stack Web Development Bootcamp",
    description: "Learn modern web development with React, Node.js, and MongoDB",
    teacher: {
      name: "Alex Johnson",
      university: "Stanford University",
      department: "Computer Science",
      bio: "Full-stack developer with 5 years of industry experience. Currently pursuing a Master's in Computer Science at Stanford.",
      image: "/images/m1.jpg",
    },
    price: 59.99,
    originalPrice: 79.99,
    image: "/images/banner-web.png",
    category: "Web Development",
    rating: 4.8,
    students: 3245,
    duration: "24 hours",
    lastUpdated: "March 2023",
    level: "Intermediate",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    chapters: [
      {
        title: "Introduction to Web Development",
        duration: "45 min",
        completed: false,
      },
      {
        title: "HTML & CSS Fundamentals",
        duration: "1 hr 30 min",
        completed: false,
      },
      {
        title: "JavaScript Essentials",
        duration: "2 hr",
        completed: false,
      },
      {
        title: "React.js Fundamentals",
        duration: "3 hr",
        completed: false,
      },
      {
        title: "Node.js and Express",
        duration: "2 hr 30 min",
        completed: false,
      },
      {
        title: "MongoDB Database Integration",
        duration: "2 hr",
        completed: false,
      },
      {
        title: "Authentication and Authorization",
        duration: "1 hr 45 min",
        completed: false,
      },
      {
        title: "Deployment and DevOps",
        duration: "1 hr 30 min",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    description: "Master the core concepts of machine learning with Python and scikit-learn",
    teacher: {
      name: "Sarah Williams",
      university: "MIT",
      department: "Electrical Engineering & Computer Science",
      bio: "PhD candidate in Machine Learning at MIT with research focus on computer vision and deep learning.",
      image: "/images/f1.jpg",
    },
    price: 49.99,
    image: "/images/ml.jpg",
    category: "Machine Learning",
    rating: 4.7,
    students: 2130,
    duration: "18 hours",
    lastUpdated: "January 2023",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "iOS App Development with Swift",
    description: "Build real-world iOS applications using Swift and SwiftUI",
    teacher: {
      name: "Michael Chen",
      university: "Berkeley",
      department: "Computer Science",
      bio: "iOS developer with 4 years of experience. Currently pursuing a CS degree at Berkeley.",
      image: "/images/m2.jpg",
    },
    price: 54.99,
    image: "/images/ios.jpg",
    category: "Mobile Development",
    rating: 4.9,
    students: 1876,
    duration: "20 hours",
    lastUpdated: "February 2023",
    level: "Intermediate",
  },
  {
    id: 4,
    title: "Data Structures and Algorithms",
    description: "Master essential computer science concepts for coding interviews",
    teacher: {
      name: "Emily Rodriguez",
      university: "Stanford University",
      department: "Computer Science",
      bio: "Software engineer at Google and Stanford CS graduate with expertise in algorithms and competitive programming.",
      image: "/images/f2.jpg",
    },
    price: 44.99,
    image: "/images/dsa.jpg",
    category: "Computer Science",
    rating: 4.6,
    students: 2987,
    duration: "16 hours",
    lastUpdated: "April 2023",
    level: "Advanced",
  },
  {
    id: 5,
    title: "Artificial Intelligence: Deep Learning",
    description: "Learn advanced neural networks and deep learning techniques with TensorFlow",
    teacher: {
      name: "Michael Chen",
      university: "Stanford",
      department: "Computer Science",
      bio: "AI researcher with publications in top conferences. Currently pursuing a PhD in AI at Stanford.",
      image: "/images/m2.jpg",
    },
    price: 64.99,
    originalPrice: 79.99,
    image: "/images/ai.jpg",
    category: "Artificial Intelligence",
    rating: 4.9,
    students: 1876,
    duration: "22 hours",
    lastUpdated: "May 2023",
    level: "Advanced",
  },
  {
    id: 6,
    title: "Blockchain Development with Ethereum",
    description: "Build decentralized applications (DApps) on the Ethereum blockchain",
    teacher: {
      name: "Jessica Lee",
      university: "Princeton",
      department: "Computer Science",
      bio: "Blockchain developer and researcher with experience in smart contract development and DeFi applications.",
      image: "/images/f3.jpg",
    },
    price: 59.99,
    image: "/images/block.webp",
    category: "Blockchain",
    rating: 4.7,
    students: 1243,
    duration: "18 hours",
    lastUpdated: "June 2023",
    level: "Intermediate",
  },
  {
    id: 7,
    title: "Cybersecurity Fundamentals",
    description: "Learn essential security concepts and practices to protect digital systems",
    teacher: {
      name: "Robert Chen",
      university: "JSophia Martinez",
      department: "Computer Science",
      bio: "Cybersecurity expert with CISSP certification and experience in penetration testing and security analysis.",
      image: "/images/f4.jpg",
    },
    price: 49.99,
    image: "/images/cyber.jpg",
    category: "Cybersecurity",
    rating: 4.8,
    students: 1576,
    duration: "15 hours",
    lastUpdated: "July 2023",
    level: "Beginner",
  },
  {
    id: 8,
    title: "Cloud Computing with AWS",
    description: "Master Amazon Web Services for scalable and reliable cloud infrastructure",
    teacher: {
      name: "Alex Johnson",
      university: "MIT",
      department: "Computer Science",
      bio: "AWS certified solutions architect with experience in designing and implementing cloud-native applications.",
      image: "/images/m1.jpg",
    },
    price: 54.99,
    image: "/images/aws.jpeg",
    category: "Cloud Computing",
    rating: 4.7,
    students: 1832,
    duration: "20 hours",
    lastUpdated: "August 2023",
    level: "Intermediate",
  },
]

export const categories = [
  "Web Development",
  "Machine Learning",
  "Mobile Development",
  "Computer Science",
  "Artificial Intelligence",
  "Blockchain",
  "Cybersecurity",
  "Cloud Computing",
  "Data Science",
  "DevOps",
]

export const universities = ["Stanford", "MIT", "Berkeley", "Harvard", "Princeton", "Johns Hopkins", "Yale", "Columbia"]

export const levels = ["Beginner", "Intermediate", "Advanced"]
