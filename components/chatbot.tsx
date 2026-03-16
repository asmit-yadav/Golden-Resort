"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send } from "lucide-react"

interface Message {
  text: string
  isBot: boolean
  timestamp: Date
  options?: string[]
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! Welcome to Golden Resort, your event planning assistant. How can I help you create your perfect event today?",
      isBot: true,
      timestamp: new Date(),
      options: ["Wedding Planning", "Corporate Event", "Birthday Party", "Get Quote", "View Gallery"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickReplies = [
    "Wedding Planning",
    "Corporate Event",
    "Birthday Party",
    "Anniversary",
    "Get Quote",
    "View Gallery",
    "Contact Info",
    "Pricing",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (message: string): { text: string; options?: string[] } => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("wedding")) {
      return {
        text: "Wonderful! We specialize in creating magical wedding experiences. Our wedding services include:\n\n• Venue selection and decoration\n• Bridal makeup and photography\n• Catering and menu planning\n• Entertainment and music\n• Complete coordination\n\nWould you like to schedule a consultation or get a quote?",
        options: ["Schedule Consultation", "Get Wedding Quote", "View Wedding Gallery", "Call Now"],
      }
    } else if (lowerMessage.includes("corporate")) {
      return {
        text: "Perfect! We excel at corporate events that impress and inspire. Our corporate services include:\n\n• Conference and seminar planning\n• Product launches\n• Team building events\n• Award ceremonies\n• Networking events\n\nWhat type of corporate event are you planning?",
        options: ["Conference", "Product Launch", "Team Building", "Get Corporate Quote"],
      }
    } else if (lowerMessage.includes("birthday")) {
      return {
        text: "How exciting! We love creating memorable birthday celebrations. Our birthday party services include:\n\n• Themed decorations\n• Entertainment and activities\n• Custom cakes and catering\n• Photography and videography\n• Party favors and gifts\n\nWhat age group and theme are you considering?",
        options: ["Kids Party", "Adult Birthday", "Milestone Birthday", "Get Birthday Quote"],
      }
    } else if (lowerMessage.includes("quote") || lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return {
        text: "I'd be happy to help you get a personalized quote! To provide accurate pricing, I'll need some details:\n\n• Event type and date\n• Number of guests\n• Venue preference\n• Budget range\n• Special requirements\n\nWould you like to fill out our quick quote form or speak directly with our team?",
        options: ["Fill Quote Form", "Call for Quote", "WhatsApp Quote", "Email Quote"],
      }
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("phone") || lowerMessage.includes("call")) {
      return {
        text: "Here's how you can reach us:\n\n📞 Phone: +91 88404 48039\n📧 Email: info@goldenresort.com\n📍 Address: Medical College Road, Near Nav Jeevan School, Gorakhpur\n🕒 Hours: Mon-Sat 10AM-7PM\n\nWe're always ready to help plan your perfect event!",
        options: ["Call Now", "Send Email", "WhatsApp", "Get Directions"],
      }
    } else if (
      lowerMessage.includes("gallery") ||
      lowerMessage.includes("photos") ||
      lowerMessage.includes("portfolio")
    ) {
      return {
        text: "I'd love to show you our work! Our gallery features stunning photos from recent events including weddings, corporate events, and celebrations. You can view our complete portfolio on our website.",
        options: ["View Gallery", "Wedding Photos", "Corporate Events", "Social Events"],
      }
    } else {
      return {
        text: "Thank you for your message! I'd be happy to help you with any questions about our event planning services. Our team specializes in creating unforgettable experiences for all types of celebrations.\n\nWhat would you like to know more about?",
        options: ["Our Services", "Get Quote", "View Gallery", "Contact Info"],
      }
    }
  }

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = { text: message, isBot: false, timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(
      () => {
        const response = getBotResponse(message)
        const botMessage: Message = {
          text: response.text,
          isBot: true,
          timestamp: new Date(),
          options: response.options,
        }
        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "Call Now":
        window.open("tel:+918840448039", "_blank")
        break
      case "Send Email":
        window.open("mailto:info@goldenresort.com", "_blank")
        break
      case "WhatsApp":
        window.open("https://wa.me/918840448039?text=Hi! I'm interested in your event planning services.", "_blank")
        break
      case "View Gallery":
        window.open("#gallery", "_self")
        setIsOpen(false)
        break
      case "Get Directions":
        window.open("https://maps.google.com/?q=Medical+College+Road,+Gorakhpur", "_blank")
        break
      default:
        handleSendMessage(action)
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      // Reset scroll when opening
      setTimeout(scrollToBottom, 100)
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="text-white text-lg sm:text-xl" />
        ) : (
          <MessageCircle className="text-white text-lg sm:text-xl" />
        )}
        {!isOpen && <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 sm:bottom-24 left-2 sm:left-6 z-30 w-[calc(100vw-16px)] sm:w-80 lg:w-96 h-[70vh] sm:h-96 animate-fade-in-up">
          <Card className="h-full flex flex-col shadow-2xl border-0 bg-white">
            <CardHeader className="p-3 sm:p-4 rounded-t-lg bg-gradient-to-r from-rose-600 to-pink-600 text-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle size={16} className="sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base">Golden Resort Assistant</h3>
                    <p className="text-xs text-white/90">Online • Typically replies instantly</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                    <div className="max-w-[85%]">
                      <div
                        className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm leading-relaxed ${
                          message.isBot
                            ? "bg-gray-100 text-gray-800 rounded-bl-none"
                            : "bg-rose-600 text-white rounded-br-none"
                        }`}
                      >
                        <div className="whitespace-pre-line">{message.text}</div>
                      </div>

                      {/* Quick Action Buttons */}
                      {message.isBot && message.options && (
                        <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                          {message.options.map((option, optionIndex) => (
                            <Button
                              key={optionIndex}
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuickAction(option)}
                              className="text-xs px-2 py-1 h-auto border-rose-200 text-rose-600 hover:bg-rose-50 rounded-full"
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      )}

                      <div className={`text-xs text-gray-500 mt-1 ${message.isBot ? "text-left" : "text-right"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none max-w-[85%]">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="p-2 sm:p-3 border-t border-gray-200 bg-gray-50">
                <div className="grid grid-cols-2 gap-1 sm:gap-2 mb-2 sm:mb-3">
                  {quickReplies.slice(0, 4).map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(reply)}
                      className="text-xs px-2 py-1 h-auto border-rose-200 text-rose-600 hover:bg-rose-50"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>

                {/* Input */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                  <Button
                    onClick={() => handleSendMessage(inputValue)}
                    size="sm"
                    className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-2 rounded-lg"
                    disabled={!inputValue.trim()}
                  >
                    <Send size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
