import { useState } from 'react'
import { Search, ChevronDown, MessageCircle, Users, Code, BookOpen, Calendar, Award, Phone, Mail } from 'lucide-react'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { motion, AnimatePresence } from 'motion/react'
import faqData from '../../assets/Faq'

interface FAQ {
  id: number
  question: string
  answer: string
  category: string
  contributor: string
}


const categories = ["All", "General", "Membership", "Learning", "Projects", "Events", "Career"]

const categoryIcons = {
  "General": MessageCircle,
  "Membership": Users,
  "Learning": BookOpen,
  "Projects": Code,
  "Events": Calendar,
  "Career": Award
}

export function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }

  return (
    <div className="min-h-screen pt-10 bg-gradient-to-b from-background via-background to-card">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="gradient-text font-bold text-5xl mb-10">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Find answers to common questions about DSAI Club, membership, learning opportunities, and more.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-md mx-auto mb-8"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glow-accent"
            />
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 mb-2"
          >
            {categories.map((category) => {
              const Icon = category !== "All" ? categoryIcons[category as keyof typeof categoryIcons] : null
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${selectedCategory === category
                    ? 'bg-primary text-primary-foreground border-primary glow-primary'
                    : 'bg-card text-card-foreground border-border hover:border-accent hover:glow-accent'
                    }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {category}
                </button>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* FAQ List */}
      <section className=" px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4"
          >
            <AnimatePresence>
              {filteredFAQs.map((faq, index) => {
                const Icon = categoryIcons[faq.category as keyof typeof categoryIcons]
                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:border-accent transition-colors duration-300"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full p-6 text-left hover:bg-muted/50 transition-colors duration-300 flex items-center justify-between group"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-accent/20 group-hover:text-accent transition-colors duration-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-card-foreground group-hover:text-accent transition-colors duration-300 text-left">
                            {faq.question}
                          </h3>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {faq.category}
                            </Badge>
                            {/* <span className="text-xs text-muted-foreground">
                              by {faq.contributor}
                            </span> */}
                          </div>
                        </div>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground group-hover:text-accent transition-all duration-300 ${expandedFAQ === faq.id ? 'transform rotate-180' : ''
                          }`}
                      />
                    </button>

                    <AnimatePresence>
                      {expandedFAQ === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pl-[4.5rem]">
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-xl font-medium text-card-foreground mb-2">No FAQs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or category filter
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="gradient-text mb-4">
              Still have questions?
            </h2>
            <p className="text-muted-foreground mb-8">
              Can't find the answer you're looking for? Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=officialdatascienceaiclub.nita@gmail.com&su=Hello&body=I%20want%20to%20connect!"

                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors duration-300 glow-cyan"
              >
                <Phone className="h-4 w-4" />
                Email Us
              </a>

              <a
                href="https://chat.whatsapp.com/EJcQIjR5xCc4KrNYDNIKXp" // replace with your WhatsApp number
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors duration-300 glow-cyan"
              >
                <Phone className="h-4 w-4" />
                Join WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )

}
