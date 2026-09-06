import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FolderKanban,
  CalendarDays,
  Trophy,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const BASE_STATS = {
  members: 50,
  projects: 20,
  events: 10,
  achievements: 10,
};

interface ApiResponse {
  users?: unknown[];
  members?: unknown[];
  projects?: unknown[];
  events?: unknown[];
  data?: unknown[];
  count?: number;
  total?: number;
}

const getArrayCount = (result: ApiResponse | unknown) => {
  if (Array.isArray(result)) {
    return result.length;
  }

  if (!result || typeof result !== "object") {
    return 0;
  }

  const data = result as ApiResponse;

  if (Array.isArray(data.members)) {
    return data.members.length;
  }

  if (Array.isArray(data.users)) {
    return data.users.length;
  }

  if (Array.isArray(data.projects)) {
    return data.projects.length;
  }

  if (Array.isArray(data.events)) {
    return data.events.length;
  }

  if (Array.isArray(data.data)) {
    return data.data.length;
  }

  if (typeof data.count === "number") {
    return data.count;
  }

  if (typeof data.total === "number") {
    return data.total;
  }

  return 0;
};

function AnimatedNumber({
  value,
  duration = 1500,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    setCount(0);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [value, duration]);

  return <>{count}+</>;
}

export function AnimatedStats() {
  const [stats, setStats] = useState({
    members: BASE_STATS.members,
    projects: BASE_STATS.projects,
    events: BASE_STATS.events,
    achievements: BASE_STATS.achievements,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const fetchCount = async (endpoint: string) => {
          try {
            const response = await fetch(
              `${API_BASE_URL}/${endpoint}`,
              {
                credentials: "include",
              }
            );

            if (!response.ok) {
              return 0;
            }

            const result = await response.json();

            return getArrayCount(result);
          } catch (error) {
            console.error(
              `Failed to fetch ${endpoint}:`,
              error
            );

            return 0;
          }
        };

        const membersCount = await fetchCount("members");

        const projectsCount = await fetchCount("projects");

        const eventsCount = await fetchCount("events");

        const achievementsCount =
          await fetchCount("achievements");

        setStats({
          members: Math.max(
            BASE_STATS.members,
            membersCount
          ),

          projects: Math.max(
            BASE_STATS.projects,
            projectsCount
          ),

          events: Math.max(
            BASE_STATS.events,
            eventsCount
          ),

          achievements: Math.max(
            BASE_STATS.achievements,
            achievementsCount
          ),
        });
      } catch (error) {
        console.error("Stats fetch error:", error);

        setStats({
          ...BASE_STATS,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statItems = [
    {
      value: stats.members,
      label: "Active Members",
      icon: Users,
      description: "Growing DSAI community",
    },

    {
      value: stats.projects,
      label: "Projects",
      icon: FolderKanban,
      description: "Built by our members",
    },

    {
      value: stats.events,
      label: "Events",
      icon: CalendarDays,
      description: "Learning experiences",
    },

    {
      value: stats.achievements,
      label: "Achievements",
      icon: Trophy,
      description: "Milestones achieved",
    },
  ];

  return (
    <section className="relative py-20 px-4 overflow-hidden">


      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />

        <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">


        <div className="text-center mb-14">

          <Badge
            variant="outline"
            className="mb-4 border-accent text-accent"
          >
            Our Impact
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Making an Impact
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Numbers that reflect our growing community,
            innovation and learning culture.
          </p>

        </div>


        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">

          {statItems.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="
                  group
                  relative
                  rounded-2xl
                  border
                  border-border/50
                  bg-card/70
                  backdrop-blur-xl
                  p-6
                  md:p-8
                  text-center
                  overflow-hidden
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-accent/50
                  hover:shadow-2xl
                "
              >


                <div className="absolute -top-16 -right-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-all" />


                <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 border border-accent/20 group-hover:scale-110 transition-transform duration-500">

                  <Icon className="h-7 w-7 text-accent" />

                </div>


                <div className="relative">

                  <div className="text-4xl md:text-5xl font-bold gradient-text">

                    {loading ? (
                      <span className="inline-block w-16 h-10 bg-muted animate-pulse rounded-lg" />
                    ) : (
                      <AnimatedNumber value={stat.value} />
                    )}

                  </div>

                  <h3 className="text-lg md:text-xl font-semibold mt-3 text-foreground">
                    {stat.label}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-2">
                    {stat.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}