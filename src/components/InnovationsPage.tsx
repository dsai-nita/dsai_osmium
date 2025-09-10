import { useState } from 'react'
import { Code, ExternalLink, Github, Filter, Search, Layers, Zap, Brain } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { ImageWithFallback } from './dsai/ImageWithFallback'
import projects from '../../assets/projectsData'

export function InnovationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedTech, setSelectedTech] = useState('all')

  // Extract unique values for filters
  const categories = Array.from(new Set(projects.map(p => p.category)))
  const years = Array.from(new Set(projects.map(p => p.year))).filter(Boolean)
  const techStacks = Array.from(new Set(projects.flatMap(p => p.techStack || []))).filter(Boolean)

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (project.team && project.team.some(member => member.toLowerCase().includes(searchQuery.toLowerCase())))

    const matchesCategory =
      selectedCategory === 'all' || project.category.toLowerCase() === selectedCategory.toLowerCase()

    const matchesYear = selectedYear === 'all' || project.year?.toString() === selectedYear


    const matchesTech =
      selectedTech === 'all' || (project.techStack && project.techStack.includes(selectedTech))

    return matchesSearch && matchesCategory && matchesYear && matchesTech
  })

  const getCategoryIcon = (category: string) => {
    if (category.includes('vision')) return Brain
    if (category.includes('automation')) return Zap
    if (category.includes('nlp') || category.includes('language')) return Layers
    if (category.includes('machine-learning')) return Brain
    return Code
  }

  const totalProjects = projects.length

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold gradient-text mb-4">Innovations</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore our cutting-edge projects and research initiatives in AI, Machine Learning,
            Robotics, and Data Science
          </p>
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2">
            <Code className="h-5 w-5 text-accent" />
            <span className="text-sm text-muted-foreground">Total Projects:</span>
            <span className="text-lg font-bold text-accent">{totalProjects}</span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects, tech, or team..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>

              {/* Category */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>


              {/* Year */}
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map(yr => (
                    <SelectItem key={yr} value={yr.toString()}>
                      {yr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>



              {/* Tech Stack */}
              <Select value={selectedTech} onValueChange={setSelectedTech}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Tech Stack" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tech</SelectItem>
                  {techStacks.map(tech => (
                    <SelectItem key={tech} value={tech}>
                      {tech}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {totalProjects} projects
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <Code className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProjects.map(project => {
                const CategoryIcon = getCategoryIcon(project.category)
                return (
                  <Card
                    key={project.id}
                    className="group relative overflow-hidden rounded-xl border border-border bg-background/60 backdrop-blur-sm shadow-md hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={project.imageSrc}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {/* Floating icon top-right */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-background/90 backdrop-blur-md rounded-full p-2 shadow-md">
                          <CategoryIcon className="h-4 w-4 text-accent" />
                        </div>
                      </div>
                    </div>
                    {/* Content */}
                    <CardHeader className="transition-all duration-500 group-hover:-translate-y-1">
                      {/* Title + Year */}
                      <CardTitle className="flex items-center justify-between group-hover:text-accent transition-colors">
                        <span className="line-clamp-2">{project.title}</span>
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                          {project.year}
                        </span>
                      </CardTitle>
                      {/* Description */}
                      <CardDescription className="mt-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 transition-all duration-500 group-hover:-translate-y-1">
                      {/* Tech Stack */}
                      {project.tags && (
                        <div>
                          <div className="text-sm font-medium text-foreground mb-2">Tech Stack:</div>
                          <div className="flex flex-wrap gap-1">
                            {project.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* Team */}
                      {project.team && (
                        <div>
                          <div className="text-sm font-medium text-foreground mb-2">Team:</div>
                          <div className="text-sm text-muted-foreground">
                            {project.team.slice(0, 2).join(', ')}
                            {project.team.length > 2 && ` +${project.team.length - 2} more`}
                          </div>
                        </div>
                      )}
                      {/* Links */}
                      <div className="flex gap-2 pt-4">
                        {project.githubLink && (
                          <Button
                            size="sm"
                            asChild
                            className="flex-1 bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg transition-all"
                          >
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2" /> Code
                            </a>
                          </Button>
                        )}
                        {project.demoLink && (
                          <Button
                            size="sm"
                            asChild
                            className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg transition-all"
                          >
                            <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" /> Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
