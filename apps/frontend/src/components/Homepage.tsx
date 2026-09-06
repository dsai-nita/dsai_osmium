import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icons } from "./Icons";
import { eventsApi,projectsApi } from "@/lib/endpoints";

import {
  BrainCircuit,
  DatabaseZap,
  AppWindow,
  Beaker,
  Cpu,
  Layers,
  Sparkles,
  MessageCircle,
  RefreshCw,
  ScanEye,
} from "lucide-react";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

import { ImageWithFallback } from "./dsai/ImageWithFallback";
import { AnimatedBackground } from "./AnimatedBackground";
import { AnimatedStats } from "./AnimatedStats";
import { FloatingKeywords } from "./FloatingKeywords";
import { ChatBot } from "./ChatBot";
import { adaptProject } from "@/lib/adapters";



interface Event {
  _id?: string;
  id?: string;

  title?: string;
  name?: string;

  description?: string;

  date?: string;
  startDate?: string;

  type?: string;
  category?: string;

  image?: string;
  imageUrl?: string;
  bannerImage?: string;
  banner?: string;
registrationLink?: string;
  isFeatured?: boolean;
  featured?: boolean;
}

export function Homepage() {
  const [typedText, setTypedText] = useState("");

  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
  const [upcomingEvent, setUpcomingEvent] = useState<Event | null>(null);

  const [eventsLoading, setEventsLoading] = useState(true);
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);




  const fullText =
    "Data Science And Artificial Intelligence Club NIT Agartala";

  

  useEffect(() => {
    let index = 0;

    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;

      if (index === fullText.length) {
        clearInterval(timer);
      }
    }, 70);

    return () => clearInterval(timer);
  }, []);



 useEffect(() => {
  const fetchEvents = async () => {
    try {
      setEventsLoading(true);

      const response = await eventsApi.list({ limit: 100 });

      console.log("Events API response:", response);

   
      const result = response.data;

      let events: Event[] = [];

     
      if (Array.isArray(result)) {
        events = result;
      } else if (Array.isArray(result?.events)) {
        events = result.events;
      } else if (Array.isArray(result?.data)) {
        events = result.data;
      }

      console.log("Parsed events:", events);

      const now = new Date();

     
      const futureEvents = events
        .filter((event) => {
          const eventDate = event.date || event.startDate;

          if (!eventDate) return false;

          const parsedDate = new Date(eventDate);

          return (
            !Number.isNaN(parsedDate.getTime()) &&
            parsedDate >= now
          );
        })
        .sort((a, b) => {
          const dateA = new Date(
            a.date || a.startDate || ""
          ).getTime();

          const dateB = new Date(
            b.date || b.startDate || ""
          ).getTime();

          return dateA - dateB;
        });

      console.log("Future events:", futureEvents);

     
      const featured =
        futureEvents.find(
          (event) =>
            event.isFeatured === true ||
            event.featured === true
        ) || null;

      console.log("Featured event:", featured);

      setFeaturedEvent(featured);

     
      const nextEvent =
        futureEvents.find(
          (event) => event !== featured
        ) || null;

      console.log("Upcoming event:", nextEvent);

      setUpcomingEvent(nextEvent);
    } catch (error) {
      console.error("Event fetch error:", error);

      setFeaturedEvent(null);
      setUpcomingEvent(null);
    } finally {
      setEventsLoading(false);
    }
  };
 

  fetchEvents();
}, []);


 useEffect(() => {
  
  const fetchFeaturedProjects = async () => {
    try {
      const response = await projectsApi.list();

      console.log("Projects API response:", response);

      const result = response.data.filter((p) => {
  if(p.featured === true || p.isFeatured === true) {
    return adaptProject(p);
  }
});
      
      const projects = Array.isArray(result) ? result : [];
      setFeaturedProjects(projects);
     

      console.log("Parsed projects:", projects);
    } catch (err) {
      console.log(err);   
    }
 
    }
    fetchFeaturedProjects();


}, []);




  const exploreAreas = [
    {
      title: "Machine Learning",
      description:
        "From classical ML to deep neural networks, we explore algorithms that allow computers to learn patterns from data.",
      icon: BrainCircuit,
      color: "text-blue-400",
    },

    {
      title: "Data Science",
      description:
        "Mastering the art of extracting insights and knowledge from large and complex datasets.",
      icon: DatabaseZap,
      color: "text-rose-400",
    },

    {
      title: "AI Applications",
      description:
        "Building innovative solutions across domains like healthcare, finance, education and more.",
      icon: AppWindow,
      color: "text-amber-400",
    },

    {
      title: "Research & Innovation",
      description:
        "Pushing boundaries through original research and implementing cutting-edge papers.",
      icon: Beaker,
      color: "text-emerald-400",
    },
  ];

 

  const techStack = [
    {
      name: "Artificial Intelligence",
      icon: Cpu,
      color: "text-accent",
    },

    {
      name: "Machine Learning",
      icon: BrainCircuit,
      color: "text-secondary",
    },

    {
      name: "Deep Learning",
      icon: Layers,
      color: "text-accent",
    },

    {
      name: "Generative AI",
      icon: Sparkles,
      color: "text-gray",
    },

    {
      name: "Natural Language Processing",
      icon: MessageCircle,
      color: "text-accent",
    },

    {
      name: "MLOps",
      icon: RefreshCw,
      color: "text-secondary",
    },

    {
      name: "Data Science",
      icon: DatabaseZap,
      color: "text-accent",
    },

    {
      name: "Computer Vision",
      icon: ScanEye,
      color: "text-secondary",
    },
  ];



  const formatEventDate = (date?: string) => {
    if (!date) return "Date TBA";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  

  const getEventImage = (event: Event) => {
    console.log(event)
    return (
      event.image ||
      event.imageUrl ||
      event.bannerImage ||
      event.banner ||
      event.coverImage?.url ||
      ""
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <AnimatedBackground />

      <FloatingKeywords
        count={12}
        area="full"
        opacity={0.15}
        className="dark:opacity-20"
      />


      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-15 dark:opacity-20"
          >
            <source src="hero_video.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-primary/15 dark:from-background/90 dark:via-background/80 dark:to-primary/20" />
        </div>

        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(100,255,218,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(100,255,218,0.1),transparent_70%)]" />

        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">
              EMPOWERING{" "}
            </span>

            <span className="gradient-text">
              DATA SCIENCE
            </span>
          </h2>

          <h3 className="text-3xl md:text-5xl font-bold text-foreground">
            FOR STUDENTS
          </h3>

          <p className="text-lg text-muted-foreground my-8 max-w-3xl mx-auto leading-relaxed">
            We{" "}
            <span className="text-accent font-semibold">
              create
            </span>{" "}
            projects,
            <span className="text-secondary font-semibold">
              {" "}
              innovate
            </span>{" "}
            with AI models, and
            <span className="text-accent font-semibold">
              {" "}
              thrive
            </span>{" "}
            in
            <span className="text-secondary font-semibold">
              {" "}
              collaborative learning
            </span>
            .
          </p>

          <div className="mb-12 h-12">
            <p className="text-xl md:text-2xl text-muted-foreground">
              {typedText}
              <span className="border-r-2 border-accent animate-pulse ml-1"></span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 glow-accent group"
              asChild
            >
              <a
                href="https://chat.whatsapp.com/EJcQIjR5xCc4KrNYDNIKXp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join DSAI Community

                <Icons.ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
              asChild
            >
              <Link to="/innovations">
                Explore Projects
              </Link>
            </Button>
          </div>

          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-2">
              Are you an organization looking to collaborate?
            </p>

            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent text-accent-foreground py-4 px-8 text-lg font-semibold rounded-xl shadow-lg ring-2 ring-accent/30 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:from-accent hover:to-primary"
              asChild
            >
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=officialdatascienceaiclub.nita@gmail.com&su=Hello&body=I%20want%20to%20connect"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3"
              >
                Reach Out

                <Icons.Mail className="inline-block h-6 w-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-[20deg]" />
              </a>
            </Button>
          </div>
        </div>
      </section>

    

      <AnimatedStats />

     

      <section className="py-20 px-4 bg-muted/40 relative">
        <FloatingKeywords
          count={8}
          area="full"
          opacity={0.1}
          className="dark:opacity-15"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Featured Innovations
            </h2>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A glimpse into the exciting projects built by our members.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {featuredProjects.map((project, index) => (
              <Card
                key={index}
  className={`group hover:border-accent/50 transition-all duration-300 hover:glow-accent cursor-pointer overflow-hidden border-accent/30 bg-card/80 backdrop-blur-xl shadow-lg ${
  featuredProjects.length <= 2
    ? "w-[calc(50%-1rem)]"
    : "w-[calc(33.333%-1.333rem)]"
}`}
              >
                <div className="relative h-50 overflow-hidden">
                  <ImageWithFallback
                    src={getEventImage(project)}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />

                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="secondary"
                      className="bg-primary text-primary-foreground"
                    >
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="group-hover:text-accent transition-colors">
                    {project.title}
                  </CardTitle>

                  <CardDescription>
                 {project.description?.split(" ").slice(0, 20).join(" ")}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="text-xs border-accent text-accent hover:bg-accent/10"
                      >
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
              className="group border-accent text-accent hover:text-accent-foreground hover:bg-accent/90 hover:scale-105"
              asChild
            >
              <Link
                to="/innovations"
                className="flex items-center"
              >
                View All Projects

                <Icons.ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

     

      {!eventsLoading && featuredEvent && (
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-accent text-accent-foreground">
                Featured Event
              </Badge>

              <h2 className="text-4xl md:text-5xl font-bold gradient-text">
                Don't Miss This
              </h2>

              <p className="text-muted-foreground text-lg mt-4">
                Join the DSAI community for our next exciting event.
              </p>
            </div>

            <Card className="overflow-hidden border-accent/30 bg-card/80 backdrop-blur-xl shadow-2xl">
              <div className="grid lg:grid-cols-2">

                {getEventImage(featuredEvent) ? (
                  <div className="relative h-[300px] lg:h-[430px] overflow-hidden">
                    <ImageWithFallback
                      src={getEventImage(featuredEvent)}
                      alt={
                        featuredEvent.title ||
                        featuredEvent.name ||
                        "Featured Event"
                      }
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/40" />
                  </div>
                ) : (
                  <div className="h-[300px] lg:h-[430px] bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 flex items-center justify-center">
                    <Icons.Calendar className="w-24 h-24 text-accent opacity-60" />
                  </div>
                )}


                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge
                    variant="outline"
                    className="w-fit mb-5 border-accent text-accent"
                  >
                    {featuredEvent.type ||
                      featuredEvent.category ||
                      "DSAI Event"}
                  </Badge>

                  <h3 className="text-3xl md:text-4xl font-bold mb-5">
                    {featuredEvent.title ||
                      featuredEvent.name ||
                      "Upcoming Event"}
                  </h3>

                  <div className="flex items-center gap-3 text-accent font-semibold text-lg mb-5">
                    <Icons.Calendar className="h-5 w-5" />

                    {formatEventDate(
                      featuredEvent.date ||
                        featuredEvent.startDate
                    )}
                  </div>

                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {featuredEvent.description ||
                      "Join us for an exciting DSAI event."}
                  </p>

                  <Button
                    size="lg"
                    className="w-fit bg-accent text-accent-foreground hover:bg-accent/90 group"
                    asChild
                  >
                    <Link to="/events">
                      View Event Details

                      <Icons.ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

   

      {!eventsLoading && upcomingEvent && (
        <section className="py-20 px-4 bg-muted/40 relative">
          <FloatingKeywords
            count={6}
            area="full"
            opacity={0.08}
            className="dark:opacity-10"
          />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <Badge
                variant="outline"
                className="mb-4 border-secondary text-secondary"
              >
                Next Event
              </Badge>

              <h2 className="text-4xl font-bold gradient-text mb-4">
                Upcoming Event
              </h2>

              <p className="text-muted-foreground text-lg">
                Be part of our next learning and innovation experience.
              </p>
            </div>

            <Card className="group overflow-hidden bg-card/80 backdrop-blur-xl border-secondary/20 hover:border-secondary/50 transition-all duration-500 shadow-xl">
              <div className="grid md:grid-cols-2">

                <div className="relative h-[280px] md:h-[360px] overflow-hidden">
                  {getEventImage(upcomingEvent) ? (
                    <ImageWithFallback
                      src={getEventImage(upcomingEvent)}
                      alt={
                        upcomingEvent.title ||
                        upcomingEvent.name ||
                        "Upcoming Event"
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-secondary/20 via-primary/10 to-accent/20 flex items-center justify-center">
                      <Icons.Calendar className="w-24 h-24 text-secondary opacity-60" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5">
                    <Badge className="bg-secondary text-secondary-foreground">
                      {upcomingEvent.type ||
                        upcomingEvent.category ||
                        "Event"}
                    </Badge>
                  </div>
                </div>

            

                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/20">
                      <Icons.Calendar className="h-6 w-6 text-secondary" />
                    </div>

                    <span className="text-secondary font-semibold">
                      {formatEventDate(
                        upcomingEvent.date ||
                          upcomingEvent.startDate
                      )}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold mb-4 group-hover:text-secondary transition-colors">
                    {upcomingEvent.title ||
                      upcomingEvent.name ||
                      "Upcoming Event"}
                  </h3>

                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {upcomingEvent.description ||
                      "Join us for our upcoming DSAI event."}
                  </p>
<div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-fit border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground group"
                    asChild
                  >
                    <Link to={upcomingEvent.registrationLink || "/events"}>
                      Registration Link

                      <Icons.ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>

 <Button
                    variant="outline"
                    size="lg"
                    className="w-fit border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground group"
                    asChild
                  >
                    <Link to="/events">
                      View All Events

                      <Icons.ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  </div>



                </div>
              </div>
            </Card>
          </div>
        </section>
      )}



      <section className="py-20 px-4 bg-muted/40 relative">
        <FloatingKeywords
          count={6}
          area="full"
          opacity={0.08}
          className="dark:opacity-10"
        />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold gradient-text mb-4">
            Our Technology Stack
          </h2>

          <p className="text-muted-foreground text-lg mb-16">
            Cutting-edge tools and frameworks we use to build the future.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="group flex flex-col items-center"
              >
                <div className="bg-card/90 rounded-lg p-6 border border-border/50 transition-all duration-300 hover:border-accent/50 hover:glow-accent backdrop-blur-sm">
                  <tech.icon
                    className={`h-12 w-12 ${tech.color} mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  />
                </div>

                <h3 className="font-semibold text-foreground mt-4 text-sm">
                  {tech.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      <ChatBot />
    </div>
  );
}