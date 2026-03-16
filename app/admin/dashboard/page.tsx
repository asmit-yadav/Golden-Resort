"use client"

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const [serviceCount, setServiceCount] = useState(0)
  const [galleryCount, setGalleryCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCounts() {
      try {
        const servicesSnap = await getDocs(collection(db, "services"))
        const gallerySnap = await getDocs(collection(db, "gallery"))
        setServiceCount(servicesSnap.size)
        setGalleryCount(gallerySnap.size)
      } catch (err) {
        console.error("Error fetching counts:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchCounts()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="border border-gray-800 bg-gray-800/50 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-rose-400">
              {loading ? "..." : serviceCount}
            </div>
            <p className="text-sm text-gray-500 mt-1">Active services on website</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-800 bg-gray-800/50 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Gallery Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-purple-400">
              {loading ? "..." : galleryCount}
            </div>
            <p className="text-sm text-gray-500 mt-1">Photos in gallery</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-800 bg-gray-800/50 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Website</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-400">Live</div>
            <p className="text-sm text-gray-500 mt-1">Changes reflect instantly</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/admin/services">
          <Card className="border border-gray-800 bg-gray-800/50 hover:bg-gray-800 hover:border-rose-900 transition-all duration-300 cursor-pointer group shadow-lg">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-900/40 rounded-lg flex items-center justify-center group-hover:bg-rose-900/60 transition-colors">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Manage Services</h3>
                <p className="text-sm text-gray-400">Add, edit or remove services</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/gallery">
          <Card className="border border-gray-800 bg-gray-800/50 hover:bg-gray-800 hover:border-purple-900 transition-all duration-300 cursor-pointer group shadow-lg">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-900/40 rounded-lg flex items-center justify-center group-hover:bg-purple-900/60 transition-colors">
                <span className="text-2xl">🖼️</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Manage Gallery</h3>
                <p className="text-sm text-gray-400">Upload and organize photos</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/seed">
          <Card className="border border-gray-800 bg-gray-800/50 hover:bg-gray-800 hover:border-green-900 transition-all duration-300 cursor-pointer group shadow-lg">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-900/40 rounded-lg flex items-center justify-center group-hover:bg-green-900/60 transition-colors">
                <span className="text-2xl">🌱</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Seed Initial Data</h3>
                <p className="text-sm text-gray-400">Populate database with existing data</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
