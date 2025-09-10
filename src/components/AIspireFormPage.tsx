import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icons } from './Icons'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Checkbox } from './ui/checkbox'
import { toast } from 'sonner@2.0.3'

export function AIspireFormPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    year: '',
    
    // Technical Background
    programmingLanguages: [] as string[],
    experience: '',
    projects: '',
    
    // Motivation
    motivation: '',
    expectations: '',
    commitment: false,
    
    // Additional Information
    github: '',
    linkedin: '',
    resume: null as FileList | null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const programmingOptions = [
    'Python', 'JavaScript', 'Java', 'C++', 'R', 
    'SQL', 'MATLAB', 'Go', 'Rust', 'Other'
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleProgrammingLanguageChange = (language: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      programmingLanguages: checked 
        ? [...prev.programmingLanguages, language]
        : prev.programmingLanguages.filter(lang => lang !== language)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.motivation) {
      toast.error('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    if (!formData.commitment) {
      toast.error('Please confirm your commitment to attend the orientation')
      setIsSubmitting(false)
      return
    }

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Application submitted successfully! We\'ll get back to you within 2 weeks.')
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        college: '',
        department: '',
        year: '',
        programmingLanguages: [],
        experience: '',
        projects: '',
        motivation: '',
        expectations: '',
        commitment: false,
        github: '',
        linkedin: '',
        resume: null
      })
      
      // Navigate back to AIspire page after successful submission
      setTimeout(() => {
        navigate('/aispire')
      }, 2000)
      
    } catch (error) {
      toast.error('Failed to submit registration. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            asChild
            className="mb-4 text-muted-foreground hover:text-accent"
          >
            <Link to="/aispire">
              <Icons.ArrowLeft className="h-4 w-4 mr-2" />
              Back to AIspire
            </Link>
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            AIspire Orientation Registration
          </h1>
          <p className="text-muted-foreground text-lg">
            Register for AIspire - DSAI's orientation program for first-year students. Join us for an exciting week of AI discovery!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.User className="h-5 w-5 text-accent" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Please provide your basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
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
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="college">College/Institution</Label>
                  <Input
                    id="college"
                    value={formData.college}
                    onChange={(e) => handleInputChange('college', e.target.value)}
                    placeholder="NIT Agartala"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department/Branch</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    placeholder="Computer Science & Engineering"
                  />
                </div>
                <div>
                  <Label htmlFor="year">Current Year</Label>
                  <Select onValueChange={(value) => handleInputChange('year', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st">1st Year</SelectItem>
                      <SelectItem value="2nd">2nd Year</SelectItem>
                      <SelectItem value="3rd">3rd Year</SelectItem>
                      <SelectItem value="4th">4th Year</SelectItem>
                      <SelectItem value="mtech">M.Tech</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Background */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.Code className="h-5 w-5 text-secondary" />
                Technical Background
              </CardTitle>
              <CardDescription>
                Tell us about your programming experience (no prior experience required!)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Programming Languages (Select all that apply)</Label>
                <div className="grid md:grid-cols-3 gap-3 mt-2">
                  {programmingOptions.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={language}
                        checked={formData.programmingLanguages.includes(language)}
                        onCheckedChange={(checked) => 
                          handleProgrammingLanguageChange(language, checked as boolean)
                        }
                      />
                      <Label htmlFor={language}>{language}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="experience">Programming Experience</Label>
                <Select onValueChange={(value) => handleInputChange('experience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                    <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="projects">Previous Projects</Label>
                <Textarea
                  id="projects"
                  value={formData.projects}
                  onChange={(e) => handleInputChange('projects', e.target.value)}
                  placeholder="Describe any relevant projects you've worked on (optional)"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Motivation & Expectations */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.GraduationCap className="h-5 w-5 text-primary" />
                Motivation & Expectations
              </CardTitle>
              <CardDescription>
                Help us understand your goals and commitment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="motivation">Why do you want to join AIspire 3.0? *</Label>
                <Textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  placeholder="Share your motivation for joining this program..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="expectations">What do you hope to achieve through this program?</Label>
                <Textarea
                  id="expectations"
                  value={formData.expectations}
                  onChange={(e) => handleInputChange('expectations', e.target.value)}
                  placeholder="Describe your learning goals and expectations..."
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="commitment"
                  checked={formData.commitment}
                  onCheckedChange={(checked) => handleInputChange('commitment', checked)}
                  required
                />
                <Label htmlFor="commitment" className="text-sm">
                  I commit to attending all orientation sessions and activities (6 days) *
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.FileText className="h-5 w-5 text-accent" />
                Additional Information
              </CardTitle>
              <CardDescription>
                Optional information to help us know you better
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="github">GitHub Profile</Label>
                  <Input
                    id="github"
                    value={formData.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
                    placeholder="https://github.com/yourusername"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="resume">Resume (PDF format)</Label>
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleInputChange('resume', e.target.files)}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-accent file:text-accent-foreground hover:file:bg-accent/90"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button 
              type="submit" 
              size="lg"
              disabled={isSubmitting}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-6 h-auto"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  Register for Orientation
                  <Icons.Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}