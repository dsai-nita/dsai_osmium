import { useState } from 'react'
import { Code, Eye, ExternalLink, Github, Play, Filter, Search, Layers, Zap, Brain } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { ImageWithFallback } from './dsai/ImageWithFallback'

export function InnovationsPage() {
  const [selectedTopic, setSelectedTopic] = useState('all')
  const [selectedTech, setSelectedTech] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const projects = [
    {
      id: 1,
      title: "AI-Powered Student Assistant Chatbot",
      description: "Intelligent conversational AI system designed to provide personalized academic guidance, answer course-related queries, and assist with administrative tasks using advanced NLP techniques.",
      category: "Machine Learning",
      image: "https://images.unsplash.com/photo-1645839078449-124db8a049fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3NTY0MDU2MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      demoVideo: "https://example.com/demo1.mp4",
      techStack: ["Python", "TensorFlow", "NLP", "React", "FastAPI"],
      year: 2025,
      status: "Ongoing",
      topic: "AI",
      githubUrl: "https://github.com/dsai/student-assistant",
      liveDemo: "https://student-assistant.dsai.org",
      team: ["Alice Johnson", "Bob Smith", "Carol Davis"],
      challenges: "Implementing context-aware responses and handling multilingual queries",
      results: "95% accuracy in query understanding, 4.8/5 user satisfaction rating"
    },
    {
      id: 2,
      title: "Autonomous Navigation Robot",
      description: "Self-navigating robot system using computer vision, LIDAR sensors, and advanced path planning algorithms for indoor and outdoor environments.",
      category: "Robotics",
      image: "https://images.unsplash.com/photo-1667986292516-f27450ae75a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMHRlY2hub2xvZ3klMjBmdXR1cmV8ZW58MXx8fHwxNzU2NDk1MTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      demoVideo: "https://example.com/demo2.mp4",
      techStack: ["ROS", "OpenCV", "Python", "C++", "Arduino"],
      year: 2024,
      status: "Completed",
      topic: "Robotics",
      githubUrl: "https://github.com/dsai/autonomous-robot",
      liveDemo: null,
      team: ["David Wilson", "Emma Taylor", "Frank Miller"],
      challenges: "Real-time obstacle detection and dynamic path replanning",
      results: "Successfully navigates complex environments with 98% path completion rate"
    },
    {
      id: 3,
      title: "Predictive Analytics Dashboard",
      description: "Comprehensive business intelligence platform featuring real-time data visualization, predictive modeling, and automated insights generation for enterprise decision-making.",
      category: "Data Science",
      image: "https://images.unsplash.com/photo-1684610529682-553625a1ffed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NTY0Njc3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      demoVideo: "https://example.com/demo3.mp4",
      techStack: ["React", "D3.js", "Python", "Pandas", "Scikit-learn"],
      year: 2024,
      status: "Completed",
      topic: "Data Science",
      githubUrl: "https://github.com/dsai/analytics-dashboard",
      liveDemo: "https://analytics.dsai.org",
      team: ["Grace Lee", "Henry Brown", "Isabella Garcia"],
      challenges: "Handling large datasets and ensuring real-time performance",
      results: "Reduced decision-making time by 40%, improved forecast accuracy by 25%"
    },
    {
      id: 4,
      title: "Medical Image Classification System",
      description: "Deep learning-based diagnostic tool for automated classification of medical images, specifically focused on chest X-ray analysis for early disease detection.",
      category: "Computer Vision",
      image: "https://images.unsplash.com/photo-1645839078449-124db8a049fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3NTY0MDU2MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      demoVideo: "https://example.com/demo4.mp4",
      techStack: ["PyTorch", "CNN", "Python", "OpenCV", "Flask"],
      year: 2024,
      status: "Research Phase",
      topic: "Computer Vision",
      githubUrl: "https://github.com/dsai/medical-imaging",
      liveDemo: null,
      team: ["Jack Martinez", "Kelly Anderson", "Liam Thompson"],
      challenges: "Ensuring high accuracy while maintaining patient privacy",
      results: "92% classification accuracy on validation dataset"
    },
    {
      id: 5,
      title: "Smart Traffic Management System",
      description: "IoT-based intelligent traffic control system using real-time data analysis and machine learning to optimize traffic flow and reduce congestion in urban areas.",
      category: "IoT",
      image: "https://images.unsplash.com/photo-1667986292516-f27450ae75a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMHRlY2hub2xvZ3klMjBmdXR1cmV8ZW58MXx8fHwxNzU2NDk1MTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      demoVideo: "https://example.com/demo5.mp4",
      techStack: ["IoT", "Python", "MongoDB", "React", "TensorFlow"],
      year: 2023,
      status: "Completed",
      topic: "IoT",
      githubUrl: "https://github.com/dsai/smart-traffic",
      liveDemo: "https://traffic.dsai.org",
      team: ["Maya Patel", "Nathan Clark", "Olivia Rodriguez"],
      challenges: "Integration with existing infrastructure and real-time processing",
      results: "30% reduction in average wait times at controlled intersections"
    },
    {
      id: 6,
      title: "Natural Language Processing Toolkit",
      description: "Comprehensive NLP library providing pre-trained models and tools for text analysis, sentiment detection, and language understanding tasks.",
      category: "NLP",
      image: "https://images.unsplash.com/photo-1684610529682-553625a1ffed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NTY0Njc3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      demoVideo: "https://example.com/demo6.mp4",
      techStack: ["Python", "NLTK", "spaCy", "Transformers", "FastAPI"],
      year: 2023,
      status: "Completed",
      topic: "NLP",
      githubUrl: "https://github.com/dsai/nlp-toolkit",
      liveDemo: "https://nlp.dsai.org",
      team: ["Paul Young", "Quinn Walker", "Rachel Green"],
      challenges: "Optimizing model performance for different languages and domains",
      results: "Open-source library with 500+ GitHub stars and active community"
    }
  ]

  const filteredProjects = projects.filter(project => {
    const matchesTopic = selectedTopic === 'all' || project.topic.toLowerCase() === selectedTopic.toLowerCase()
    const matchesTech = selectedTech === 'all' || project.techStack.some(tech => 
      tech.toLowerCase().includes(selectedTech.toLowerCase())
    )
    const matchesYear = selectedYear === 'all' || project.year.toString() === selectedYear
    const matchesStatus = selectedStatus === 'all' || project.status.toLowerCase() === selectedStatus.toLowerCase()
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.team.some(member => member.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesTopic && matchesTech && matchesYear && matchesStatus && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-accent text-accent-foreground'
      case 'ongoing':
        return 'bg-secondary text-secondary-foreground'
      case 'research phase':
        return 'bg-primary text-primary-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'machine learning':
      case 'ai':
        return Brain
      case 'robotics':
      case 'iot':
        return Zap
      case 'computer vision':
      case 'nlp':
      case 'data science':
        return Layers
      default:
        return Code
    }
  }

  const totalProjects = projects.length

  return (
    <div className="min-h-screen pt-16">
      {/* Header Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold gradient-text mb-4">Innovations</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore our cutting-edge projects and research initiatives in AI, Machine Learning, Robotics, and Data Science
          </p>
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2">
            <Code className="h-5 w-5 text-accent" />
            <span className="text-sm text-muted-foreground">Total Projects:</span>
            <span className="text-lg font-bold text-accent">{totalProjects}</span>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Advanced Filters</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects, technologies, or team members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
              
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  <SelectItem value="ai">AI</SelectItem>
                  <SelectItem value="robotics">Robotics</SelectItem>
                  <SelectItem value="computer vision">Computer Vision</SelectItem>
                  <SelectItem value="nlp">NLP</SelectItem>
                  <SelectItem value="data science">Data Science</SelectItem>
                  <SelectItem value="iot">IoT</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedTech} onValueChange={setSelectedTech}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Tech Stack" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tech</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="tensorflow">TensorFlow</SelectItem>
                  <SelectItem value="pytorch">PyTorch</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="opencv">OpenCV</SelectItem>
                  <SelectItem value="ros">ROS</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="research phase">Research Phase</SelectItem>
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => {
                const CategoryIcon = getCategoryIcon(project.category)
                return (
                  <Card key={project.id} className="group hover:border-accent/50 transition-all duration-300 hover:glow-accent overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {project.demoVideo && (
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Play className="h-12 w-12 text-white" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                          {project.year}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-background/80 backdrop-blur-sm rounded-full p-2">
                          <CategoryIcon className="h-4 w-4 text-accent" />
                        </div>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="group-hover:text-accent transition-colors line-clamp-2">
                            {project.title}
                          </CardTitle>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {project.category}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="line-clamp-3">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-foreground mb-2">Tech Stack:</div>
                        <div className="flex flex-wrap gap-1">
                          {project.techStack.slice(0, 4).map((tech, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.techStack.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.techStack.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-foreground mb-2">Team:</div>
                        <div className="text-sm text-muted-foreground">
                          {project.team.slice(0, 2).join(', ')}
                          {project.team.length > 2 && ` +${project.team.length - 2} more`}
                        </div>
                      </div>
                  <div className="flex gap-2 pt-4">
  {project.githubUrl && (
    <Button
      size="sm"
      variant="outline"
      className="flex-1 
                 hover:bg-blue-600/90 
                 hover:text-blue-300 
                 hover:shadow-[0_0_10px_2px_rgba(59,130,246,0.7)]
                 transition-all duration-300"
    >
      <Github className="h-4 w-4 mr-2 transition-colors duration-300 group-hover:text-blue-300" />
      Code
    </Button>
  )}
  {project.liveDemo && (
    <Button
      size="sm"
      variant="outline"
      className="flex-1 
                 hover:bg-blue-600/90 
                 hover:text-blue-300 
                 hover:shadow-[0_0_10px_2px_rgba(59,130,246,0.7)] 
                 transition-all duration-300"
    >
      <ExternalLink className="h-4 w-4 mr-2 transition-colors duration-300 group-hover:text-blue-300" />
      Demo
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