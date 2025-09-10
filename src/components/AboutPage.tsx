import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icons } from './Icons'
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { ImageWithFallback } from "./dsai/ImageWithFallback"
import { FloatingKeywords } from "./FloatingKeywords"
import { toast } from 'sonner@2.0.3'

export function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactInfo = [
    {
      icon: Icons.Mail,
      title: "Email Address",
      info: "dsai@nita.ac.in",
      description: "Send us an email for general inquiries",
      color: "text-accent"
    },
    {
      icon: Icons.Phone,
      title: "Phone Number",
      info: "+91 9876543210",
      description: "Call us during office hours",
      color: "text-secondary"
    },
    {
      icon: Icons.MapPin,
      title: "Location",
      info: "National Institute of Technology Agartala",
      description: "Jirania, West Tripura, Tripura 799046",
      color: "text-primary"
    },
  ]

  const socialLinks = [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/company/dsai-nita/",
      handle: "@dsai-nita"
    },
    {
      platform: "GitHub",
      url: "https://github.com/dsai-nita",
      handle: "@dsai-nita"
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/dsai_nita?utm_source=ig_web_button_share_sheet&igsh=ODdmZWVhMTFiMw==",
      handle: "@dsai_nita"
    },
    {
      platform: "WhatsApp",
      url: "https://chat.whatsapp.com/EJcQIjR5xCc4KrNYDNIKXp",
      handle: "Join our community"
    },
    {
      platform: "Youtube",
      url: "https://youtube.com/@datascienceaiclubnita?si=N__PDHswu8E8Dkww",
      handle: "Join our community"
    },

  ]

  const inquiryTypes = [
    'General Information',
    'Membership Inquiry',
    'Event Registration',
    'Workshop Enrollment',
    'Project Collaboration',
    'Internship Opportunities',
    'Media & Press',
    'Other'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: ''
      })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-24 relative overflow-hidden">
      <FloatingKeywords count={12} area="full" opacity={0.15} />
      
      {/* Hero Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                ABOUT <span className="text-accent">DSAI</span> CLUB
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Fostering innovation and excellence in the field of Data Science and Artificial Intelligence at NIT Agartala since January 2022.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-all"
                  asChild
                >
                  <Link to="/aispire">
                    Join Us <Icons.ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-border hover:border-accent/40 transition-all"
                  onClick={() => {
                    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Contact Us
                </Button>
              </div>
            </div>

            <Card className="rounded-xl overflow-hidden animate-fade-in animate-delay-200 border-border/50">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZ3xlbnwxfHx8fDE3NTY0NjQ2NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="DSAI Club Team"
                className="w-full h-auto"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="py-16 bg-muted/30 relative">
        <FloatingKeywords count={6} area="full" opacity={0.1} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <p className="text-accent text-2xl font-medium mb-4">Our Foundation</p>
            <h2 className="text-4xl font-bold gradient-text mb-4">Vision & Mission</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Guiding principles that drive our community forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 border-border/50 hover:border-accent/50 transition-all duration-300 hover:glow-accent animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-bold mb-4 text-accent">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be a leading student community that fosters innovation and excellence in the field of Data Science and Artificial Intelligence, empowering students to tackle real-world challenges and drive positive change through technology.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-cyan animate-fade-in animate-delay-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold mb-4 text-secondary">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To create a collaborative learning environment where students can develop their skills in Data Science and AI through hands-on projects, workshops, and mentorship, while building a strong network of like-minded individuals passionate about technological advancement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-6">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-accent text-3xl font-medium mb-4">Our Story</p>
            <h2 className="text-4xl font-bold gradient-text mb-4">The DSAI Journey</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              From a small initiative to a thriving community of data science and AI enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 border-border/50 hover:border-accent/50 transition-all duration-300 hover:glow-accent animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl font-bold mb-4">The Inception</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Established in January 2023 by a group of students passionate about AI and data science, the DSAI Club started with a vision to foster innovation and collaboration.
                </p>
                <p className="text-muted-foreground/70">2022</p>
              </CardContent>
            </Card>

            <Card className="p-8 border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-cyan animate-fade-in animate-delay-200">
              <CardHeader>
                <CardTitle className="text-xl font-bold mb-4">Building Momentum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  By 2024, the club had grown significantly, hosting workshops, hackathons, and research projects, attracting students eager to explore AI and machine learning.
                </p>
                <p className="text-muted-foreground/70">2023</p>
              </CardContent>
            </Card>

            <Card className="p-8 border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-cyan animate-fade-in animate-delay-200">
              <CardHeader>
                <CardTitle className="text-xl font-bold mb-4">Building Momentum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                   the club had grown significantly, hosting workshops, hackathons, and research projects, attracting students eager to explore AI and machine learning.
                </p>
                <p className="text-muted-foreground/70">2024</p>
              </CardContent>
            </Card>

            <Card className="p-8 border-border/50 hover:border-primary/50 transition-all duration-300 hover:glow-primary animate-fade-in animate-delay-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold mb-4">Shaping the Future</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Now in 2025, DSAI Club is one of the most vibrant technical communities at NIT Agartala, with a growing network of members, industry collaborations, and impactful projects.
                </p>
                <p className="text-muted-foreground/70">2025 - Present</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-accent text-3xl font-medium mb-4">Recognition</p>
            <h2 className="text-4xl font-bold gradient-text mb-4">Our Achievements</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Milestones and recognition that highlight our journey of excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 border-border/50 hover:border-accent/50 transition-all duration-300 hover:glow-accent animate-fade-in">
              <CardContent className="flex items-start space-x-4">
                <div className="bg-accent/20 rounded-full p-3 text-accent">
                  <Icons.CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Innovative Project Works</h3>
                  <p className="text-muted-foreground">Developed AI-powered applications such as Face Recognition, Sky Saving Pro, and Plant Disease Detector.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-cyan animate-fade-in animate-delay-100">
              <CardContent className="flex items-start space-x-4">
                <div className="bg-secondary/20 rounded-full p-3 text-secondary">
                  <Icons.CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Competitive Excellence</h3>
                  <p className="text-muted-foreground">Achieved top positions in national and international AI & ML hackathons, including Smart India Hackathon and Google Solution Challenge.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-border/50 hover:border-primary/50 transition-all duration-300 hover:glow-primary animate-fade-in animate-delay-200">
              <CardContent className="flex items-start space-x-4">
                <div className="bg-primary/20 rounded-full p-3 text-primary">
                  <Icons.CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Workshops & Collaborations</h3>
                  <p className="text-muted-foreground">Organized workshops on Machine Learning, Quantum Computing, and Automation with experts from Google.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-border/50 hover:border-accent/50 transition-all duration-300 hover:glow-accent animate-fade-in animate-delay-300">
              <CardContent className="flex items-start space-x-4">
                <div className="bg-accent/20 rounded-full p-3 text-accent">
                  <Icons.CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Research & Industry Placements</h3>
                  <p className="text-muted-foreground">Members published AI research papers and secured internships at top tech firms.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Get In Touch</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have questions about DSAI Club? Want to collaborate on a project? We'd love to hear from you.
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((contact, index) => (
              <Card key={index} className="border-border/50 hover:border-accent/50 transition-all duration-300 hover:glow-accent text-center">
                <CardHeader>
                  <div className={`mx-auto mb-4 p-3 rounded-full bg-card border border-border w-fit`}>
                    <contact.icon className={`h-6 w-6 ${contact.color}`} />
                  </div>
                  <CardTitle className="text-lg">{contact.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-foreground mb-2">{contact.info}</p>
                  <p className="text-sm text-muted-foreground">{contact.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form and Social */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-6">Send us a Message</h3>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <Label htmlFor="inquiryType">Inquiry Type</Label>
                    <Select onValueChange={(value) => handleInputChange('inquiryType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Brief subject of your message"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Icons.Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Social Media Section */}
            <div className="space-y-4">

              {/* Social Media */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className='text-2xl font-bold gradient-text mb-2'>Connect With Us</CardTitle>
                  <CardDescription>
                    Follow us on social media for updates and community discussions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {socialLinks.map((social, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <div>
                          <p className="font-medium">{social.platform}</p>
                          <p className="text-sm text-muted-foreground">{social.handle}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(social.url, '_blank')}
                        >
                          Follow
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(100,255,218,0.1),transparent_70%)]" />
        <FloatingKeywords count={8} area="full" opacity={0.2} />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">Be Part of Our Journey</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            Join our club of innovators, builders, and problem solvers. Together, we can push the boundaries of what's possible with data science and artificial intelligence.
          </p>

          <Button 
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 h-auto rounded-full shadow-lg hover:shadow-accent/20 transition-all animate-fade-in animate-delay-200"
            asChild
          >
            <Link to="/aispire">
              Join DSAI Club <Icons.ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}