import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icons } from './Icons'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './dsai/ImageWithFallback'
import { AnimatedBackground } from './AnimatedBackground'
import { AnimatedStats } from './AnimatedStats'
import { FloatingKeywords } from './FloatingKeywords'
import { ChatBot } from './ChatBot'
import { GiArtificialIntelligence } from "react-icons/gi";
import { LuBrainCircuit } from "react-icons/lu";
import { SiDeepl } from "react-icons/si";
import { IoSparklesSharp } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";

import { PiInfinityBold } from "react-icons/pi";
import { FaReact } from "react-icons/fa";
import { GiEvilEyes } from "react-icons/gi";
import { SiReactquery } from "react-icons/si";
export function Homepage() {
  const [typedText, setTypedText] = useState('')
  const [counts, setCounts] = useState({
    members: 0,
    projects: 0,
    events: 0,
    awards: 0
  })

  const fullText = "Data Science And Artificial Intelligence Club NIT Agartala"
  const targetCounts = {
    members: 150,
    projects: 45,
    events: 25,
    awards: 12
  }

  // Typewriter effect
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  // Counter animation
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let step = 0
    const timer = setInterval(() => {
      if (step <= steps) {
        setCounts({
          members: Math.floor((targetCounts.members * step) / steps),
          projects: Math.floor((targetCounts.projects * step) / steps),
          events: Math.floor((targetCounts.events * step) / steps),
          awards: Math.floor((targetCounts.awards * step) / steps)
        })
        step++
      } else {
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [])

  const featuredProjects = [
    {
      title: "AI-Powered Student Assistant",
      description: "Intelligent chatbot for academic guidance using NLP and machine learning algorithms.",
      image: "https://images.unsplash.com/photo-1645839078449-124db8a049fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3NTY0MDU2MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["AI", "NLP", "Python"],
      category: "Machine Learning"
    },
    {
      title: "Autonomous Navigation Robot",
      description: "Self-navigating robot using computer vision and path planning algorithms.",
      image: "https://images.unsplash.com/photo-1667986292516-f27450ae75a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMHRlY2hub2xvZ3klMjBmdXR1cmV8ZW58MXx8fHwxNzU2NDk1MTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Robotics", "CV", "ROS"],
      category: "Robotics"
    },
    {
      title: "Predictive Analytics Dashboard",
      description: "Real-time data visualization and predictive modeling for business intelligence.",
      image: "https://images.unsplash.com/photo-1684610529682-553625a1ffed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NTY0Njc3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Data Science", "React", "TensorFlow"],
      category: "Data Science"
    }
  ]

  const upcomingEvents = [
    {
      title: "AIspire 2.0",
      date: "Sep 12, 2025",
      type: "Orientation",
      description: "Orientation session for freshers"
    },
    {
      title: "Speaker session",
      date: "will be announced soon",
      type: "Seminar",
      description: "Industry expert insights on AI trends"
    }
  ]



  const exploreAreas = [
    {
      title: "Machine Learning",
      description: "From classical ML to deep neural networks, we explore algorithms that allow computers to learn patterns from data.",
      icon: Icons.Brain,
      color: "text-accent"
    },
    {
      title: "Data Science",
      description: "Mastering the art of extracting insights and knowledge from large and complex datasets.",
      icon: Icons.Database,
      color: "text-secondary"
    },
    {
      title: "AI Applications",
      description: "Building innovative solutions across domains like healthcare, finance, education and more.",
      icon: Icons.Lightbulb,
      color: "text-accent"
    },
    {
      title: "Research & Innovation",
      description: "Pushing boundaries through original research and implementing cutting-edge papers.",
      icon: Icons.Search,
      color: "text-primary"
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Animations - Theme-aware */}
      <AnimatedBackground />
      <FloatingKeywords count={12} area="full" opacity={0.15} className="dark:opacity-20" />

      {/* Hero Section with Background Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-15 dark:opacity-20"
          >
            <source src="https://cdn.pixabay.com/vimeo/278747000/background-loop.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-primary/15 dark:from-background/90 dark:via-background/80 dark:to-primary/20" />
        </div>

        {/* Enhanced Animated Background Overlay - Theme-aware */}
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(100,255,218,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(100,255,218,0.1),transparent_70%)]" />
        </div>

        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">EMPOWERING </span>
              <span className="gradient-text">DATA SCIENCE</span>
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-foreground">FOR STUDENTS</h3>
          </div>

          <p className="text-lg text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
            We <span className="text-accent font-semibold">create</span> projects,
            <span className="text-secondary font-semibold"> innovate</span> with AI models, and
            <span className="text-accent font-semibold"> thrive</span> in
            <span className="text-secondary font-semibold"> collaborative learning</span>
          </p>

          <div className="mb-12 h-12">
            <p className="text-xl md:text-2xl text-muted-foreground">
              {typedText}
              <span className="border-r-2 border-accent animate-pulse ml-1"></span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
           <Button
  size="lg"
  className="bg-accent text-accent-foreground hover:bg-accent/90 glow-accent group"
  asChild
>
  <a
    href="https://chat.whatsapp.com/EJcQIjR5xCc4KrNYDNIKXp?mode=ems_wa_c"
    target="_blank"
    rel="noopener noreferrer"
  >
    Join DSAI
    <Icons.ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
  </a>
</Button>

            <Button
              size="lg"
              variant="outline"
              className="border-secondary text-secondary hover:bg-primary hover:text-white"
              asChild
            >
              <Link to="/innovations">Explore Projects</Link>
            </Button>
          </div>

         <div className="text-center mt-12"> {/* mt-12 adds ample top margin */}
  <p className="text-muted-foreground mb-2">
    Are you an organization looking to collaborate?
  </p>
  <Button
    size="lg"
    className="bg-gradient-to-r from-accent to-primary text-accent-foreground py-4 px-8 text-xl font-semibold rounded-xl 
      shadow-lg ring-2 ring-accent/30 transition-all duration-300 group
      hover:scale-105 hover:shadow-2xl hover:from-primary hover:to-accent hover:ring-accent/60"
    asChild
  >
    <a
      href="mailto:dsai@college.edu"
      className="flex items-center justify-center gap-3 focus:outline-none"
    >
      Reach Us
      <Icons.Mail
        className={`
          inline-block ml-2 h-6 w-6 
          transition-transform duration-500
          group-hover:scale-125 
          group-hover:rotate-[20deg] 
          group-hover:text-primary 
          group-hover:drop-shadow-lg
          group-hover:animate-bounce-slow
        `}
      />
    </a>
  </Button>
</div>



        </div>
      </section>

      {/* What We Explore Section */}
      <section className="py-20 px-4 bg-muted/40 dark:bg-muted/30 relative">
        <FloatingKeywords count={6} area="full" opacity={0.08} className="dark:opacity-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-accent font-medium mb-4">Our Focus Areas</p>
            <h2 className="text-4xl font-bold gradient-text mb-4">What We Explore</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Dive into the exciting domains we explore through workshops, projects, and research initiatives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {exploreAreas.map((area, index) => (
              <Card key={index} className="group hover:border-accent/50 transition-all duration-300 hover:glow-accent bg-card/80 dark:bg-card/50 backdrop-blur-sm border-border/50 dark:border-border">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-card/90 dark:bg-card border border-border/30 dark:border-border">
                    <area.icon className={`h-8 w-8 ${area.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-accent transition-colors">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center leading-relaxed">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section with AnimatedStats */}
      <AnimatedStats />

      {/* Featured Projects Section */}
      <section className="py-20 px-4 bg-muted/40 dark:bg-muted/30 relative">
        <FloatingKeywords count={8} area="full" opacity={0.1} className="dark:opacity-15" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Featured Projects</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our latest innovations in AI, Machine Learning, and Robotics
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="group hover:border-accent/50 transition-all duration-300 hover:glow-accent cursor-pointer overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-primary text-primary-foreground">
                      {project.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:text-accent transition-colors">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="group border-accent text-accent hover:text-primary hover:bg-primary/50 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
              asChild
            >
              <Link to="/innovations" className="flex items-center">
                View All Projects
                <Icons.ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>



      {/* Upcoming Events Section */}
      <section className="py-20 px-4 bg-muted/40 dark:bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Upcoming Events</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join us for upcoming workshops, seminars, and learning opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:border-secondary/50 transition-all duration-300 hover:glow-cyan">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                  <CardDescription className="text-secondary">{event.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="group border-accent text-accent hover:text-accent hover:bg-accent/10 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
              asChild
            >
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Technology Stack Showcase */}
      <section className="py-20 px-4 bg-muted/40 dark:bg-muted/30 relative">
        <FloatingKeywords count={6} area="full" opacity={0.08} className="dark:opacity-10" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold gradient-text mb-4">Our Technology Stack</h2>
          <p className="text-muted-foreground text-lg mb-16">
            Cutting-edge tools and frameworks we use to build the future
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Artificial Intelligence', icon: GiArtificialIntelligence, color: 'text-accent' },
              { name: 'Machine Learning', icon: LuBrainCircuit, color: 'text-secondary' },
              { name: 'Deep Learning', icon: SiDeepl, color: 'text-accent' },
              { name: 'GenAI', icon: IoSparklesSharp, color: 'text-secondary' },
              { name: 'Natural Language Processing', icon: CiSettings, color: 'text-accent' },
              { name: 'MLOps', icon: PiInfinityBold, color: 'text-secondary' },
              { name: 'Data Science', icon: SiReactquery, color: 'text-accent' },
              { name: 'Computer Vision', icon: GiEvilEyes , color: 'text-accent' }
            ].map((tech, index) => (
              <div key={index} className="group">
                <div className="bg-card/90 dark:bg-card rounded-lg p-6 border border-border/50 dark:border-border hover:border-accent/50 transition-all duration-300 hover:glow-accent backdrop-blur-sm">
                  <tech.icon className={`h-12 w-12 ${tech.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                  <h3 className="font-semibold text-foreground">{tech.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ChatBot Component */}
      <ChatBot />
    </div>
  )
}