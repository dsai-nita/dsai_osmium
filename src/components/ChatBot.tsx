import { useState, useEffect, useRef } from 'react';
import { Icons } from './Icons';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA & CONFIGURATION ---

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
}

interface QuickReply {
  id: string;
  text: string;
  response: string;
}

const quickReplies: QuickReply[] = [
  { id: '1', text: 'What is DSAI?', response: 'DSAI (Data Science and Artificial Intelligence) is a student club focused on exploring cutting-edge technologies in AI, machine learning, robotics, and data science. We organize workshops, build innovative projects, and foster a community of tech enthusiasts!' },
  { id: '2', text: 'How can I join?', response: 'You can join DSAI by participating in our AIspire recruitment program. We welcome students from all backgrounds who are passionate about AI. Keep an eye on our Events page for upcoming recruitment drives!' },
  { id: '3', text: 'What projects are you working on?', response: 'Our members work on diverse projects including AI chatbots, autonomous robots, predictive analytics dashboards, and computer vision applications. Check out our Innovations page to explore our project portfolio!' },
];

const botResponses: { [key: string]: string } = {
  greeting: "Hi there! I'm the DSAI Assistant. I can help you learn about our club, events, projects, and how to get involved. What would you like to know?",
  default: "I'm here to help you with information about DSAI! You can ask me about our club activities, upcoming events, projects, or how to join.",
  goodbye: "Thanks for chatting! Feel free to reach out anytime if you have more questions about DSAI.",
  projects: "We work on exciting projects in AI, ML, and robotics! Visit our Innovations page to see detailed project information, or ask me about specific areas like 'computer vision projects' or 'robotics projects'.",
  events: "We organize workshops, seminars, and hackathons regularly. Check our Events page for upcoming activities with live countdowns and registration links!",
  contact: "You can reach us at officialdatascienceaiclub.nita@gmail.com for collaborations. We're also active on our social media channels!"
};

// --- MAIN COMPONENT ---

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        addMessage(botResponses.greeting, 'bot');
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addMessage = (content: string, sender: 'user' | 'bot') => {
    const message: Message = { id: Date.now().toString(), content, sender };
    setMessages(prev => [...prev, message]);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    if (input.includes('hello') || input.includes('hi')) return botResponses.greeting;
    if (input.includes('bye') || input.includes('thanks')) return botResponses.goodbye;
    if (input.includes('project') || input.includes('innovation')) return botResponses.projects;
    if (input.includes('event') || input.includes('workshop')) return botResponses.events;
    if (input.includes('contact') || input.includes('email')) return botResponses.contact;
    return botResponses.default;
  };

  const handleSendMessage = async () => {
    const userMessage = inputValue.trim();
    if (!userMessage) return;

    addMessage(userMessage, 'user');
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(userMessage);
      addMessage(response, 'bot');
      setIsTyping(false);
    }, 1200);
  };

  const handleQuickReply = (reply: QuickReply) => {
    addMessage(reply.text, 'user');
    setIsTyping(true);
    
    setTimeout(() => {
      addMessage(reply.response, 'bot');
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Button onClick={() => setIsOpen(true)} className="w-16 h-16 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg glow-accent group flex items-center justify-center">
                <Icons.Bot className="h-8 w-8 group-hover:scale-110 transition-transform" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            // The 'cn' function has been replaced with a template literal here
            className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm transition-all duration-300 ease-in-out`}
          >
            <Card className="h-[70vh] max-h-[600px] flex flex-col bg-card/80 backdrop-blur-xl border border-border shadow-2xl rounded-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Icons.Bot className="h-8 w-8 text-accent" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">DSAI Assistant</h3>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>
                <Button size="icon" variant="ghost" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full">
                  <Icons.X className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      // The 'cn' function has been replaced with a template literal here
                      className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        // The 'cn' function has been replaced with a template literal here
                        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-none'
                            : 'bg-muted rounded-bl-none'
                        }`}
                      >
                        {message.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-muted rounded-2xl rounded-bl-none px-4 py-2 flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </motion.div>
                )}

                {messages.length === 1 && !isTyping && (
                   <div className="pt-4 space-y-2">
                     <p className="text-xs text-muted-foreground text-center">Or ask one of these:</p>
                     {quickReplies.map((reply) => (
                       <Button key={reply.id} variant="outline" className="w-full justify-start h-auto text-left" onClick={() => handleQuickReply(reply)}>
                         {reply.text}
                       </Button>
                     ))}
                   </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask a question..."
                    className="flex-1 text-sm bg-muted border-border"
                    disabled={isTyping}
                  />
                  <Button size="icon" onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
                    <Icons.Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}