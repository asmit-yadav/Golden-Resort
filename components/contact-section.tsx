"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, Send, Navigation, ExternalLink, MessageCircle, FileText } from "lucide-react"

export default function ContactSection() {
  const contactInfo = [
    {
      icon: <Phone size={20} className="text-rose-600" />,
      title: "Call Us",
      details: ["+91 88404 48039"],
      action: () => window.open("tel:+918840448039"),
    },
    {
      icon: <Mail size={20} className="text-rose-600" />,
      title: "Email Us",
      details: ["info@goldenresort.com", "bookings@goldenresort.com"],
      action: () => window.open("mailto:info@goldenresort.com"),
    },
    {
      icon: <Clock size={20} className="text-rose-600" />,
      title: "Business Hours",
      details: ["Monday - Saturday: 10:00 AM - 7:00 PM", "Sunday: By Appointment Only"],
    },
  ]

  const handleGetDirections = () => {
    const address = "Medical College Road, Infront of Gularahia Thana, Near Nav Jeevan School, Gorakhpur"
    const googleMapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`
    window.open(googleMapsUrl, "_blank")
  }

  const handleViewOnMaps = () => {
    const address = "Medical College Road, Infront of Gularahia Thana, Near Nav Jeevan School, Gorakhpur"
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    window.open(googleMapsUrl, "_blank")
  }

  const openCertification = () => {
    window.open("https://drive.google.com/file/d/1234567890abcdefghijklmnopqrstuvwxyz/view?usp=sharing", "_blank")
  }

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-medium text-sm mb-4 sm:mb-6">
              Get In Touch
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">Contact & Find Us</h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-4">
              We're here to help you plan your next event. Reach out to us for a consultation, get directions to our office, or view our registration details.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">Contact Information</h3>
                <div className="grid gap-4 sm:gap-6">
                  {contactInfo.map((item, index) => (
                    <Card
                      key={index}
                      className={`border-none shadow-md hover:shadow-lg transition-all duration-300 ${item.action ? "cursor-pointer" : ""}`}
                      onClick={item.action}
                    >
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start space-x-4">
                          <div className="mt-1 flex-shrink-0">{item.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{item.title}</h4>
                            {item.details.map((detail, i) => (
                              <p key={i} className="text-gray-600 text-sm sm:text-base">
                                {detail}
                              </p>
                            ))}
                            {item.action && (
                              <div className="mt-2">
                                <ExternalLink size={14} className="text-rose-600" />
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">Our Certification</h3>
                 <Card
                      className="border-none shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={openCertification}
                    >
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start space-x-4">
                          <div className="mt-1 flex-shrink-0"><FileText size={20} className="text-rose-600" /></div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Registration Certification</h4>
                            <p className="text-gray-600 text-sm sm:text-base">
                              We are a legally registered and compliant entity.
                            </p>
                              <div className="mt-2">
                                <ExternalLink size={14} className="text-rose-600" />
                              </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
              </div>
            </div>

            {/* Map and Directions */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Find Us</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Visit our office or get directions to our location.</p>
                </div>
                <div className="rounded-lg overflow-hidden h-[300px] sm:h-[400px] bg-gray-200 relative">
                  <iframe
                    src="https://maps.google.com/maps?q=Medical+College+Road+Gularahia+Thana+Near+Nav+Jeevan+School+Gorakhpur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Golden Resort Location"
                    className="rounded-lg"
                  ></iframe>
                  <div className="absolute top-4 right-4 space-y-2">
                    <Button
                      onClick={handleViewOnMaps}
                      size="sm"
                      className="bg-white text-gray-700 hover:bg-gray-50 shadow-lg border"
                    >
                      <ExternalLink size={14} className="mr-1" />
                      View
                    </Button>
                  </div>
                </div>
                 <div className="space-y-4">
                <Card className="border-none shadow-md">
                  <CardContent className="p-4 sm:p-6">
                    <h4 className="font-bold text-gray-900 mb-4 text-sm sm:text-base">Quick Actions</h4>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <Button
                        onClick={handleGetDirections}
                        className="w-full bg-rose-600 hover:bg-rose-700 text-white justify-center text-sm"
                      >
                        <Navigation size={16} className="mr-2" />
                        Get Directions
                      </Button>

                      <Button
                        onClick={() => window.open("tel:+918840448039")}
                        variant="outline"
                        className="w-full justify-center text-sm border-rose-200 text-rose-600 hover:bg-rose-50"
                      >
                        <Phone size={16} className="mr-2" />
                        Call Now
                      </Button>

                      <Button
                        onClick={() =>
                          window.open("https://wa.me/9555228781?text=Hi! I need directions to your office.")
                        }
                        variant="outline"
                        className="w-full justify-center text-sm border-green-200 text-green-600 hover:bg-green-50"
                      >
                        <MessageCircle size={16} className="mr-2" />
                        WhatsApp
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}