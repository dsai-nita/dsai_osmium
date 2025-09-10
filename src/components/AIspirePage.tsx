import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icons } from './Icons'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './dsai/ImageWithFallback'

export function AIspirePage() {
  const [showRecruitmentForm, setShowRecruitmentForm] = useState(false)

  const pastOrientations = [
    {
      title: "AIspire Orientation 2024",
      year: "2024",
      date: "August 12-18, 2024",
      description:
        "An expanded orientation program that welcomed 220 first-year students with enhanced activities and extended support systems.",
      participants: 220,
      sessions: 15,
      mentors: 35,
      highlights: [
        "Welcome Week Activities",
        "AI Fundamentals Workshop Series",
        "Programming Bootcamp for Beginners",
        "DSAI Club Culture & Values",
        "Senior-Junior Interaction Sessions",
      ],
      achievements: [
        "47% increase in first-year participation",
        "Launched buddy system with senior students",
        "100% students enrolled in follow-up programs",
        "Created comprehensive resource library",
      ],
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGdyb3VwJTIwb3JpZW50YXRpb258ZW58MXx8fHwxNzU2NDY1MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ]

  const currentOrientation = {
    title: "AIspire Orientation",
    year: "2025",
    status: "Registration Open for First-Year Students!",
    description:
      "Welcome to DSAI! Our comprehensive orientation program is designed specifically for first-year students to introduce you to AI, help you connect with peers, and get you started on your exciting journey in data science and artificial intelligence.",
    features: [
      "6-day comprehensive orientation program",
      "Introduction to AI & Data Science fundamentals",
      "Python programming workshops for beginners",
      "Campus tour and club facility introduction",
      "Meet your seniors and mentors program",
      "Team building and networking activities",
      "Access to DSAI learning resources and community",
    ],
    eligibility: [
      "First-year students from any engineering branch",
      "No prior programming experience required",
      "Enthusiasm to learn about AI and data science",
      "Commitment to participate in all orientation activities",
    ],
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(100,255,218,0.1),transparent_60%)]" />

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">AIspire</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Welcome to DSAI! Our orientation program designed specifically for
            first-year students to begin their journey in AI and data science
          </p>

          <div className="bg-accent text-accent-foreground px-8 py-6 rounded-xl inline-block mb-8 glow-accent">
            <h2 className="text-2xl font-bold mb-2">{currentOrientation.status}</h2>
            <p className="mb-4">Start your AI journey with us - Welcome freshers!</p>
            <Button
              className="bg-background text-foreground hover:bg-background/90 font-medium"
              onClick={() => setShowRecruitmentForm(true)}
            >
              Let's Connect
            </Button>
          </div>
        </div>
      </section>

      {/* Current Recruitment Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              {currentOrientation.title} - {currentOrientation.year}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {currentOrientation.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Orientation Features */}
            <Card className="border-border/50 hover:border-accent/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.Star className="h-6 w-6 text-accent" />
                  What You'll Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {currentOrientation.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Who Can Join */}
            <Card className="border-border/50 hover:border-secondary/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.Target className="h-6 w-6 text-secondary" />
                  Who Can Join
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {currentOrientation.eligibility.map((criteria, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Previous Orientations
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Look back at our past orientation programs and see how we've
              welcomed new students to the DSAI family
            </p>
          </div>

          {pastOrientations.map((event, index) => (
            <div key={index} className="space-y-16">
              {/* Row 1 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="bg-accent text-accent-foreground mb-4 text-sm">
                    {event.year}
                  </Badge>
                  <h3 className="text-3xl font-bold mb-4 gradient-text">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {event.description}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="p-6 bg-background rounded-xl shadow-sm border">
                    <div className="text-3xl font-bold text-accent">
                      {event.participants}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      New Students
                    </div>
                  </div>
                  <div className="p-6 bg-background rounded-xl shadow-sm border">
                    <div className="text-3xl font-bold text-accent">
                      {event.sessions}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Sessions
                    </div>
                  </div>
                  <div className="p-6 bg-background rounded-xl shadow-sm border">
                    <div className="text-3xl font-bold text-accent">
                      {event.mentors}
                    </div>
                    <div className="text-sm text-muted-foreground">Mentors</div>
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className='flex flex-col gap-6'>
                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Icons.Award className="h-5 w-5 text-primary" />
                        Highlights
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {event.highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Icons.Award className="h-5 w-5 text-primary" />
                        Key Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {event.achievements.map((achievement, aIndex) => (
                          <li key={aIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
            Ready to Begin Your AI Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Welcome to DSAI! Join our orientation program and take your first
            step into the exciting world of AI and data science. Registration is
            now open for first-year students!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground glow-accent"
              onClick={() => setShowRecruitmentForm(true)}
            >
              Register Now <Icons.ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recruitment Form Modal Trigger */}
      {showRecruitmentForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold gradient-text">
                  Register for AIspire Orientation
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRecruitmentForm(false)}
                >
                  <Icons.X className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-muted-foreground mb-6">
                Fill out this form to register for the AIspire Orientation
                Program. Join us for an exciting week of learning, networking,
                and discovering your passion for AI!
              </p>

              <Button
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                asChild
                onClick={() => setShowRecruitmentForm(false)}
              >
                <Link to="/aispire-form">
                  Continue to Registration Form{' '}
                  <Icons.ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
