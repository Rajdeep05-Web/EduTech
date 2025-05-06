"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Upload, Plus, X, Check } from "lucide-react"
import { getCurrentUser } from "@/utils/auth"
import { categories, levels } from "@/data/courses"

export default function CourseUploadPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    longDescription: "",
    category: "",
    price: "",
    level: "",
    videoUrl: "",
    chapters: [{ title: "", duration: "" }],
  })
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }

    if (currentUser.role !== "teacher") {
      router.push("/dashboard/student")
      return
    }

    setUser(currentUser)
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setCourseData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleChapterChange = (index: number, field: string, value: string) => {
    setCourseData((prev) => {
      const updatedChapters = [...prev.chapters]
      updatedChapters[index] = {
        ...updatedChapters[index],
        [field]: value,
      }
      return {
        ...prev,
        chapters: updatedChapters,
      }
    })
  }

  const addChapter = () => {
    setCourseData((prev) => ({
      ...prev,
      chapters: [...prev.chapters, { title: "", duration: "" }],
    }))
  }

  const removeChapter = (index: number) => {
    setCourseData((prev) => {
      const updatedChapters = [...prev.chapters]
      updatedChapters.splice(index, 1)
      return {
        ...prev,
        chapters: updatedChapters,
      }
    })
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setCourseData((prev) => ({
      ...prev,
      videoUrl: url,
    }))

    // Extract YouTube video ID
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let videoId = ""
      if (url.includes("v=")) {
        videoId = url.split("v=")[1].split("&")[0]
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0]
      }

      if (videoId) {
        setVideoPreview(`https://www.youtube.com/embed/${videoId}`)
      }
    }
  }

  const validateForm = () => {
    if (!courseData.title) return "Course title is required"
    if (!courseData.description) return "Course description is required"
    if (!courseData.category) return "Category is required"
    if (!courseData.price) return "Price is required"
    if (isNaN(Number(courseData.price)) || Number(courseData.price) < 0) return "Price must be a valid number"
    if (!courseData.level) return "Level is required"
    if (!courseData.videoUrl) return "Video URL is required"
    if (!thumbnailPreview) return "Course thumbnail is required"

    // Validate chapters
    if (courseData.chapters.length === 0) return "At least one chapter is required"
    for (const chapter of courseData.chapters) {
      if (!chapter.title) return "All chapters must have a title"
      if (!chapter.duration) return "All chapters must have a duration"
    }

    return null
  }

  const handleSubmit = (e: React.FormEvent, isDraft = false) => {
    e.preventDefault()

    if (!isDraft) {
      const error = validateForm()
      if (error) {
        toast({
          title: "Validation Error",
          description: error,
          variant: "destructive",
        })
        return
      }
    }

    setIsLoading(true)

    // Calculate total duration
    const totalDuration = courseData.chapters.reduce((total, chapter) => {
      const durationMatch = chapter.duration.match(/(\d+)\s*hr|\s*(\d+)\s*min/)
      if (!durationMatch) return total

      const hours = durationMatch[1] ? Number.parseInt(durationMatch[1]) : 0
      const minutes = durationMatch[2] ? Number.parseInt(durationMatch[2]) : 0

      return total + hours * 60 + minutes
    }, 0)

    const hours = Math.floor(totalDuration / 60)
    const minutes = totalDuration % 60
    const durationString = `${hours > 0 ? `${hours} hours` : ""} ${minutes > 0 ? `${minutes} minutes` : ""}`

    // Create course object
    const newCourse = {
      id: Date.now(),
      title: courseData.title,
      description: courseData.description,
      longDescription: courseData.longDescription,
      teacher: {
        name: `${user.firstName} ${user.lastName}`,
        university: user.university || "University",
        department: user.fieldOfStudy || "Department",
        image: "/images/teacher-1.png",
      },
      price: Number.parseFloat(courseData.price) || 0,
      image: thumbnailPreview || "/placeholder.svg",
      category: courseData.category,
      rating: 0,
      students: 0,
      duration: durationString.trim() || "0 hours",
      lastUpdated: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" }),
      level: courseData.level,
      videoUrl: courseData.videoUrl,
      chapters: courseData.chapters.map((chapter) => ({
        ...chapter,
        completed: false,
      })),
      status: isDraft ? "draft" : "published",
    }

    // Save to localStorage
    const storedCourses = localStorage.getItem("teacher_courses")
    const courses = storedCourses ? JSON.parse(storedCourses) : []
    const updatedCourses = [...courses, newCourse]
    localStorage.setItem("teacher_courses", JSON.stringify(updatedCourses))

    // Update teacher's courses
    const teacherCourses = localStorage.getItem(`teacher_courses_${user.id}`)
    const userCourses = teacherCourses ? JSON.parse(teacherCourses) : []
    const updatedUserCourses = [...userCourses, newCourse.id]
    localStorage.setItem(`teacher_courses_${user.id}`, JSON.stringify(updatedUserCourses))

    setIsLoading(false)
    setIsUploaded(true)

    toast({
      title: isDraft ? "Course saved as draft" : "Course published successfully",
      description: isDraft
        ? "Your course has been saved as a draft. You can edit and publish it later."
        : "Your course is now live and available for students to purchase.",
    })

    // Redirect after a short delay
    setTimeout(() => {
      router.push("/dashboard/teacher")
    }, 2000)
  }

  if (!user) {
    return <div className="container py-8 text-center">Loading...</div>
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Upload New Course</h1>
          <p className="text-muted-foreground">Create a new course to share your knowledge with students</p>
        </div>

        {isUploaded ? (
          <Card>
            <CardContent className="pt-6 flex flex-col items-center justify-center py-10 text-center">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Course Uploaded Successfully!</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Your course has been uploaded and is now being processed. You will be redirected to your dashboard
                shortly.
              </p>
              <Button onClick={() => router.push("/dashboard/teacher")}>Go to Dashboard</Button>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={(e) => handleSubmit(e, false)}>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Basic Information */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Provide the basic details about your course</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g. Advanced React Development"
                      value={courseData.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide a brief description of your course (max 200 characters)"
                      className="resize-none"
                      maxLength={200}
                      value={courseData.description}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longDescription">Detailed Description</Label>
                    <Textarea
                      id="longDescription"
                      placeholder="Provide a detailed description of your course, including what students will learn"
                      className="min-h-[150px]"
                      value={courseData.longDescription}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={courseData.category}
                        onValueChange={(value) => handleSelectChange("category", value)}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="level">Level</Label>
                      <Select value={courseData.level} onValueChange={(value) => handleSelectChange("level", value)}>
                        <SelectTrigger id="level">
                          <SelectValue placeholder="Select a level" />
                        </SelectTrigger>
                        <SelectContent>
                          {levels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="e.g. 3999"
                      value={courseData.price}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Set a competitive price for your course. The platform fee is 30% of the course price.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Course Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                  <CardDescription>Add chapters to your course</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {courseData.chapters.map((chapter, index) => (
                    <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-6 w-6"
                        onClick={() => removeChapter(index)}
                        disabled={courseData.chapters.length === 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="space-y-2">
                        <Label htmlFor={`chapter-title-${index}`}>Chapter Title</Label>
                        <Input
                          id={`chapter-title-${index}`}
                          placeholder="e.g. Introduction to React Hooks"
                          value={chapter.title}
                          onChange={(e) => handleChapterChange(index, "title", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`chapter-duration-${index}`}>Duration</Label>
                        <Input
                          id={`chapter-duration-${index}`}
                          placeholder="e.g. 1 hr 30 min"
                          value={chapter.duration}
                          onChange={(e) => handleChapterChange(index, "duration", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" className="w-full" onClick={addChapter}>
                    <Plus className="mr-2 h-4 w-4" /> Add Chapter
                  </Button>
                </CardContent>
              </Card>

              {/* Media */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Media</CardTitle>
                  <CardDescription>Upload thumbnail and video for your course</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Course Thumbnail</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                      {thumbnailPreview ? (
                        <div className="relative w-full aspect-video mb-4">
                          <img
                            src={thumbnailPreview || "/placeholder.svg"}
                            alt="Thumbnail preview"
                            className="w-full h-full object-cover rounded-md"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute right-2 top-2 h-6 w-6"
                            onClick={() => setThumbnailPreview(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-1">Drag and drop your thumbnail image here</p>
                          <p className="text-xs text-muted-foreground mb-4">PNG, JPG or GIF, max 2MB</p>
                        </>
                      )}
                      <div className="flex gap-2">
                        <label htmlFor="thumbnail-upload" className="cursor-pointer">
                          <Input
                            id="thumbnail-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleThumbnailChange}
                          />
                          <Button type="button" variant="outline" size="sm">
                            {thumbnailPreview ? "Change Image" : "Browse Files"}
                          </Button>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="videoUrl">Course Video</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                      {videoPreview ? (
                        <div className="w-full aspect-video mb-4">
                          <iframe
                            src={videoPreview}
                            className="w-full h-full rounded-md"
                            allowFullScreen
                            title="Video preview"
                          ></iframe>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-1">Add your YouTube video link</p>
                          <p className="text-xs text-muted-foreground mb-4">
                            Ensure your video is set to unlisted or public
                          </p>
                        </>
                      )}
                      <Input
                        id="videoUrl"
                        placeholder="https://youtube.com/watch?v=..."
                        className="max-w-md mb-4"
                        value={courseData.videoUrl}
                        onChange={handleVideoUrlChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between mt-6">
              <Button type="button" variant="outline" onClick={(e) => handleSubmit(e, true)}>
                Save as Draft
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Publishing..." : "Publish Course"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
