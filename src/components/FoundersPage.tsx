import { Github, Linkedin, Twitter, Mail, Award, Calendar, Users, Lightbulb } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './dsai/ImageWithFallback'
import { FloatingKeywords } from './FloatingKeywords'

export function FoundersPage() {
  const founders = [
    {
      name: 'Divyansh Singhal',
      role: 'Founding President',
      year: '2023',
      branch: 'Computational Mathematics',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'Passionate about AI research and machine learning applications. Led the founding team to establish DSAI Club as a premier tech community at NIT Agartala.',
      achievements: [
        'Founded DSAI Club in January 2023',
        'Published 3 research papers in AI conferences',
        'Mentored 50+ students in ML projects'
      ],
      social: {
        linkedin: 'https://linkedin.com/in/',
        github: 'https://github.com/',
        email: 'arn@dsai.org'
      },
      specialties: ['Machine Learning', 'Computer Vision', 'Research', 'Leadership']
    },
  ]

  const clubMilestones = [
    {
      year: '2023',
      title: 'Foundation Year',
      description: 'DSAI Club established with 15 founding members',
      icon: Users
    },
    {
      year: '2023',
      title: 'First Workshop Series',
      description: 'Launched Python for AI workshop series with 100+ participants',
      icon: Lightbulb
    },
    {
      year: '2024',
      title: 'Recognition & Growth',
      description: 'Club recognized as "Best Technical Club" with 200+ active members',
      icon: Award
    },
    {
      year: '2025',
      title: 'Industry Partnerships',
      description: 'Established collaborations with major tech companies and research labs',
      icon: Calendar
    }
  ]

  return (
    <div className="min-h-screen pt-24 pb-24 relative overflow-hidden">
      <FloatingKeywords count={15} area="full" opacity={0.1} />
      
      {/* Hero Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Meet Our Founders
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The visionary leaders who established DSAI Club and built the foundation 
              for our thriving community of AI and data science enthusiasts.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <Card key={index} className="border-border/50 hover:border-accent/50 transition-all duration-300 hover:glow-accent group">
                <CardHeader className="text-center">
                  <div className="relative mx-auto mb-6">
                    <ImageWithFallback
                      src={founder.image}
                      alt={founder.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-accent/20 group-hover:border-accent/50 transition-all duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground rounded-full p-2">
                      <Award className="h-4 w-4" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold">{founder.name}</CardTitle>
                  <p className="text-accent font-medium">{founder.role}</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <span>{founder.branch}</span>
                    <span>•</span>
                    <span>Class of {founder.year}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-muted-foreground text-center">
                    {founder.bio}
                  </p>

                  {/* Specialties */}
                  <div>
                    <h4 className="font-semibold mb-3">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {founder.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="border-accent/30 text-accent">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold mb-3">Key Achievements</h4>
                    <ul className="space-y-2">
                      {founder.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-accent">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Social Links */}
                  <div>
                    <h4 className="font-semibold mb-3">Connect</h4>
                    <div className="flex justify-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:border-accent hover:text-accent"
                        onClick={() => window.open(founder.social.linkedin, '_blank')}
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:border-accent hover:text-accent"
                        onClick={() => window.open(founder.social.github, '_blank')}
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:border-accent hover:text-accent"
                        onClick={() => window.open(founder.social.twitter, '_blank')}
                      >
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:border-accent hover:text-accent"
                        onClick={() => window.open(`mailto:${founder.social.email}`)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Club Timeline */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">Our Journey</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From humble beginnings to a thriving community - here's how our founders built DSAI Club
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clubMilestones.map((milestone, index) => (
              <Card key={index} className="border-border/50 hover:border-accent/50 transition-all duration-300 hover:glow-accent text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 rounded-full bg-accent/20 text-accent w-fit">
                    <milestone.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="border-accent/30 text-accent w-fit mx-auto mb-2">
                    {milestone.year}
                  </Badge>
                  <CardTitle className="text-lg">{milestone.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(100,255,218,0.1),transparent_70%)]" />
        <FloatingKeywords count={8} area="full" opacity={0.2} />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Their Legacy Continues</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
            The vision and dedication of our founders continue to inspire new generations of AI and data science enthusiasts. 
            Their commitment to excellence, innovation, and community building remains at the heart of everything we do at DSAI Club.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">200+</div>
              <p className="text-muted-foreground">Members Inspired</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">50+</div>
              <p className="text-muted-foreground">Projects Launched</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <p className="text-muted-foreground">Events Organized</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}