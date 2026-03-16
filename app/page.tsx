import Hero from "@/components/hero"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import GallerySection from "@/components/gallery-section"
import VideoSection from "@/components/video-section"
import TestimonialsSection from "@/components/testimonials-section"
import SocialStatsSection from "@/components/social-stats-section"
import FaqSection from "@/components/faq-section" 
import ContactSection from "@/components/contact-section"
import WhatsAppButton from "@/components/whatsapp-button"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <VideoSection />
      <TestimonialsSection />
      <FaqSection />
      <SocialStatsSection />
      <ContactSection />
      <WhatsAppButton />
    </main>
  )
}