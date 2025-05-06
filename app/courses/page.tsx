"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, ChevronDown } from "lucide-react"
import { courses, categories, universities, levels } from "@/data/courses"

export default function CoursesPage() {
  const [filteredCourses, setFilteredCourses] = useState(courses)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 7500])
  const [minRating, setMinRating] = useState(0)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [sortBy, setSortBy] = useState("popular")

  // Apply filters
  useEffect(() => {
    let result = [...courses]

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.teacher.name.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query),
      )
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((course) => selectedCategories.includes(course.category))
    }

    // Apply university filter
    if (selectedUniversities.length > 0) {
      result = result.filter((course) => selectedUniversities.includes(course.teacher.university))
    }

    // Apply level filter
    if (selectedLevels.length > 0 && selectedLevels.some((level) => level !== "")) {
      result = result.filter((course) => course.level && selectedLevels.includes(course.level))
    }

    // Apply price filter
    const minPrice = priceRange[0] / 75 // Convert to USD for filtering
    const maxPrice = priceRange[1] / 75 // Convert to USD for filtering
    result = result.filter((course) => course.price >= minPrice && course.price <= maxPrice)

    // Apply rating filter
    if (minRating > 0) {
      result = result.filter((course) => course.rating >= minRating)
    }

    // Apply sorting
    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.students - a.students)
        break
      case "newest":
        result.sort((a, b) => {
          if (!a.lastUpdated || !b.lastUpdated) return 0
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        })
        break
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    setFilteredCourses(result)
  }, [searchQuery, selectedCategories, selectedUniversities, selectedLevels, priceRange, minRating, sortBy])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleUniversityChange = (university: string) => {
    setSelectedUniversities((prev) =>
      prev.includes(university) ? prev.filter((u) => u !== university) : [...prev, university],
    )
  }

  const handleLevelChange = (level: string) => {
    setSelectedLevels((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]))
  }

  const handleRatingChange = (rating: number) => {
    setMinRating((prev) => (prev === rating ? 0 : rating))
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Search is already applied via useEffect
  }

  const handleResetFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedUniversities([])
    setSelectedLevels([])
    setPriceRange([0, 7500])
    setMinRating(0)
    setSortBy("popular")
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Browse Courses</h1>
          <p className="text-muted-foreground">
            Discover courses created by university students across various subjects
          </p>
        </div>

        {/* Featured Courses Carousel */}
        <div className="relative overflow-hidden rounded-xl">
          <div className="relative aspect-[2/1] md:aspect-[3/1] overflow-hidden">
            <Image src="/images/cb.jpg" alt="Featured Course" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/20 flex flex-col justify-center p-6 md:p-10">
              <Badge className="w-fit mb-2">Featured</Badge>
              <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 max-w-md">
                Full Stack Web Development Bootcamp
              </h2>
              <p className="text-muted-foreground max-w-md mb-4 md:mb-6 hidden md:block">
                Learn modern web development with React, Node.js, and MongoDB from a Stanford CS student
              </p>
              <div className="flex items-center gap-2 mb-4">
                <div className="font-bold text-xl">₹4,499</div>
                <div className="text-muted-foreground line-through">₹5,999</div>
              </div>
              <Link href="/courses/1">
                <Button>View Course</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            <div className="flex md:hidden items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-between"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <span>Filters</span>
                <Filter className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className={`${showMobileFilters ? "block" : "hidden"} md:block space-y-6`}>
              <div>
                <h3 className="font-medium mb-2 flex items-center justify-between">
                  <span>Categories</span>
                  <ChevronDown className="h-4 w-4" />
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label htmlFor={`category-${category}`} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2 flex items-center justify-between">
                  <span>Universities</span>
                  <ChevronDown className="h-4 w-4" />
                </h3>
                <div className="space-y-2">
                  {universities.slice(0, 5).map((university) => (
                    <div key={university} className="flex items-center space-x-2">
                      <Checkbox
                        id={`university-${university}`}
                        checked={selectedUniversities.includes(university)}
                        onCheckedChange={() => handleUniversityChange(university)}
                      />
                      <Label htmlFor={`university-${university}`} className="text-sm">
                        {university}
                      </Label>
                    </div>
                  ))}
                </div>
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 h-auto mt-1"
                  onClick={() => setShowMobileFilters((prev) => !prev)}
                >
                  Show more
                </Button>
              </div>

              <div>
                <h3 className="font-medium mb-2 flex items-center justify-between">
                  <span>Level</span>
                  <ChevronDown className="h-4 w-4" />
                </h3>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox
                        id={`level-${level}`}
                        checked={selectedLevels.includes(level)}
                        onCheckedChange={() => handleLevelChange(level)}
                      />
                      <Label htmlFor={`level-${level}`} className="text-sm">
                        {level}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <Slider
                  defaultValue={[0, 7500]}
                  max={7500}
                  step={100}
                  className="mb-6"
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex items-center justify-between">
                  <div className="text-sm">₹{priceRange[0]}</div>
                  <div className="text-sm">₹{priceRange[1]}</div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={minRating === rating}
                        onCheckedChange={() => handleRatingChange(rating)}
                      />
                      <Label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                        {rating}+ ★
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full" onClick={handleResetFilters}>
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Course Grid */}
          <div className="flex-1">
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <form className="relative w-full sm:w-64" onSubmit={handleSearch}>
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search courses..."
                    className="w-full pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
                <div className="flex items-center gap-2">
                  <Label htmlFor="sort-by" className="text-sm whitespace-nowrap">
                    Sort by:
                  </Label>
                  <select
                    id="sort-by"
                    className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full justify-start mb-6 bg-transparent p-0 h-auto">
                  <TabsTrigger
                    value="all"
                    className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    All Courses
                  </TabsTrigger>
                  <TabsTrigger
                    value="popular"
                    className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Popular
                  </TabsTrigger>
                  <TabsTrigger
                    value="new"
                    className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    New
                  </TabsTrigger>
                  <TabsTrigger
                    value="trending"
                    className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Trending
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="m-0">
                  {filteredCourses.length > 0 ? (
                    <div className="course-grid">
                      {filteredCourses.map((course) => (
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
                              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                                <span>{course.teacher.name}</span>
                                <span className="mx-1">•</span>
                                <span>{course.teacher.university}</span>
                              </div>
                              <div className="flex items-center mt-2">
                                <div className="flex items-center">
                                  <span className="font-medium mr-1">{course.rating}</span>
                                  <span className="text-yellow-500">★</span>
                                </div>
                                <span className="mx-1 text-muted-foreground">•</span>
                                <span className="text-sm text-muted-foreground">{course.students} students</span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium">No courses found</h3>
                      <p className="text-muted-foreground mt-2">Try adjusting your filters or search query</p>
                      <Button className="mt-4" onClick={handleResetFilters}>
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="popular" className="m-0">
                  <div className="course-grid">
                    {filteredCourses
                      .filter((course) => course.students > 2000)
                      .map((course) => (
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
                              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                                <span>{course.teacher.name}</span>
                                <span className="mx-1">•</span>
                                <span>{course.teacher.university}</span>
                              </div>
                              <div className="flex items-center mt-2">
                                <div className="flex items-center">
                                  <span className="font-medium mr-1">{course.rating}</span>
                                  <span className="text-yellow-500">★</span>
                                </div>
                                <span className="mx-1 text-muted-foreground">•</span>
                                <span className="text-sm text-muted-foreground">{course.students} students</span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="new" className="m-0">
                  <div className="course-grid">
                    {filteredCourses.slice(4, 8).map((course) => (
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
                            <div className="flex items-center mt-2 text-sm text-muted-foreground">
                              <span>{course.teacher.name}</span>
                              <span className="mx-1">•</span>
                              <span>{course.teacher.university}</span>
                            </div>
                            <div className="flex items-center mt-2">
                              <div className="flex items-center">
                                <span className="font-medium mr-1">{course.rating}</span>
                                <span className="text-yellow-500">★</span>
                              </div>
                              <span className="mx-1 text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground">{course.students} students</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="trending" className="m-0">
                  <div className="course-grid">
                    {filteredCourses
                      .filter((course) => course.rating >= 4.8)
                      .map((course) => (
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
                              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                                <span>{course.teacher.name}</span>
                                <span className="mx-1">•</span>
                                <span>{course.teacher.university}</span>
                              </div>
                              <div className="flex items-center mt-2">
                                <div className="flex items-center">
                                  <span className="font-medium mr-1">{course.rating}</span>
                                  <span className="text-yellow-500">★</span>
                                </div>
                                <span className="mx-1 text-muted-foreground">•</span>
                                <span className="text-sm text-muted-foreground">{course.students} students</span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" disabled>
                    <span className="sr-only">Previous page</span>
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
                      className="h-4 w-4"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8" disabled>
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8">
                    3
                  </Button>
                  <Button variant="outline" size="icon">
                    <span className="sr-only">Next page</span>
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
                      className="h-4 w-4"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
