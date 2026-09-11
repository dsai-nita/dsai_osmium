import { Link } from "react-router-dom";

import {
  ArrowRight,
  Award,
  Calendar,
  Check,
  Sparkles,
  Star,
  Target,
} from "lucide-react";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./dsai/ImageWithFallback";
import { useEffect, useState } from "react";
import { eventsApi } from "../lib/endpoints";

export function AIspirePage() {
 

const [orientationEvents, setOrientationEvents] = useState<any[]>([]);
const [loadingOrientations, setLoadingOrientations] = useState(true);

useEffect(() => {
  const fetchOrientationEvents = async () => {
    try {
      setLoadingOrientations(true);

      const response = await eventsApi.list({
        limit: 100,
      });

      console.log("Orientation events response:", response);

  
     
      const events =
        response?.events ||
        response?.data?.events ||
        response?.data ||
        response?.results ||
        (Array.isArray(response) ? response : []);

     
      const orientations = events.filter((event: any) => {
        const type = String(
          event?.type ||
            event?.category ||
            event?.eventType ||
            ""
        ).toLowerCase();

        const title = String(
          event?.title ||
            event?.name ||
            ""
        ).toLowerCase();

        return (
          type.includes("orientation") ||
          title.includes("orientation")
        );
      });

      setOrientationEvents(orientations);
    } catch (error) {
      console.error(
        "Failed to fetch orientation events:",
        error
      );

      setOrientationEvents([]);
    } finally {
      setLoadingOrientations(false);
    }
  };

  fetchOrientationEvents();
}, []);




const getEventDate = (event: any) => {
  return (
    event?.startDate ||
    event?.date ||
    event?.eventDate ||
    event?.start_date ||
    null
  );
};

const getEventTime = (event: any) => {
  return (
    event?.startTime ||
    event?.time ||
    event?.eventTime ||
    event?.start_time ||
    null
  );
};

const getEventDateTime = (event: any): Date | null => {
  const date = getEventDate(event);
  const time = getEventTime(event);

  if (!date) return null;

  const dateString = String(date).trim();

  if (dateString.includes("T") || /\d{2}:\d{2}/.test(dateString)) {
    const parsed = new Date(dateString);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  if (time) {
    const timeString = String(time).trim();
    const parsed = new Date(`${dateString}T${timeString}`);
    if (!isNaN(parsed.getTime())) return parsed;
  }

  const parsed = new Date(`${dateString}T00:00:00`);
  return isNaN(parsed.getTime()) ? null : parsed;
};


const getRegistrationLink = (event: any) => {
  return (
    event?.registrationLink ||
    event?.registrationUrl ||
    event?.registerLink ||
    event?.registrationURL ||
    event?.gformLink ||
    event?.googleFormLink ||
    event?.googleForm ||
    ""
  );
};


const getOrientationImage = (event: any) => {
  return (
    event?.image ||
    event?.imageUrl ||
    event?.bannerImage ||
    event?.banner ||
    event?.coverImage?.url ||
    ""
  );
};


const getEventDescription = (event: any) => {
  return (
    event?.description ||
    event?.shortDescription ||
    event?.details ||
    "Join DSAI and explore the world of Data Science and Artificial Intelligence."
  );
};


const getFeatures = (event: any) => {
  if (Array.isArray(event?.features)) {
    return event.features;
  }

  if (Array.isArray(event?.highlights)) {
    return event.highlights;
  }

  return [
    "Introduction to AI & Data Science",
    "Programming and technical workshops",
    "Meet seniors and mentors",
    "Team building and networking",
    "Access to DSAI learning resources",
  ];
};


const getEligibility = (event: any) => {
  if (Array.isArray(event?.eligibility)) {
    return event.eligibility;
  }

  return [
    "Students interested in AI and Data Science",
    "No prior programming experience required",
    "Enthusiasm to learn and explore technology",
  ];
};


const now = new Date();
const nowTimestamp = now.getTime();

const upcomingOrientations = orientationEvents
  .map((event: any) => ({
    event,
    dateTime: getEventDateTime(event),
  }))
  .filter(({ dateTime }) => {
    return dateTime !== null && dateTime.getTime() >= nowTimestamp;
  })
  .sort((a, b) => {
    return a.dateTime!.getTime() - b.dateTime!.getTime();
  });

const pastOrientationEvents = orientationEvents
  .map((event: any) => ({
    event,
    dateTime: getEventDateTime(event),
  }))
  .filter(({ dateTime }) => {
    return dateTime !== null && dateTime.getTime() < nowTimestamp;
  })
  .sort((a, b) => {
    return b.dateTime!.getTime() - a.dateTime!.getTime();
  })
  .map(({ event }) => event);

const nextUpcomingEvent =
  upcomingOrientations.length > 0
    ? upcomingOrientations[0].event
    : null;

const currentOrientation = nextUpcomingEvent
  ? {
      isUpcoming: true,
      event: nextUpcomingEvent,
      title:
        nextUpcomingEvent?.title ||
        nextUpcomingEvent?.name ||
        "AIspire Orientation",
      year: getEventDateTime(nextUpcomingEvent)
        ? getEventDateTime(nextUpcomingEvent)!.getFullYear()
        : "",
      date: getEventDate(nextUpcomingEvent),
      status: "Registration Open",
      description: getEventDescription(nextUpcomingEvent),
      features: getFeatures(nextUpcomingEvent),
      eligibility: getEligibility(nextUpcomingEvent),
      registrationLink: getRegistrationLink(nextUpcomingEvent),
      image: getOrientationImage(nextUpcomingEvent),
    }
  : {
      isUpcoming: false,
    };

const pastOrientations = pastOrientationEvents.map(
  (event: any) => ({
    event,
    title:
      event?.title ||
      event?.name ||
      "AIspire Orientation",
    year: getEventDateTime(event)
      ? getEventDateTime(event)!.getFullYear()
      : "",
    date: getEventDate(event),
    description: getEventDescription(event),
    participants:
      event?.participants ??
      event?.attendees ??
      event?.registeredUsers ??
      0,
    sessions:
      event?.sessions ??
      event?.sessionCount ??
      0,
    mentors:
      event?.mentors ??
      event?.mentorCount ??
      0,
    highlights:
      Array.isArray(event?.highlights)
        ? event.highlights
        : Array.isArray(event?.features)
        ? event.features
        : [],
    achievements:
      Array.isArray(event?.achievements)
        ? event.achievements
        : [],
    image: getOrientationImage(event),
    registrationLink: getRegistrationLink(event),
  })
);

const hasUpcomingOrientation = upcomingOrientations.length > 0;
const hasPastOrientations = pastOrientations.length > 0;

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(100,255,218,0.12),transparent_35%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.12),transparent_35%)]" />

        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />

        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 text-center">
          <Badge
            variant="outline"
            className="
              mb-6
              px-5
              py-2
              text-sm
              border-accent/40
              text-accent
              bg-accent/5
              backdrop-blur-md
            "
          >
            <Sparkles className="w-4 h-4 mr-2" />

            DSAI NIT Agartala
          </Badge>

          <h1
            className="
              text-5xl
              sm:text-6xl
              md:text-8xl
              font-black
              tracking-tight
              gradient-text
              mb-6
            "
          >
            AIspire
          </h1>

          <h2
            className="
              text-2xl
              md:text-4xl
              font-bold
              text-foreground
              mb-6
            "
          >
            {hasUpcomingOrientation
              ? "Begin Your AI Journey"
              : "Orientation at DSAI"}
          </h2>

          <p
            className="
              text-lg
              md:text-xl
              text-muted-foreground
              max-w-3xl
              mx-auto
              leading-relaxed
              mb-10
            "
          >
            {hasUpcomingOrientation
              ? "Your first step into the world of Artificial Intelligence, Data Science, innovation, and the DSAI community."
              : "Discover how AIspire has helped students begin their journey into Artificial Intelligence, Data Science, programming, and the DSAI community."}
          </p>

          {hasUpcomingOrientation && (
            <div
              className="
                inline-flex
                items-center
                gap-3
                px-5
                py-3
                rounded-full
                border
                border-accent/30
                bg-accent/10
                text-accent
                font-semibold
                mb-8
                backdrop-blur-md
              "
            >
              <span className="relative flex h-3 w-3">
                <span
                  className="
                    animate-ping
                    absolute
                    inline-flex
                    h-full
                    w-full
                    rounded-full
                    bg-accent
                    opacity-75
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    rounded-full
                    h-3
                    w-3
                    bg-accent
                  "
                />
              </span>

              {currentOrientation.status}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {hasUpcomingOrientation &&  (
              <Button
                size="lg"
                className="
                  bg-accent
                  text-accent-foreground
                  hover:bg-accent/90
                  shadow-lg
                  hover:shadow-accent/20
                  hover:scale-105
                  transition-all
                  duration-300
                  px-8
                "
                asChild
              >
                <a
                  href={getRegistrationLink(currentOrientation.event) }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register Now

                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            )}

            <Button
              size="lg"
              variant="outline"
              className="
                border-secondary
                text-secondary
                hover:bg-secondary
                hover:text-secondary-foreground
                px-8
              "
              asChild
            >
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>



        </div>

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            h-32
            bg-gradient-to-t
            from-background
            to-transparent
          "
        />
      </section>

    {hasUpcomingOrientation && (
  <section className="py-20 px-4 relative">
    <div className="max-w-7xl mx-auto">

      <div className="text-center mb-16">

        <Badge
          className="
            mb-4
            bg-accent
            text-accent-foreground
            px-4
            py-1
          "
        >
          Upcoming Orientation
        </Badge>

        <h2
          className="
            text-4xl
            md:text-5xl
            font-bold
            gradient-text
            mb-5
          "
        >
          {currentOrientation.title}{" "}
          {currentOrientation.year}
        </h2>

        <p
          className="
            text-muted-foreground
            text-lg
            max-w-3xl
            mx-auto
            leading-relaxed
          "
        >
          {currentOrientation.description}
        </p>
      </div>


      <div className="mb-12">
        <div
          className="
            relative
            w-full
            h-[280px]
            sm:h-[380px]
            md:h-[480px]
            lg:h-[560px]
            overflow-hidden
            rounded-3xl
            border
            border-accent/20
            bg-muted
            shadow-2xl
            group
          "
        >

          <ImageWithFallback
            src={getOrientationImage(currentOrientation.event)}
            alt={currentOrientation.title}
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              object-center
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/60
              via-black/10
              to-transparent
              pointer-events-none
            "
          />

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              p-6
              md:p-8
              text-white
            "
          >
            <div className="flex flex-wrap items-center gap-3">

              <Badge
                className="
                  bg-accent
                  text-accent-foreground
                  border-0
                "
              >
                AIspire
              </Badge>

              {currentOrientation.date && (
                <span
                  className="
                    rounded-full
                    bg-black/40
                    backdrop-blur-md
                    px-4
                    py-1.5
                    text-sm
                  "
                >
                  {getEventDateTime(currentOrientation.event)?.toLocaleString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )}
                </span>
              )}

            </div>
          </div>

        </div>
      </div>


      <div className="grid lg:grid-cols-2 gap-8">
        <Card
          className="
            border-accent/20
            bg-card/70
            backdrop-blur-xl
            hover:border-accent/50
            transition-all
            duration-300
            shadow-xl
          "
        >
          <CardHeader>
            <CardTitle
              className="
                flex
                items-center
                gap-3
                text-2xl
              "
            >
              <div
                className="
                  p-3
                  rounded-xl
                  bg-accent/10
                "
              >
                <Star className="h-6 w-6 text-accent" />
              </div>

              What You'll Experience
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">

              {currentOrientation.features.map(
                (feature, index) => (
                  <div
                    key={index}
                    className="
                      flex
                      items-start
                      gap-4
                      p-3
                      rounded-xl
                      hover:bg-accent/5
                      transition-colors
                    "
                  >
                    <div
                      className="
                        mt-1
                        flex
                        items-center
                        justify-center
                        w-6
                        h-6
                        rounded-full
                        bg-accent/10
                        text-accent
                        flex-shrink-0
                      "
                    >
                      <Check className="w-4 h-4" />
                    </div>

                    <span
                      className="
                        text-muted-foreground
                        leading-relaxed
                      "
                    >
                      {feature}
                    </span>
                  </div>
                )
              )}

            </div>
          </CardContent>
        </Card>


        <Card
          className="
            border-secondary/20
            bg-card/70
            backdrop-blur-xl
            hover:border-secondary/50
            transition-all
            duration-300
            shadow-xl
          "
        >
          <CardHeader>
            <CardTitle
              className="
                flex
                items-center
                gap-3
                text-2xl
              "
            >
              <div
                className="
                  p-3
                  rounded-xl
                  bg-secondary/10
                "
              >
                <Target className="h-6 w-6 text-secondary" />
              </div>

              Who Can Join?
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">

              {currentOrientation.eligibility.map(
                (criteria, index) => (
                  <div
                    key={index}
                    className="
                      flex
                      items-start
                      gap-4
                      p-3
                      rounded-xl
                      hover:bg-secondary/5
                      transition-colors
                    "
                  >
                    <div
                      className="
                        mt-1
                        flex
                        items-center
                        justify-center
                        w-6
                        h-6
                        rounded-full
                        bg-secondary/10
                        text-secondary
                        flex-shrink-0
                      "
                    >
                      <Check className="w-4 h-4" />
                    </div>

                    <span
                      className="
                        text-muted-foreground
                        leading-relaxed
                      "
                    >
                      {criteria}
                    </span>
                  </div>
                )
              )}

            </div>
          </CardContent>
        </Card>

      </div>


      {getRegistrationLink(currentOrientation.event) && (
        <div className="mt-12 text-center">

          <Button
            size="lg"
            className="
              bg-accent
              text-accent-foreground
              hover:bg-accent/90
              hover:scale-105
              transition-all
              duration-300
              px-8
              shadow-lg
            "
            asChild
          >
            <a
              href={getRegistrationLink(
                currentOrientation.event
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Start Your AI Journey

              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>

        </div>
      )}

    </div>
  </section>
)}

      {!hasUpcomingOrientation && (
        <section className="py-20 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="
                  mb-4
                  border-secondary/40
                  text-secondary
                  bg-secondary/5
                "
              >
                Past Programs
              </Badge>

              <h2
                className="
                  text-4xl
                  md:text-6xl
                  font-bold
                  gradient-text
                  mb-5
                "
              >
                Past Orientations
              </h2>

              <p
                className="
                  text-muted-foreground
                  text-lg
                  max-w-3xl
                  mx-auto
                  leading-relaxed
                "
              >
                A look back at the orientation programs
                through which DSAI welcomed new students
                into the world of AI and Data Science.
              </p>
            </div>

            <div className="space-y-20">
              {pastOrientations.map(
                (event, index) => (
                  <div
                    key={index}
                    className="
                      rounded-3xl
                      border
                      border-border/50
                      bg-card/60
                      backdrop-blur-xl
                      overflow-hidden
                      shadow-2xl
                    "
                  >
                    <div className="grid lg:grid-cols-2">
                      <div
                        className="
                          relative
                          min-h-[320px]
                          lg:min-h-[480px]
                          overflow-hidden
                        "
                      >
                        <ImageWithFallback
                          src={event.image}
                          alt={event.title}
                          className="
                            absolute
                            inset-0
                            w-full
                            h-full
                            object-cover
                            transition-transform
                            duration-700
                            hover:scale-105
                          "
                        />

                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-background/90
                            via-background/10
                            to-transparent
                          "
                        />

                        <div className="absolute bottom-6 left-6">
                          <Badge
                            className="
                              bg-accent
                              text-accent-foreground
                              text-base
                              px-4
                              py-2
                            "
                          >
                            AIspire {event.year}
                          </Badge>
                        </div>
                      </div>

                      <div
                        className="
                          p-8
                          lg:p-12
                          flex
                          flex-col
                          justify-center
                        "
                      >
                        <Badge
                          variant="outline"
                          className="
                            w-fit
                            mb-5
                            border-accent
                            text-accent
                          "
                        >
                          Past Orientation
                        </Badge>

                        <h3
                          className="
                            text-3xl
                            md:text-4xl
                            font-bold
                            gradient-text
                            mb-5
                          "
                        >
                          {event.title}
                        </h3>

                        <p
                          className="
                            text-muted-foreground
                            text-lg
                            leading-relaxed
                            mb-6
                          "
                        >
                          {event.description}
                        </p>

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                            text-accent
                            font-semibold
                            mb-8
                          "
                        >
                          <div className="p-2 rounded-lg bg-accent/10">
                            <Calendar className="w-5 h-5" />
                          </div>

                          {event.date}
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div
                            className="
                              p-4
                              rounded-2xl
                              border
                              border-border/50
                              bg-muted/30
                              text-center
                            "
                          >
                            <div className="text-2xl md:text-3xl font-bold text-accent">
                              {event.participants}
                            </div>

                            <div className="text-xs md:text-sm text-muted-foreground mt-1">
                              Students
                            </div>
                          </div>

                          <div
                            className="
                              p-4
                              rounded-2xl
                              border
                              border-border/50
                              bg-muted/30
                              text-center
                            "
                          >
                            <div className="text-2xl md:text-3xl font-bold text-secondary">
                              {event.sessions}
                            </div>

                            <div className="text-xs md:text-sm text-muted-foreground mt-1">
                              Sessions
                            </div>
                          </div>

                          <div
                            className="
                              p-4
                              rounded-2xl
                              border
                              border-border/50
                              bg-muted/30
                              text-center
                            "
                          >
                            <div className="text-2xl md:text-3xl font-bold text-accent">
                              {event.mentors}
                            </div>

                            <div className="text-xs md:text-sm text-muted-foreground mt-1">
                              Mentors
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="
                        grid
                        lg:grid-cols-2
                        gap-8
                        p-8
                        lg:p-12
                        bg-muted/20
                        border-t
                        border-border/50
                      "
                    >
                      <Card
                        className="
                          border-accent/20
                          bg-background/50
                        "
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-accent/10">
                              <Award className="h-5 w-5 text-accent" />
                            </div>

                            Highlights
                          </CardTitle>
                        </CardHeader>

                        <CardContent>
                          <ul className="space-y-4">
                            {event.highlights.map(
                              (
                                highlight,
                                hIndex
                              ) => (
                                <li
                                  key={hIndex}
                                  className="flex items-start gap-3"
                                >
                                  <span
                                    className="
                                      mt-2
                                      w-2
                                      h-2
                                      rounded-full
                                      bg-accent
                                      flex-shrink-0
                                    "
                                  />

                                  <span className="text-muted-foreground leading-relaxed">
                                    {highlight}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card
                        className="
                          border-secondary/20
                          bg-background/50
                        "
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-secondary/10">
                              <Award className="h-5 w-5 text-secondary" />
                            </div>

                            Key Achievements
                          </CardTitle>
                        </CardHeader>

                        <CardContent>
                          <ul className="space-y-4">
                            {event.achievements.map(
                              (
                                achievement,
                                aIndex
                              ) => (
                                <li
                                  key={aIndex}
                                  className="flex items-start gap-3"
                                >
                                  <span
                                    className="
                                      mt-2
                                      w-2
                                      h-2
                                      rounded-full
                                      bg-secondary
                                      flex-shrink-0
                                    "
                                  />

                                  <span className="text-muted-foreground leading-relaxed">
                                    {achievement}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 px-4 relative overflow-hidden">
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-primary/10
            via-background
            to-accent/10
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,rgba(100,255,218,0.08),transparent_65%)]
          "
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Badge
            variant="outline"
            className="
              mb-5
              border-accent/40
              text-accent
            "
          >
            DSAI • NIT Agartala
          </Badge>

          <h2
            className="
              text-4xl
              md:text-6xl
              font-bold
              gradient-text
              mb-6
            "
          >
            {hasUpcomingOrientation
              ? "Ready to Begin?"
              : "Want to Be Part of the Next One?"}
          </h2>

          <p
            className="
              text-lg
              text-muted-foreground
              max-w-2xl
              mx-auto
              leading-relaxed
              mb-10
            "
          >
            {hasUpcomingOrientation
              ? "Join AIspire and take your first step into the exciting world of Artificial Intelligence and Data Science."
              : "Stay connected with DSAI to know about our next AIspire orientation and other exciting opportunities."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {hasUpcomingOrientation && getRegistrationLink(currentOrientation.event) && (
              <Button
                size="lg"
                className="
                  bg-accent
                  text-accent-foreground
                  hover:bg-accent/90
                  hover:scale-105
                  transition-all
                  duration-300
                  px-8
                "
                asChild
              >
                <a
                  href={getRegistrationLink(currentOrientation.event)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register Now

                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            )}

            <Button
              size="lg"
              variant="outline"
              className="
                border-secondary
                text-secondary
                hover:bg-secondary
                hover:text-secondary-foreground
                px-8
              "
              asChild
            >
              <Link to="/about">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
