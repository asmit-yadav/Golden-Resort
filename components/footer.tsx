import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src="/logo.svg" alt="Golden Resort Logo" className="h-12 w-auto" />
                <h3 className="text-2xl font-bold text-rose-400">Golden Resort</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                We specialize in creating unforgettable experiences for weddings, corporate events, and special occasions. 
                Our team of experts brings your vision to life with creativity and precision.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-rose-400 transition-transform duration-300 hover:scale-110">
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-rose-400 transition-transform duration-300 hover:scale-110">
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-rose-400 transition-transform duration-300 hover:scale-110">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-6 w-6" />
                </a>
                 <a href="#" className="text-gray-400 hover:text-rose-400 transition-transform duration-300 hover:scale-110">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-rose-400">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-300 hover:text-rose-400 transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-rose-400 transition-colors">About Us</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-rose-400 transition-colors">Services</a></li>
                <li><a href="#gallery" className="text-gray-300 hover:text-rose-400 transition-colors">Gallery</a></li>
                <li><a href="#testimonials" className="text-gray-300 hover:text-rose-400 transition-colors">Testimonials</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-rose-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-rose-400">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-300">Medical College Road, Infront of Gularahia Thana, Near Nav Jeevan School, Gorakhpur</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-300 hover:text-rose-400 transition-colors"><a href="tel:+918840448039">+91 88404 48039</a></span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-300 hover:text-rose-400 transition-colors"><a href="mailto:info@goldenresort.com">info@goldenresort.com</a></span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 Golden Resort. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-rose-400 text-sm transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-rose-400 text-sm transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-rose-400 text-sm transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}