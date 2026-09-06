// The public UI was designed with presentation-oriented property names.  These
// adapters keep that UI independent of the MongoDB document shape returned by
// the Express API.
const imageUrl = (image: any) => image?.url || image || ''
const dateParts = (value: string | Date | undefined) => {
  const date = value ? new Date(value) : new Date()
  return { date: date.toISOString().slice(0, 10), year: date.getFullYear() }
}

export const adaptEvent = (event: any) => {
  const { date, year } = dateParts(event.date)
  return {
    ...event,
    id: event._id || event.id,
    date,
    year,
    time: event.startTime || event.time || '',
    type: event.category || event.type || 'Event',
    topic: event.category || event.topic || 'General',
    image: (event.coverImage),
    coverImage: imageUrl(event.coverImage),
    location: event.venue || event.location || '',
    registrationLink: event.registrationLink || '',
    speaker: event.speaker || '',
  }
}

export const adaptProject = (project: any) => ({
  ...project,
  id: project._id || project.id,
  image: imageUrl(project.coverImage),
  coverImage: imageUrl(project.coverImage),
  technologies: project.techStack || project.technologies || [],
  techStack: project.techStack || [],
  categories: project.category || project.categories || [],
  category: Array.isArray(project.category) ? project.category : project.category || [],
  team: project.team || [],
  github: project.github || '',
  demo: project.demo || '',
  featured: project.featured || project.isFeatured || false,
})

export const adaptDeveloper = (developer: any) => ({
  ...developer,
  id: developer._id || developer.id,
  image: imageUrl(developer.image),
  avatar: imageUrl(developer.image),
  role: developer.role || developer.designation || '',
  designation: developer.designation || developer.role || '',
  skills: developer.skills || [],
  contributions: developer.contributions || [],
})

export const adaptFounder = (founder: any) => ({
  ...founder,
  id: founder._id || founder.id,
  image: imageUrl(founder.image),
  avatar: imageUrl(founder.image),
  role: founder.designation || founder.role || '',
  socialLinks: founder.socialLinks || {},
  specialties: founder.specialties || [],
  achievements: founder.achievements || [],
})

export const adaptGalleryItems = (items: any[]) =>
  items.map((item) => {
    const { date, year } = dateParts(item.date)

    const photos = Array.isArray(item.photos)
      ? item.photos
      : []

    // Convert every photo to actual usable URL
    const images = photos
      .map((photo: any) => imageUrl(photo))
      .filter(Boolean)

    return {
      ...item,

      // ONE gallery item = ONE card
      id: item._id || item.id || item.title,

      galleryId: item._id || item.id,

      title: item.title || '',

      description: item.description || '',

      category: (
        item.category || 'events'
      ).toLowerCase(),

      date,

      year,

      // ALL PHOTOS
      images,

      // COVER IMAGE / FIRST PHOTO
      image: images[0] || '',

      // First image URL
      url: images[0] || '',
    }
  })




export const adaptQuizSummary = (quiz: any) => ({
  ...quiz,
  id: quiz._id || quiz.id,
  questions: quiz.questions || [],
  questionCount: quiz.questions?.length || quiz.questionCount || 0,
  timeLimit: quiz.timeLimit || 15,
  points: quiz.points || 0,
})

export const adaptQuizDetail = (quiz: any) => ({
  ...adaptQuizSummary(quiz),
  questions: (quiz.questions || []).map((question: any) => ({
    ...question,
    id: question._id || question.id,
  })),
})
