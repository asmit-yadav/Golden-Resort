"use client"

import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Lock, Mail } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/admin/dashboard")
    } catch (err: any) {
      setError(
        err.code === "auth/invalid-credential"
          ? "Invalid email or password"
          : err.code === "auth/too-many-requests"
          ? "Too many failed attempts. Please try again later."
          : "Login failed. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative p-4">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-rose-950 opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-900/20 via-transparent to-transparent" />

      {/* Close / Back to website button */}
      <Link
        href="/"
        className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/80 border border-gray-700 text-gray-400 hover:text-white hover:bg-rose-600 hover:border-rose-600 transition-all duration-300"
        aria-label="Back to website"
      >
        <X size={20} />
      </Link>

      <Card className="w-full max-w-md shadow-2xl border border-gray-800 bg-gray-900/90 backdrop-blur-md relative z-10">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-700 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-rose-500/20">
            <Lock className="text-white w-7 h-7" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Admin Portal</CardTitle>
          <p className="text-gray-400 text-sm mt-1">Golden Resort</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-900/30 text-red-400 text-sm p-3 rounded-lg border border-red-800">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@goldenresort.com"
                  required
                  className="w-full pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-rose-500 focus:ring-rose-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-rose-500 focus:ring-rose-500"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 transition-all duration-300 hover:shadow-lg hover:shadow-rose-600/20"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <p className="text-center text-gray-500 text-xs mt-6">
            Authorized personnel only
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
