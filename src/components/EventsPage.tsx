import { useState, useEffect, useMemo } from 'react';
import { Icons } from './Icons';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Star, Calendar, MapPin, User, UserPlus, Ticket, History, Search, CalendarSearch } from 'lucide-react';
import { ImageWithFallback } from './dsai/ImageWithFallback';
import eventsData from '../../assets/Event'; // Your event data import


// --- Main Events Page Component ---
export function EventsPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // --- State for Filters ---
  const [filters, setFilters] = useState({
    year: 'all',
    type: 'all',
    topic: 'all',
    searchQuery: '',
  });

  // --- Update current time every second for countdowns ---
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- Memoize derived data to prevent recalculations on every render ---
  const { upcomingEvents, pastEvents, featuredEvent, filterOptions } = useMemo(() => {
    const now = new Date();

    const allEvents = eventsData.map(event => {
      const eventDate = new Date(`${event.date}T${event.time || '00:00:00'}`);
      return {
        ...event,
        status: eventDate > now ? 'upcoming' : 'completed',
        eventDate,
      };
    }).sort((a, b) => b.eventDate.getTime() - a.eventDate.getTime());

    const upcoming = allEvents.filter(e => e.status === 'upcoming').reverse();
    const past = allEvents.filter(e => e.status === 'completed');
    
    const years = [...new Set(allEvents.map(e => e.year.toString()))];
    const types = [...new Set(allEvents.map(e => e.type))];
    const topics = [...new Set(allEvents.map(e => e.topic))];

    return {
      upcomingEvents: upcoming,
      pastEvents: past,
      featuredEvent: upcoming.length > 0 ? upcoming[0] : null,
      filterOptions: { years, types, topics },
    };
  }, []);

  // --- Filter events based on state ---
  const filteredEvents = useMemo(() => {
    return [...upcomingEvents, ...pastEvents].filter(event => {
      const { year, type, topic, searchQuery } = filters;
      const lowerCaseQuery = searchQuery.toLowerCase();

      const matchesFilter =
        (year === 'all' || event.year.toString() === year) &&
        (type === 'all' || event.type === type) &&
        (topic === 'all' || event.topic === topic);

      const matchesSearch = searchQuery === '' ||
        event.title.toLowerCase().includes(lowerCaseQuery) ||
        event.description.toLowerCase().includes(lowerCaseQuery) ||
        event.speaker.toLowerCase().includes(lowerCaseQuery);

      return matchesFilter && matchesSearch;
    });
  }, [filters, upcomingEvents, pastEvents]);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };
  
  const handleRegistration = (link: string) => window.open(link, '_blank');

  return (
    <div className="min-h-screen pt-16 bg-background">
      {featuredEvent && (
        <FeaturedEventSection
          event={featuredEvent}
          currentTime={currentTime}
          onRegister={handleRegistration}
        />
      )}

      <section className="top-16 z-20 py-4 px-4 bg-muted/50 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative sm:col-span-2 lg:col-span-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <Input
                  placeholder="Search events..."
                  value={filters.searchQuery}
                  onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                  className="pl-10 bg-background"
                />
            </div>
            <FilterSelect
              value={filters.year}
              onValueChange={(value) => handleFilterChange('year', value)}
              placeholder="All Years"
              items={filterOptions.years}
            />
            <FilterSelect
              value={filters.type}
              onValueChange={(value) => handleFilterChange('type', value)}
              placeholder="All Types"
              items={filterOptions.types}
            />
            <FilterSelect
              value={filters.topic}
              onValueChange={(value) => handleFilterChange('topic', value)}
              placeholder="All Topics"
              items={filterOptions.topics}
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Showing {filteredEvents.length} of {eventsData.length} total events.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={handleRegistration}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 col-span-full">
              <CalendarSearch className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold">No Events Found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// --- Helper Components for a Cleaner Structure ---

function FeaturedEventSection({ event, currentTime, onRegister }) {
  const countdown = getCountdown(event.eventDate, currentTime);

  return (
    <section className="py-16 px-4 relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <Badge variant="outline" className="text-sm font-semibold mb-4 bg-accent/10 border-accent/20 text-accent">
          <Star className="h-4 w-4 mr-2" />
          Our Next Big Event
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">{event.title}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">{event.description}</p>
        
        <Card className="relative overflow-hidden border-accent/20 bg-card/50 backdrop-blur-sm shadow-lg">
          <div className="grid lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <ImageWithFallback src={event.image} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <div className="p-8 flex flex-col justify-center text-left">
              <EventDetails event={event} />
              {countdown ? (
                <div className="my-6">
                  <h3 className="font-bold mb-4">Event Starts In:</h3>
                  <CountdownTimer {...countdown} />
                </div>
              ) : (
                <div className="my-6 text-center text-accent font-bold">Event is starting now!</div>
              )}
              {event.registrationLink && (
                 <Button size="lg" onClick={() => onRegister(event.registrationLink)} className="glow-accent">
                   <UserPlus className="h-5 w-5 mr-2" />
                   Register Now
                 </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function EventCard({ event, onRegister }) {
  return (
    <Card className="group flex flex-col hover:border-primary/50 transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        <div className="absolute top-3 left-3">
          <Badge className={event.status === 'upcoming' ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'}>
            {event.status}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="group-hover:text-primary transition-colors">{event.title}</CardTitle>
        <div className="flex flex-wrap gap-2 pt-2">
          <Badge variant="outline">{event.type}</Badge>
          <Badge variant="outline">{event.topic}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <EventDetails event={event} small />
        <div className="mt-auto pt-4">
          {event.status === 'upcoming' ? (
            <Button className="w-full" onClick={() => onRegister(event.registrationLink)} disabled={!event.registrationLink}>
              {event.registrationLink ? <><Ticket className="mr-2 h-4 w-4" />Register</> : 'Registration Closed'}
            </Button>
          ) : (
            <Button variant="outline" className="w-full">
              <History className="mr-2 h-4 w-4" />View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function EventDetails({ event, small = false }) {
  const iconSize = small ? "h-4 w-4" : "h-5 w-5";
  return (
    <div className="space-y-3 text-sm text-muted-foreground">
      <div className="flex items-center gap-3">
        <Calendar className={iconSize} />
        <span>{new Date(event.eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>
      <div className="flex items-center gap-3">
        <User className={iconSize} />
        <span>Speaker: <strong>{event.speaker}</strong></span>
      </div>
      <div className="flex items-center gap-3">
        <MapPin className={iconSize} />
        <span>{event.venue}</span>
      </div>
    </div>
  );
}

function CountdownTimer({ days, hours, minutes, seconds }) {
  return (
    <div className="grid grid-cols-4 gap-4 text-center">
      <CountdownUnit value={days} label="Days" />
      <CountdownUnit value={hours} label="Hours" />
      <CountdownUnit value={minutes} label="Minutes" />
      <CountdownUnit value={seconds} label="Seconds" />
    </div>
  );
}

function CountdownUnit({ value, label }) {
  return (
    <div className="bg-accent/10 p-3 rounded-lg border border-accent/20">
      <div className="text-3xl font-bold text-accent">{String(value).padStart(2, '0')}</div>
      <div className="text-xs uppercase text-muted-foreground">{label}</div>
    </div>
  );
}

function FilterSelect({ value, onValueChange, placeholder, items }) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{placeholder}</SelectItem>
        {items.map(item => (
          <SelectItem key={item} value={item}>{item}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function getCountdown(eventDate: Date, currentTime: Date) {
  const timeDiff = eventDate.getTime() - currentTime.getTime();
  if (timeDiff <= 0) return null;

  return {
    days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeDiff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((timeDiff / 1000 / 60) % 60),
    seconds: Math.floor((timeDiff / 1000) % 60),
  };
}