"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Search, Menu, X, LogOut, User, Wallet, BookOpen, Settings } from "lucide-react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getCurrentUser, logoutUser } from "@/utils/auth"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<"student" | "teacher" | null>(null)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setIsLoggedIn(true)
      setUserRole(currentUser.role)
      setUser(currentUser)
    } else {
      setIsLoggedIn(false)
      setUserRole(null)
      setUser(null)
    }
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    logoutUser()
    setIsLoggedIn(false)
    setUserRole(null)
    setUser(null)
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">EduTech</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            href="/courses"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/courses" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Courses
          </Link>
          <Link
            href="/teachers"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/teachers" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Teachers
          </Link>
          <Link
            href="/subscription"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/subscription" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Subscription
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/about" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            About
          </Link>
          <Link
            href="/blog"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/blog" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Blog
          </Link>
          {isLoggedIn && userRole === "teacher" && (
            <Link
              href="/dashboard/teacher"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/dashboard/teacher" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Teacher Dashboard
            </Link>
          )}
          {isLoggedIn && (
            <Link
              href="/dashboard/student"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/dashboard/student" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              My Courses
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <form className="hidden md:flex relative w-full max-w-sm items-center">
            <Input type="search" placeholder="Search courses..." className="pr-10" />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </form>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Balance:</span>
                <span className="font-medium">₹{user?.balance?.toFixed(2) || "0.00"}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt={user?.firstName || "User"} />
                      <AvatarFallback>{user?.firstName?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      <p className="text-xs leading-none text-muted-foreground mt-1 capitalize">{user?.role}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/dashboard/profile" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/dashboard/wallet" className="flex items-center w-full">
                      <Wallet className="mr-2 h-4 w-4" />
                      <span>Wallet</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href={userRole === "teacher" ? "/dashboard/teacher" : "/dashboard/student"}
                      className="flex items-center w-full"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      <span>{userRole === "teacher" ? "My Courses" : "My Learning"}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/dashboard/settings" className="flex items-center w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
            </div>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <form className="relative w-full items-center">
              <Input type="search" placeholder="Search courses..." className="pr-10" />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </form>
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary" onClick={toggleMenu}>
                Home
              </Link>
              <Link
                href="/courses"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                Courses
              </Link>
              <Link
                href="/teachers"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                Teachers
              </Link>
              <Link
                href="/subscription"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                Subscription
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                Blog
              </Link>
              {isLoggedIn && userRole === "teacher" && (
                <Link
                  href="/dashboard/teacher"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={toggleMenu}
                >
                  Teacher Dashboard
                </Link>
              )}
              {isLoggedIn && (
                <Link
                  href="/dashboard/student"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={toggleMenu}
                >
                  My Courses
                </Link>
              )}
              {isLoggedIn && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Balance:</span>
                  <span className="font-medium">₹{user?.balance?.toFixed(2) || "0.00"}</span>
                </div>
              )}
              {!isLoggedIn && (
                <div className="flex flex-col space-y-2">
                  <Link href="/login" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={toggleMenu}>
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </div>
              )}
              {isLoggedIn && (
                <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Log out
                </Button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
