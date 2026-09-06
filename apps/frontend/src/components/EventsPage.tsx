import { useState, useEffect, useMemo } from 'react'
import { Icons } from './Icons'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

import {
  Star,
  Calendar,
  MapPin,
  User,
  UserPlus,
  Ticket,
  History,
  Search,
  CalendarSearch,
  Loader2,
  Clock,
  ExternalLink,
  X,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

import { ImageWithFallback } from './dsai/ImageWithFallback'
import { eventsApi } from '../lib/endpoints'
import { adaptEvent } from '../lib/adapters'



type EventItem = {
  id?: string
  _id?: string
  title?: string
  description?: string
  image?: any
  coverImage?: any
  date?: string
  time?: string
  year?: number | string
  type?: string
  topic?: string
  speaker?: string
  venue?: string
  registrationLink?: string
  status?: 'upcoming' | 'completed'
  eventDate?: Date
}



const getEventImage = (event: EventItem) => {
  const image = event.image || event.coverImage

  if (!image) return ''

  
  if (typeof image === 'object' && image.url) {
    return image.url
  }

  if (typeof image === 'object' && image.secure_url) {
    return image.secure_url
  }

  if (typeof image === 'string') {
    return image
  }

  return ''
}

export function EventsPage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  const [eventsData, setEventsData] = useState<EventItem[]>([])

  const [isLoading, setIsLoading] = useState(true)

  const [selectedEvent, setSelectedEvent] =
    useState<EventItem | null>(null)

  const [filters, setFilters] = useState({
    year: 'all',
    type: 'all',
    topic: 'all',
    searchQuery: '',
  })

  useEffect(() => {
    let cancelled = false

    const fetchEvents = async () => {
      try {
        const res = await eventsApi.list({
          limit: 100,
        })

        console.log('Events API response:', res.data)

        if (!cancelled) {
          const adapted = (res.data || []).map(
            (event: any) => adaptEvent(event)
          )

          console.log('Adapted events:', adapted)

          setEventsData(adapted)
        }
      } catch (error) {
        console.error('Failed to fetch events:', error)

        if (!cancelled) {
          setEventsData([])
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchEvents()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const {
    upcomingEvents,
    pastEvents,
    featuredEvent,
    filterOptions,
  } = useMemo(() => {
    const now = new Date()

    const allEvents = eventsData
      .map((event) => {
        const dateString = event.date || ''

        const timeString =
          event.time || '00:00:00'

        const eventDate = new Date(
          `${dateString}T${timeString}`
        )

        const validDate =
          !isNaN(eventDate.getTime())

        const finalDate = validDate
          ? eventDate
          : new Date(dateString)

        return {
          ...event,
          eventDate: finalDate,
          status:
            finalDate > now
              ? 'upcoming'
              : 'completed',
        } as EventItem
      })
      .filter((event) => event.eventDate)

    const upcoming = allEvents
      .filter(
        (event) =>
          event.status === 'upcoming'
      )
      .sort(
        (a, b) =>
          a.eventDate!.getTime() -
          b.eventDate!.getTime()
      )

    const past = allEvents
      .filter(
        (event) =>
          event.status === 'completed'
      )
      .sort(
        (a, b) =>
          b.eventDate!.getTime() -
          a.eventDate!.getTime()
      )

    const years = [
      ...new Set(
        allEvents
          .map((event) =>
            event.year?.toString()
          )
          .filter(Boolean)
      ),
    ]

    const types = [
      ...new Set(
        allEvents
          .map((event) => event.type)
          .filter(Boolean)
      ),
    ]

    const topics = [
      ...new Set(
        allEvents
          .map((event) => event.topic)
          .filter(Boolean)
      ),
    ]

    return {
      upcomingEvents: upcoming,
      pastEvents: past,
      featuredEvent:
        upcoming.length > 0
          ? upcoming[0]
          : null,

      filterOptions: {
        years,
        types,
        topics,
      },
    }
  }, [eventsData])

  const filteredEvents = useMemo(() => {
    const all = [
      ...upcomingEvents,
      ...pastEvents,
    ]

    return all.filter((event) => {
      const {
        year,
        type,
        topic,
        searchQuery,
      } = filters

      const query =
        searchQuery.trim().toLowerCase()

      const matchesYear =
        year === 'all' ||
        event.year?.toString() === year

      const matchesType =
        type === 'all' ||
        event.type === type

      const matchesTopic =
        topic === 'all' ||
        event.topic === topic

      const matchesSearch =
        !query ||
        event.title
          ?.toLowerCase()
          .includes(query) ||
        event.description
          ?.toLowerCase()
          .includes(query) ||
        event.speaker
          ?.toLowerCase()
          .includes(query) ||
        event.venue
          ?.toLowerCase()
          .includes(query)

      return (
        matchesYear &&
        matchesType &&
        matchesTopic &&
        matchesSearch
      )
    })
  }, [
    filters,
    upcomingEvents,
    pastEvents,
  ])

  const handleFilterChange = (
    filterName: string,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }))
  }

  const handleRegistration = (
    link?: string
  ) => {
    if (!link) return

    window.open(
      link,
      '_blank',
      'noopener,noreferrer'
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-accent" />
          </div>

          <p className="text-sm text-muted-foreground">
            Loading events...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 bg-background">

      {featuredEvent && (
        <FeaturedEventSection
          event={featuredEvent}
          currentTime={currentTime}
          onRegister={handleRegistration}
          onViewDetails={() =>
            setSelectedEvent(featuredEvent)
          }
        />
      )}

      <section className="px-4 pt-10 pb-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">

            <div>
              <div className="flex items-center gap-2 text-accent mb-3">
                <Sparkles className="h-4 w-4" />

                <span className="text-sm font-semibold uppercase tracking-wider">
                  DSAI Events
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold">
                Discover Our Events
              </h2>

              <p className="text-muted-foreground mt-2 max-w-2xl">
                Explore upcoming workshops, seminars,
                competitions and other activities.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />

              <span>
                {eventsData.length} total events
              </span>
            </div>

          </div>

        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">

          <Card className="border-border/60 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4 md:p-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

                <div className="relative sm:col-span-2 lg:col-span-1">

                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                  <Input
                    placeholder="Search events..."
                    value={
                      filters.searchQuery
                    }
                    onChange={(e) =>
                      handleFilterChange(
                        'searchQuery',
                        e.target.value
                      )
                    }
                    className="pl-10 h-11"
                  />

                </div>

                <FilterSelect
                  value={filters.year}
                  onValueChange={(value) =>
                    handleFilterChange(
                      'year',
                      value
                    )
                  }
                  placeholder="All Years"
                  items={filterOptions.years}
                />

                <FilterSelect
                  value={filters.type}
                  onValueChange={(value) =>
                    handleFilterChange(
                      'type',
                      value
                    )
                  }
                  placeholder="All Types"
                  items={filterOptions.types}
                />

                <FilterSelect
                  value={filters.topic}
                  onValueChange={(value) =>
                    handleFilterChange(
                      'topic',
                      value
                    )
                  }
                  placeholder="All Topics"
                  items={filterOptions.topics}
                />

              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-border/50">

                <p className="text-sm text-muted-foreground">
                  Showing{' '}
                  <span className="font-semibold text-foreground">
                    {filteredEvents.length}
                  </span>{' '}
                  of{' '}
                  <span className="font-semibold text-foreground">
                    {eventsData.length}
                  </span>{' '}
                  events
                </p>

                {(filters.searchQuery ||
                  filters.year !== 'all' ||
                  filters.type !== 'all' ||
                  filters.topic !== 'all') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setFilters({
                        year: 'all',
                        type: 'all',
                        topic: 'all',
                        searchQuery: '',
                      })
                    }
                  >
                    Clear Filters
                  </Button>
                )}

              </div>

            </CardContent>
          </Card>

        </div>
      </section>

      <section className="px-4 pb-24">

        <div className="max-w-7xl mx-auto">

          {filteredEvents.length === 0 ? (

            <div className="py-24 text-center">

              <div className="h-20 w-20 mx-auto rounded-3xl bg-muted flex items-center justify-center mb-6">
                <CalendarSearch className="h-9 w-9 text-muted-foreground" />
              </div>

              <h3 className="text-2xl font-bold">
                No Events Found
              </h3>

              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                We couldn't find any events matching
                your current search or filters.
              </p>

              <Button
                className="mt-6"
                onClick={() =>
                  setFilters({
                    year: 'all',
                    type: 'all',
                    topic: 'all',
                    searchQuery: '',
                  })
                }
              >
                Show All Events
              </Button>

            </div>

          ) : (

            <>

              {filteredEvents.some(
                (event) =>
                  event.status === 'upcoming'
              ) && (

                <div className="mb-14">

                  <div className="flex items-center gap-3 mb-6">

                    <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-accent" />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold">
                        Upcoming Events
                      </h2>

                      <p className="text-sm text-muted-foreground">
                        Don't miss what's coming next
                      </p>
                    </div>

                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {filteredEvents
                      .filter(
                        (event) =>
                          event.status ===
                          'upcoming'
                      )
                      .map((event) => (

                        <EventCard
                          key={
                            event.id ||
                            event._id
                          }
                          event={event}
                          onRegister={
                            handleRegistration
                          }
                          onViewDetails={() =>
                            setSelectedEvent(
                              event
                            )
                          }
                        />

                      ))}

                  </div>

                </div>

              )}

              {filteredEvents.some(
                (event) =>
                  event.status === 'completed'
              ) && (

                <div>

                  <div className="flex items-center gap-3 mb-6">

                    <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                      <History className="h-5 w-5 text-muted-foreground" />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold">
                        Past Events
                      </h2>

                      <p className="text-sm text-muted-foreground">
                        Explore our previous activities
                      </p>
                    </div>

                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {filteredEvents
                      .filter(
                        (event) =>
                          event.status ===
                          'completed'
                      )
                      .map((event) => (

                        <EventCard
                          key={
                            event.id ||
                            event._id
                          }
                          event={event}
                          onRegister={
                            handleRegistration
                          }
                          onViewDetails={() =>
                            setSelectedEvent(
                              event
                            )
                          }
                        />

                      ))}

                  </div>

                </div>

              )}

            </>
          )}

        </div>

      </section>

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() =>
            setSelectedEvent(null)
          }
          onRegister={handleRegistration}
        />
      )}

    </div>
  )
}

function FeaturedEventSection({
  event,
  currentTime,
  onRegister,
  onViewDetails,
}: {
  event: EventItem
  currentTime: Date
  onRegister: (link?: string) => void
  onViewDetails: () => void
}) {
  const countdown = getCountdown(
    event.eventDate!,
    currentTime
  )

  const image = getEventImage(event)

  return (
    <section className="relative overflow-hidden px-4 py-12 md:py-20">

      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />

      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="text-center mb-8">

          <Badge
            variant="outline"
            className="px-4 py-2 rounded-full bg-accent/10 border-accent/20 text-accent"
          >
            <Star className="h-4 w-4 mr-2 fill-current" />

            Featured Event
          </Badge>

        </div>

        <Card className="overflow-hidden border-accent/20 shadow-2xl bg-card/80 backdrop-blur-sm">

          <div className="grid lg:grid-cols-2">

            <div className="relative min-h-[300px] lg:min-h-[520px]">

              {image ? (

                <ImageWithFallback
                  src={image}
                  alt={event.title || 'Event'}
                  className="absolute inset-0 w-full h-full object-cover"
                />

              ) : (

                <div className="absolute inset-0 bg-muted flex items-center justify-center">
                  <Calendar className="h-20 w-20 text-muted-foreground" />
                </div>

              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute left-6 bottom-6 right-6 text-white">

                <Badge className="mb-3 bg-accent text-accent-foreground">
                  {event.type || 'Event'}
                </Badge>

                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  {event.title || 'Upcoming Event'}
                </h1>

              </div>

            </div>

            <div className="p-6 md:p-10 flex flex-col justify-center">

              <div className="flex flex-wrap gap-2 mb-5">

                {event.topic && (
                  <Badge variant="outline">
                    {event.topic}
                  </Badge>
                )}

                <Badge variant="outline">
                  Upcoming
                </Badge>

              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {event.title}
              </h2>

              {event.description && (
                <p className="text-muted-foreground leading-relaxed mb-7">
                  {event.description}
                </p>
              )}

              <EventDetails event={event} />

              {countdown && (

                <div className="mt-8">

                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-accent" />

                    <span className="font-semibold">
                      Event Starts In
                    </span>
                  </div>

                  <CountdownTimer
                    {...countdown}
                  />

                </div>

              )}

              <div className="flex flex-col sm:flex-row gap-3 mt-8">

                {event.registrationLink && (

                  <Button
                    size="lg"
                    className="flex-1 glow-accent"
                    onClick={() =>
                      onRegister(
                        event.registrationLink
                      )
                    }
                  >
                    <UserPlus className="h-5 w-5 mr-2" />

                    Register Now
                  </Button>

                )}

                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1"
                  onClick={onViewDetails}
                >
                  View Details

                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>

              </div>

            </div>

          </div>

        </Card>

      </div>

    </section>
  )
}

function EventCard({
  event,
  onRegister,
  onViewDetails,
}: {
  event: EventItem
  onRegister: (link?: string) => void
  onViewDetails: () => void
}) {
  const image = getEventImage(event)

  const isUpcoming =
    event.status === 'upcoming'

  return (
    <Card className="group overflow-hidden border-border/60 hover:border-primary/40 hover:shadow-xl transition-all duration-300">

      <div
        className="relative h-56 overflow-hidden cursor-pointer"
        onClick={onViewDetails}
      >

        {image ? (

          <ImageWithFallback
            src={image}
            alt={event.title || 'Event'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

        ) : (

          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Calendar className="h-14 w-14 text-muted-foreground" />
          </div>

        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute top-4 left-4">

          <Badge
            className={
              isUpcoming
                ? 'bg-accent text-accent-foreground'
                : 'bg-black/60 text-white backdrop-blur-sm'
            }
          >
            {isUpcoming
              ? 'Upcoming'
              : 'Completed'}
          </Badge>

        </div>

        <div className="absolute bottom-4 left-4 right-4 text-white">

          <div className="flex items-center gap-2 text-sm mb-1">
            <Calendar className="h-4 w-4" />

            {formatEventDate(
              event.eventDate
            )}
          </div>

        </div>

      </div>

      <CardHeader className="pb-3">

        <div className="flex flex-wrap gap-2 mb-2">

          {event.type && (
            <Badge
              variant="outline"
              className="text-xs"
            >
              {event.type}
            </Badge>
          )}

          {event.topic && (
            <Badge
              variant="outline"
              className="text-xs"
            >
              {event.topic}
            </Badge>
          )}

        </div>

        <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
          {event.title || 'Untitled Event'}
        </CardTitle>

      </CardHeader>

      <CardContent className="flex flex-col">

        {event.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-5">
            {event.description}
          </p>
        )}

        <EventDetails
          event={event}
          small
        />

        <div className="mt-6 flex gap-2">

          {isUpcoming ? (

            <Button
              className="flex-1"
              onClick={() =>
                onRegister(
                  event.registrationLink
                )
              }
              disabled={
                !event.registrationLink
              }
            >
              {event.registrationLink ? (
                <>
                  <Ticket className="h-4 w-4 mr-2" />

                  Register
                </>
              ) : (
                'Registration Closed'
              )}
            </Button>

          ) : (

            <Button
              variant="outline"
              className="flex-1"
              onClick={onViewDetails}
            >
              <History className="h-4 w-4 mr-2" />

              View Details
            </Button>

          )}

          {isUpcoming && (
            <Button
              variant="outline"
              size="icon"
              onClick={onViewDetails}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}

        </div>

      </CardContent>

    </Card>
  )
}

function EventDetails({
  event,
  small = false,
}: {
  event: EventItem
  small?: boolean
}) {
  const iconSize = small
    ? 'h-4 w-4'
    : 'h-5 w-5'

  return (
    <div className="space-y-3 text-sm text-muted-foreground">

      {event.eventDate && (

        <div className="flex items-start gap-3">

          <Calendar
            className={`${iconSize} mt-0.5 shrink-0 text-accent`}
          />

          <span>
            {formatEventDate(
              event.eventDate
            )}

            {event.time && (
              <span className="block text-xs mt-0.5">
                {event.time}
              </span>
            )}
          </span>

        </div>

      )}

      {event.speaker && (

        <div className="flex items-center gap-3">

          <User
            className={`${iconSize} shrink-0 text-accent`}
          />

          <span>
            Speaker:{' '}
            <strong className="text-foreground">
              {event.speaker}
            </strong>
          </span>

        </div>

      )}

      {event.venue && (

        <div className="flex items-center gap-3">

          <MapPin
            className={`${iconSize} shrink-0 text-accent`}
          />

          <span className="line-clamp-1">
            {event.venue}
          </span>

        </div>

      )}

    </div>
  )
}

function CountdownTimer({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number
  hours: number
  minutes: number
  seconds: number
}) {
  return (
    <div className="grid grid-cols-4 gap-2 md:gap-3">

      <CountdownUnit
        value={days}
        label="Days"
      />

      <CountdownUnit
        value={hours}
        label="Hours"
      />

      <CountdownUnit
        value={minutes}
        label="Minutes"
      />

      <CountdownUnit
        value={seconds}
        label="Seconds"
      />

    </div>
  )
}

function CountdownUnit({
  value,
  label,
}: {
  value: number
  label: string
}) {
  return (
    <div className="rounded-xl border border-accent/20 bg-accent/5 p-3 text-center">

      <div className="text-xl md:text-2xl font-bold text-accent tabular-nums">
        {String(value).padStart(2, '0')}
      </div>

      <div className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground mt-1">
        {label}
      </div>

    </div>
  )
}

function FilterSelect({
  value,
  onValueChange,
  placeholder,
  items,
}: {
  value: string
  onValueChange: (value: string) => void
  placeholder: string
  items: any[]
}) {
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
    >

      <SelectTrigger className="h-11">
        <SelectValue
          placeholder={placeholder}
        />
      </SelectTrigger>

      <SelectContent>

        <SelectItem value="all">
          {placeholder}
        </SelectItem>

        {items.map((item) => (
          <SelectItem
            key={item}
            value={item}
          >
            {item}
          </SelectItem>
        ))}

      </SelectContent>

    </Select>
  )
}

function EventDetailsModal({
  event,
  onClose,
  onRegister,
}: {
  event: EventItem
  onClose: () => void
  onRegister: (link?: string) => void
}) {
  const image = getEventImage(event)

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >

      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-background rounded-2xl shadow-2xl border border-border"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <div className="relative h-64 md:h-80">

          {image ? (

            <ImageWithFallback
              src={image}
              alt={event.title || 'Event'}
              className="w-full h-full object-cover"
            />

          ) : (

            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Calendar className="h-20 w-20 text-muted-foreground" />
            </div>

          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 rounded-full bg-black/50 hover:bg-black/70 text-white border-0"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="absolute bottom-6 left-6 right-6 text-white">

            <Badge className="mb-3 bg-accent text-accent-foreground">
              {event.status === 'upcoming'
                ? 'Upcoming Event'
                : 'Completed Event'}
            </Badge>

            <h2 className="text-2xl md:text-4xl font-bold">
              {event.title}
            </h2>

          </div>

        </div>

        <div className="p-6 md:p-8">

          <div className="flex flex-wrap gap-2 mb-6">

            {event.type && (
              <Badge variant="outline">
                {event.type}
              </Badge>
            )}

            {event.topic && (
              <Badge variant="outline">
                {event.topic}
              </Badge>
            )}

            {event.year && (
              <Badge variant="outline">
                {event.year}
              </Badge>
            )}

          </div>

          {event.description && (

            <div className="mb-7">

              <h3 className="font-semibold text-lg mb-2">
                About This Event
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>

            </div>

          )}

          <div className="rounded-xl border border-border/60 bg-muted/30 p-5">

            <EventDetails
              event={event}
            />

          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-7">

            {event.status === 'upcoming' &&
              event.registrationLink && (

                <Button
                  size="lg"
                  className="flex-1"
                  onClick={() =>
                    onRegister(
                      event.registrationLink
                    )
                  }
                >
                  <Ticket className="h-5 w-5 mr-2" />

                  Register Now

                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>

              )}

            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Close
            </Button>

          </div>

        </div>

      </div>

    </div>
  )
}

function formatEventDate(
  date?: Date
) {
  if (!date || isNaN(date.getTime())) {
    return 'Date not available'
  }

  return date.toLocaleDateString(
    'en-US',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )
}

function getCountdown(
  eventDate: Date,
  currentTime: Date
) {
  const timeDiff =
    eventDate.getTime() -
    currentTime.getTime()

  if (timeDiff <= 0) {
    return null
  }

  return {
    days: Math.floor(
      timeDiff /
        (1000 * 60 * 60 * 24)
    ),

    hours: Math.floor(
      (timeDiff /
        (1000 * 60 * 60)) %
        24
    ),

    minutes: Math.floor(
      (timeDiff / (1000 * 60)) %
        60
    ),

    seconds: Math.floor(
      (timeDiff / 1000) % 60
    ),
  }
}

export default EventsPage