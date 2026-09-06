
import { useState, useEffect } from 'react'
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Award,
  Calendar,
  Users,
  Lightbulb,
  Loader2,
  ExternalLink,
  Globe,
  Sparkles,
} from 'lucide-react'

import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './dsai/ImageWithFallback'
import { FloatingKeywords } from './FloatingKeywords'
import { foundersApi } from '../lib/endpoints'
import { adaptFounder } from '../lib/adapters'

export function FoundersPage() {
  const [founders, setFounders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const res = await foundersApi.list()

        if (!cancelled) {
          setFounders(
            (res.data || []).map(adaptFounder)
          )
        }
      } catch (error) {
        console.error('Failed to load founders:', error)

        if (!cancelled) {
          setFounders([])
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  const clubMilestones = [
    {
      year: '2023',
      title: 'Foundation Year',
      description:
        'DSAI Club established with a vision to build a strong AI and Data Science community.',
      icon: Users,
    },
    {
      year: '2023',
      title: 'First Workshop Series',
      description:
        'Launched technical workshops and learning sessions for students interested in AI.',
      icon: Lightbulb,
    },
    {
      year: '2024',
      title: 'Recognition & Growth',
      description:
        'The community continued to grow through projects, events and student initiatives.',
      icon: Award,
    },
    {
      year: '2025',
      title: 'Industry Partnerships',
      description:
        'Expanded the club ecosystem through collaborations, projects and technical initiatives.',
      icon: Calendar,
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gradient-to-b from-background via-background to-card">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-24 relative overflow-hidden bg-gradient-to-b from-background via-background to-card">

      <FloatingKeywords
        count={15}
        area="full"
        opacity={0.08}
      />

      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-6 relative z-10">

          <div className="max-w-4xl mx-auto text-center">

            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 border-accent/30 text-accent bg-accent/5"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              The Vision Behind DSAI
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-6">
              Meet Our Founders
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Meet the visionary minds who laid the foundation of
              DSAI Club and continue to inspire a community of
              AI, Data Science and technology enthusiasts.
            </p>

            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-px w-12 bg-accent/40" />
              <div className="h-2 w-2 rounded-full bg-accent" />
              <div className="h-px w-12 bg-accent/40" />
            </div>

          </div>
        </div>
      </section>

      <section className="relative py-8 md:py-12">
        <div className="container mx-auto px-6 relative z-10">

          {founders.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

              {founders.map((founder, index) => {

                const social =
                  founder.social ||
                  founder.socialLinks ||
                  {}

                return (
                  <Card
                    key={founder.id || index}
                    className="
                      relative overflow-hidden
                      border-border/50
                      bg-card/80
                      backdrop-blur-sm
                      transition-all duration-500
                      hover:-translate-y-2
                      hover:border-accent/50
                      hover:shadow-2xl
                      hover:shadow-accent/10
                      group
                    "
                  >

                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />

                    <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-accent/5 blur-3xl group-hover:bg-accent/10 transition-all duration-500" />

                    <CardHeader className="relative pt-10 pb-6 text-center">

                      <div className="relative mx-auto mb-6 w-fit">

                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-secondary blur-md opacity-20 group-hover:opacity-40 transition-opacity" />

                        <ImageWithFallback
                          src={
                            founder.image ||
                            '/default-avatar.png'
                          }
                          alt={founder.name}
                          className="
                            relative
                            w-32 h-32
                            md:w-36 md:h-36
                            rounded-full
                            object-cover
                            border-4
                            border-background
                            ring-2
                            ring-accent/30
                            group-hover:ring-accent/70
                            transition-all duration-500
                          "
                        />

                        <div className="
                          absolute
                          -bottom-2
                          -right-2
                          flex
                          items-center
                          justify-center
                          w-10
                          h-10
                          rounded-full
                          bg-accent
                          text-accent-foreground
                          border-4
                          border-background
                          shadow-lg
                        ">
                          <Award className="h-4 w-4" />
                        </div>

                      </div>

                      <CardTitle className="text-2xl md:text-3xl font-bold mb-2">
                        {founder.name}
                      </CardTitle>

                      {founder.designation && (
                        <p className="text-accent font-semibold text-base md:text-lg">
                          {founder.designation}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-sm text-muted-foreground">

                        {founder.branch && (
                          <Badge
                            variant="outline"
                            className="border-border/60"
                          >
                            {founder.branch}
                          </Badge>
                        )}

                        {founder.batch && (
                          <>
                            <span className="text-border">
                              •
                            </span>

                            <Badge
                              variant="outline"
                              className="border-border/60"
                            >
                              Batch {founder.batch}
                            </Badge>
                          </>
                        )}

                      </div>

                    </CardHeader>

                    <CardContent className="relative space-y-7 px-6 md:px-8 pb-8">

                      {founder.bio && (
                        <div className="relative">

                          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-accent to-primary" />

                          <p className="pl-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                            {founder.bio}
                          </p>

                        </div>
                      )}

                      {founder.specialties?.length > 0 && (
                        <div>

                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="h-4 w-4 text-accent" />
                            <h4 className="font-semibold">
                              Specialties
                            </h4>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {founder.specialties.map(
                              (specialty: string, idx: number) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className="
                                    border-accent/30
                                    text-accent
                                    bg-accent/5
                                    hover:bg-accent/10
                                    transition-colors
                                  "
                                >
                                  {specialty}
                                </Badge>
                              )
                            )}
                          </div>

                        </div>
                      )}

                      {founder.achievements?.length > 0 && (
                        <div>

                          <div className="flex items-center gap-2 mb-4">
                            <Award className="h-4 w-4 text-accent" />
                            <h4 className="font-semibold">
                              Key Achievements
                            </h4>
                          </div>

                          <div className="space-y-3">

                            {founder.achievements.map(
                              (
                                achievement: string,
                                idx: number
                              ) => (
                                <div
                                  key={idx}
                                  className="
                                    flex
                                    items-start
                                    gap-3
                                    p-3
                                    rounded-lg
                                    bg-muted/30
                                    border
                                    border-border/40
                                    hover:border-accent/30
                                    transition-colors
                                  "
                                >

                                  <div className="
                                    mt-0.5
                                    flex
                                    h-5
                                    w-5
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-accent/10
                                  ">
                                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                  </div>

                                  <span className="text-sm text-muted-foreground leading-relaxed">
                                    {achievement}
                                  </span>

                                </div>
                              )
                            )}

                          </div>

                        </div>
                      )}

                      {(social.github ||
                        social.linkedin ||
                        social.twitter ||
                        social.instagram ||
                        social.website) && (
                        <div>

                          <div className="flex items-center gap-2 mb-4">
                            <ExternalLink className="h-4 w-4 text-accent" />
                            <h4 className="font-semibold">
                              Connect
                            </h4>
                          </div>

                          <div className="flex flex-wrap gap-2">

                            {social.linkedin && (
                              <Button
                                variant="outline"
                                size="icon"
                                className="hover:border-accent hover:text-accent hover:bg-accent/5"
                                asChild
                              >
                                <a
                                  href={social.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="LinkedIn"
                                >
                                  <Linkedin className="h-4 w-4" />
                                </a>
                              </Button>
                            )}

                            {social.github && (
                              <Button
                                variant="outline"
                                size="icon"
                                className="hover:border-accent hover:text-accent hover:bg-accent/5"
                                asChild
                              >
                                <a
                                  href={social.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="GitHub"
                                >
                                  <Github className="h-4 w-4" />
                                </a>
                              </Button>
                            )}

                            {social.twitter && (
                              <Button
                                variant="outline"
                                size="icon"
                                className="hover:border-accent hover:text-accent hover:bg-accent/5"
                                asChild
                              >
                                <a
                                  href={social.twitter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="Twitter"
                                >
                                  <Twitter className="h-4 w-4" />
                                </a>
                              </Button>
                            )}

                            {social.instagram && (
                              <Button
                                variant="outline"
                                size="icon"
                                className="hover:border-accent hover:text-accent hover:bg-accent/5"
                                asChild
                              >
                                <a
                                  href={social.instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="Instagram"
                                >
                                  <span className="text-sm font-bold">
                                    IG
                                  </span>
                                </a>
                              </Button>
                            )}

                            {social.website && (
                              <Button
                                variant="outline"
                                size="icon"
                                className="hover:border-accent hover:text-accent hover:bg-accent/5"
                                asChild
                              >
                                <a
                                  href={social.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="Website"
                                >
                                  <Globe className="h-4 w-4" />
                                </a>
                              </Button>
                            )}

                          </div>

                        </div>
                      )}

                    </CardContent>
                  </Card>
                )
              })}

            </div>
          ) : (
            <div className="max-w-xl mx-auto text-center py-16">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <Users className="h-8 w-8 text-accent" />
              </div>

              <h3 className="text-xl font-semibold mb-2">
                No Founders Available
              </h3>

              <p className="text-muted-foreground">
                Founder information will be available soon.
              </p>

            </div>
          )}

        </div>
      </section>

      <section className="relative py-20 md:py-28 mt-12 bg-muted/20 border-y border-border/40">

        <div className="container mx-auto px-6 relative z-10">

          <div className="text-center mb-14">

            <Badge
              variant="outline"
              className="mb-4 border-accent/30 text-accent"
            >
              Our Story
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Our Journey
            </h2>

            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              From an ambitious idea to a growing technical
              community, every milestone represents the vision
              and effort behind DSAI Club.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">

            {clubMilestones.map((milestone, index) => {

              const Icon = milestone.icon

              return (
                <Card
                  key={index}
                  className="
                    relative
                    border-border/50
                    bg-card/70
                    backdrop-blur-sm
                    text-center
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-accent/50
                    hover:shadow-lg
                    hover:shadow-accent/5
                  "
                >

                  <CardHeader>

                    <div className="
                      mx-auto
                      mb-4
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-accent/10
                      text-accent
                    ">
                      <Icon className="h-6 w-6" />
                    </div>

                    <Badge
                      variant="outline"
                      className="w-fit mx-auto mb-3 border-accent/30 text-accent"
                    >
                      {milestone.year}
                    </Badge>

                    <CardTitle className="text-lg">
                      {milestone.title}
                    </CardTitle>

                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </CardContent>

                </Card>
              )
            })}

          </div>

        </div>
      </section>

      <section className="relative py-24 md:py-32 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-secondary/15" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(100,255,218,0.08),transparent_60%)]" />

        <FloatingKeywords
          count={8}
          area="full"
          opacity={0.15}
        />

        <div className="container mx-auto px-6 text-center relative z-10">

          <Badge
            variant="outline"
            className="mb-5 border-accent/30 text-accent"
          >
            <Award className="h-4 w-4 mr-2" />
            Legacy
          </Badge>

          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-6">
            Their Legacy Continues
          </h2>

          <p className="text-base md:text-lg text-muted-foreground mb-14 max-w-3xl mx-auto leading-relaxed">
            The vision and dedication of our founders continue
            to inspire new generations of AI and Data Science
            enthusiasts. Their commitment to innovation,
            excellence and community remains at the heart of
            DSAI Club.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">

            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 hover:border-accent/40 transition-all">
              <div className="text-4xl font-bold text-accent mb-2">
                200+
              </div>
              <p className="text-muted-foreground">
                Members Inspired
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 hover:border-accent/40 transition-all">
              <div className="text-4xl font-bold text-secondary mb-2">
                50+
              </div>
              <p className="text-muted-foreground">
                Projects Launched
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 hover:border-accent/40 transition-all">
              <div className="text-4xl font-bold text-primary mb-2">
                25+
              </div>
              <p className="text-muted-foreground">
                Events Organized
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  )
}

