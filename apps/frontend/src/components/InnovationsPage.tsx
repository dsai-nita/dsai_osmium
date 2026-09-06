import { useEffect, useMemo, useState } from "react";
import {
  Code,
  ExternalLink,
  Github,
  Filter,
  Search,
  Layers,
  Zap,
  Brain,
  Loader2,
  X,
  Calendar,
  Users,
  Sparkles,
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
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { ImageWithFallback } from "./dsai/ImageWithFallback";
import { projectsApi } from "../lib/endpoints";
import { adaptProject } from "../lib/adapters";

type Project = {
  id?: string;
  _id?: string;
  title?: string;
  description?: string;
  category?: any;
  year?: string | number;
  tags?: any;
  techStack?: any;
  team?: any;
  imageSrc?: string;
  image?: string;
  github?: string;
  demo?: string;
};

const getString = (value: any): string => {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (value && typeof value === "object") {
    if (typeof value.name === "string") return value.name;
    if (typeof value.title === "string") return value.title;
    if (typeof value.label === "string") return value.label;
    if (typeof value.value === "string") return value.value;
  }
  return "";
};

const getArray = (value: any): string[] => {
  if (Array.isArray(value)) {
    return value
      .map((item) => getString(item))
      .filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const getCategoryName = (category: any): string => {
  return getString(category) || "Other";
};

const getProjectTags = (project: Project): string[] => {
  const tags = getArray(project.tags);
  if (tags.length > 0) {
    return tags;
  }
  return getArray(project.techStack);
};

const getProjectTeam = (project: Project): string[] => {
  return getArray(project.team);
};

const getCategoryIcon = (category: any) => {
  const categoryName = getCategoryName(category).toLowerCase();

  if (
    categoryName.includes("vision") ||
    categoryName.includes("computer")
  ) {
    return Brain;
  }
  if (
    categoryName.includes("automation") ||
    categoryName.includes("robot")
  ) {
    return Zap;
  }
  if (
    categoryName.includes("nlp") ||
    categoryName.includes("language")
  ) {
    return Layers;
  }
  if (
    categoryName.includes("machine") ||
    categoryName.includes("ai") ||
    categoryName.includes("artificial")
  ) {
    return Brain;
  }
  return Code;
};

const getCategoryColor = (category: any) => {
  const name = getCategoryName(category).toLowerCase();

  if (name.includes("ai")) {
    return "bg-purple-500/10 text-purple-500 border-purple-500/20";
  }
  if (name.includes("machine")) {
    return "bg-blue-500/10 text-blue-500 border-blue-500/20";
  }
  if (name.includes("robot")) {
    return "bg-orange-500/10 text-orange-500 border-orange-500/20";
  }
  if (name.includes("vision")) {
    return "bg-pink-500/10 text-pink-500 border-pink-500/20";
  }
  if (name.includes("nlp")) {
    return "bg-green-500/10 text-green-500 border-green-500/20";
  }
  return "bg-accent/10 text-accent border-accent/20";
};

export function InnovationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedTech, setSelectedTech] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchProjects = async () => {
      try {
        const res = await projectsApi.list({ limit: 100 });
        console.log("Fetched projects:", res?.data); // Debugging line

        if (!cancelled) {
          const data = Array.isArray(res?.data)
            ? res.data.map((project: any) => {
                const adapted = adaptProject(project);
                console.log(adapted)
                return {
                  ...adapted,
                  id: adapted?.id || adapted?._id || project?._id || project?.id,
                  category: adapted?.category[0] ?? project?.category[0] ?? "Other",
                  title: adapted?.title ?? project?.title ?? "Untitled Project",
                  description: adapted?.description ?? project?.description ?? "",
                  year: adapted?.year ?? project?.year ?? "",
                  tags: adapted?.tags ?? project?.tags ?? [],
                  techStack: adapted?.techStack ?? project?.techStack ?? [],
                  team: adapted?.team ?? project?.team ?? [],
                  imageSrc:
                    adapted?.imageSrc ??
                    adapted?.image ??
                    project?.imageSrc ??
                    project?.image ??
                    "",
                  github: adapted?.github ?? project?.github ?? "",
                  demo: adapted?.demo ?? project?.demo ?? "",
                };
              })
            : [];

          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        if (!cancelled) {
          setProjects([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        projects
          .map((project) => getCategoryName(project.category))
          .filter(Boolean)
      )
    ).sort();
  }, [projects]);

  const years = useMemo(() => {
    return Array.from(
      new Set(
        projects
          .map((project) => getString(project.year))
          .filter(Boolean)
      )
    ).sort((a, b) => Number(b) - Number(a));
  }, [projects]);

  const techStacks = useMemo(() => {
    const allTech: string[] = [];
    projects.forEach((project) => {
      allTech.push(...getProjectTags(project));
      allTech.push(...getArray(project.techStack));
    });
    return Array.from(new Set(allTech.filter(Boolean))).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const title = getString(project.title).toLowerCase();
      const description = getString(project.description).toLowerCase();
      const category = getCategoryName(project.category).toLowerCase();
      const tags = getProjectTags(project);
      const team = getProjectTeam(project);
      const techStack = getArray(project.techStack);

      const searchableText = [
        title,
        description,
        category,
        ...tags,
        ...team,
        ...techStack,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = query === "" || searchableText.includes(query);
      const matchesCategory =
        selectedCategory === "all" ||
        category === selectedCategory.toLowerCase();
      const matchesYear =
        selectedYear === "all" ||
        getString(project.year) === selectedYear;
      const matchesTech =
        selectedTech === "all" ||
        tags.some(
          (tech) =>
            tech.toLowerCase() === selectedTech.toLowerCase()
        ) ||
        techStack.some(
          (tech) =>
            tech.toLowerCase() === selectedTech.toLowerCase()
        );

      return (
        matchesSearch &&
        matchesCategory &&
        matchesYear &&
        matchesTech
      );
    });
  }, [
    projects,
    searchQuery,
    selectedCategory,
    selectedYear,
    selectedTech,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedYear("all");
    setSelectedTech("all");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    selectedYear !== "all" ||
    selectedTech !== "all";

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-2xl bg-accent/10">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
          <p className="text-sm text-muted-foreground">
            Loading innovations...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-background">
      <section className="relative overflow-hidden py-20 px-4 border-b border-border">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="outline"
              className="mb-5 px-4 py-2 bg-accent/5 border-accent/20"
            >
              <Sparkles className="h-4 w-4 mr-2 text-accent" />
              Innovation & Research
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight gradient-text">
              Innovations
            </h1>

            <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore cutting-edge projects and research
              initiatives in AI, Machine Learning, Robotics,
              Data Science and emerging technologies.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border bg-card/70 backdrop-blur-sm">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Code className="h-5 w-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">
                    Total Projects
                  </p>
                  <p className="text-xl font-bold">
                    {projects.length}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border bg-card/70 backdrop-blur-sm">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Layers className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">
                    Categories
                  </p>
                  <p className="text-xl font-bold">
                    {categories.length}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border bg-card/70 backdrop-blur-sm">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Zap className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">
                    Technologies
                  </p>
                  <p className="text-xl font-bold">
                    {techStacks.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-20 py-5 px-4 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Filter className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="font-semibold">
                    Explore Projects
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Find projects by technology, category or year
                  </p>
                </div>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear filters
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="relative">
                <Search
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    h-4
                    w-4
                    text-muted-foreground
                  "
                />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="
                    pl-10
                    h-11
                    bg-card
                    border-border
                    focus-visible:ring-accent
                  "
                />
              </div>

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="h-11 bg-card">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    All Categories
                  </SelectItem>
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedYear}
                onValueChange={setSelectedYear}
              >
                <SelectTrigger className="h-11 bg-card">
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    All Years
                  </SelectItem>
                  {years.map((year) => (
                    <SelectItem
                      key={year}
                      value={year}
                    >
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedTech}
                onValueChange={setSelectedTech}
              >
                <SelectTrigger className="h-11 bg-card">
                  <SelectValue placeholder="All Technologies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    All Technologies
                  </SelectItem>
                  {techStacks.map((tech) => (
                    <SelectItem
                      key={tech}
                      value={tech}
                    >
                      {tech}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {filteredProjects.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-foreground">
                  {projects.length}
                </span>{" "}
                projects
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="mx-auto mb-5 w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
                  <Search className="h-9 w-9 text-muted-foreground" />
                </div>

                <h3 className="text-2xl font-semibold mb-2">
                  No projects found
                </h3>

                <p className="text-muted-foreground mb-6">
                  We couldn't find any project matching your
                  current filters.
                </p>

                {hasActiveFilters && (
                  <Button
                    onClick={resetFilters}
                    variant="outline"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProjects.map((project, index) => {
                const categoryName =
                  getCategoryName(project.category);
                const CategoryIcon =
                  getCategoryIcon(project.category);
                const tags = getProjectTags(project);
                const team = getProjectTeam(project);
                const description =
                  getString(project.description);
                const title =
                  getString(project.title) ||
                  "Untitled Project";
                const year =
                  getString(project.year);
                const image =
                  getString(project.imageSrc) ||
                  getString(project.image);

                return (
                  <Card
                    key={
                      project.id ||
                      project._id ||
                      `${title}-${index}`
                    }
                    className="
                      group
                      relative
                      overflow-hidden
                      flex
                      flex-col
                      rounded-2xl
                      border-border/60
                      bg-card/60
                      backdrop-blur-sm
                      hover:border-accent/40
                      hover:shadow-2xl
                      hover:shadow-accent/5
                      hover:-translate-y-1
                      transition-all
                      duration-300
                    "
                  >
                    <div className="relative h-52 overflow-hidden bg-muted">
                      <ImageWithFallback
                        src={image}
                        alt={title}
                        className="
                          w-full
                          h-full
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-110
                        "
                      />

                      <div className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/70
                        via-black/10
                        to-transparent
                      " />

                      <div className="absolute top-3 left-3">
                        <Badge
                          variant="outline"
                          className={`
                            backdrop-blur-md
                            bg-background/50
                            ${getCategoryColor(project.category)}
                          `}
                        >
                          <CategoryIcon className="h-3.5 w-3.5 mr-1.5" />
                          {categoryName}
                        </Badge>
                      </div>

                      {year && (
                        <div className="absolute top-3 right-3">
                          <Badge
                            variant="secondary"
                            className="
                            text-white
                              bg-background
                              backdrop-blur-md
                              border-0
                            "
                          >
                            <Calendar className="h-3 w-3 mr-1" />
                            {year}
                          </Badge>
                        </div>
                      )}

                      <div className="
                        absolute
                        bottom-4
                        left-4
                        right-4
                        text-white
                      ">
                        <h3 className="
                          font-semibold
                          text-lg
                          line-clamp-2
                          drop-shadow-md
                        ">
                          {title}
                        </h3>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="
                        text-lg
                        line-clamp-2
                        group-hover:text-accent
                        transition-colors
                      ">
                        {title}
                      </CardTitle>

                      <CardDescription className="
                        text-sm
                        leading-relaxed
                        line-clamp-3
                        min-h-[60px]
                      ">
                        {description ||
                          "No description available for this project."}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="
                      flex
                      flex-col
                      flex-grow
                      gap-5
                    ">
                      {tags.length > 0 && (
                        <div>
                          <div className="
                            flex
                            items-center
                            gap-2
                            mb-2
                            text-sm
                            font-medium
                          ">
                            <Code className="h-4 w-4 text-accent" />
                            <span>
                              Technologies
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {tags
                              .slice(0, 5)
                              .map((tag, tagIndex) => (
                                <Badge
                                  key={`${tag}-${tagIndex}`}
                                  variant="secondary"
                                  className="
                                    text-xs
                                    bg-muted/60
                                    bg-accent/10
                                    text-accent
                                    transition-colors
                                  "
                                >
                                  {tag}
                                </Badge>
                              ))}

                            {tags.length > 5 && (
                              <Badge
                                variant="outline"
                                className="text-xs"
                              >
                                +{tags.length - 5}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {team.length > 0 && (
                        <div>
                          <div className="
                            flex
                            items-center
                            gap-2
                            mb-2
                            text-sm
                            font-medium
                          ">
                            <Users className="h-4 w-4 text-accent" />
                            <span>
                              Team
                            </span>
                          </div>

                          <p className="
                            text-sm
                            text-muted-foreground
                            line-clamp-1
                          ">
                            {team.slice(0, 2).join(", ")}
                            {team.length > 2 &&
                              ` +${team.length - 2} more`}
                          </p>
                        </div>
                      )}

                      <div className="mt-auto pt-2 flex gap-2">
                        {project.github && (
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                            className="
                              flex-1
                              hover:bg-accent
                              hover:text-accent-foreground
                              hover:border-accent
                              transition-all
                            "
                          >
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="h-4 w-4 mr-2" />
                              Code
                            </a>
                          </Button>
                        )}

                        {project.demo && (
                          <Button
                            size="sm"
                            asChild
                            className="
                              flex-1
                              bg-accent
                              text-accent-foreground
                              hover:bg-accent/90
                              hover:shadow-lg
                              transition-all
                            "
                          >
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Demo
                            </a>
                          </Button>
                        )}

                        {!project.github &&
                          !project.demo && (
                            <div className="
                              w-full
                              text-center
                              text-xs
                              text-muted-foreground
                              py-2
                            ">
                              No external links available
                            </div>
                          )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default InnovationsPage;