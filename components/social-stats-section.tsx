// Vedika-Events/components/social-stats-section.tsx
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Youtube, Instagram, Facebook } from "lucide-react"

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M21.35 11.1h-9.35v2.9h5.5c-.3 1.6-1.5 3.3-3.6 3.3-2.2 0-4-1.8-4-4s1.8-4 4-4c1.1 0 2 .5 2.6 1.1l2.1-2.1C17.3 6.6 15.3 5.5 13 5.5c-3.6 0-6.5 2.9-6.5 6.5s2.9 6.5 6.5 6.5c3.8 0 6.3-2.7 6.3-6.3 0-.5-.1-.9-.2-1.3z"
    />
  </svg>
)

const socialStats = [
  {
    icon: <Youtube size={36} className="text-red-600" />,
    rating: 5,
    ratingText: "#1",
    reviews: "250K+ Subscriber",
  },
  {
    icon: <GoogleIcon />,
    rating: 4.6,
    ratingText: "(4.6/5)",
    reviews: "5000+ Reviews",
  },
  {
    icon: <Facebook size={36} className="text-blue-600" />,
    rating: 4.2,
    ratingText: "(4.2/5)",
    reviews: "200K+ Followers",
  },
  {
    icon: <Instagram size={36} className="text-pink-600" />,
    rating: 5,
    ratingText: "(5/5)",
    reviews: "100K+ Followers",
  },
]

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={16} className="fill-yellow-400 text-yellow-400" />
      ))}
      {halfStar && <Star size={16} className="fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 50% 0 0)" }} />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={16} className="fill-gray-300 text-gray-300" />
      ))}
    </>
  )
}

export default function SocialStatsSection() {
  return (
    <section id="social-stats" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialStats.map((stat, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center flex flex-col items-center">
                  <div className="mb-4">{stat.icon}</div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">{stat.ratingText}</span>
                    <div className="flex">{renderStars(stat.rating)}</div>
                  </div>
                  <p className="text-gray-600 text-lg font-medium mt-2">{stat.reviews}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}