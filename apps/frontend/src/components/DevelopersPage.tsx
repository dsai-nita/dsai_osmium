import { useState, useEffect } from 'react'
import {
  Github,
  Linkedin,
  Mail,
  Code,
  Users,
  Heart,
  Coffee,
  MessageSquare,
  Lightbulb,
  Loader2,
  Calendar,
  Briefcase,
  CheckCircle2,
  XCircle,
} from 'lucide-react'

import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { motion } from 'motion/react'
import { ImageWithFallback } from './dsai/ImageWithFallback'
import { developersApi } from '../lib/endpoints'
import { adaptDeveloper } from '../lib/adapters'

interface Developer {
  id: string
  name: string
  role?: string
  designation?: string
  image?: string
  skills: string[]
  github?: string
  linkedin?: string
  email?: string
  contributions: string[]
  joinDate?: string
  type: 'core' | 'contributor'
  isActive: boolean
}

interface ContributionGuide {
  title: string
  description: string
  steps: string[]
  icon: any
}

const contributionGuides: ContributionGuide[] = [
  {
    title: 'Code Contributions',
    description: 'Help us build and improve the DSAI website.',
    icon: Code,
    steps: [
      'Fork the repository on GitHub',
      'Clone your fork locally',
      'Create a new branch for your feature',
      'Make your changes and test thoroughly',
      'Follow our coding standards and conventions',
      'Submit a pull request with detailed description',
    ],
  },
  {
    title: 'Feature Suggestions',
    description: 'Share your ideas for new features and improvements.',
    icon: Lightbulb,
    steps: [
      'Check existing issues to avoid duplicates',
      'Create a detailed feature request',
      'Explain the problem it solves',
      'Provide mockups or wireframes if possible',
      'Discuss with the community',
      'Help implement if you have the skills',
    ],
  },
  {
    title: 'Bug Reports',
    description: 'Help us identify and fix issues.',
    icon: MessageSquare,
    steps: [
      'Search for existing bug reports',
      'Provide detailed reproduction steps',
      'Include screenshots or videos',
      'Specify browser and device information',
      'Test on multiple devices if possible',
      'Follow up on the issue resolution',
    ],
  },
]

export function DevelopersPage() {
  const [activeTab, setActiveTab] = useState('core-team')
  const [coreTeam, setCoreTeam] = useState<Developer[]>([])
  const [contributors, setContributors] = useState<Developer[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const fetchDevelopers = async () => {
      try {
        const [coreRes, contributorRes] = await Promise.all([
          developersApi.list({
            type: 'core',
            limit: 100,
          }),
          developersApi.list({
            type: 'contributor',
            limit: 100,
          }),
        ])

        if (!cancelled) {
          setCoreTeam(
            (coreRes.data || []).map(adaptDeveloper)
          )

          setContributors(
            (contributorRes.data || []).map(adaptDeveloper)
          )
        }
      } catch (error) {
        console.error('Failed to load developers:', error)

        if (!cancelled) {
          setCoreTeam([])
          setContributors([])
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchDevelopers()

    return () => {
      cancelled = true
    }
  }, [])

  const renderDeveloperCard = (
    developer: Developer,
    index: number
  ) => {
    return (
      <motion.div
        key={developer.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: index * 0.08,
        }}
        className="group h-full"
      >
        <Card className="relative h-full overflow-hidden border-border bg-card/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-accent/10">

          
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />

          <div className="p-6">

            
            <div className="flex items-start gap-4">

              <div className="relative shrink-0">
                <ImageWithFallback
                  src={
                    developer.image ||
                    '/default-avatar.png'
                  }
                  alt={developer.name}
                  className="h-20 w-20 rounded-full border-2 border-border object-cover transition-all duration-300 group-hover:border-accent"
                />

                
                <div
                  className={`absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background ${
                    developer.isActive
                      ? 'bg-green-500'
                      : 'bg-muted-foreground'
                  }`}
                >
                  {developer.isActive ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 text-white" />
                  )}
                </div>
              </div>

              <div className="min-w-0 flex-1">

                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-lg font-semibold text-card-foreground group-hover:text-accent transition-colors">
                    {developer.name}
                  </h3>

                  <Badge
                    variant={
                      developer.type === 'core'
                        ? 'default'
                        : 'secondary'
                    }
                    className="capitalize"
                  >
                    {developer.type}
                  </Badge>
                </div>

               
                {developer.role && (
                  <p className="mt-1 text-sm font-medium text-primary">
                    {developer.role}
                  </p>
                )}

                
                {developer.designation && (
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>{developer.designation}</span>
                  </div>
                )}

                
                {developer.joinDate && (
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Joined {developer.joinDate}</span>
                  </div>
                )}

              </div>
            </div>

         
            <div className="mt-5">
              <Badge
                variant="outline"
                className={
                  developer.isActive
                    ? 'border-green-500/40 text-green-500'
                    : 'border-muted-foreground/40 text-muted-foreground'
                }
              >
                {developer.isActive
                  ? 'Active Developer'
                  : 'Inactive'}
              </Badge>
            </div>

            
            {developer.skills?.length > 0 && (
              <div className="mt-5">
                <h4 className="mb-2 text-sm font-semibold text-card-foreground">
                  Skills
                </h4>

                <div className="flex flex-wrap gap-1.5">
                  {developer.skills.map((skill, skillIndex) => (
                    <Badge
                      key={`${skill}-${skillIndex}`}
                      variant="outline"
                      className="text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            
            {developer.contributions?.length > 0 && (
              <div className="mt-5">
                <h4 className="mb-2 text-sm font-semibold text-card-foreground">
                  Contributions
                </h4>

                <ul className="space-y-2">
                  {developer.contributions.map(
                    (contribution, contributionIndex) => (
                      <li
                        key={contributionIndex}
                        className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />

                        <span>{contribution}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

           
            <div className="mt-6 flex items-center gap-2 border-t border-border pt-4">

              {developer.github && (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  asChild
                >
                  <a
                    href={developer.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-1.5 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              )}

              {developer.linkedin && (
                <Button
                  size="sm"
                  variant="outline"
                  className="px-3"
                  asChild
                >
                  <a
                    href={developer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              )}

              {developer.email && (
                <Button
                  size="sm"
                  variant="outline"
                  className="px-3"
                  asChild
                >
                  <a
                    href={`mailto:${developer.email}`}
                    aria-label="Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </Button>
              )}

            </div>

          </div>
        </Card>
      </motion.div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-b from-background via-background to-card">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-background via-background to-card">

   
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge
              variant="outline"
              className="mb-5 border-accent/40 text-accent"
            >
              <Code className="mr-2 h-3.5 w-3.5" />
              DSAI Development Team
            </Badge>

            <h1 className="gradient-text mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
              Developers & Contributors
            </h1>

            <p className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Meet the talented people who design, develop and
              maintain the DSAI Club platform.
            </p>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
            className="grid grid-cols-1 gap-5 md:grid-cols-3"
          >

            <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-accent">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>

              <h3 className="font-medium text-card-foreground">
                Core Team
              </h3>

              <p className="mt-1 text-3xl font-bold gradient-text">
                {coreTeam.length}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-accent">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                <Heart className="h-6 w-6 text-secondary" />
              </div>

              <h3 className="font-medium text-card-foreground">
                Contributors
              </h3>

              <p className="mt-1 text-3xl font-bold gradient-text">
                {contributors.length}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-accent">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Coffee className="h-6 w-6 text-accent" />
              </div>

              <h3 className="font-medium text-card-foreground">
                Total Developers
              </h3>

              <p className="mt-1 text-3xl font-bold gradient-text">
                {coreTeam.length + contributors.length}
              </p>
            </div>

          </motion.div>
        </div>
      </section>

     
      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >

            <TabsList className="mb-12 grid w-full grid-cols-3">
              <TabsTrigger value="core-team">
                Core Team
              </TabsTrigger>

              <TabsTrigger value="contributors">
                Contributors
              </TabsTrigger>

              <TabsTrigger value="contribute">
                Contribute
              </TabsTrigger>
            </TabsList>

       
            <TabsContent value="core-team">

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >

                <div className="mb-12 text-center">
                  <h2 className="gradient-text mb-4 text-2xl font-semibold">
                    Core Development Team
                  </h2>

                  <p className="mx-auto max-w-2xl text-muted-foreground">
                    The developers responsible for architecting,
                    building and maintaining the DSAI platform.
                  </p>
                </div>

                {coreTeam.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {coreTeam.map(renderDeveloperCard)}
                  </div>
                ) : (
                  <EmptyState message="No core developers found." />
                )}

              </motion.div>

            </TabsContent>

            
            <TabsContent value="contributors">

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >

                <div className="mb-12 text-center">
                  <h2 className="gradient-text mb-4 text-2xl font-semibold">
                    Amazing Contributors
                  </h2>

                  <p className="mx-auto max-w-2xl text-muted-foreground">
                    Contributors who bring ideas, improvements and
                    valuable contributions to the DSAI platform.
                  </p>
                </div>

                {contributors.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {contributors.map(
                      renderDeveloperCard
                    )}
                  </div>
                ) : (
                  <EmptyState message="No contributors found." />
                )}

              </motion.div>

            </TabsContent>

           
            <TabsContent value="contribute">

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >

                <div className="mb-12 text-center">
                  <h2 className="gradient-text mb-4 text-2xl font-semibold">
                    Join Our Development Journey
                  </h2>

                  <p className="mx-auto max-w-2xl text-muted-foreground">
                    We welcome developers of all skill levels.
                    Contribute code, suggest features or help us
                    improve the platform.
                  </p>
                </div>

                <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">

                  {contributionGuides.map(
                    (guide, index) => {
                      const Icon = guide.icon

                      return (
                        <motion.div
                          key={guide.title}
                          initial={{
                            opacity: 0,
                            y: 20,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                          }}
                        >
                          <Card className="h-full p-6 transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/10">

                            <div className="mb-4 flex items-center gap-4">

                              <div className="rounded-lg bg-primary/10 p-3 text-primary">
                                <Icon className="h-6 w-6" />
                              </div>

                              <h3 className="font-semibold text-card-foreground">
                                {guide.title}
                              </h3>

                            </div>

                            <p className="mb-6 text-sm text-muted-foreground">
                              {guide.description}
                            </p>

                            <ol className="space-y-3">
                              {guide.steps.map(
                                (step, stepIndex) => (
                                  <li
                                    key={stepIndex}
                                    className="flex items-start gap-3 text-sm"
                                  >
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-medium text-accent">
                                      {stepIndex + 1}
                                    </span>

                                    <span className="text-muted-foreground">
                                      {step}
                                    </span>
                                  </li>
                                )
                              )}
                            </ol>

                          </Card>
                        </motion.div>
                      )
                    }
                  )}

                </div>

                <div className="rounded-xl border border-border bg-card/60 p-8 text-center backdrop-blur-sm">

                  <h3 className="gradient-text mb-4 text-3xl font-semibold">
                    Ready to Contribute?
                  </h3>

                  <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
                    Have an idea or want to contribute?
                    We'd love to hear from you. Connect with
                    the development team and help us build
                    something amazing.
                  </p>

                  <div className="flex flex-col justify-center gap-3 sm:flex-row">

                    <Button
                      className="glow-primary"
                      asChild
                    >
                      <a
                        href="https://github.com/dsai-nita/dsai_osmium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        View on GitHub
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      asChild
                    >
                      <a href="mailto:dev@dsai.club">
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Dev Team
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      asChild
                    >
                      <a
                        href="https://discord.gg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
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



function EmptyState({
  message,
}: {
  message: string
}) {
  return (
    <div className="rounded-xl border border-dashed border-border py-16 text-center">
      <Code className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />

      <p className="text-muted-foreground">
        {message}
      </p>
    </div>
  )
}