import { useState } from 'react'
import { Github, Linkedin, Mail, ExternalLink, Code, Users, Heart, Star, GitFork, Coffee, MessageSquare, Lightbulb } from 'lucide-react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { motion } from 'motion/react'
import { ImageWithFallback } from './dsai/ImageWithFallback'
import { unsplash_tool } from '../tools'

interface Developer {
  id: string
  name: string
  role: string
  description: string
  avatar: string
  skills: string[]
  github: string
  linkedin?: string
  email?: string
  contributions: string[]
  joinDate: string
  status: 'Core' | 'Active' | 'Alumni'
}

interface ContributionGuide {
  title: string
  description: string
  steps: string[]
  icon: any
}

const coreTeam: Developer[] = [
  {
    id: '1',
    name: 'Shubham sebrin',
    role: 'Project Lead & Full Stack Developer',
    description: 'Leading the DSAI website development with expertise in React, TypeScript, and modern web technologies. Passionate about creating intuitive user experiences.',
    avatar: '/api/placeholder/150/150',
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express.js'],
    github: 'https://github.com/sebrin',
    linkedin: 'https://linkedin.com/in/sebrin',
    email: 'sebrin@dsai.club',
    contributions: [
      'Project architecture and initial setup',
      'Navigation and routing system',
      'Homepage with animated hero section',
      'Squad page with team hierarchy',
      'Footer design and implementation',
      'Theme system and dark mode'
    ],
    joinDate: '2024-01',
    status: 'Core'
  },
  {
    id: '2',
    name: 'Abhay Pandey',
    role: 'Full Stack Developer',
    description: 'Leading the DSAI website development with expertise in React, TypeScript, and modern web technologies. Passionate about creating intuitive user experiences.',
    avatar: '/api/placeholder/150/150',
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express.js'],
    github: 'https://github.com/sebrin',
    linkedin: 'https://linkedin.com/in/sebrin',
    email: 'sebrin@dsai.club',
    contributions: [
      'Project architecture and initial setup',
      'Navigation and routing system',
      'Homepage with animated hero section',
      'Squad page with team hierarchy',
      'Footer design and implementation',
      'Theme system and dark mode'
    ],
    joinDate: '2024-01',
    status: 'Core'
  },
  
]

const contributors: Developer[] = [
  {
    id: 'samir',
    name: 'Samir',
    role: 'Content Developer & QA',
    description: 'Contributing to content creation, quiz development, and quality assurance testing.',
    avatar: '/api/placeholder/150/150',
    skills: ['Content Writing', 'Testing', 'Documentation', 'JavaScript', 'Python'],
    github: 'https://github.com/samir',
    contributions: [
      'FAQ content development',
      'Quiz questions and explanations',
      'User acceptance testing',
      'Documentation writing'
    ],
    joinDate: '2024-03',
    status: 'Active'
  },
  
]

const contributionGuides: ContributionGuide[] = [
  {
    title: 'Code Contributions',
    description: 'Help us build and improve the DSAI website',
    icon: Code,
    steps: [
      'Fork the repository on GitHub',
      'Clone your fork locally',
      'Create a new branch for your feature',
      'Make your changes and test thoroughly',
      'Follow our coding standards and conventions',
      'Submit a pull request with detailed description'
    ]
  },
  {
    title: 'Feature Suggestions',
    description: 'Share your ideas for new features and improvements',
    icon: Lightbulb,
    steps: [
      'Check existing issues to avoid duplicates',
      'Create a detailed feature request',
      'Explain the problem it solves',
      'Provide mockups or wireframes if possible',
      'Discuss with the community',
      'Help implement if you have the skills'
    ]
  },
  {
    title: 'Bug Reports',
    description: 'Help us identify and fix issues',
    icon: MessageSquare,
    steps: [
      'Search for existing bug reports',
      'Provide detailed reproduction steps',
      'Include screenshots or videos',
      'Specify browser and device information',
      'Test on multiple devices if possible',
      'Follow up on the issue resolution'
    ]
  }
]

export function DevelopersPage() {
  const [activeTab, setActiveTab] = useState('core-team')

  const renderDeveloperCard = (developer: Developer) => (
    <motion.div
      key={developer.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="group"
    >
      <Card className="p-6 h-full hover:border-accent transition-all duration-300 group-hover:glow-accent">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <ImageWithFallback
              src={developer.avatar}
              alt={developer.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-border group-hover:border-accent transition-colors duration-300"
            />
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-background ${
              developer.status === 'Core' ? 'bg-primary' : 
              developer.status === 'Active' ? 'bg-secondary' : 'bg-muted-foreground'
            }`}>
              {developer.status === 'Core' && <Star className="w-3 h-3 text-white m-0.5" />}
              {developer.status === 'Active' && <Heart className="w-3 h-3 text-white m-0.5" />}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-card-foreground group-hover:text-accent transition-colors">
                {developer.name}
              </h3>
              <Badge variant={developer.status === 'Core' ? 'default' : 'secondary'}>
                {developer.status}
              </Badge>
            </div>
            <p className="text-sm text-primary font-medium mb-2">{developer.role}</p>
            <p className="text-xs text-muted-foreground">Joined {developer.joinDate}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {developer.description}
        </p>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-card-foreground mb-2">Skills</h4>
          <div className="flex flex-wrap gap-1">
            {developer.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-card-foreground mb-2">Contributions</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            {developer.contributions.slice(0, 3).map((contribution, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0" />
                {contribution}
              </li>
            ))}
            {developer.contributions.length > 3 && (
              <li className="text-accent">+{developer.contributions.length - 3} more...</li>
            )}
          </ul>
        </div>

        <div className="flex items-center gap-2 pt-4 border-t border-border">
          <Button size="sm" variant="outline" className="flex-1" asChild>
            <a href={developer.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-1" />
              GitHub
            </a>
          </Button>
          {developer.linkedin && (
            <Button size="sm" variant="outline" asChild>
              <a href={developer.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          )}
          {developer.email && (
            <Button size="sm" variant="outline" asChild>
              <a href={`mailto:${developer.email}`}>
                <Mail className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  )

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-background via-background to-card">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="gradient-text text-5xl font-bold mb-6">
              Developers & Contributors
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Meet the amazing team behind the DSAI website and learn how you can contribute to our mission
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <div className="bg-card border border-border rounded-lg p-6 glow-accent">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-card-foreground mb-2">Core Team</h3>
              <p className="text-2xl font-bold gradient-text">{coreTeam.length}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 glow-cyan">
              <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mx-auto mb-4">
                <Heart className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-medium text-card-foreground mb-2">Contributors</h3>
              <p className="text-2xl font-bold gradient-text">{contributors.length}</p>
            </div>
            {/* <div className="bg-card border border-border rounded-lg p-6 glow-primary">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mx-auto mb-4">
                <GitFork className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-medium text-card-foreground mb-2">Open Source</h3>
              <p className="text-2xl font-bold gradient-text">100%</p>
            </div> */}
            <div className="bg-card border border-border rounded-lg p-6 glow-accent">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
                <Coffee className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-card-foreground mb-2">Commits</h3>
              <p className="text-2xl font-bold gradient-text">500+</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Tabs */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="core-team" className="text-sm">Core Team</TabsTrigger>
              <TabsTrigger value="contributors" className="text-sm">Contributors</TabsTrigger>
              <TabsTrigger value="contribute" className="text-sm">How to Contribute</TabsTrigger>
            </TabsList>

            <TabsContent value="core-team">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-center mb-12">
                  <h2 className="gradient-text text-2xl mb-4">Core Development Team</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    The core team members who architect, develop, and maintain the DSAI website with dedication and expertise.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coreTeam.map(renderDeveloperCard)}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="contributors">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-center mb-12">
                  <h2 className="gradient-text mb-4">Amazing Contributors</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Our valued contributors who bring fresh ideas, improvements, and help make the DSAI website better every day.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contributors.map(renderDeveloperCard)}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="contribute">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-center mb-12">
                  <h2 className="gradient-text mb-4">Join Our Development Journey</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    We welcome contributions from developers of all skill levels. Here's how you can get involved:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {contributionGuides.map((guide, index) => {
                    const Icon = guide.icon
                    return (
                      <motion.div
                        key={guide.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                      >
                        <Card className="p-6 h-full hover:border-accent transition-all duration-300 hover:glow-accent">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-lg bg-primary/10 text-primary">
                              <Icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-medium text-card-foreground">{guide.title}</h3>
                          </div>
                          <p className="text-muted-foreground mb-6 text-sm">
                            {guide.description}
                          </p>
                          <ol className="space-y-2 text-sm">
                            {guide.steps.map((step, stepIndex) => (
                              <li key={stepIndex} className="flex items-start gap-3">
                                <span className="flex items-center justify-center w-6 h-6 bg-accent/20 text-accent rounded-full text-xs font-medium flex-shrink-0 mt-0.5">
                                  {stepIndex + 1}
                                </span>
                                <span className="text-muted-foreground">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Contact for Contributions */}
                <div className="bg-card/50 border border-border rounded-lg p-8 text-center">
                  <h3 className="gradient-text text-3xl mb-4">Ready to Contribute?</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Have an idea or want to contribute? We'd love to hear from you! Reach out to our team and let's build something amazing together.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="glow-primary" asChild>
                      <a href="https://github.com/dsai-club/website" target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        View on GitHub
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="mailto:dev@dsai.club">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Dev Team
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="https://discord.gg" target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Join Discord
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}