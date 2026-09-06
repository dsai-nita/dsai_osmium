import { useState, useEffect } from 'react'
import { Icons } from './Icons'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import {
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { ImageWithFallback } from './dsai/ImageWithFallback'
import { galleryApi } from '../lib/endpoints'
import { adaptGalleryItems } from '../lib/adapters'
import { Dialog, DialogContent } from './ui/dialog'

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid')
  const [galleryItems, setGalleryItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await galleryApi.list({ limit: 100 })
        console.log('Fetched gallery items:', res.data)
        if (!cancelled) setGalleryItems(adaptGalleryItems(res.data || []))
      } catch {
        if (!cancelled) setGalleryItems([])
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  const categories = [
    { id: 'all', name: 'All Photos', icon: Icons.Camera, count: galleryItems.length },
    { id: 'events', name: 'Events', icon: Icons.Calendar, count: galleryItems.filter(i => i.category === 'events').length },
    { id: 'workshops', name: 'Workshops', icon: Icons.Users, count: galleryItems.filter(i => i.category === 'workshops').length },
    { id: 'projects', name: 'Projects', icon: Icons.Code, count: galleryItems.filter(i => i.category === 'projects').length },
    { id: 'awards', name: 'Awards & Recognition', icon: Icons.Award, count: galleryItems.filter(i => i.category === 'awards').length },
    { id: 'Orientation', name: 'Orientation', icon: Icons.Users, count: galleryItems.filter(i => i.category === 'Orientation').length }
  ]

const filteredItems =
  selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(
        item =>
          item.category.toLowerCase().replace(/\s+/g, '') ===
          selectedCategory.toLowerCase().replace(/\s+/g, '')
      )

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'events': return 'bg-accent/10 text-accent border-accent/20'
      case 'workshops': return 'bg-secondary/10 text-secondary border-secondary/20'
      case 'projects': return 'bg-primary/10 text-primary border-primary/20'
      case 'Awards & recognition': return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
      case 'orientation': return 'bg-green-500/10 text-green-500 border-green-500/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const normalizePhotoUrl = (photo: any) => {
    if (!photo) return ''

    if (typeof photo === 'string') {
      return photo.trim()
    }

    if (typeof photo === 'object') {
      return (
        photo.url ||
        photo.image ||
        photo.src ||
        photo.secure_url ||
        ''
      )
    }

    return ''
  }

  const getItemImages = (item: any) => {
    const sources: any[] = []

    if (Array.isArray(item?.images)) {
      sources.push(...item.images)
    }

    if (Array.isArray(item?.photos)) {
      sources.push(...item.photos)
    }

    if (item?.image) {
      sources.push(item.image)
    }

    if (item?.url) {
      sources.push(item.url)
    }

    const normalized = sources
      .map((photo) => normalizePhotoUrl(photo))
      .filter(Boolean)

    return [...new Set(normalized)]
  }
  
  return (
    <div className="min-h-screen pt-24 pb-24">
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">Gallery</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Capturing moments of innovation, collaboration, and achievement. 
            Explore our journey through photos from events, workshops, projects, and celebrations.
          </p>
        </div>
      </section>

      <section className="px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
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

      <section className="px-4">
        <div className="max-w-7xl mx-auto">

          {isLoading ? (
            <div className="py-24 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : filteredItems.length === 0 ? (

            <div className="py-24 text-center">
              <Icons.Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />

              <h3 className="text-xl font-semibold">
                No photos found
              </h3>

              <p className="text-muted-foreground mt-2">
                No gallery items are available in this category.
              </p>
            </div>

          ) : (

            <div
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >

              {filteredItems.map((item, index) => {

                const images = getItemImages(item)
                const firstImage = images[0]

                return (
                  <Card
                    key={item.id}
                    className={`group overflow-hidden border-border/50 hover:border-accent/50 transition-all duration-300 hover:glow-accent cursor-pointer ${
                      viewMode === 'masonry' &&
                      index % 3 === 1
                        ? 'md:row-span-2'
                        : ''
                    }`}
                    onClick={() => {
                      if (images.length > 0) {
                        setSelectedItem(item)
                        setSelectedImageIndex(0)
                      }
                    }}
                  >

                    <div className="relative overflow-hidden">

                      {firstImage ? (
                        <ImageWithFallback
                          src={firstImage}
                          alt={item.title || 'Gallery image'}
                          className={`w-full object-cover group-hover:scale-110 transition-transform duration-300 ${
                            viewMode === 'masonry' &&
                            index % 3 === 1
                              ? 'h-80'
                              : 'h-48'
                          }`}
                        />
                      ) : (
                        <div
                          className={`w-full flex items-center justify-center bg-muted ${
                            viewMode === 'masonry' &&
                            index % 3 === 1
                              ? 'h-80'
                              : 'h-48'
                          }`}
                        >
                          <Icons.Camera className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}

                      <div className="absolute top-4 right-4">
                        <Badge
                          className={getCategoryColor(
                            item.category
                          )}
                        >
                          {categories.find(
                            c => c.id === item.category
                          )?.name || item.category}
                        </Badge>
                      </div>

                      {images.length > 1 && (
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          className="
                            absolute
                            bottom-4
                            right-4
                            z-30
                            bg-black/80
                            hover:bg-black
                            text-white
                            border-0
                            backdrop-blur-sm
                            shadow-lg
                            cursor-pointer
                          "
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()

                            console.log("View More clicked:", item)
                            console.log("Images:", images)

                            setSelectedItem(item)
                            setSelectedImageIndex(0)
                          }}
                        >
                          <Icons.Camera className="h-4 w-4 mr-2" />
                          View {images.length} Photos
                        </Button>
                      )}

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/70
                          via-transparent
                          to-transparent
                          opacity-0
                          group-hover:opacity-100
                          transition-opacity
                          duration-300
                          pointer-events-none
                        "
                      />

                      <div
                        className="
                          absolute
                          bottom-4
                          left-4
                          right-4
                          transform
                          translate-y-4
                          group-hover:translate-y-0
                          transition-transform
                          duration-300
                          opacity-0
                          group-hover:opacity-100
                          z-[5]
                          pointer-events-none
                        "
                      >
                        <h3 className="text-white font-semibold mb-1">
                          {item.title}
                        </h3>

                        {item.description && (
                          <p className="text-white/80 text-sm line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>

                    </div>


                    <CardContent className="p-4">

                      <div className="flex items-start justify-between gap-3">

                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-1">
                          {item.title}
                        </h3>

                        {images.length > 1 && (
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {images.length} photos
                          </span>
                        )}

                      </div>

                      {item.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {item.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between gap-2">

                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Icons.Calendar className="h-3 w-3" />
                          {item.date}
                        </span>

                        <Badge
                          variant="outline"
                          className={getCategoryColor(
                            item.category
                          )}
                        >
                          {categories.find(
                            c => c.id === item.category
                          )?.name || item.category}
                        </Badge>

                      </div>

                    </CardContent>

                  </Card>
                )
              })}

            </div>
          )}

        </div>
      </section>

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


      {selectedItem && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            bg-black/95
            flex
            items-center
            justify-center
            p-4
          "
          onClick={() => {
            setSelectedItem(null)
            setSelectedImageIndex(0)
          }}
        >

          {(() => {
            const images = getItemImages(selectedItem)

            if (!images.length) return null

            return (
              <div
                className="
                  relative
                  w-full
                  max-w-6xl
                  h-full
                  flex
                  flex-col
                  items-center
                  justify-center
                "
                onClick={(e) => e.stopPropagation()}
              >


                <button
                  type="button"
                  onClick={() => {
                    setSelectedItem(null)
                    setSelectedImageIndex(0)
                  }}
                  className="
                    absolute
                    top-4
                    right-4
                    z-50
                    h-10
                    w-10
                    rounded-full
                    bg-white/10
                    hover:bg-white/20
                    text-white
                    flex
                    items-center
                    justify-center
                    transition
                  "
                >
                  <X className="h-6 w-6" />
                </button>



                <div className="absolute top-4 left-4 z-40 text-white">

                  <h2 className="text-lg md:text-xl font-bold">
                    {selectedItem.title}
                  </h2>

                  <p className="text-sm text-white/60">
                    {selectedImageIndex + 1} / {images.length}
                  </p>

                </div>



                <div
                  className="
                    flex
                    items-center
                    justify-center
                    w-full
                    h-[70vh]
                  "
                >

                  <img
                    src={images[selectedImageIndex]}
                    alt={
                      selectedItem.title ||
                      'Gallery image'
                    }
                    className="
                      max-w-full
                      max-h-full
                      object-contain
                      rounded-lg
                      shadow-2xl
                    "
                  />

                </div>



                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImageIndex((prev) =>
                        prev === 0
                          ? images.length - 1
                          : prev - 1
                      )
                    }}
                    className="
                      absolute
                      left-2
                      md:left-6
                      top-1/2
                      -translate-y-1/2
                      h-12
                      w-12
                      rounded-full
                      bg-white/10
                      hover:bg-white/20
                      text-white
                      flex
                      items-center
                      justify-center
                      transition
                    "
                  >
                    <ChevronLeft className="h-7 w-7" />
                  </button>
                )}



                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImageIndex((prev) =>
                        prev === images.length - 1
                          ? 0
                          : prev + 1
                      )
                    }}
                    className="
                      absolute
                      right-2
                      md:right-6
                      top-1/2
                      -translate-y-1/2
                      h-12
                      w-12
                      rounded-full
                      bg-white/10
                      hover:bg-white/20
                      text-white
                      flex
                      items-center
                      justify-center
                      transition
                    "
                  >
                    <ChevronRight className="h-7 w-7" />
                  </button>
                )}



                {images.length > 1 && (
                  <div
                    className="
                      absolute
                      bottom-4
                      left-1/2
                      -translate-x-1/2
                      max-w-[90vw]
                      overflow-x-auto
                      p-2
                    "
                  >

                    <div className="flex gap-3">

                      {images.map(
                        (
                          image: string,
                          index: number
                        ) => (

                          <button
                            type="button"
                            key={index}
                            onClick={() =>
                              setSelectedImageIndex(index)
                            }
                            className={`
                              shrink-0
                              w-20
                              h-14
                              md:w-24
                              md:h-16
                              rounded-lg
                              overflow-hidden
                              border-2
                              transition
                              ${
                                selectedImageIndex === index
                                  ? 'border-white scale-105'
                                  : 'border-white/20 opacity-60 hover:opacity-100'
                              }
                            `}
                          >

                            <img
                              src={image}
                              alt=""
                              className="
                                w-full
                                h-full
                                object-cover
                              "
                            />

                          </button>

                        )
                      )}

                    </div>

                  </div>
                )}

              </div>
            )
          })()}

        </div>
      )}
    </div>
  )
}

export default GalleryPage