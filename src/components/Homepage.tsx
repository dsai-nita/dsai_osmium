import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icons } from './Icons'; // Your central Lucide icons file
import { BrainCircuit, DatabaseZap, AppWindow, Beaker, Cpu, Layers, Sparkles, MessageCircle, RefreshCw, ScanEye, Bot, Mic, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './dsai/ImageWithFallback';
import { AnimatedBackground } from './AnimatedBackground';
import { AnimatedStats } from './AnimatedStats'; // Also known as ImpactSection
import { FloatingKeywords } from './FloatingKeywords';
import { ChatBot } from './ChatBot';

export function Homepage() {
  const [typedText, setTypedText] = useState('');
  const fullText = "Data Science And Artificial Intelligence Club NIT Agartala";

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const featuredProjects = [
    {
      title: "AI-Powered Student Assistant",
      description: "Intelligent chatbot for academic guidance using NLP and machine learning algorithms.",
      image: "https://images.unsplash.com/photo-1645839078449-124db8a049fd?q=80&w=1080",
      tags: ["AI", "NLP", "Python"],
      category: "Machine Learning"
    },
    {
      title: "Autonomous Navigation Robot",
      description: "Self-navigating robot using computer vision and path planning algorithms.",
      image: "https://images.unsplash.com/photo-1667986292516-f27450ae75a9?q=80&w=1080",
      tags: ["Robotics", "CV", "ROS"],
      category: "Robotics"
    },
    {
      title: "Predictive Analytics Dashboard",
      description: "Real-time data visualization and predictive modeling for business intelligence.",
      image: "https://images.unsplash.com/photo-1684610529682-553625a1ffed?q=80&w=1080",
      tags: ["Data Science", "React", "TensorFlow"],
      category: "Data Science"
    }
  ];

  const upcomingEvents = [
    {
      title: "AIspire 2.0 Orientation",
      date: "Sep 12, 2025",
      type: "Orientation",
      description: "An introductory session for all aspiring tech enthusiasts and newcomers.",
      icon: Icons.Users
    },
    {
      title: "Guest Speaker Session",
      date: "To Be Announced",
      type: "Seminar",
      description: "Gain insights on the latest AI trends from a leading industry expert.",
      icon: Mic
    }
  ];

  const exploreAreas = [
    {
      title: "Machine Learning",
      description: "From classical ML to deep neural networks, we explore algorithms that allow computers to learn patterns from data.",
      icon: BrainCircuit, // Lucide Icon
      color: "text-blue-400"
    },
    {
      title: "Data Science",
      description: "Mastering the art of extracting insights and knowledge from large and complex datasets.",
      icon: DatabaseZap, // Lucide Icon
      color: "text-rose-400"
    },
    {
      title: "AI Applications",
      description: "Building innovative solutions across domains like healthcare, finance, education and more.",
      icon: AppWindow, // Lucide Icon
      color: "text-amber-400"
    },
    {
      title: "Research & Innovation",
      description: "Pushing boundaries through original research and implementing cutting-edge papers.",
      icon: Beaker, // Lucide Icon
      color: "text-emerald-400"
    }
  ];
  
  const techStack = [
    { name: 'Artificial Intelligence', icon: Cpu, color: 'text-accent' },
    { name: 'Machine Learning', icon: BrainCircuit, color: 'text-secondary' },
    { name: 'Deep Learning', icon: Layers, color: 'text-accent' },
    { name: 'Generative AI', icon: Sparkles, color: 'text-gray' },
    { name: 'Natural Language Processing', icon: MessageCircle, color: 'text-accent' },
    { name: 'MLOps', icon: RefreshCw, color: 'text-secondary' },
    { name: 'Data Science', icon: DatabaseZap, color: 'text-accent' },
    { name: 'Computer Vision', icon: ScanEye, color: 'text-secondary' }
  ];


  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <AnimatedBackground />
      <FloatingKeywords count={12} area="full" opacity={0.15} className="dark:opacity-20" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-15 dark:opacity-20">
            <source src="hero_video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-primary/15 dark:from-background/90 dark:via-background/80 dark:to-primary/20" />
        </div>
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(100,255,218,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(100,255,218,0.1),transparent_70%)]" />

        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">EMPOWERING </span>
            <span className="gradient-text">DATA SCIENCE</span>
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-foreground">FOR STUDENTS</h3>
          <p className="text-lg text-muted-foreground my-8 max-w-3xl mx-auto leading-relaxed">
            We <span className="text-accent font-semibold">create</span> projects,
            <span className="text-secondary font-semibold"> innovate</span> with AI models, and
            <span className="text-accent font-semibold"> thrive</span> in
            <span className="text-secondary font-semibold"> collaborative learning</span>.
          </p>
          <div className="mb-12 h-12">
            <p className="text-xl md:text-2xl text-muted-foreground">
              {typedText}
              <span className="border-r-2 border-accent animate-pulse ml-1"></span>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 glow-accent group" asChild>
              <a href="https://chat.whatsapp.com/EJcQIjR5xCc4KrNYDNIKXp" target="_blank" rel="noopener noreferrer">
                Join DSAI Community
                <Icons.ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground" asChild>
              <Link to="/innovations">Explore Projects</Link>
            </Button>
          </div>
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-2">Are you an organization looking to collaborate?</p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-accent-foreground py-4 px-8 text-lg font-semibold rounded-xl shadow-lg ring-2 ring-accent/30 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:from-accent hover:to-primary" asChild>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=officialdatascienceaiclub.nita@gmail.com&su=Hello&body=I%20want%20to%20connect" target='_blank' className="flex items-center justify-center gap-3">
                Reach Out
                <Icons.Mail className="inline-block h-6 w-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-[20deg]" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <AnimatedStats />

      {/* Featured Projects Section */}
      <section className="py-20 px-4 bg-muted/40 relative">
        <FloatingKeywords count={8} area="full" opacity={0.1} className="dark:opacity-15" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Featured Innovations</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A glimpse into the exciting projects built by our members.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="group hover:border-accent/50 transition-all duration-300 hover:glow-accent cursor-pointer overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-primary text-primary-foreground">{project.category}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:text-accent transition-colors">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="group border-accent text-accent hover:text-accent-foreground hover:bg-accent/90 hover:scale-105" asChild>
              <Link to="/innovations" className="flex items-center">
                View All Projects
                <Icons.ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section (Improved UI) */}
      <section className="py-20 px-4 bg-muted/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Upcoming Events</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Join us for upcoming workshops, seminars, and learning opportunities.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="group hover:border-secondary/50 transition-all duration-300 hover:glow-cyan bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
                    <event.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg group-hover:text-secondary transition-colors">{event.title}</CardTitle>
                    <CardDescription className="text-secondary font-semibold">{event.date}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="group border-secondary text-secondary hover:text-secondary-foreground hover:bg-secondary" asChild>
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Technology Stack Showcase (with Lucide Icons) */}
      <section className="py-20 px-4 bg-muted/40 relative">
        <FloatingKeywords count={6} area="full" opacity={0.08} className="dark:opacity-10" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold gradient-text mb-4">Our Technology Stack</h2>
          <p className="text-muted-foreground text-lg mb-16">Cutting-edge tools and frameworks we use to build the future.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {techStack.map((tech, index) => (
              <div key={index} className="group flex flex-col items-center">
                <div className="bg-card/90 rounded-lg p-6 border border-border/50 transition-all duration-300 hover:border-accent/50 hover:glow-accent backdrop-blur-sm">
                  <tech.icon className={`h-12 w-12 ${tech.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                </div>
                <h3 className="font-semibold text-foreground mt-4 text-sm">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Interactive ChatBot Component */}
      <ChatBot />
    </div>
  );
}