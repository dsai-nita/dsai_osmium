import { useState } from 'react'
import { Search, ChevronDown, MessageCircle, Users, Code, BookOpen, Calendar, Award, Phone, Mail } from 'lucide-react'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { motion, AnimatePresence } from 'motion/react'

interface FAQ {
  id: number
  question: string
  answer: string
  category: string
  contributor: string
}

const faqData: FAQ[] = [
  // General Questions by Samir
  {
    id: 1,
    question: "What is DSAI Club?",
    answer: "DSAI (Data Science and Artificial Intelligence) Club is a student-led organization dedicated to exploring and advancing knowledge in data science, artificial intelligence, machine learning, and related technologies. We provide a platform for students to learn, collaborate, and work on cutting-edge projects in the AI/ML domain.",
    category: "General",
    contributor: "Samir"
  },
  {
    id: 2,
    question: "Who can join the club?",
    answer: "The DSAI Club is open to all students regardless of their academic background or year of study. We welcome beginners as well as experienced individuals who are passionate about data science and artificial intelligence.",
    category: "Membership",
    contributor: "Samir"
  },
  {
    id: 3,
    question: "Do I need to know programming before joining?",
    answer: "No prior programming knowledge is required! We welcome students from all backgrounds. We provide learning resources, mentorship, and workshops to help you get started with programming and data science concepts from scratch.",
    category: "Learning",
    contributor: "Samir"
  },
  {
    id: 4,
    question: "Do you provide learning resources?",
    answer: "Yes! We provide comprehensive learning resources including tutorials, documentation, project guides, research papers, coding challenges, and access to online courses. Our senior members also conduct regular workshops and study sessions.",
    category: "Learning",
    contributor: "Samir"
  },
  {
    id: 5,
    question: "Can students from any branch join?",
    answer: "Absolutely! DSAI Club welcomes students from all academic branches - Computer Science, Electronics, Mechanical, Civil, Management, and more. Data science and AI have applications across all domains, and diverse perspectives enrich our community.",
    category: "Membership",
    contributor: "Samir"
  },

  // Questions by Kankana Shib
  {
    id: 6,
    question: "When did DSAI club start?",
    answer: "DSAI Club was established with the vision of creating a community of AI enthusiasts and data science practitioners. Since its inception, we have grown into one of the most active technical clubs, organizing numerous events, workshops, and the flagship AIspire program.",
    category: "General",
    contributor: "Kankana Shib"
  },
  {
    id: 7,
    question: "How can I become a member?",
    answer: "You can join DSAI Club by participating in our AIspire recruitment program, attending our events, or reaching out to us directly through our contact channels. We conduct regular recruitment drives and welcome new members throughout the year.",
    category: "Membership",
    contributor: "Kankana Shib"
  },
  {
    id: 8,
    question: "Does any membership fee required?",
    answer: "No, there is no membership fee required to join DSAI Club. We believe in making quality education and opportunities accessible to all students regardless of their financial background.",
    category: "Membership",
    contributor: "Kankana Shib"
  },
  {
    id: 9,
    question: "What skills will I learn by joining?",
    answer: "You'll learn programming languages (Python, R, JavaScript), machine learning algorithms, data analysis, deep learning, computer vision, natural language processing, project management, teamwork, presentation skills, and much more!",
    category: "Learning",
    contributor: "Kankana Shib"
  },

  // Questions by Sumit Paul
  {
    id: 10,
    question: "Do I need prior coding or AI knowledge to join?",
    answer: "Not at all! We welcome complete beginners. Our club is designed to support learners at every level. We have mentorship programs, beginner-friendly workshops, and step-by-step learning paths to help you get started.",
    category: "Learning",
    contributor: "Sumit Paul"
  },
  {
    id: 11,
    question: "Does the club provide mentorship and opportunities to work on projects?",
    answer: "Yes! We have a structured mentorship program where senior members guide newcomers. You'll get opportunities to work on real-world projects, participate in hackathons, contribute to open-source projects, and collaborate with industry partners.",
    category: "Projects",
    contributor: "Sumit Paul"
  },
  {
    id: 12,
    question: "How do study groups and project groups work?",
    answer: "We organize study groups based on topics and skill levels. Project groups are formed around specific interests or ongoing projects. Members can join multiple groups and collaborate on various initiatives while learning from peers and seniors.",
    category: "Learning",
    contributor: "Sumit Paul"
  },
  {
    id: 13,
    question: "When and how often does the club meet?",
    answer: "We have regular weekly meetings, workshops, and study sessions. Special events and hackathons are organized monthly. The schedule is flexible and announced in advance through our communication channels.",
    category: "Events",
    contributor: "Sumit Paul"
  },
  {
    id: 14,
    question: "What is expected in terms of time commitment?",
    answer: "Time commitment is flexible based on your availability and interest level. Active participation in 2-3 hours per week for meetings and projects is recommended, but you can contribute more or less based on your schedule.",
    category: "General",
    contributor: "Sumit Paul"
  },
  {
    id: 15,
    question: "Does the club help with internships or placements?",
    answer: "Yes! We provide career guidance, help with resume building, conduct mock interviews, share internship opportunities, and connect members with industry professionals. Many of our alumni have secured positions in top tech companies.",
    category: "Career",
    contributor: "Sumit Paul"
  }
]

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
    <div className="min-h-screen pt-16 bg-gradient-to-b from-background via-background to-card">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="gradient-text mb-6">
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
            className="flex flex-wrap justify-center gap-2 mb-12"
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
      <section className="py-12 px-4">
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
                href="mailto:officialdatascienceaiclub.nita@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors duration-300 glow-cyan"
              >
                <Phone className="h-4 w-4" />
                Email Us
              </a>
              <a
                href="https://wa.me/1234567890" // replace with your WhatsApp number
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