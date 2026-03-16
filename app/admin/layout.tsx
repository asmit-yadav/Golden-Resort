"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AuthProvider, useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }, [user, loading, pathname, router])

  // Login page doesn't need auth guard
  if (pathname === "/admin/login") return <>{children}</>

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Admin Navbar */}
      <nav className="bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin/dashboard" className="text-xl font-bold text-rose-400">
                Golden Resort Admin
              </Link>
              <div className="hidden md:flex items-center gap-1">
                <Link href="/admin/dashboard">
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-rose-400 hover:bg-gray-800">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/admin/services">
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-rose-400 hover:bg-gray-800">
                    Services
                  </Button>
                </Link>
                <Link href="/admin/gallery">
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-rose-400 hover:bg-gray-800">
                    Gallery
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-gray-400 hover:text-rose-400 transition-colors hidden sm:inline">
                ← Back to Site
              </Link>
              <span className="text-sm text-gray-500 hidden sm:inline">{user.email}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut(auth)}
                className="text-rose-400 border-gray-700 hover:bg-gray-800 hover:border-rose-500"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminGuard>{children}</AdminGuard>
    </AuthProvider>
  )
}
