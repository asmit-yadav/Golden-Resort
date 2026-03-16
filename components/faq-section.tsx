"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What types of events do you manage?",
    answer:
      "We manage a wide range of events, including weddings, corporate events (conferences, product launches), social gatherings (birthdays, anniversaries), festival celebrations, and more. We offer custom packages tailored to your specific needs.",
  },
  {
    question: "How do I get a quote for my event?",
    answer:
      "You can get a quote by filling out the form on our 'Book Now' or 'Contact Us' page. You can also call us or send us a WhatsApp message for a faster response. The more details you provide, the more accurate our initial quote will be.",
  },
  {
    question: "Do you handle destination weddings?",
    answer:
      "Yes, we specialize in planning and executing destination weddings. We handle all logistics, including travel, accommodations, venue selection, and local vendor coordination, to ensure a seamless experience for you and your guests.",
  },
  {
    question: "What is your payment process?",
    answer:
      "We typically require an initial deposit to secure your date, with the remaining balance paid in installments leading up to the event day. We offer various payment methods and will outline the complete schedule in our proposal.",
  },
  {
    question: "Can you work with a specific budget?",
    answer:
      "Absolutely. We pride ourselves on creating amazing events for a wide range of budgets. Let us know your budget, and we will work with you to create a package that meets your financial needs without compromising on quality.",
  },
]

export default function FaqSection() {
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-medium text-sm mb-6">
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Have questions? We've got answers. Here are some of the most common questions we receive about our event planning services.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                <AccordionTrigger className="text-left text-lg font-medium text-gray-800 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-600 leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}