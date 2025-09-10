import { useState } from 'react'
import { Icons } from './Icons'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './dsai/ImageWithFallback'
import galleryItems from '../../assets/GalleryData'

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid')

  const categories = [
    { id: 'all', name: 'All Photos', icon: Icons.Camera, count: 36 },
    { id: 'events', name: 'Events', icon: Icons.Calendar, count: 15 },
    { id: 'workshops', name: 'Workshops', icon: Icons.Users, count: 12 },
    { id: 'projects', name: 'Projects', icon: Icons.Code, count: 9 },
    { id: 'awards', name: 'Awards & Recognition', icon: Icons.Award, count: 6 }
  ]


  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'events': return 'bg-accent/10 text-accent border-accent/20'
      case 'workshops': return 'bg-secondary/10 text-secondary border-secondary/20'
      case 'projects': return 'bg-primary/10 text-primary border-primary/20'
      case 'awards': return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">Gallery</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Capturing moments of innovation, collaboration, and achievement. 
            Explore our journey through photos from events, workshops, projects, and celebrations.
          </p>
        </div>
      </section>

      {/* Filter and View Controls */}
      <section className="px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${selectedCategory === category.id 
                    ? 'bg-accent text-accent-foreground' 
                    : 'border-border hover:border-accent/50'
                  } transition-all duration-300`}
                >
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.name}
                  <Badge variant="secondary" className="ml-2 px-2 py-0.5 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">View:</span>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Icons.Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'masonry' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('masonry')}
              >
                <Icons.List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {filteredItems.map((item, index) => (
              <Card 
                key={item.id} 
                className={`group overflow-hidden border-border/50 hover:border-accent/50 transition-all duration-300 hover:glow-accent cursor-pointer ${
                  viewMode === 'masonry' && index % 3 === 1 ? 'md:row-span-2' : ''
                }`}
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className={`w-full object-cover group-hover:scale-110 transition-transform duration-300 ${
                      viewMode === 'masonry' && index % 3 === 1 ? 'h-80' : 'h-48'
                    }`}
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={getCategoryColor(item.category)}>
                      {categories.find(c => c.id === item.category)?.name}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.description}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Icons.Calendar className="h-3 w-3" />
                      {item.date}
                    </span>
                    <Badge variant="outline" className={getCategoryColor(item.category)}>
                      {categories.find(c => c.id === item.category)?.name}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-muted/30 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">1000+</div>
              <div className="text-muted-foreground">Photos Captured</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">20+</div>
              <div className="text-muted-foreground">Events Documented</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <div className="text-muted-foreground">Workshops Recorded</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">5+</div>
              <div className="text-muted-foreground">Project Showcases</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GalleryPage;

