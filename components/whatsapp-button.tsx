"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X, Phone } from "lucide-react"

export default function WhatsAppButton() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleWhatsAppClick = () => {
    const phoneNumber = "918840448039"
    const message = "Hi! I'm interested in your event planning services. Could you please provide more information?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleTooltipToggle = () => {
    setIsTooltipVisible(!isTooltipVisible)

    // Auto-hide tooltip on mobile after 5 seconds
    if (isMobile && !isTooltipVisible) {
      setTimeout(() => {
        setIsTooltipVisible(false)
      }, 5000)
    }
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-30">
      {/* Tooltip */}
      {isTooltipVisible && (
        <div
          className={`absolute ${isMobile ? "bottom-16 right-0 w-72" : "bottom-16 right-0 w-64"} bg-white rounded-lg shadow-xl border border-gray-200 p-4 mb-2 animate-fade-in`}
        >
          <button
            onClick={() => setIsTooltipVisible(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-1"
            aria-label="Close tooltip"
          >
            <X size={14} />
          </button>

          <div className="pr-6">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle size={16} className="text-white" />
              </div>
              <div>
                <p className="text-gray-800 font-semibold text-sm">Golden Resort</p>
                <p className="text-green-600 text-xs">Online now</p>
              </div>
            </div>

            <p className="text-gray-700 text-sm mb-3 leading-relaxed">
              Need help planning your event? Chat with us on WhatsApp for quick assistance and instant quotes!
            </p>

            <div className="space-y-2">
              <button
                onClick={handleWhatsAppClick}
                className="bg-green-500 hover:bg-green-600 text-white text-sm py-2 px-4 rounded-lg w-full transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle size={16} />
                <span>Start WhatsApp Chat</span>
              </button>

              <button
                onClick={() => window.open("tel:+918840448039", "_self")}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded-lg w-full transition-colors flex items-center justify-center space-x-2"
              >
                <Phone size={16} />
                <span>Call Directly</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <button
        onClick={handleTooltipToggle}
        className="bg-green-500 hover:bg-green-600 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={isMobile ? 24 : 28} className="text-white group-hover:scale-110 transition-transform" />

        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
      </button>

      {/* Notification badge */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
        <span className="text-white text-xs font-bold">1</span>
      </div>
    </div>
  )
}
