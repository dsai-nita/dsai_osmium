import { useState, useEffect, useRef } from 'react'
import { Icons } from './Icons'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { motion, AnimatePresence } from 'motion/react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface QuickReply {
  id: string
  text: string
  response: string
}

const quickReplies: QuickReply[] = [
  {
    id: '1',
    text: 'What is DSAI?',
    response: 'DSAI (Data Science and Artificial Intelligence) is a student club focused on exploring cutting-edge technologies in AI, machine learning, robotics, and data science. We organize workshops, build innovative projects, and foster a community of tech enthusiasts!'
  },
  {
    id: '2',
    text: 'How to join DSAI?',
    response: 'You can join DSAI by visiting our AIspire recruitment program page and filling out the application form. We welcome students from all backgrounds who are passionate about AI and technology. Check out our Events page for upcoming recruitment drives!'
  },
  {
    id: '3',
    text: 'Upcoming events?',
    response: 'We regularly organize workshops, seminars, hackathons, and tech talks. Visit our Events page to see upcoming events with countdown timers and registration links. You can also join our newsletter to stay updated!'
  },
  {
    id: '4',
    text: 'What projects do you work on?',
    response: 'Our members work on diverse projects including AI chatbots, autonomous robots, predictive analytics dashboards, computer vision applications, and IoT systems. Check out our Innovations page to explore our project portfolio!'
  },
  {
    id: '5',
    text: 'Meeting schedule?',
    response: 'We hold regular meetings every Friday at 6 PM in the Tech Hub. We also have special workshop sessions and project collaboration meetings. Follow our announcements for any schedule changes or additional meetings.'
  }
]

const botResponses = {
  greeting: "Hi there! I'm the DSAI Assistant. I can help you learn about our club, events, projects, and how to get involved. What would you like to know?",
  default: "I'm here to help you with information about DSAI! You can ask me about our club activities, upcoming events, projects, or how to join. Feel free to use the quick replies below or type your question.",
  goodbye: "Thanks for chatting! Feel free to reach out anytime if you have more questions about DSAI. See you around!",
  projects: "We work on exciting projects in AI, ML, robotics, and more! Visit our Innovations page to see detailed project information, or ask me about specific areas like 'computer vision projects' or 'robotics projects'.",
  events: "We organize workshops, seminars, hackathons, and tech talks regularly. Check our Events page for upcoming activities with live countdowns and registration links!",
  contact: "You can reach us at dsai@college.edu for collaborations, or visit our Contact page for more details. We're also active on our social media channels!"
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chat opens for the first time
      addBotMessage(botResponses.greeting)
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addBotMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      content,
      sender: 'bot',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, message])
  }

  const addUserMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, message])
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    // Check for specific keywords and patterns
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return botResponses.greeting
    }
    
    if (input.includes('bye') || input.includes('goodbye') || input.includes('thanks')) {
      return botResponses.goodbye
    }
    
    if (input.includes('project') || input.includes('innovation') || input.includes('build')) {
      return botResponses.projects
    }
    
    if (input.includes('event') || input.includes('workshop') || input.includes('seminar') || input.includes('when')) {
      return botResponses.events
    }
    
    if (input.includes('contact') || input.includes('email') || input.includes('reach')) {
      return botResponses.contact
    }
    
    if (input.includes('join') || input.includes('member') || input.includes('how to')) {
      return "To join DSAI, visit our AIspire page and fill out the application form. We welcome passionate students from all backgrounds. You can also attend our events to learn more about our community!"
    }
    
    if (input.includes('meeting') || input.includes('schedule') || input.includes('time')) {
      return "We hold regular meetings every Friday at 6 PM in the Tech Hub. Special workshops and project sessions are announced separately. Check our Events page for the latest schedule!"
    }
    
    if (input.includes('ai') || input.includes('artificial intelligence') || input.includes('machine learning')) {
      return "We're passionate about AI and ML! We explore topics like neural networks, computer vision, NLP, and more. Our projects range from chatbots to autonomous systems. What specific AI topic interests you?"
    }
    
    if (input.includes('robot') || input.includes('robotics')) {
      return "Robotics is one of our core focus areas! We work on autonomous navigation robots, IoT integration, and intelligent systems. Check out our robotics projects in the Innovations section!"
    }
    
    // Default response
    return botResponses.default
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    addUserMessage(userMessage)
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = getBotResponse(userMessage)
      addBotMessage(response)
      setIsTyping(false)
    }, 1000)
  }

  const handleQuickReply = (reply: QuickReply) => {
    addUserMessage(reply.text)
    setIsTyping(true)
    
    setTimeout(() => {
      addBotMessage(reply.response)
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg glow-accent group"
            >
              <Icons.MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Card className={`bg-card border border-border shadow-2xl glow-accent transition-all duration-300 ${
              isMinimized ? 'w-80 h-16' : 'w-80 h-96'
            }`}>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <Icons.Bot className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-card-foreground">DSAI Assistant</h3>
                    <p className="text-xs text-muted-foreground">Always ready to help!</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="h-8 w-8 p-0"
                  >
                    {isMinimized ? (
                      <Icons.Maximize2 className="h-4 w-4" />
                    ) : (
                      <Icons.Minimize2 className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Icons.X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-60">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start gap-2 max-w-[80%] ${
                          message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                        }`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.sender === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-accent text-accent-foreground'
                          }`}>
                            {message.sender === 'user' ? (
                              <Icons.User className="h-3 w-3" />
                            ) : (
                              <Icons.Bot className="h-3 w-3" />
                            )}
                          </div>
                          <div className={`rounded-lg px-3 py-2 text-sm ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {message.content}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                            <Icons.Bot className="h-3 w-3" />
                          </div>
                          <div className="bg-muted rounded-lg px-3 py-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Replies */}
                  {messages.length <= 1 && (
                    <div className="px-4 pb-2">
                      <div className="text-xs text-muted-foreground mb-2">Quick questions:</div>
                      <div className="flex flex-wrap gap-1">
                        {quickReplies.slice(0, 3).map((reply) => (
                          <Badge
                            key={reply.id}
                            variant="outline"
                            className="cursor-pointer text-xs hover:bg-accent/10 transition-colors"
                            onClick={() => handleQuickReply(reply)}
                          >
                            {reply.text}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about DSAI..."
                        className="flex-1 text-sm"
                        disabled={isTyping}
                      />
                      <Button
                        size="sm"
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                        className="bg-accent text-accent-foreground hover:bg-accent/90"
                      >
                        <Icons.Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}