"use client"

import { useState } from "react"
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const seedServices = [
  { title: "Wedding Planning", description: "Comprehensive wedding planning services from engagement to reception, including venue selection, decor, catering, and entertainment coordination.", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.jpg-m8oGo5kwHEK2uEoCY30ZX3OPJeKLxj.webp", order: 1 },
  { title: "Corporate Events", description: "Professional corporate event management including conferences, product launches, team building activities, and annual celebrations.", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10.jpg-hkIYw6v6oT49WpzpguQr6cjAnHrJnv.webp", order: 2 },
  { title: "Social Gatherings", description: "Memorable social events including birthday parties, anniversaries, baby showers, and festive celebrations tailored to your preferences.", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/65.jpg-ONTGKfji9x2GVaQZY7CRdAoZlMsgb3.webp", order: 3 },
  { title: "Decoration Services", description: "Exquisite decoration services featuring floral arrangements, themed setups, lighting design, and custom installations for any occasion.", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.jpg-EvpBDMkE14IZSwJvLJlZBgfjXWvDF4.webp", order: 4 },
  { title: "Dandiya Night", description: "Vibrant and energetic Dandiya and Garba nights with professional choreography, live music, and stunning thematic decor.", imageUrl: "https://images.unsplash.com/photo-1604282719164-8931b097b6a0?q=80&w=2070&auto=format&fit=crop", order: 5 },
  { title: "Festival Events", description: "Grand celebrations for all major festivals, including Diwali, Holi, and more, with traditional decor, food, and entertainment.", imageUrl: "https://images.unsplash.com/photo-1574100004472-e536d3b6bacc?q=80&w=2070&auto=format&fit=crop", order: 6 },
  { title: "Destination Wedding", description: "Exotic destination wedding planning services at breathtaking locations, managing travel, accommodation, and all event logistics.", imageUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2070&auto=format&fit=crop", order: 7 },
  { title: "Catering Services", description: "Gourmet catering services offering a wide range of cuisines, from traditional Indian dishes to international flavors, for all events.", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1", order: 8 },
]

const seedGallery = [
  { title: "Traditional Wedding Entrance", category: "wedding", description: "Grand wedding entrance with traditional decor", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.jpg-m8oGo5kwHEK2uEoCY30ZX3OPJeKLxj.webp", order: 1 },
  { title: "Haldi Ceremony Setup", category: "social", description: "Vibrant haldi ceremony decoration", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.jpg-UxKYPScbm5G1fZDKOXVEouBTGRNFzd.webp", order: 2 },
  { title: "Floral Entrance Arch", category: "decor", description: "Beautiful floral entrance archway", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.jpg-hpODjzoGGj0VTWvUslwtijzZt7EY2k.webp", order: 3 },
  { title: "Engagement Celebration", category: "engagement", description: "Elegant engagement party setup", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4.jpg-yd9XXYMGamvVCfBlhFNVIfDb5HY9lC.webp", order: 4 },
  { title: "Wedding Entrance Decor", category: "wedding", description: "Stunning wedding entrance decoration", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-02-06-CTbIuA90ieM6x7ihfoHGA9lj4v22i9.webp", order: 5 },
  { title: "Mehendi Ceremony Setup", category: "social", description: "Colorful mehendi function decor", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6.jpg-GyiaaJM8eHDS0e7ynK9dxw4ftESmPe.webp", order: 6 },
  { title: "Floral Decoration", category: "decor", description: "Beautiful floral arrangements", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7.jpg-G0NYsEwBEKofszE53nOEgxzhLrveBU.webp", order: 7 },
  { title: "Corporate Stage Setup", category: "corporate", description: "Professional corporate stage and backdrop", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10.jpg-hkIYw6v6oT49WpzpguQr6cjAnHrJnv.webp", order: 8 },
  { title: "Anniversary Celebration", category: "anniversary", description: "Sophisticated anniversary celebration", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.jpg-EvpBDMkE14IZSwJvLJlZBgfjXWvDF4.webp", order: 9 },
  { title: "Outdoor Event Space", category: "social", description: "Open-air event venue setup", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/65.jpg-ONTGKfji9x2GVaQZY7CRdAoZlMsgb3.webp", order: 10 },
]

export default function SeedPage() {
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

  const seedData = async () => {
    setLoading(true)
    setStatus("Checking existing data...")

    try {
      // Check if data already exists
      const servicesSnap = await getDocs(collection(db, "services"))
      const gallerySnap = await getDocs(collection(db, "gallery"))

      if (servicesSnap.size > 0 || gallerySnap.size > 0) {
        setStatus(`Data already exists (${servicesSnap.size} services, ${gallerySnap.size} gallery items). Skipping seed to avoid duplicates.`)
        setLoading(false)
        return
      }

      // Seed services
      setStatus("Seeding services...")
      for (const service of seedServices) {
        await addDoc(collection(db, "services"), {
          ...service,
          createdAt: serverTimestamp(),
        })
      }

      // Seed gallery
      setStatus("Seeding gallery items...")
      for (const item of seedGallery) {
        await addDoc(collection(db, "gallery"), {
          ...item,
          createdAt: serverTimestamp(),
        })
      }

      setStatus(`Done! Seeded ${seedServices.length} services and ${seedGallery.length} gallery items.`)
    } catch (err: any) {
      setStatus(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Seed Initial Data</h1>

      <Card className="border border-gray-800 bg-gray-800/50 shadow-lg max-w-2xl">
        <CardHeader>
          <CardTitle className="text-white">Populate Firestore with existing website data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-400">
            This will copy the current hardcoded services ({seedServices.length}) and gallery items ({seedGallery.length}) into your Firebase database. 
            This only needs to be done once.
          </p>

          <Button
            onClick={seedData}
            disabled={loading}
            className="bg-rose-600 hover:bg-rose-700"
          >
            {loading ? "Seeding..." : "Seed Data Now"}
          </Button>

          {status && (
            <div className={`p-3 rounded-lg text-sm ${
              status.includes("Error") ? "bg-red-900/30 text-red-400 border border-red-800" : 
              status.includes("Done") ? "bg-green-900/30 text-green-400 border border-green-800" :
              status.includes("already") ? "bg-yellow-900/30 text-yellow-400 border border-yellow-800" :
              "bg-blue-900/30 text-blue-400 border border-blue-800"
            }`}>
              {status}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
