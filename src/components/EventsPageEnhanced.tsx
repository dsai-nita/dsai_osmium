// This file was created for enhancement testing but is no longer needed
// The main EventsPage.tsx has been updated with all the enhancements
export {};
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedTopic, setSelectedTopic] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())

  const events = [
    {
      id: 1,
      title: "AI/ML Workshop Series 2025",
      description: "Comprehensive hands-on workshop covering fundamentals of machine learning, neural networks, and practical implementations using Python and TensorFlow.",
      date: "2025-03-15",
      time: "10:00 AM - 4:00 PM",
      venue: "Tech Hub Auditorium",
      type: "Workshop",
      topic: "AI",
      year: 2025,
      attendees: 120,
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1646579886135-068c73800308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwd29ya3Nob3AlMjBzZW1pbmFyfGVufDF8fHx8MTc1NjQ3MTEyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      speaker: "Dr. Sarah Chen",
      resources: ["Presentation", "Code Samples", "Dataset"]
    },
    {
      id: 2,
      title: "Future of Robotics Seminar",
      description: "Industry expert insights on the latest trends in robotics, autonomous systems, and their real-world applications.",
      date: "2025-03-22",
      time: "2:00 PM - 5:00 PM",
      venue: "Main Conference Hall",
      type: "Seminar",
      topic: "Robotics",
      year: 2025,
      attendees: 200,
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1667986292516-f27450ae75a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMHRlY2hub2xvZ3klMjBmdXR1cmV8ZW58MXx8fHwxNzU2NDk1MTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      speaker: "Prof. Michael Rodriguez",
      resources: ["Video Recording", "Research Papers"]
    },
    {
      id: 3,
      title: "DataViz Hackathon 2024",
      description: "48-hour intensive hackathon focused on creating innovative data visualization solutions for real-world problems.",
      date: "2024-11-15",
      time: "9:00 AM - 9:00 AM (+2 days)",
      venue: "Innovation Lab",
      type: "Hackathon",
      topic: "Data Science",
      year: 2024,
      attendees: 80,
      status: "completed",
      image: "https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjBwcm9ncmFtbWluZyUyMGNvbXBldGl0aW9ufGVufDF8fHx8MTc1NjQ0OTM4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      speaker: "Multiple Industry Mentors",
      resources: ["Project Gallery", "Winner Presentations", "Code Repository"]
    },
    {
      id: 4,
      title: "Deep Learning Fundamentals",
      description: "Introduction to deep learning concepts, neural network architectures, and practical implementation using PyTorch.",
      date: "2024-09-20",
      time: "1:00 PM - 6:00 PM",
      venue: "Computer Lab 2",
      type: "Workshop",
      topic: "ML",
      year: 2024,
      attendees: 95,
      status: "completed",
      image: "https://images.unsplash.com/photo-1645839078449-124db8a049fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3NTY0MDU2MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      speaker: "Dr. Alex Kim",
      resources: ["Jupyter Notebooks", "Video Tutorial", "Research Papers"]
    },
    {
      id: 5,
      title: "AI Ethics Panel Discussion",
      description: "Panel discussion on ethical considerations in AI development, bias in algorithms, and responsible AI practices.",
      date: "2024-06-10",
      time: "3:00 PM - 5:00 PM",
      venue: "Ethics Symposium Hall",
      type: "Seminar",
      topic: "AI",
      year: 2024,
      attendees: 150,
      status: "completed",
      image: "https://images.unsplash.com/photo-1646579886135-068c73800308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwd29ya3Nob3AlMjBzZW1pbmFyfGVufDF8fHx8MTc1NjQ3MTEyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      speaker: "Panel of Industry Experts",
      resources: ["Panel Recording", "Discussion Summary", "Guidelines Document"]
    },
    {
      id: 6,
      title: "Computer Vision Competition",
      description: "Annual computer vision competition challenging participants to solve real-world image recognition problems.",
      date: "2023-12-01",
      time: "All Day Event",
      venue: "Multiple Locations",
      type: "Competition",
      topic: "CV",
      year: 2023,
      attendees: 60,
      status: "completed",
      image: "https://images.unsplash.com/photo-1684610529682-553625a1ffed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NTY0Njc3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      speaker: "Competition Organizers",
      resources: ["Competition Results", "Winner Solutions", "Dataset"]
    }
  ]

  const filteredEvents = events.filter(event => {
    const matchesYear = selectedYear === 'all' || event.year.toString() === selectedYear
    const matchesType = selectedType === 'all' || event.type.toLowerCase() === selectedType.toLowerCase()
    const matchesTopic = selectedTopic === 'all' || event.topic.toLowerCase() === selectedTopic.toLowerCase()
    const matchesSearch = searchQuery === '' || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.speaker.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesYear && matchesType && matchesTopic && matchesSearch
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-accent text-accent-foreground'
      case 'completed':
        return 'bg-secondary text-secondary-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  // Update current time every second for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getCountdown = (eventDate: string) => {
    const eventDateTime = new Date(eventDate + 'T10:00:00')
    const timeDiff = eventDateTime.getTime() - currentTime.getTime()
    
    if (timeDiff <= 0) return null
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
    
    return { days, hours, minutes, seconds }
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Header Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold gradient-text mb-4">Events</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our past achievements and upcoming opportunities to learn, collaborate, and innovate in AI, ML, and Robotics
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filter Events</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
              
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full sm:w-40">
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
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                  <SelectItem value="competition">Competition</SelectItem>
                  <SelectItem value="hackathon">Hackathon</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  <SelectItem value="ai">AI</SelectItem>
                  <SelectItem value="ml">ML</SelectItem>
                  <SelectItem value="robotics">Robotics</SelectItem>
                  <SelectItem value="data science">Data Science</SelectItem>
                  <SelectItem value="cv">Computer Vision</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredEvents.length} of {events.length} events
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No events found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="group hover:border-accent/50 transition-all duration-300 hover:glow-accent overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                      <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="group-hover:text-accent transition-colors line-clamp-2">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-border">
                      <div className="text-sm font-medium text-foreground mb-2">Speaker:</div>
                      <div className="text-sm text-muted-foreground">{event.speaker}</div>
                    </div>
                    
                    {event.resources.length > 0 && (
                      <div className="pt-2 border-t border-border">
                        <div className="text-sm font-medium text-foreground mb-2">Resources:</div>
                        <div className="flex flex-wrap gap-1">
                          {event.resources.map((resource, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {resource}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {event.status === 'upcoming' && (
                      <div className="pt-2 border-t border-border">
                        <div className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                          <Timer className="h-4 w-4" />
                          Countdown:
                        </div>
                        {(() => {
                          const countdown = getCountdown(event.date)
                          if (!countdown) return <div className="text-sm text-muted-foreground">Event has started!</div>
                          
                          return (
                            <div className="grid grid-cols-4 gap-2 text-center mb-3">
                              <div className="bg-accent/10 rounded-lg p-2">
                                <div className="text-lg font-bold text-accent">{countdown.days}</div>
                                <div className="text-xs text-muted-foreground">Days</div>
                              </div>
                              <div className="bg-accent/10 rounded-lg p-2">
                                <div className="text-lg font-bold text-accent">{countdown.hours}</div>
                                <div className="text-xs text-muted-foreground">Hours</div>
                              </div>
                              <div className="bg-accent/10 rounded-lg p-2">
                                <div className="text-lg font-bold text-accent">{countdown.minutes}</div>
                                <div className="text-xs text-muted-foreground">Min</div>
                              </div>
                              <div className="bg-accent/10 rounded-lg p-2">
                                <div className="text-lg font-bold text-accent">{countdown.seconds}</div>
                                <div className="text-xs text-muted-foreground">Sec</div>
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    )}
                    
                    <div className="pt-4">
                      {event.status === 'upcoming' ? (
                        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                          Register Now
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/10">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}