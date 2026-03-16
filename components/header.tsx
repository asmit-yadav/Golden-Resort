"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled || isMenuOpen ? "bg-gray-900/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" aria-label="Golden Resort Home" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Golden Resort Logo" className="h-14 w-auto" />
            <span className="text-xl font-bold text-white tracking-wide">Golden Resort</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            <Link
              href="/#home"
              className="font-medium text-gray-200 transition-colors duration-300 hover:text-rose-400 px-4 py-2 rounded-md"
            >
              Home
            </Link>
            <Link
              href="/#about"
              className="font-medium text-gray-200 transition-colors duration-300 hover:text-rose-400 px-4 py-2 rounded-md"
            >
              About
            </Link>
            <Link
              href="/#services"
              className="font-medium text-gray-200 transition-colors duration-300 hover:text-rose-400 px-4 py-2 rounded-md"
            >
              Services
            </Link>
            <Link
              href="/#gallery"
              className="font-medium text-gray-200 transition-colors duration-300 hover:text-rose-400 px-4 py-2 rounded-md"
            >
              Gallery
            </Link>
            <Link
              href="/#testimonials"
              className="font-medium text-gray-200 transition-colors duration-300 hover:text-rose-400 px-4 py-2 rounded-md"
            >
              Testimonials
            </Link>
            <Link
              href="/admin/login"
              className="font-medium text-gray-200 transition-colors duration-300 hover:text-rose-400 px-4 py-2 rounded-md"
            >
              Admin
            </Link>
            <Link href="/book-now" passHref>
               <Button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded-md transition-transform duration-300 hover:scale-105">
                 Book Now
               </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-gray-900/95 shadow-lg">
          <nav className="container mx-auto px-4 py-6">
            <div className="flex flex-col space-y-4">
              <Link
                href="/#home"
                className="font-medium text-gray-200 hover:text-rose-400 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/#about"
                className="font-medium text-gray-200 hover:text-rose-400 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/#services"
                className="font-medium text-gray-200 hover:text-rose-400 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/#gallery"
                className="font-medium text-gray-200 hover:text-rose-400 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="/#testimonials"
                className="font-medium text-gray-200 hover:text-rose-400 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="/admin/login"
                className="font-medium text-gray-200 hover:text-rose-400 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
              <Link href="/book-now" passHref>
                 <Button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded-md w-full transition-transform duration-300 hover:scale-105">
                   Book Now
                 </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}