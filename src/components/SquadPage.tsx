import { useState } from 'react'
import { Crown, Star, User, Github, Linkedin, Mail, Filter, Search, Trophy, Calendar } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ImageWithFallback } from './dsai/ImageWithFallback'
import  members  from '../../assets/membersData'

export function SquadPage() {
  const [selectedYear, setSelectedYear] = useState('2025')
  const [selectedBranch, setSelectedBranch] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')


  const getCurrentMembers = () => {
    return members[selectedYear as keyof typeof members] || []
  }

  const filteredMembers = getCurrentMembers().filter(member => {
    const matchesBranch = selectedBranch === 'all' || 
      member.branch.toLowerCase().includes(selectedBranch.toLowerCase())
    
    const matchesSearch = searchQuery === '' || 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.specialization.some(spec => 
        spec.toLowerCase().includes(searchQuery.toLowerCase())
      )
    
    return matchesBranch && matchesSearch
  })

  const getRoleIcon = (position: string) => {
    switch (position) {
      case 'executive':
        return Crown
      case 'senior':
        return Star
      case 'alumni':
        return Trophy
      default:
        return User
    }
  }

  const getRoleColor = (position: string) => {
    switch (position) {
      case 'executive':
        return 'text-accent'
      case 'senior':
        return 'text-secondary'
      case 'alumni':
        return 'text-primary'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Header Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold gradient-text mb-4">DSAI Squad</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Meet our talented team of innovators, researchers, and technology enthusiasts driving the future of AI and robotics
          </p>
        </div>
      </section>

      {/* Year Selection Tabs */}
      <section className="py-8 px-4 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <Tabs value={selectedYear} onValueChange={setSelectedYear} className="w-full">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <TabsList className="grid w-full lg:w-auto grid-cols-4">
                <TabsTrigger value="2025" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Current
                </TabsTrigger>
                <TabsTrigger value="2024">2024</TabsTrigger>
                <TabsTrigger value="2023">2023</TabsTrigger>
                
              </TabsList>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background"
                  />
                </div>
                

                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    <SelectItem value="computer science">Computer Science & Engineering</SelectItem>
                    <SelectItem value="electronics communication">Electronics & Communication Engineering</SelectItem>
                    <SelectItem value="electrical">Electrical Engineering</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="electronics instrumentation">Electronics & Instrumentation Engineering</SelectItem>
                    <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                    <SelectItem value="civil">Civil Engineering</SelectItem>
                    <SelectItem value="chemical">Chemical Engineering</SelectItem>
                    <SelectItem value="production">Production Engineering</SelectItem>
                    <SelectItem value="biotechnology">Biotechnology</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredMembers.length} of {getCurrentMembers().length} members
            </div>

            {/* Members Content */}
            <TabsContent value={selectedYear} className="mt-8">
              {filteredMembers.length === 0 ? (
                <div className="text-center py-20">
                  <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No members found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredMembers.map((member) => {
                    const RoleIcon = getRoleIcon(member.position)
                    return (
                      <Card key={member.id} className="group hover:border-accent/50 transition-all duration-300 hover:glow-accent overflow-hidden">
                        <div className="relative">
                          <div className="h-64 overflow-hidden">
                            <ImageWithFallback
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="absolute top-4 right-4">
                            <div className="bg-background/80 backdrop-blur-sm rounded-full p-2">
                              <RoleIcon className={`h-4 w-4 ${getRoleColor(member.position)}`} />
                            </div>
                          </div>
                          {member.position === 'alumni' && member.currentPosition && (
                            <div className="absolute bottom-4 left-4 right-4">
                              <Badge className="bg-primary text-primary-foreground text-xs">
                                {member.currentPosition}
                              </Badge>
                            </div>
                          )}
                        </div>
                        
                        <CardHeader>
                          <CardTitle className="group-hover:text-accent transition-colors">
                            {member.name}
                          </CardTitle>
                          <div className="space-y-1 text-muted-foreground">
                            <div className="font-medium text-foreground">{member.role}</div>
                            <div className="text-sm">{member.year} • {member.branch}</div>
                            <div className="text-sm text-muted-foreground">
                              Joined {member.joinedYear}
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {member.bio}
                          </p>
                          
                          <div>
                            <div className="text-sm font-medium text-foreground mb-2">Specialization:</div>
                            <div className="flex flex-wrap gap-1">
                              {member.specialization.slice(0, 2).map((spec, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                              {member.specialization.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{member.specialization.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium text-foreground mb-2">Key Achievements:</div>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {member.achievements.slice(0, 2).map((achievement, index) => (
                                <li key={index} className="flex items-start gap-1">
                                  <span className="text-accent mt-1">•</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex gap-2 pt-4 border-t border-border">
                            {member.social.github && (
                              <Button size="sm" variant="outline" className="p-2">
                                <Github className="h-4 w-4" />
                              </Button>
                            )}
                            {member.social.linkedin && (
                              <Button size="sm" variant="outline" className="p-2">
                                <Linkedin className="h-4 w-4" />
                              </Button>
                            )}
                            {member.social.email && (
                              <Button size="sm" variant="outline" className="p-2">
                                <Mail className="h-4 w-4" />
                              </Button>
                            )}
                            <Button size="sm" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                              View Profile
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}