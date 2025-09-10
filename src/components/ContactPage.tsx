import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icons } from './Icons'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { toast } from 'sonner@2.0.3'

export function ContactPage() {
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
      info: "dsai@collegeedu",
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
    {
      icon: Icons.Clock,
      title: "Office Hours",
      info: "Mon - Fri: 9:00 AM - 6:00 PM",
      description: "We're here to help during weekdays",
      color: "text-accent"
    }
  ]

  const socialLinks = [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/company/dsai-nit-agartala",
      handle: "@dsai-nit-agartala"
    },
    {
      platform: "GitHub",
      url: "https://github.com/dsai-nita",
      handle: "@dsai-nita"
    },
    {
      platform: "Instagram",
      url: "https://instagram.com/dsai_nita",
      handle: "@dsai_nita"
    },
    {
      platform: "WhatsApp",
      url: "https://chat.whatsapp.com/IZtjxNyjq6L5d9dYudzo5K",
      handle: "Join our community"
    }
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
    <div className="min-h-screen pt-24 pb-24">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">Get In Touch</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Have questions about DSAI Club? Want to collaborate on a project? 
            We'd love to hear from you. Reach out to us through any of the channels below.
          </p>
          
          {/* Quick Email Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
            <Button
              size="lg"
              onClick={() => window.location.href = 'mailto:dsai@collegeedu'}
              className="bg-accent hover:bg-accent/90 text-accent-foreground glow-accent px-8 py-4 text-lg font-medium w-full sm:w-auto"
            >
              <Icons.Mail className="mr-2 h-5 w-5" />
              Email Us: dsai@collegeedu
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-accent text-accent hover:bg-accent/10 px-8 py-4 text-lg font-medium w-full sm:w-auto"
            >
              <Icons.MessageCircle className="mr-2 h-5 w-5" />
              Send Message
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">Contact Information</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Multiple ways to connect with our team and community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((contact, index) => (
              <Card key={index} className="border-border/50 hover:border-accent/50 transition-all duration-300 hover:glow-accent text-center h-full">
                <CardHeader className="pb-4">
                  <div className={`mx-auto mb-4 p-3 rounded-full bg-card border border-border w-fit`}>
                    <contact.icon className={`h-6 w-6 ${contact.color}`} />
                  </div>
                  <CardTitle className="text-lg">{contact.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col h-full">
                  {contact.title === "Email Address" ? (
                    <div className="space-y-3 flex-1 flex flex-col">
                      <p className="font-semibold text-foreground">{contact.info}</p>
                      <p className="text-sm text-muted-foreground flex-1">{contact.description}</p>
                      <Button
                        size="sm"
                        onClick={() => window.location.href = 'mailto:dsai@collegeedu'}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground text-sm px-4 py-2 mt-4 w-full"
                      >
                        <Icons.Mail className="mr-1 h-4 w-4" />
                        Send Email
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full">
                      <p className="font-semibold text-foreground mb-2">{contact.info}</p>
                      <p className="text-sm text-muted-foreground flex-1">{contact.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold gradient-text mb-6">Send us a Message</h2>
            <p className="text-muted-foreground mb-8">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
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

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isSubmitting}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground py-3"
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
                
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = 'mailto:dsai@collegeedu'}
                  className="border-accent text-accent hover:bg-accent/10 py-3 sm:w-auto w-full"
                >
                  <Icons.Mail className="mr-2 h-4 w-4" />
                  Quick Email
                </Button>
              </div>

            </form>
          </div>

          {/* Social Media Section */}
          <div className="space-y-8">

            {/* Social Media */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Connect With Us</CardTitle>
                <CardDescription>
                  Follow us on social media for updates and community discussions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{social.platform}</p>
                        <p className="text-sm text-muted-foreground truncate">{social.handle}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(social.url, '_blank')}
                        className="ml-4 flex-shrink-0"
                      >
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
                <CardDescription>
                  Frequently visited pages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    asChild
                    className="justify-start"
                  >
                    <Link to="/aispire">Join AIspire</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    asChild
                    className="justify-start"
                  >
                    <Link to="/events">Upcoming Events</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    asChild
                    className="justify-start"
                  >
                    <Link to="/squad">Our Team</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    asChild
                    className="justify-start"
                  >
                    <Link to="/faq">FAQs</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold gradient-text mb-6">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mb-8">
            Can't find what you're looking for? Check out our comprehensive FAQ section.
          </p>
          <Button 
            size="lg"
            variant="outline"
            asChild
            className="border-accent text-accent hover:bg-accent/10"
          >
            <Link to="/faq">View All FAQs</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}