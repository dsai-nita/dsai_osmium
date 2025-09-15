import { useState } from 'react'
import { Crown, Star, User, Github, Linkedin, Mail, Search, Calendar } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
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
    
    // Updated search to use 'Position' and remove fields not in data
    const matchesSearch = searchQuery === '' || 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // Use optional chaining in case Position is missing for some members
      member.Position?.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesBranch && matchesSearch
  })

  // Updated role logic to handle actual data or default to User
  const getRoleIcon = (position?: string) => {
    switch (position?.toLowerCase()) {
      case 'president':
        return Crown
      case 'general secretary':
        return Star
      default:
        return User
    }
  }

  // Updated role color logic
  const getRoleColor = (position?: string) => {
    switch (position?.toLowerCase()) {
      case 'president':
        return 'text-accent'
      case 'general secretary':
        return 'text-secondary'
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

      {/* Year Selection Tabs & Filters */}
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
                    {/* Add other branches as needed */}
                    <SelectItem value="Computer Science & Engineering">Computer Science</SelectItem>
                    <SelectItem value="Electronics and Communication">Electronics and Communication</SelectItem>
                    <SelectItem value="Mathematics and Computing">Mathematics and Computing</SelectItem>
                    <SelectItem value="Electronics and Communication">Electronics & Instrumentation</SelectItem>
                    <SelectItem value="Electrical">Electrical </SelectItem>
                    <SelectItem value="Civil">Civil</SelectItem>
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
                    const RoleIcon = getRoleIcon(member.Position)
                    return (
                      <Card key={member.id} className="group hover:border-accent/50 transition-all duration-300 hover:glow-accent overflow-hidden">
                        <div className="relative">
                          <div className="h-64 overflow-hidden">
                            <ImageWithFallback
                              src={member.image}
                              alt={member.name}
                              className="w-100 h-90 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="absolute top-4 right-4">
                            <div className="bg-background/80 backdrop-blur-sm rounded-full p-2">
                              <RoleIcon className={`h-4 w-4 ${getRoleColor(member.Position)}`} />
                            </div>
                          </div>
                        </div>
                        
                        <CardHeader>
                          <CardTitle className="group-hover:text-accent transition-colors">
                            {member.name}
                          </CardTitle>
                          <div className="space-y-1 text-muted-foreground">
                            {member.Position && <div className="font-medium text-foreground">{member.Position}</div>}
                            <div className="text-sm">{member.branch}</div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          {member.bio && <p className="text-sm text-muted-foreground line-clamp-2">{member.bio}</p>}
                          
                          <div className="flex gap-2 pt-4 border-t border-border">
                            {/* FIX: Use optional chaining (?.) in case 'social' is undefined */}
                            {member.social?.github && (
                              <Button asChild size="sm" variant="outline" className="p-2">
                                <a href={member.social.github} target="_blank" rel="noopener noreferrer"><Github className="h-4 w-4" /></a>
                              </Button>
                            )}
                            {/* FIX: Corrected to 'Linkedln' and used optional chaining */}
                            {member.social?.Linkedln && (
                              <Button asChild size="sm" variant="outline" className="p-2">
                                <a href={member.social.Linkedln} target="_blank" rel="noopener noreferrer"><Linkedin className="h-4 w-4" /></a>
                              </Button>
                            )}
                            {member.social?.email && (
                              <Button asChild size="sm" variant="outline" className="p-2">
                                <a href={`mailto:${member.social.email}`}><Mail className="h-4 w-4" /></a>
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