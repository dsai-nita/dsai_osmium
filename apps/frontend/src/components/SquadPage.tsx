import { useState, useEffect, useMemo } from "react";
import {
  Crown,
  Star,
  User,
  Github,
  Linkedin,
  Mail,
  Search,
  Calendar,
  Loader2,
  CheckCircle2,
  MapPin,
  Award,
  Users,
   X,
  ExternalLink,
} from "lucide-react";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./dsai/ImageWithFallback";
import { membersApi } from "../lib/endpoints";

interface Member {
  _id: string;
  name: string;
  email?: string;
  branch?: string;
  year?: number | string;
  role?: string;
  bio?: string;
  points?: number;
  github?: string;
  linkedin?: string;
  isActive?: boolean;
  isVerified?: boolean;
  profileImage?: {
    url?: string;
    publicId?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export function SquadPage() {
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
const [selectedMember, setSelectedMember] =
  useState<Member | null>(null);

  useEffect(() => {
  let cancelled = false;

  const fetchMembers = async () => {
    try {
      setIsLoading(true);

      const res = await membersApi.list();

      console.log("Fetched members:", res.data);

      if (!cancelled) {
       const rolePriority: Record<string, number> = {
  president: 100,
  generalsecretary: 90,
  assistantgeneralsecretary: 80,
  webdevelopmentlead: 70,
  vicepresident: 60,
  technicallead: 50,
  proutreach: 40,
  prlead: 40,
  prandoutreachlead: 40,
  contentlead: 35,
  contentslead:35,
  graphicslead:35,
  videoeditinglead: 35,
  jointsecretary: 30,
  coordinator: 20,
  coremember: 10,
};

        const sortedMembers = (Array.isArray(res.data) ? res.data : []).sort(
          (a, b) => {
            const yearDiff = (b.year || 0) - (a.year || 0);

            if (yearDiff !== 0) {
              return yearDiff;
            }

           const roleA = (a.role || "")
  .toLowerCase()
  .replace(/[^a-z0-9]/g, "");

const roleB = (b.role || "")
  .toLowerCase()
  .replace(/[^a-z0-9]/g, "");

            const priorityA = rolePriority[roleA] || 0;
            const priorityB = rolePriority[roleB] || 0;

            return priorityB - priorityA;
          }
        );

        setMembers(sortedMembers);
      }
    } catch (error) {
      console.error("Failed to fetch members:", error);

      if (!cancelled) {
        setMembers([]);
      }
    } finally {
      if (!cancelled) {
        setIsLoading(false);
      }
    }
  };

  fetchMembers();

  return () => {
    cancelled = true;
  };
}, []);


  const visibleMembers = useMemo(() => {
    return members.filter((member) => {
      const role = member.role?.toLowerCase();

      return role !== "admin" && role !== "student";
    });
  }, [members]);


  const availableYears = useMemo(() => {
    const years = visibleMembers
      .map((member) => member.year)
      .filter((year): year is string | number => year !== undefined);

    return [...new Set(years.map(String))].sort(
      (a, b) => Number(b) - Number(a)
    );
  }, [visibleMembers]);


  const availableBranches = useMemo(() => {
    const branches = visibleMembers
      .map((member) => member.branch)
      .filter((branch): branch is string => Boolean(branch));

    return [...new Set(branches)].sort();
  }, [visibleMembers]);


  const filteredMembers = useMemo(() => {
    return visibleMembers.filter((member) => {
      const search = searchQuery.toLowerCase().trim();

      const matchesYear =
        selectedYear === "all" ||
        String(member.year) === selectedYear;

      const matchesBranch =
        selectedBranch === "all" ||
        member.branch?.toLowerCase() === selectedBranch.toLowerCase();

      const matchesSearch =
        search === "" ||
        member.name?.toLowerCase().includes(search) ||
        member.role?.toLowerCase().includes(search) ||
        member.branch?.toLowerCase().includes(search);

      return matchesYear && matchesBranch && matchesSearch;
    });
  }, [
    visibleMembers,
    selectedYear,
    selectedBranch,
    searchQuery,
  ]);


  const getRoleIcon = (role?: string) => {
    switch (role?.toLowerCase()) {
      case "president":
        return Crown;

      case "general secretary":
      case "gs":
        return Award;

      case "assistant general secretary":
      case "ags":
        return Star;

      default:
        return User;
    }
  };


  const getRoleColor = (role?: string) => {
    switch (role?.toLowerCase()) {
      case "president":
        return "text-yellow-400";

      case "general secretary":
      case "gs":
        return "text-accent";

      case "assistant general secretary":
      case "ags":
        return "text-purple-400";

        case "web development lead":
        return "text-blue-400";
        case "vice president":
        return "text-green-400";
        case "Technical Lead":
          case "technical lead":
            case "technicallead":
        return "text-orange-400";
        case "pr and outreach lead":
          case "prandoutreachlead":
        return "text-pink-400";
        case "pr lead":
          case "prlead":
        return "text-pink-400";
        case "content lead":
          case "contentlead":
        return "text-cyan-400";
        case "graphics lead":
          case "graphicslead":
        return "text-lime-400";
        case "video editing lead":
          case "videoeditinglead":
        return "text-rose-400";
        case "joint secretary":
        return "text-teal-400";
        case "core member":
          case "coremember":
        return "text-sky-400";

      default:
        return "text-muted-foreground";
    }
  };


  const formatRole = (role?: string) => {
    if (!role) return "Member";

    return role
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };


  return (
    <div className="min-h-screen pt-16 bg-background">


      <section className="relative py-24 px-4 overflow-hidden">

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm font-medium">
            <Users className="h-4 w-4" />
            DSAI Community
          </div>

          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            DSAI Squad
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Meet the talented people building, leading and growing
            the Data Science & Artificial Intelligence community.
          </p>

          {!isLoading && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-card/70 border border-border backdrop-blur-xl">
                <Users className="h-4 w-4 text-accent" />

                <span className="text-sm text-muted-foreground">
                  {visibleMembers.length} Team Members
                </span>
              </div>
            </div>
          )}
        </div>
      </section>


      {isLoading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>

            <p className="text-muted-foreground">
              Loading squad...
            </p>
          </div>
        </div>
      ) : (
        <>

          <section className="px-4 pb-10">
            <div className="max-w-7xl mx-auto">

              <div className="p-5 md:p-6 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-xl shadow-lg">

                <div className="flex flex-col xl:flex-row gap-5 items-center justify-between">


                  <Tabs
                    value={selectedYear}
                    onValueChange={setSelectedYear}
                    className="w-full xl:w-auto"
                  >
                    <TabsList className="w-full xl:w-auto bg-background/70">

                      <TabsTrigger
                        value="all"
                        className="flex items-center gap-2"
                      >
                        <Calendar className="h-4 w-4" />
                        All
                      </TabsTrigger>

                      {availableYears.map((year) => (
                        <TabsTrigger
                          key={year}
                          value={year}
                        >
                          {year}
                        </TabsTrigger>
                      ))}

                    </TabsList>
                  </Tabs>


                  <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">


                    <div className="relative w-full sm:w-72">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                      <Input
                        placeholder="Search squad..."
                        value={searchQuery}
                        onChange={(e) =>
                          setSearchQuery(e.target.value)
                        }
                        className="pl-10 h-11 bg-background/70 border-border/70 focus:border-accent"
                      />
                    </div>


                    <Select
                      value={selectedBranch}
                      onValueChange={setSelectedBranch}
                    >
                      <SelectTrigger className="w-full sm:w-56 h-11 bg-background/70">
                        <SelectValue placeholder="Branch" />
                      </SelectTrigger>

                      <SelectContent>

                        <SelectItem value="all">
                          All Branches
                        </SelectItem>

                        {availableBranches.map((branch) => (
                          <SelectItem
                            key={branch}
                            value={branch}
                          >
                            {branch}
                          </SelectItem>
                        ))}

                      </SelectContent>
                    </Select>

                  </div>
                </div>


                <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">

                  <p className="text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="text-foreground font-semibold">
                      {filteredMembers.length}
                    </span>{" "}
                    of{" "}
                    <span className="text-foreground font-semibold">
                      {visibleMembers.length}
                    </span>{" "}
                    members
                  </p>

                  {(searchQuery ||
                    selectedBranch !== "all" ||
                    selectedYear !== "all") && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedBranch("all");
                        setSelectedYear("all");
                      }}
                      className="text-sm text-accent hover:underline"
                    >
                      Clear filters
                    </button>
                  )}

                </div>
              </div>
            </div>
          </section>


          <section className="px-4 pb-24">
            <div className="max-w-7xl mx-auto">

              {filteredMembers.length === 0 ? (
                <div className="py-24 text-center">

                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-muted/50 flex items-center justify-center">
                    <User className="h-10 w-10 text-muted-foreground" />
                  </div>

                  <h3 className="text-2xl font-semibold mb-2">
                    No members found
                  </h3>

                  <p className="text-muted-foreground">
                    Try changing your search or filters.
                  </p>

                </div>
              ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

                  {filteredMembers.map((member) => {

                    const RoleIcon = getRoleIcon(member.role);

                    return (
                      <Card
                        key={member._id}
                        className="group relative overflow-hidden border-border/50 bg-card/70 backdrop-blur-xl hover:border-accent/60 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300"
                      >


                        <div className="relative h-72 overflow-hidden">

                          <ImageWithFallback
                            src={
                              member.profileImage?.url ||
                              ""
                            }
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />


                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />


                          <div className="absolute top-4 right-4">

                            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10">

                              <RoleIcon
                                className={`h-4 w-4 ${getRoleColor(
                                  member.role
                                )}`}
                              />

                              <span className="text-xs font-semibold text-white">
                                {formatRole(member.role)}
                              </span>

                            </div>

                          </div>


                          {member.isActive && (
                            <div className="absolute top-4 left-4">

                              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/15 backdrop-blur-md border border-green-500/30">

                                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />

                                <span className="text-xs font-medium text-green-300">
                                  Active
                                </span>

                              </div>

                            </div>
                          )}


                          <div className="absolute bottom-5 left-5 right-5">

                            <h2 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">
                              {member.name}
                            </h2>

                            <div className="flex items-center gap-2 mt-2 text-gray-300">

                              <MapPin className="h-4 w-4" />

                              <span className="text-sm">
                                {member.branch || "N/A"}
                              </span>

                            </div>

                          </div>

                        </div>


                        <CardContent className="p-5">


<div className="grid grid-cols-2 gap-3 mb-5">

  <div className="p-3 rounded-xl bg-muted/30 border border-border/50">
    <p className="text-xs text-muted-foreground mb-1">
      Bio
    </p>

    <p className="text-sm font-medium leading-relaxed">
      {member.bio
        ? member.bio.split(/\s+/).slice(0, 5).join(" ") +
          (member.bio.split(/\s+/).length > 5 ? "..." : "")
        : "No bio available"}
    </p>
  </div>

  <div className="p-3 rounded-xl bg-muted/30 border border-border/50">
    <p className="text-xs text-muted-foreground mb-1">
      Year
    </p>

    <div className="flex items-center gap-1.5">
      <Calendar className="h-4 w-4 text-accent" />

      <span className="font-bold">
        {member.year || "N/A"}
      </span>
    </div>
  </div>

</div>

                          {member.isVerified && (
                            <div className="flex items-center gap-2 mb-5 text-sm">

                              <CheckCircle2 className="h-4 w-4 text-green-400" />

                              <span className="text-muted-foreground">
                                Verified Member
                              </span>

                            </div>
                          )}


                          <div className="flex items-center gap-2 pt-4 border-t border-border/60">

                            {member.github && (
                              <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="h-9 w-9 p-0 hover:border-accent hover:text-accent"
                              >
                                <a
                                  href={member.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="GitHub"
                                >
                                  <Github className="h-4 w-4" />
                                </a>
                              </Button>
                            )}

                            {member.linkedin && (
                              <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="h-9 w-9 p-0 hover:border-accent hover:text-accent"
                              >
                                <a
                                  href={member.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="LinkedIn"
                                >
                                  <Linkedin className="h-4 w-4" />
                                </a>
                              </Button>
                            )}

                            {member.email && (
                              <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="h-9 w-9 p-0 hover:border-accent hover:text-accent"
                              >
                                <a
                                  href={`mailto:${member.email}`}
                                  aria-label="Email"
                                >
                                  <Mail className="h-4 w-4" />
                                </a>
                              </Button>
                            )}

                          <Button
  size="sm"
  onClick={() => setSelectedMember(member)}
  className="flex-1 h-9 bg-accent text-accent-foreground hover:bg-accent/90"
>
  View Profile
</Button>

                          </div>

                        </CardContent>
                      </Card>
                    );
                  })}

                </div>
              )}

            </div>
          </section>
        </>
      )}

{selectedMember && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    onClick={() => setSelectedMember(null)}
  >
    <div
      className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border/60 bg-card shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >

      <button
        onClick={() => setSelectedMember(null)}
        className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-black/70 hover:text-accent transition"
        aria-label="Close profile"
      >
        <X className="h-5 w-5" />
      </button>


      <div className="relative h-72 md:h-80 overflow-hidden">
        <ImageWithFallback
          src={selectedMember.profileImage?.url || ""}
          alt={selectedMember.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />


        <div className="absolute top-5 left-5">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
            {(() => {
              const RoleIcon = getRoleIcon(selectedMember.role);

              return (
                <RoleIcon
                  className={`h-4 w-4 ${getRoleColor(
                    selectedMember.role
                  )}`}
                />
              );
            })()}

            <span className="text-sm font-semibold text-white">
              {formatRole(selectedMember.role)}
            </span>
          </div>
        </div>


        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {selectedMember.name}
          </h2>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-300">
            {selectedMember.branch && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>{selectedMember.branch}</span>
              </div>
            )}

            {selectedMember.year && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-accent" />
                <span>{selectedMember.year}</span>
              </div>
            )}
          </div>
        </div>
      </div>


      <div className="p-6 md:p-8">


        <div className="flex flex-wrap gap-2 mb-7">
          {selectedMember.isVerified && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              <CheckCircle2 className="h-4 w-4" />
              Verified Member
            </div>
          )}

          {selectedMember.isActive && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Active
            </div>
          )}
        </div>


        <div className="mb-7">
          <h3 className="text-lg font-semibold mb-3">
            About
          </h3>

          <div className="p-5 rounded-2xl bg-muted/30 border border-border/50">
            <p className="text-muted-foreground leading-relaxed">
              {selectedMember.bio ||
                "This member hasn't added a bio yet."}
            </p>
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">


          <div className="p-4 rounded-2xl bg-muted/30 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-accent" />

              <span className="text-xs text-muted-foreground">
                Branch
              </span>
            </div>

            <p className="font-semibold">
              {selectedMember.branch || "N/A"}
            </p>
          </div>


          <div className="p-4 rounded-2xl bg-muted/30 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-accent" />

              <span className="text-xs text-muted-foreground">
                Academic Year
              </span>
            </div>

            <p className="font-semibold">
              {selectedMember.year || "N/A"}
            </p>
          </div>

        </div>


        <div className="mb-7">
          <h3 className="text-lg font-semibold mb-3">
            Contact
          </h3>

          <div className="space-y-3">
            {selectedMember.email && (
              <a
                href={`mailto:${selectedMember.email}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-accent/50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-accent/10">
                  <Mail className="h-4 w-4 text-accent" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Email
                  </p>

                  <p className="text-sm font-medium break-all">
                    {selectedMember.email}
                  </p>
                </div>
              </a>
            )}
          </div>
        </div>


        {(selectedMember.github || selectedMember.linkedin) && (
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Connect
            </h3>

            <div className="flex flex-wrap gap-3">

              {selectedMember.github && (
                <Button
                  asChild
                  variant="outline"
                  className="gap-2 hover:border-accent hover:text-accent"
                >
                  <a
                    href={selectedMember.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              )}

              {selectedMember.linkedin && (
                <Button
                  asChild
                  variant="outline"
                  className="gap-2 hover:border-accent hover:text-accent"
                >
                  <a
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  </div>
)}
    </div>
  );
}