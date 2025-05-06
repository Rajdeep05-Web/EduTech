// Types for user data
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: "student" | "teacher"
  university?: string
  fieldOfStudy?: string
  balance: number
  purchasedCourses?: number[]
  phone?: string
  location?: string
  bio?: string
  website?: string
  twitter?: string
  linkedin?: string
  github?: string
}

// Local storage keys
const USER_KEY = "edutech_user"
const USERS_KEY = "edutech_users"

// Get current user from local storage
export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null

  const userJson = localStorage.getItem(USER_KEY)
  if (!userJson) return null

  try {
    return JSON.parse(userJson) as User
  } catch (error) {
    console.error("Error parsing user data:", error)
    return null
  }
}

// Get all users from local storage
export const getAllUsers = (): User[] => {
  if (typeof window === "undefined") return []

  const usersJson = localStorage.getItem(USERS_KEY)
  if (!usersJson) return []

  try {
    return JSON.parse(usersJson) as User[]
  } catch (error) {
    console.error("Error parsing users data:", error)
    return []
  }
}

// Register a new user
export const registerUser = (userData: Omit<User, "id" | "balance" | "purchasedCourses">): User => {
  const users = getAllUsers()

  // Check if email already exists
  if (users.some((user) => user.email === userData.email)) {
    throw new Error("Email already exists")
  }

  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    balance: 250, // Default balance
    purchasedCourses: [],
  }

  // Add to users list
  users.push(newUser)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))

  // Set as current user
  localStorage.setItem(USER_KEY, JSON.stringify(newUser))

  return newUser
}

// Login user
export const loginUser = (email: string, password: string): User => {
  const users = getAllUsers()

  // In a real app, we would check password hash
  // For this demo, we're just checking if the user exists

  const user = users.find((user) => user.email === email)

  if (!user) {
    throw new Error("Invalid credentials")
  }

  // Set as current user
  localStorage.setItem(USER_KEY, JSON.stringify(user))

  return user
}

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem(USER_KEY)
}

// Update user balance
export const updateUserBalance = (userId: string, newBalance: number): void => {
  const users = getAllUsers()
  const userIndex = users.findIndex((user) => user.id === userId)

  if (userIndex === -1) return

  users[userIndex].balance = newBalance
  localStorage.setItem(USERS_KEY, JSON.stringify(users))

  // Update current user if it's the same user
  const currentUser = getCurrentUser()
  if (currentUser && currentUser.id === userId) {
    currentUser.balance = newBalance
    localStorage.setItem(USER_KEY, JSON.stringify(currentUser))
  }

  return true
}

// Update user profile
export const updateUserProfile = (userId: string, profileData: Partial<User>): User => {
  const users = getAllUsers()
  const userIndex = users.findIndex((user) => user.id === userId)

  if (userIndex === -1) throw new Error("User not found")

  // Update user data
  const updatedUser = {
    ...users[userIndex],
    ...profileData,
  }

  users[userIndex] = updatedUser
  localStorage.setItem(USERS_KEY, JSON.stringify(users))

  // Update current user if it's the same user
  const currentUser = getCurrentUser()
  if (currentUser && currentUser.id === userId) {
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser))
  }

  return updatedUser
}

// Purchase a course
export const purchaseCourse = (userId: string, courseId: number, price: number): boolean => {
  const users = getAllUsers()
  const userIndex = users.findIndex((user) => user.id === userId)

  if (userIndex === -1) return false

  const user = users[userIndex]

  // Check if user has enough balance
  if (user.balance < price) return false

  // Check if user already purchased this course
  if (user.purchasedCourses && user.purchasedCourses.includes(courseId)) return true

  // Update balance
  user.balance -= price

  // Add course to purchased courses
  if (!user.purchasedCourses) {
    user.purchasedCourses = []
  }
  user.purchasedCourses.push(courseId)

  localStorage.setItem(USERS_KEY, JSON.stringify(users))

  // Update current user if it's the same user
  const currentUser = getCurrentUser()
  if (currentUser && currentUser.id === userId) {
    currentUser.balance = user.balance
    currentUser.purchasedCourses = user.purchasedCourses
    localStorage.setItem(USER_KEY, JSON.stringify(currentUser))
  }

  return true
}

// Check if user has purchased a course
export const hasUserPurchasedCourse = (userId: string, courseId: number): boolean => {
  const user = getCurrentUser()
  if (!user || user.id !== userId) return false

  return user.purchasedCourses ? user.purchasedCourses.includes(courseId) : false
}

// Check if user has an active subscription
export const hasActiveSubscription = (userId: string): boolean => {
  if (typeof window === "undefined") return false

  const subscription = localStorage.getItem(`subscription_${userId}`)
  if (!subscription) return false

  try {
    const parsedSubscription = JSON.parse(subscription)
    const endDate = new Date(parsedSubscription.endDate)
    return endDate > new Date()
  } catch (error) {
    return false
  }
}

// Initialize with some default users if none exist
export const initializeAuth = (): void => {
  if (typeof window === "undefined") return

  const users = getAllUsers()

  if (users.length === 0) {
    const defaultUsers: User[] = [
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "student@example.com",
        role: "student",
        balance: 250,
        purchasedCourses: [],
      },
      {
        id: "2",
        firstName: "Jane",
        lastName: "Smith",
        email: "teacher@example.com",
        role: "teacher",
        university: "Stanford University",
        fieldOfStudy: "Computer Science",
        balance: 500,
        purchasedCourses: [],
      },
    ]

    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers))
  }
}
