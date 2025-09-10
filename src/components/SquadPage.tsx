import { useState } from 'react'
import { Crown, Star, User, Github, Linkedin, Mail, Filter, Search, Trophy, Calendar } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ImageWithFallback } from './dsai/ImageWithFallback'

export function SquadPage() {
  const [selectedYear, setSelectedYear] = useState('2025')
  const [selectedBranch, setSelectedBranch] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const members = {
    2025: [
      {
        id: 1,
        name: "Alexandra Chen",
        role: "President",
        year: "4th Year",
        branch: "Computer Science",
        image: "https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjQ3NjcyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specialization: ["Machine Learning", "Deep Learning", "Computer Vision"],
        achievements: [
          "Led 5 successful AI projects",
          "Published 2 research papers",
          "Won Best Innovation Award 2024"
        ],
        social: {
          github: "https://github.com/alexchen",
          linkedin: "https://linkedin.com/in/alexchen",
          email: "alex.chen@dsai.org"
        },
        bio: "Passionate about advancing AI research and building innovative solutions that impact society.",
        position: "executive",
        joinedYear: 2022
      },
      {
        id: 2,
        name: "Marcus Rodriguez",
        role: "Vice President",
        year: "4th Year",
        branch: "Electronics & Communication",
        image: "https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjQ3NjcyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specialization: ["Robotics", "IoT", "Embedded Systems"],
        achievements: [
          "Built autonomous navigation robot",
          "Organized 8 technical workshops",
          "Mentored 20+ junior members"
        ],
        social: {
          github: "https://github.com/marcusr",
          linkedin: "https://linkedin.com/in/marcusrodriguez",
          email: "marcus.rodriguez@dsai.org"
        },
        bio: "Robotics enthusiast focused on creating intelligent autonomous systems.",
        position: "executive",
        joinedYear: 2022
      },
      {
        id: 3,
        name: "Priya Sharma",
        role: "Secretary",
        year: "3rd Year",
        branch: "Computer Science",
        image: "https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjQ3NjcyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specialization: ["Data Science", "Analytics", "Visualization"],
        achievements: [
          "Developed analytics dashboard",
          "Coordinated 15 club events",
          "Maintained 100% documentation accuracy"
        ],
        social: {
          github: "https://github.com/priyasharma",
          linkedin: "https://linkedin.com/in/priyasharma",
          email: "priya.sharma@dsai.org"
        },
        bio: "Data enthusiast with a passion for extracting insights from complex datasets.",
        position: "executive",
        joinedYear: 2023
      },
      {
        id: 4,
        name: "David Kim",
        role: "Treasurer",
        year: "3rd Year",
        branch: "Information Technology",
        image: "https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjQ3NjcyOXww&ixlib rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specialization: ["Fintech", "Blockchain", "Digital Payments"],
        achievements: [
          "Managed club budget of $50K+",
          "Secured 3 major sponsorships",
          "Implemented financial tracking system"
        ],
        social: {
          github: "https://github.com/davidkim",
          linkedin: "https://linkedin.com/in/davidkim",
          email: "david.kim@dsai.org"
        },
        bio: "Combining finance and technology to create innovative fintech solutions.",
        position: "executive",
        joinedYear: 2023
      },
      {
        id: 5,
        name: "Emma Thompson",
        role: "Technical Lead",
        year: "3rd Year",
        branch: "Computer Science",
        image: "https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjQ3NjcyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specialization: ["Full Stack Development", "Cloud Computing", "DevOps"],
        achievements: [
          "Architected club's tech infrastructure",
          "Led development of 10+ projects",
          "Established coding standards"
        ],
        social: {
          github: "https://github.com/emmathompson",
          linkedin: "https://linkedin.com/in/emmathompson",
          email: "emma.thompson@dsai.org"
        },
        bio: "Full-stack developer passionate about building scalable and robust applications.",
        position: "senior",
        joinedYear: 2023
      },
      {
        id: 6,
        name: "Arjun Patel",
        role: "Research Coordinator",
        year: "3rd Year",
        branch: "Mechanical Engineering",
        image: "https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjQ3NjcyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specialization: ["AI in Manufacturing", "Predictive Maintenance", "Optimization"],
        achievements: [
          "Coordinated 5 research projects",
          "Published in 3 conferences",
          "Secured research funding"
        ],
        social: {
          github: "https://github.com/arjunpatel",
          linkedin: "https://linkedin.com/in/arjunpatel",
          email: "arjun.patel@dsai.org"
        },
        bio: "Bridging mechanical engineering and AI to revolutionize manufacturing processes.",
        position: "senior",
        joinedYear: 2023
      }
    ],
    2024: [
      {
        id: 7,
        name: "Sarah Johnson",
        role: "Former President",
        year: "Graduated",
        branch: "Computer Science",
        image: "https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjQ3NjcyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specialization: ["AI Research", "Natural Language Processing"],
        achievements: [
          "Founded DSAI Club",
          "Led team to 3 national competitions",
          "Currently ML Engineer at Google"
        ],
        social: {
          github: "https://github.com/sarahjohnson",
          linkedin: "https://linkedin.com/in/sarahjohnson",
          email: "sarah.johnson@alumni.dsai.org"
        },
        bio: "Founding member and visionary leader who established DSAI's strong foundation.",
        position: "alumni",
        joinedYear: 2021,
        currentPosition: "ML Engineer at Google"
      },
      {
        id: 8,
        name: "James Wilson",
        role: "Former Vice President",
        year: "Graduated",
        branch: "Information Technology",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrJTIwcG9ydHJhaXQlMjBtYW58ZW58MXx8fHwxNzU2NDc2NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specialization: ["Cloud Computing", "DevOps", "System Architecture"],
        achievements: [
          "Built club's first cloud infrastructure",
          "Organized 12 technical workshops",
          "Currently SDE at Amazon"
        ],
        social: {
          github: "https://github.com/jameswilson",
          linkedin: "https://linkedin.com/in/jameswilson",
          email: "james.wilson@alumni.dsai.org"
        },
        bio: "Infrastructure specialist who laid the technical foundation for DSAI's digital presence.",
        position: "alumni",
        joinedYear: 2021,
        currentPosition: "SDE at Amazon"
      },
      {
        id: 9,
        name: "Lisa Chen",
        role: "Former Secretary",
        year: "Graduated",
        branch: "Computer Science",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b1bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1NjQ3NjcyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specialization: ["Data Science", "Machine Learning", "Statistics"],
        achievements: [
          "Established member database system",
          "Led data analytics projects",
          "Currently Data Scientist at Microsoft"
        ],
        social: {
          github: "https://github.com/lisachen",
          linkedin: "https://linkedin.com/in/lisachen",
          email: "lisa.chen@alumni.dsai.org"
        },
        bio: "Data science pioneer who introduced statistical rigor to club projects.",
        position: "alumni",
        joinedYear: 2021,
        currentPosition: "Data Scientist at Microsoft"
      },
      {
        id: 10,
        name: "Michael Brown",
        role: "Former Technical Lead",
        year: "Graduated",
        branch: "Electronics & Communication",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc1NjQ3NjcyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specialization: ["Embedded Systems", "IoT", "Hardware Design"],
        achievements: [
          "Developed club's first IoT project",
          "Won national robotics competition",
          "Currently Hardware Engineer at Tesla"
        ],
        social: {
          github: "https://github.com/michaelbrown",
          linkedin: "https://linkedin.com/in/michaelbrown",
          email: "michael.brown@alumni.dsai.org"
        },
        bio: "Hardware innovation specialist who bridged the gap between software and physical systems.",
        position: "alumni",
        joinedYear: 2021,
        currentPosition: "Hardware Engineer at Tesla"
      },
      {
        id: 11,
        name: "Sophia Martinez",
        role: "Former Research Head",
        year: "Graduated",
        branch: "Computer Science",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2NDc2NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specialization: ["Computer Vision", "Deep Learning", "Medical AI"],
        achievements: [
          "Published 4 research papers",
          "Secured $25K research grant",
          "Currently PhD at Stanford"
        ],
        social: {
          github: "https://github.com/sophiamartinez",
          linkedin: "https://linkedin.com/in/sophiamartinez",
          email: "sophia.martinez@alumni.dsai.org"
        },
        bio: "Research excellence advocate who established DSAI's academic publication culture.",
        position: "alumni",
        joinedYear: 2021,
        currentPosition: "PhD Student at Stanford"
      }
    ],
    2023: [
      {
        id: 12,
        name: "Daniel Wang",
        role: "Former President",
        year: "Graduated",
        branch: "Computer Science",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMHNtaWxlfGVufDF8fHx8MTc1NjQ3NjcyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specialization: ["Artificial Intelligence", "Machine Learning", "Neural Networks"],
        achievements: [
          "Expanded club membership by 200%",
          "Launched first AI bootcamp",
          "Currently AI Researcher at OpenAI"
        ],
        social: {
          github: "https://github.com/danielwang",
          linkedin: "https://linkedin.com/in/danielwang",
          email: "daniel.wang@alumni.dsai.org"
        },
        bio: "Transformational leader who scaled DSAI into a major campus organization.",
        position: "alumni",
        joinedYear: 2020,
        currentPosition: "AI Researcher at OpenAI"
      },
      {
        id: 13,
        name: "Emily Rodriguez",
        role: "Former Vice President",
        year: "Graduated",
        branch: "Information Technology",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhhcHB5JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2NDc2NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specialization: ["Cybersecurity", "Network Security", "AI Security"],
        achievements: [
          "Established cybersecurity track",
          "Led security awareness campaigns",
          "Currently Security Engineer at Meta"
        ],
        social: {
          github: "https://github.com/emilyrodriguez",
          linkedin: "https://linkedin.com/in/emilyrodriguez",
          email: "emily.rodriguez@alumni.dsai.org"
        },
        bio: "Security-focused technologist who integrated cybersecurity into AI curriculum.",
        position: "alumni",
        joinedYear: 2020,
        currentPosition: "Security Engineer at Meta"
      },
      {
        id: 14,
        name: "Kevin Patel",
        role: "Former Treasurer",
        year: "Graduated",
        branch: "Computer Science",
        image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBzbWlsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjQ3NjcyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specialization: ["Blockchain", "Cryptocurrency", "Financial Technology"],
        achievements: [
          "Managed $75K annual budget",
          "Secured major industry partnerships",
          "Currently Blockchain Developer at Coinbase"
        ],
        social: {
          github: "https://github.com/kevinpatel",
          linkedin: "https://linkedin.com/in/kevinpatel",
          email: "kevin.patel@alumni.dsai.org"
        },
        bio: "Financial technology enthusiast who brought blockchain innovation to DSAI projects.",
        position: "alumni",
        joinedYear: 2020,
        currentPosition: "Blockchain Developer at Coinbase"
      },
      {
        id: 15,
        name: "Rachel Kim",
        role: "Former Secretary",
        year: "Graduated",
        branch: "Electronics & Communication",
        image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2NDc2NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specialization: ["Signal Processing", "AI Hardware", "FPGA Development"],
        achievements: [
          "Digitized all club documentation",
          "Developed AI hardware prototypes",
          "Currently Hardware AI Engineer at NVIDIA"
        ],
        social: {
          github: "https://github.com/rachelkim",
          linkedin: "https://linkedin.com/in/rachelkim",
          email: "rachel.kim@alumni.dsai.org"
        },
        bio: "Hardware-software integration expert who pioneered AI acceleration projects.",
        position: "alumni",
        joinedYear: 2020,
        currentPosition: "Hardware AI Engineer at NVIDIA"
      },
      {
        id: 16,
        name: "Thomas Lee",
        role: "Former Technical Lead",
        year: "Graduated",
        branch: "Mechanical Engineering",
        image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBzbWlsaW5nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2NDc2NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        specialization: ["Robotics", "Control Systems", "Autonomous Vehicles"],
        achievements: [
          "Built award-winning autonomous robot",
          "Led interdisciplinary robotics team",
          "Currently Robotics Engineer at Boston Dynamics"
        ],
        social: {
          github: "https://github.com/thomaslee",
          linkedin: "https://linkedin.com/in/thomaslee",
          email: "thomas.lee@alumni.dsai.org"
        },
        bio: "Robotics innovation leader who brought mechanical engineering expertise to AI systems.",
        position: "alumni",
        joinedYear: 2020,
        currentPosition: "Robotics Engineer at Boston Dynamics"
      }
    ],
   
  }

  const getCurrentMembers = () => {
    return members[selectedYear as keyof typeof members] || []
  }

  const filteredMembers = getCurrentMembers().filter(member => {
    const matchesBranch = selectedBranch === 'all' || 
      member.branch.toLowerCase().includes(selectedBranch.toLowerCase())
    
    const matchesSearch = searchQuery === '' || 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.specialization.some(spec => 
        spec.toLowerCase().includes(searchQuery.toLowerCase())
      )
    
    return matchesBranch && matchesSearch
  })

  const getRoleIcon = (position: string) => {
    switch (position) {
      case 'executive':
        return Crown
      case 'senior':
        return Star
      case 'alumni':
        return Trophy
      default:
        return User
    }
  }

  const getRoleColor = (position: string) => {
    switch (position) {
      case 'executive':
        return 'text-accent'
      case 'senior':
        return 'text-secondary'
      case 'alumni':
        return 'text-primary'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Header Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold gradient-text mb-4">DSAI Squad</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet our talented team of innovators, researchers, and technology enthusiasts driving the future of AI and robotics
          </p>
        </div>
      </section>

      {/* Year Selection Tabs */}
      <section className="py-8 px-4 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <Tabs value={selectedYear} onValueChange={setSelectedYear} className="w-full">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <TabsList className="grid w-full lg:w-auto grid-cols-4">
                <TabsTrigger value="2025" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Current
                </TabsTrigger>
                <TabsTrigger value="2024">2024</TabsTrigger>
                <TabsTrigger value="2023">2023</TabsTrigger>
                
              </TabsList>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background"
                  />
                </div>
                

                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    <SelectItem value="computer science">Computer Science</SelectItem>
                    <SelectItem value="electronics">Electronics & Communication</SelectItem>
                    <SelectItem value="information technology">Information Technology</SelectItem>
                    <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                    <SelectItem value="electrical">Electrical Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredMembers.length} of {getCurrentMembers().length} members
            </div>

            {/* Members Content */}
            <TabsContent value={selectedYear} className="mt-8">
              {filteredMembers.length === 0 ? (
                <div className="text-center py-20">
                  <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No members found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredMembers.map((member) => {
                    const RoleIcon = getRoleIcon(member.position)
                    return (
                      <Card key={member.id} className="group hover:border-accent/50 transition-all duration-300 hover:glow-accent overflow-hidden">
                        <div className="relative">
                          <div className="h-64 overflow-hidden">
                            <ImageWithFallback
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="absolute top-4 right-4">
                            <div className="bg-background/80 backdrop-blur-sm rounded-full p-2">
                              <RoleIcon className={`h-4 w-4 ${getRoleColor(member.position)}`} />
                            </div>
                          </div>
                          {member.position === 'alumni' && member.currentPosition && (
                            <div className="absolute bottom-4 left-4 right-4">
                              <Badge className="bg-primary text-primary-foreground text-xs">
                                {member.currentPosition}
                              </Badge>
                            </div>
                          )}
                        </div>
                        
                        <CardHeader>
                          <CardTitle className="group-hover:text-accent transition-colors">
                            {member.name}
                          </CardTitle>
                          <div className="space-y-1 text-muted-foreground">
                            <div className="font-medium text-foreground">{member.role}</div>
                            <div className="text-sm">{member.year} • {member.branch}</div>
                            <div className="text-sm text-muted-foreground">
                              Joined {member.joinedYear}
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {member.bio}
                          </p>
                          
                          <div>
                            <div className="text-sm font-medium text-foreground mb-2">Specialization:</div>
                            <div className="flex flex-wrap gap-1">
                              {member.specialization.slice(0, 2).map((spec, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                              {member.specialization.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{member.specialization.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium text-foreground mb-2">Key Achievements:</div>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {member.achievements.slice(0, 2).map((achievement, index) => (
                                <li key={index} className="flex items-start gap-1">
                                  <span className="text-accent mt-1">•</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex gap-2 pt-4 border-t border-border">
                            {member.social.github && (
                              <Button size="sm" variant="outline" className="p-2">
                                <Github className="h-4 w-4" />
                              </Button>
                            )}
                            {member.social.linkedin && (
                              <Button size="sm" variant="outline" className="p-2">
                                <Linkedin className="h-4 w-4" />
                              </Button>
                            )}
                            {member.social.email && (
                              <Button size="sm" variant="outline" className="p-2">
                                <Mail className="h-4 w-4" />
                              </Button>
                            )}
                            <Button size="sm" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                              View Profile
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}