import { useEffect, useState } from 'react'
import { Icons } from './Icons'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { useAuth } from '../Context/AuthContext'
import { adminEventsApi,adminQuizApi, adminGalleryApi, adminProjectsApi ,adminUsersApi,adminUserApi} from '../lib/endpoints'

import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent as AlertDialogContentBase,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'

interface AdminDashboardProps {
  userData: any
}

const ROLE_PERMISSIONS = {
  president: {
    viewStats: true,
    manageEvents: true,
    manageProjects: true,
    manageGallery: true,
    manageUsers: true,
    manageQuizzes: true,
  },

  admin: {
    viewStats: true,
    manageEvents: true,
    manageProjects: true,
    manageGallery: true,
    manageUsers: true,
    manageQuizzes: true,
  },

  'general secretary': {
    viewStats: true,
    manageEvents: true,
    manageProjects: true,
    manageGallery: true,
    manageQuizzes: true,
  },

  'assistant general secretary': {
    viewStats: true,
    manageEvents: true,
    manageProjects: true,
    manageGallery: true,
    manageQuizzes: true,
  },
}

type RoleKey = keyof typeof ROLE_PERMISSIONS

function getPermissions(role?: string) {
  const normalizedRole = (role || 'admin').toLowerCase() as RoleKey

  return (
    ROLE_PERMISSIONS[normalizedRole] ||
    ROLE_PERMISSIONS.admin
  )
}




export function AdminDashboard({
  userData,
}: AdminDashboardProps) {
  const { handleLogout } = useAuth()

  const permissions = getPermissions(userData?.role)

  const [activeTab, setActiveTab] = useState('overview')

  const [events, setEvents] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [gallery, setGallery] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [quizzes, setQuizzes] = useState<any[]>([])

const [quizDialogOpen, setQuizDialogOpen] =
  useState(false)

const [editingQuiz, setEditingQuiz] =
  useState<any>(null)

const [quizForm, setQuizForm] = useState({
  title: '',
  category: '',
  description: '',
  difficulty: 'Easy',
  timeLimit: 15,
  isPublished: false,
})

const [questionDialogOpen, setQuestionDialogOpen] =
  useState(false)

const [editingQuestion, setEditingQuestion] =
  useState<any>(null)

const [selectedQuiz, setSelectedQuiz] =
  useState<any>(null)

const [questionForm, setQuestionForm] = useState({
  question: '',
  options: ['', '', '', ''],
  correctAnswer: 0,
  points: 10,
})







  const [userDialogOpen, setUserDialogOpen] =
  useState(false)

const [editingUser, setEditingUser] =
  useState<any>(null)

const [userSearch, setUserSearch] =
  useState('')

const [userForm, setUserForm] = useState({
  name: '',
  email: '',
  phone: '',
  role: 'student',
  isVerified: false,
  isActive: true,
  password: '',
})

  const [loading, setLoading] = useState(false)

  const [deleteConfirm, setDeleteConfirm] =
    useState<{
      type: string
      id: string
      name: string
    } | null>(null)

  const [eventDialogOpen, setEventDialogOpen] =
    useState(false)

  const [projectDialogOpen, setProjectDialogOpen] =
    useState(false)

  const [galleryDialogOpen, setGalleryDialogOpen] =
    useState(false)

  const [editingEvent, setEditingEvent] =
    useState<any>(null)

  const [editingProject, setEditingProject] =
    useState<any>(null)

  const [editingGallery, setEditingGallery] =
    useState<any>(null)

  const [viewingGallery, setViewingGallery] = useState<any>(null)
  const [selectedGalleryPhotos, setSelectedGalleryPhotos] = useState<string[]>([])

  

  const [eventCoverFile, setEventCoverFile] =
    useState<File | null>(null)

  const [projectCoverFile, setProjectCoverFile] =
    useState<File | null>(null)

  const [galleryFiles, setGalleryFiles] =
    useState<File[]>([])

  const [galleryPreviews, setGalleryPreviews] =
    useState<string[]>([])

  

  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    startTime: '09:00',
    endTime: '10:00',
    speaker: '',
    venue: '',
    department: '',
    roomNo: '',
    organizer: 'DSAI Club',
    registrationRequired: false,
    registrationLink: '',
    coverImage: '',
    coverImagePreview: '',
    photos: '',
  })

  const [projectForm, setProjectForm] =
    useState({
      title: '',
      description: '',
      year: new Date().getFullYear(),
      category: '',
      techStack: '',
      team: '',
      github: '',
      demo: '',
      featured: false,
      coverImage: '',
      coverImagePreview: '',
    })

  const [galleryForm, setGalleryForm] =
    useState({
      title: '',
      description: '',
      category: 'Events',
      date: '',
      photos: '',
    })

  

  const splitList = (value: string) =>
    value
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean)

  const getImageUrl = (image: any) => {
    if (!image) return ''

    if (typeof image === 'string') {
      return image
    }

    return image.url || ''
  }

  const appendFormDataValue = (
    formData: FormData,
    key: string,
    value: unknown
  ) => {
    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {
      return
    }

    if (Array.isArray(value)) {
      value.forEach((item) =>
        appendFormDataValue(
          formData,
          key,
          item
        )
      )
      return
    }

    formData.append(
      key,
      typeof value === 'boolean'
        ? String(value)
        : String(value)
    )
  }

  const buildAdminFormData = (
    data: Record<string, any>
  ) => {
    const formData = new FormData()

    Object.entries(data).forEach(
      ([key, value]) => {
        appendFormDataValue(
          formData,
          key,
          value
        )
      }
    )

    return formData
  }

  const addGalleryFiles = (newFiles: File[]) => {
    const invalid = newFiles.some((file) => file.size > 5 * 1024 * 1024)
    if (invalid) {
      toast.error('Each image must be smaller than 5MB')
      return
    }

    const availableSlots = 20 - galleryFiles.length
    if (availableSlots <= 0) {
      toast.error('A gallery can contain at most 20 images')
      return
    }

    const filesToAdd = newFiles.slice(0, availableSlots)
    if (filesToAdd.length < newFiles.length) {
      toast.info('Only the first 20 images can be uploaded')
    }

    setGalleryFiles((files) => [...files, ...filesToAdd])
    setGalleryPreviews((previews) => [
      ...previews,
      ...filesToAdd.map((file) => URL.createObjectURL(file)),
    ])
  }

  const removePendingGalleryFile = (index: number) => {
    setGalleryFiles((files) => files.filter((_, fileIndex) => fileIndex !== index))
    setGalleryPreviews((previews) => {
      URL.revokeObjectURL(previews[index])
      return previews.filter((_, previewIndex) => previewIndex !== index)
    })
  }





  const resetEventForm = () => {
    setEventForm({
      title: '',
      description: '',
      category: '',
      date: '',
      startTime: '09:00',
      endTime: '10:00',
      speaker: '',
      venue: '',
      department: '',
      roomNo: '',
      organizer: 'DSAI Club',
      registrationRequired: false,
      registrationLink: '',
      coverImage: '',
      coverImagePreview: '',
      photos: '',
    })

    setEventCoverFile(null)
  }

  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      description: '',
      year: new Date().getFullYear(),
      category: '',
      techStack: '',
      team: '',
      github: '',
      demo: '',
      featured: false,
      coverImage: '',
      coverImagePreview: '',
    })

    setProjectCoverFile(null)
  }

  const resetGalleryForm = () => {
    setGalleryForm({
      title: '',
      description: '',
      category: 'Events',
      date: '',
      photos: '',
    })

    setGalleryFiles([])
    setGalleryPreviews([])
  }
  const resetQuizForm = () => {
  setQuizForm({
    title: '',
    category: '',
    description: '',
    difficulty: 'Easy',
    timeLimit: 15,
    isPublished: false,
  })
}

const resetQuestionForm = () => {
  setQuestionForm({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 10,
  })

  setEditingQuestion(null)
}



  const fetchEvents = async () => {
    try {
      const res =
        await adminEventsApi.list({
          limit: 100,
        })

      setEvents(res.data || [])
    } catch (err: any) {
      toast.error(
        'Failed to fetch events',
        {
          description: err?.message,
        }
      )
    }
  }
const fetchQuizzes = async () => {
  try {
    const res = await adminQuizApi.list({
      limit: 100,
      all: true,
    })
    console.log(res.data )

    setQuizzes(res.data || [])
  } catch (err: any) {
    toast.error('Failed to fetch quizzes', {
      description: err?.message,
    })
  }
}

  const fetchUsers = async () => {
  try {
    const res =
      await adminUsersApi.list()
      console.log(res.data)

    setUsers(res.data || [])
  } catch (err: any) {
    toast.error(
      'Failed to fetch users',
      {
        description: err?.message,
      }
    )
  }
}
  const fetchProjects = async () => {
    try {
      const res =
        await adminProjectsApi.list({
          limit: 100,
        })

      setProjects(res.data || [])
    } catch (err: any) {
      toast.error(
        'Failed to fetch projects',
        {
          description: err?.message,
        }
      )
    }
  }

  const fetchGallery = async () => {
    try {
      const res =
        await adminGalleryApi.list({
          limit: 100,
        })

      setGallery(res.data || [])
    } catch (err: any) {
      toast.error(
        'Failed to fetch gallery',
        {
          description: err?.message,
        }
      )
    }
  }

  const refreshAll = async () => {
    setLoading(true)

    try {
      await Promise.all([
        fetchEvents(),
        fetchProjects(),
        fetchGallery(),
        fetchUsers(),
          fetchQuizzes()
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshAll()
  }, [])



  const handleDeleteEvent = async (
    eventId: string
  ) => {
    try {
      await adminEventsApi.delete(eventId)

      toast.success(
        'Event deleted successfully'
      )

      await fetchEvents()

      setDeleteConfirm(null)
    } catch (err: any) {
      toast.error(
        'Failed to delete event',
        {
          description: err?.message,
        }
      )
    }
  }

  const handleDeleteUser = async (
  userId: string
) => {
  try {
    setLoading(true)

    await adminUsersApi.delete(
      userId
    )

    toast.success(
      'User deleted successfully'
    )

    setDeleteConfirm(null)

    await fetchUsers()
  } catch (err: any) {
    toast.error(
      'Failed to delete user',
      {
        description:
          err?.message,
      }
    )
  } finally {
    setLoading(false)
  }
}



  const handleDeleteProject = async (
    projectId: string
  ) => {
    try {
      await adminProjectsApi.delete(
        projectId
      )

      toast.success(
        'Project deleted successfully'
      )

      await fetchProjects()

      setDeleteConfirm(null)
    } catch (err: any) {
      toast.error(
        'Failed to delete project',
        {
          description: err?.message,
        }
      )
    }
  }

  const handleDeleteGallery = async (
    galleryId: string
  ) => {
    try {
      await adminGalleryApi.delete(
        galleryId
      )

      toast.success(
        'Gallery item deleted successfully'
      )

      await fetchGallery()

      setDeleteConfirm(null)
    } catch (err: any) {
      toast.error(
        'Failed to delete gallery item',
        {
          description: err?.message,
        }
      )
    }
  }
  const handleDeleteQuiz = async (
  quizId: string
) => {
  try {
    setLoading(true)

    await adminQuizApi.delete(quizId)

    toast.success('Quiz deleted successfully')

    setDeleteConfirm(null)

    await fetchQuizzes()
  } catch (err: any) {
    toast.error('Failed to delete quiz', {
      description: err?.message,
    })
  } finally {
    setLoading(false)
  }
}
const handleDeleteQuestion = async (
  quizId: string,
  questionId: string
) => {
  try {
    setLoading(true)

    await adminQuizApi.delete(
      quizId,
      questionId
    )

    toast.success('Question deleted successfully')

    const updated = await adminQuizApi.get(
      quizId
    )

    setSelectedQuiz(updated.data)

    await fetchQuizzes()
  } catch (err: any) {
    toast.error('Failed to delete question', {
      description: err?.message,
    })
  } finally {
    setLoading(false)
  }
}

  const openGalleryViewer = (item: any) => {
    setViewingGallery(item)
    setSelectedGalleryPhotos([])
  }

  const toggleGalleryPhoto = (publicId: string) => {
    setSelectedGalleryPhotos((selected) =>
      selected.includes(publicId)
        ? selected.filter((id) => id !== publicId)
        : [...selected, publicId]
    )
  }

  const deleteSelectedGalleryPhotos = async () => {
    if (!viewingGallery || selectedGalleryPhotos.length === 0) return

    try {
      setLoading(true)
      const response = await adminGalleryApi.deletePhotos(
        viewingGallery._id,
        selectedGalleryPhotos
      )
      setViewingGallery(response.data)
      setSelectedGalleryPhotos([])
      await fetchGallery()
      toast.success('Selected images deleted successfully')
    } catch (err: any) {
      toast.error('Could not delete selected images', { description: err?.message })
    } finally {
      setLoading(false)
    }
  }




  const saveEvent = async () => {
    try {
      setLoading(true)

      const formData = buildAdminFormData({
        title: eventForm.title,
        description: eventForm.description,
        category: eventForm.category,
        date: eventForm.date,
        startTime: eventForm.startTime,
        endTime: eventForm.endTime,
        speaker: eventForm.speaker,
        venue: eventForm.venue,
        department: eventForm.department,
        roomNo: eventForm.roomNo,
        organizer: eventForm.organizer,
        registrationRequired:
          Boolean(
            eventForm.registrationRequired
          ),
        registrationLink:
          eventForm.registrationLink,
      })

      if (eventCoverFile) {
        formData.append(
          'coverImage',
          eventCoverFile
        )
      }

      if (editingEvent) {
        await adminEventsApi.update(
          editingEvent._id,
          formData
        )

        toast.success(
          'Event updated successfully'
        )
      } else {
        await adminEventsApi.create(
          formData
        )

        toast.success(
          'Event added successfully'
        )
      }

      setEventDialogOpen(false)
      setEditingEvent(null)
      resetEventForm()

      await fetchEvents()
    } catch (err: any) {
      toast.error(
        'Unable to save event',
        {
          description: err?.message,
        }
      )
    } finally {
      setLoading(false)
    }
  }
  const saveQuiz = async () => {
  try {
    setLoading(true)

    const payload = {
      title: quizForm.title,
      category: quizForm.category,
      description: quizForm.description,
      difficulty: quizForm.difficulty,
      timeLimit: Number(quizForm.timeLimit),
      isPublished: Boolean(quizForm.isPublished),
    }

    if (editingQuiz) {
      await adminQuizApi.update(
        editingQuiz._id,
        payload
      )

      toast.success('Quiz updated successfully')
    } else {
      await adminQuizApi.create(payload)

      toast.success('Quiz created successfully')
    }

    setQuizDialogOpen(false)
    setEditingQuiz(null)
    resetQuizForm()

    await fetchQuizzes()
  } catch (err: any) {
    toast.error('Unable to save quiz', {
      description: err?.message,
    })
  } finally {
    setLoading(false)
  }
}
const saveQuestion = async () => {
  if (!selectedQuiz) return

  if (!questionForm.question.trim()) {
    toast.error('Question is required')
    return
  }

  if (
    questionForm.options.some(
      (option) => !option.trim()
    )
  ) {
    toast.error('All options are required')
    return
  }

  try {
    setLoading(true)

    const payload = {
      question: questionForm.question,
      options: questionForm.options,
      correctAnswer: Number(
        questionForm.correctAnswer
      ),
      points: Number(questionForm.points),
    }

    if (editingQuestion) {
      await adminQuizApi.updateQuestion(
        selectedQuiz._id,
        editingQuestion._id,
        payload
      )

      toast.success('Question updated successfully')
    } else {
      await adminQuizApi.addQuestion(
        selectedQuiz._id,
        payload
      )

      toast.success('Question added successfully')
    }

    setQuestionDialogOpen(false)

    resetQuestionForm()

    const updated = await adminQuizApi.get(
      selectedQuiz._id
    )

    setSelectedQuiz(updated.data)

    await fetchQuizzes()
  } catch (err: any) {
    toast.error('Unable to save question', {
      description: err?.message,
    })
  } finally {
    setLoading(false)
  }
}


  const saveProject = async () => {
    try {
      setLoading(true)

      const formData = buildAdminFormData({
        title: projectForm.title,
        description: projectForm.description,
        year: Number(projectForm.year),
        github: projectForm.github,
        demo: projectForm.demo,
        featured: Boolean(
          projectForm.featured
        ),
      })

      splitList(projectForm.category).forEach(
        (value) => {
          formData.append('category', value)
        }
      )

      splitList(projectForm.techStack).forEach(
        (value) => {
          formData.append('techStack', value)
        }
      )

      splitList(projectForm.team).forEach(
        (value) => {
          formData.append('team', value)
        }
      )

      if (projectCoverFile) {
        formData.append(
          'coverImage',
          projectCoverFile
        )
      }

      if (editingProject) {
        await adminProjectsApi.update(
          editingProject._id,
          formData
        )

        toast.success(
          'Project updated successfully'
        )
      } else {
        await adminProjectsApi.create(
          formData
        )

        toast.success(
          'Project added successfully'
        )
      }

      setProjectDialogOpen(false)
      setEditingProject(null)
      resetProjectForm()

      await fetchProjects()
    } catch (err: any) {
      toast.error(
        'Unable to save project',
        {
          description: err?.message,
        }
      )
    } finally {
      setLoading(false)
    }
  }

  const saveUser = async () => {
  if (!editingUser) return

  try {
    setLoading(true)

    const payload: any = {
      name: userForm.name,
      email: userForm.email,
      phone: userForm.phone,
      role: userForm.role,
      isVerified:
        userForm.isVerified,
      isActive:
        userForm.isActive,
    }

    if (
      userForm.password.trim()
        .length > 0
    ) {
      payload.password =
        userForm.password
    }

    await adminUserApi.update(
      editingUser._id,
      payload
    )

    toast.success(
      'User updated successfully'
    )

    setUserDialogOpen(false)
    setEditingUser(null)

    setUserForm({
      name: '',
      email: '',
      phone: '',
      role: 'student',
      isVerified: false,
      isActive: true,
      password: '',
    })

    await fetchUsers()
  } catch (err: any) {
    toast.error(
      'Failed to update user',
      {
        description: err?.message,
      }
    )
  } finally {
    setLoading(false)
  }
}


  const saveGallery = async () => {
    if (!editingGallery && galleryFiles.length === 0) {
      toast.error('Choose at least one gallery image')
      return
    }

    try {
      setLoading(true)

      const formData = buildAdminFormData({
        title: galleryForm.title,
        description: galleryForm.description,
        category: galleryForm.category,
        date: galleryForm.date,
      })

      galleryFiles.forEach((file) => {
        formData.append('photos', file)
      })

      if (editingGallery) {
        await adminGalleryApi.update(
          editingGallery._id,
          formData
        )

        toast.success(
          'Gallery updated successfully'
        )
      } else {
        await adminGalleryApi.create(
          formData
        )

        toast.success(
          'Gallery added successfully'
        )
      }

      setGalleryDialogOpen(false)
      setEditingGallery(null)
      resetGalleryForm()

      await fetchGallery()
    } catch (err: any) {
      toast.error(
        'Unable to save gallery',
        {
          description: err?.message,
        }
      )
    } finally {
      setLoading(false)
    }
  }


  const openEditEvent = (
    event: any
  ) => {
    setEditingEvent(event)

    setEventCoverFile(null)

    setEventForm({
      title: event.title || '',
      description:
        event.description || '',
      category:
        event.category || '',

      date: event.date
        ? new Date(event.date)
            .toISOString()
            .slice(0, 10)
        : '',

      startTime:
        event.startTime ||
        '09:00',

      endTime:
        event.endTime ||
        '10:00',

      speaker:
        event.speaker || '',

      venue:
        event.venue || '',

      department:
        event.department || '',

      roomNo:
        event.roomNo || '',

      organizer:
        event.organizer ||
        'DSAI Club',

      registrationRequired:
        Boolean(
          event.registrationRequired
        ),

      registrationLink:
        event.registrationLink ||
        '',

      coverImage:
        getImageUrl(
          event.coverImage
        ),

      coverImagePreview:
        getImageUrl(
          event.coverImage
        ),

      photos:
        Array.isArray(event.photos)
          ? event.photos
              .map(
                (p: any) =>
                  p.url
              )
              .join(', ')
          : '',
    })

    setEventDialogOpen(true)
  }



  const openEditProject = (
    project: any
  ) => {
    setEditingProject(project)

    setProjectCoverFile(null)

    setProjectForm({
      title:
        project.title || '',

      description:
        project.description ||
        '',

      year:
        project.year ||
        new Date().getFullYear(),

      category:
        Array.isArray(
          project.category
        )
          ? project.category.join(
              ', '
            )
          : project.category ||
            '',

      techStack:
        Array.isArray(
          project.techStack
        )
          ? project.techStack.join(
              ', '
            )
          : '',

      team:
        Array.isArray(
          project.team
        )
          ? project.team.join(
              ', '
            )
          : '',

      github:
        project.github || '',

      demo:
        project.demo || '',

      featured:
        Boolean(
          project.featured
        ),

      coverImage:
        getImageUrl(
          project.coverImage
        ),

      coverImagePreview:
        getImageUrl(
          project.coverImage
        ),
    })

    setProjectDialogOpen(true)
  }

  const openEditUser = (user: any) => {
  setEditingUser(user)

  setUserForm({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    role: user.role || 'student',
    isVerified: Boolean(
      user.isVerified
    ),
    isActive:
      user.isActive !== false,
    password: '',
  })

  setUserDialogOpen(true)
}





  const openEditGallery = (
    item: any
  ) => {
    setEditingGallery(item)

    setGalleryFiles([])

    
    setGalleryPreviews([])

    setGalleryForm({
      title:
        item.title || '',

      description:
        item.description ||
        '',

      category:
        item.category ||
        'Events',

      date: item.date
        ? new Date(item.date)
            .toISOString()
            .slice(0, 10)
        : '',

      photos:
        Array.isArray(item.photos)
          ? item.photos
              .map(
                (p: any) =>
                  p.url
              )
              .join(', ')
          : '',
    })

    setGalleryDialogOpen(true)
  }



  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 pt-24 pb-24 px-4">

      <div className="max-w-7xl mx-auto">

       

        <div className="flex flex-col lg:flex-row justify-between gap-5 mb-8">

          <div>
            <div className="flex items-center gap-3 mb-2">

              <div className="p-3 rounded-2xl bg-primary/10">
                <Icons.Activity className="h-7 w-7 text-primary" />
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex gap-6">
                  {userData?.role ? <div className="capitalize">{userData.role}</div> : 'Admin'} Dashboard
                </h1>

                <p className="text-muted-foreground">
                  Manage your events,
                  projects and gallery
                </p>
              </div>

            </div>

            <p className="text-sm text-muted-foreground mt-3">
              Welcome back,{' '}
              <span className="font-semibold text-foreground">
                {userData?.name}
              </span>{' '}
              ·{' '}
              <span className="capitalize">
                {userData?.role}
              </span>
            </p>
          </div>

          <div className="flex gap-2">

            <Button
              variant="outline"
              onClick={refreshAll}
              disabled={loading}
            >
              <Icons.Activity className="h-4 w-4 mr-2" />

              {loading
                ? 'Refreshing...'
                : 'Refresh'}
            </Button>

            <Button
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <Icons.LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>

          </div>
        </div>


        <Tabs
          value={activeTab}
          onValueChange={
            setActiveTab
          }
        >

          <TabsList className="w-full h-auto p-1 grid grid-cols-2 md:grid-cols-4 mb-8">

            {permissions.viewStats && (
              <TabsTrigger
                value="overview"
                className="py-3"
              >
                Overview
              </TabsTrigger>
            )}

            {permissions.manageEvents && (
              <TabsTrigger
                value="events"
                className="py-3"
              >
                Events
              </TabsTrigger>
            )}

            {permissions.manageProjects && (
              <TabsTrigger
                value="projects"
                className="py-3"
              >
                Projects
              </TabsTrigger>
            )}

            {permissions.manageGallery && (
              <TabsTrigger
                value="gallery"
                className="py-3"
              >
                Gallery
              </TabsTrigger>
            )}

              {permissions.manageUsers && (
              <TabsTrigger
                value="users"
                className="py-3"
              >
                Users
                
              </TabsTrigger>
            )}
            {permissions.manageQuizzes && (
  <TabsTrigger
    value="quizzes"
    className="py-3"
  >
    Quizzes
  </TabsTrigger>
)}

          </TabsList>







          {permissions.viewStats && (
            <TabsContent value="overview">

              <div className="space-y-8">


                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                  <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-primary/10 to-background">
                    <CardContent className="p-6">

                      <div className="flex justify-between items-start">

                        <div>
                          <p className="text-sm text-muted-foreground">
                            Total Events
                          </p>

                          <h2 className="text-4xl font-bold mt-2">
                            {events.length}
                          </h2>

                          <p className="text-xs text-muted-foreground mt-2">
                            Published events
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-primary/10">
                          <Icons.Calendar className="h-6 w-6 text-primary" />
                        </div>

                      </div>

                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-green-500/10 to-background">
                    <CardContent className="p-6">

                      <div className="flex justify-between items-start">

                        <div>
                          <p className="text-sm text-muted-foreground">
                            Total Projects
                          </p>

                          <h2 className="text-4xl font-bold mt-2">
                            {projects.length}
                          </h2>

                          <p className="text-xs text-muted-foreground mt-2">
                            Club projects
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-blue-500/10">
                          <Icons.Code className="h-6 w-6 text-blue-500" />
                        </div>

                      </div>

                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-purple-500/10 to-background">
                    <CardContent className="p-6">

                      <div className="flex justify-between items-start">

                        <div>
                          <p className="text-sm text-muted-foreground">
                            Gallery Collections
                          </p>

                          <h2 className="text-4xl font-bold mt-2">
                            {gallery.length}
                          </h2>

                          <p className="text-xs text-muted-foreground mt-2">
                            Photo collections
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-purple-500/10">
                          <Icons.Image className="h-6 w-6 text-purple-500" />
                        </div>

                      </div>

                    </CardContent>
                  </Card>


                  <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-blue-500/10 to-background">
                    <CardContent className="p-6">

                      <div className="flex justify-between items-start">

                        <div>
                          <p className="text-sm text-muted-foreground">
                            Active Users
                          </p>

                          <h2 className="text-4xl font-bold mt-2">
                            {users.length}
                          </h2>

                          <p className="text-xs text-muted-foreground mt-2">
                            Active members
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-green-500/10">
                          <Icons.Users className="h-6 w-6 text-green-500" />
                        </div>

                      </div>

                    </CardContent>
                  </Card>

                </div>


                <Card className="shadow-sm">

                  <CardHeader>
                    <CardTitle>
                      Quick Actions
                    </CardTitle>
                  </CardHeader>

                  <CardContent>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                      {permissions.manageEvents && (
                        <Button
                          variant="outline"
                          className="h-20 justify-start"
                          onClick={() => {
                            setActiveTab(
                              'events'
                            )
                          }}
                        >
                          <div className="p-3 rounded-xl bg-primary/10 mr-4">
                            <Icons.Calendar className="h-5 w-5 text-primary" />
                          </div>

                          <div className="text-left">
                            <div className="font-semibold">
                              Manage Events
                            </div>

                            <div className="text-xs text-muted-foreground">
                              Add or edit events
                            </div>
                          </div>
                        </Button>
                      )}

                      {permissions.manageProjects && (
                        <Button
                          variant="outline"
                          className="h-20 justify-start"
                          onClick={() => {
                            setActiveTab(
                              'projects'
                            )
                          }}
                        >
                          <div className="p-3 rounded-xl bg-blue-500/10 mr-4">
                            <Icons.Code className="h-5 w-5 text-blue-500" />
                          </div>

                          <div className="text-left">
                            <div className="font-semibold">
                              Manage Projects
                            </div>

                            <div className="text-xs text-muted-foreground">
                              Add or edit projects
                            </div>
                          </div>
                        </Button>
                      )}




                       {permissions.manageUsers && (
                        <Button
                          variant="outline"
                          className="h-20 justify-start"
                          onClick={() => {
                            setActiveTab(
                              'users'
                            )
                          }}
                        >
                          <div className="p-3 rounded-xl bg-green-500/10 mr-4">
                            <Icons.Users className="h-5 w-5 text-green-500" />
                          </div>

                          <div className="text-left">
                            <div className="font-semibold">
                              Manage Users
                            </div>

                            <div className="text-xs text-muted-foreground">
                              Add or edit users
                            </div>
                          </div>
                        </Button>
                      )}


                      

                      {permissions.manageGallery && (
                        <Button
                          variant="outline"
                          className="h-20 justify-start"
                          onClick={() => {
                            setActiveTab(
                              'gallery'
                            )
                          }}
                        >
                          <div className="p-3 rounded-xl bg-purple-500/10 mr-4">
                            <Icons.Image className="h-5 w-5 text-purple-500" />
                          </div>

                          <div className="text-left">
                            <div className="font-semibold">
                              Manage Gallery
                            </div>

                            <div className="text-xs text-muted-foreground">
                              Upload photos
                            </div>
                          </div>
                        </Button>
                      )}

                      {permissions.manageQuizzes && (
  <Button
    variant="outline"
    className="h-20 justify-start"
    onClick={() => {
      setActiveTab('quizzes')
    }}
  >
    <div className="p-3 rounded-xl bg-orange-500/10 mr-4">
      <Icons.Trophy className="h-5 w-5 text-orange-500" />
    </div>

    <div className="text-left">
      <div className="font-semibold">
        Manage Quizzes
      </div>

      <div className="text-xs text-muted-foreground">
        Create and manage quizzes
      </div>
    </div>
  </Button>
)}

                    </div>

                  </CardContent>
                </Card>


                {events.length > 0 && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>
                        Recent Events
                      </CardTitle>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setActiveTab(
                            'events'
                          )
                        }
                      >
                        View all
                      </Button>
                    </CardHeader>

                    <CardContent>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {events
                          .slice(0, 3)
                          .map(
                            (event) => (
                              <div
                                key={
                                  event._id
                                }
                                className="rounded-xl overflow-hidden border group"
                              >

                                {getImageUrl(
                                  event.coverImage
                                ) ? (
                                  <img
                                    src={getImageUrl(
                                      event.coverImage
                                    )}
                                    alt={
                                      event.title
                                    }
                                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                ) : (
                                  <div className="h-36 bg-muted flex items-center justify-center">
                                    <Icons.Image className="h-10 w-10 text-muted-foreground" />
                                  </div>
                                )}

                                <div className="p-4">

                                  <h3 className="font-semibold truncate">
                                    {event.title ||
                                      event.name}
                                  </h3>

                                  <p className="text-xs text-muted-foreground mt-1">
                                    {event.date
                                      ? new Date(
                                          event.date
                                        ).toLocaleDateString()
                                      : 'Date not set'}
                                  </p>

                                </div>

                              </div>
                            )
                          )}

                      </div>

                    </CardContent>
                  </Card>
                )}

              </div>

            </TabsContent>
          )}
   




   {permissions.manageUsers && (
  <TabsContent value="users">

    <div className="space-y-6">


      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold">
            User Management
          </h2>

          <p className="text-sm text-muted-foreground">
            Manage users, roles, verification and
            account access
          </p>
        </div>

        <div className="flex gap-2">

          <Button
            variant="outline"
            onClick={fetchUsers}
            disabled={loading}
          >
            <Icons.Activity className="h-4 w-4 mr-2" />

            Refresh
          </Button>

        </div>

      </div>



      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <Card>
          <CardContent className="p-5">

            <p className="text-sm text-muted-foreground">
              Total Users
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {users.length}
            </h3>

          </CardContent>
        </Card>


        <Card>
          <CardContent className="p-5">

            <p className="text-sm text-muted-foreground">
              Verified
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {
                users.filter(
                  (u) =>
                    u.isVerified
                ).length
              }
            </h3>

          </CardContent>
        </Card>


        <Card>
          <CardContent className="p-5">

            <p className="text-sm text-muted-foreground">
              Active
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {
                users.filter(
                  (u) =>
                    u.isActive !==
                    false
                ).length
              }
            </h3>

          </CardContent>
        </Card>


        <Card>
          <CardContent className="p-5">

            <p className="text-sm text-muted-foreground">
              Admins
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {
                users.filter(
                  (u) =>
                    u.role ===
                      'admin' ||
                    u.role ===
                      'president'
                ).length
              }
            </h3>

          </CardContent>
        </Card>

      </div>



      <Card>

        <CardContent className="p-4">

          <Input
            placeholder="Search by name, email, phone or role..."
            value={userSearch}
            onChange={(e) =>
              setUserSearch(
                e.target.value
              )
            }
          />

        </CardContent>

      </Card>



      {users.length === 0 ? (

        <Card>

          <CardContent className="py-16 text-center">

            <Icons.Users
              className="h-12 w-12 mx-auto text-muted-foreground mb-4"
            />

            <h3 className="text-lg font-semibold">
              No users found
            </h3>

            <p className="text-sm text-muted-foreground mt-1">
              There are no registered users.
            </p>

          </CardContent>

        </Card>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {users
            .filter((user) => {

              const search =
                userSearch
                  .toLowerCase()
                  .trim()

              if (!search)
                return true

              return (
                user.name
                  ?.toLowerCase()
                  .includes(search) ||
                user.email
                  ?.toLowerCase()
                  .includes(search) ||
                user.phone
                  ?.toLowerCase()
                  .includes(search) ||
                user.role
                  ?.toLowerCase()
                  .includes(search)
              )
            })
            .map((user) => (

              <Card
                key={
                  user._id
                }
                className="overflow-hidden hover:shadow-lg transition-all"
              >


                <div className="p-5 border-b">

                  <div className="flex items-center gap-4">

                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">

                      {user.profileImage ||
                      user.avatar ? (

                        <img
                          src={
                            user.profileImage.url ||
                            user.avatar
                          }
                          alt={
                            user.name
                          }
                          className="h-full w-full object-cover"
                        />

                      ) : (

                        <span className="text-xl font-bold text-primary">
                          {user.name
                            ?.charAt(
                              0
                            )
                            ?.toUpperCase() ||
                            'U'}
                        </span>

                      )}

                    </div>


                    <div className="min-w-0 flex-1">

                      <h3 className="font-bold truncate">
                        {user.name ||
                          'Unknown User'}
                      </h3>

                      <p className="text-sm text-muted-foreground truncate">
                        {user.email}
                      </p>

                    </div>

                  </div>

                </div>



                <CardContent className="p-5 space-y-4">


                  <div className="flex items-center justify-between">

                    <span className="text-sm text-muted-foreground">
                      Role
                    </span>

                    <span className="px-3 py-1 rounded-full bg-primary/10 text-grey-500 text-sm font-semibold capitalize">
                      {user.role ||
                        'student'}
                    </span>

                  </div>



                  <div className="flex items-center justify-between">

                    <span className="text-sm text-muted-foreground">
                      Verification
                    </span>

                    {user.isVerified ? (

                      <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-semibold">
                        ✓ Verified
                      </span>

                    ) : (

                      <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 text-xs font-semibold">
                        Not Verified
                      </span>

                    )}

                  </div>



                  <div className="flex items-center justify-between">

                    <span className="text-sm text-muted-foreground">
                      Account
                    </span>

                    {user.isActive !==
                    false ? (

                      <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-semibold">
                        Active
                      </span>

                    ) : (

                      <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-600 text-xs font-semibold">
                        Disabled
                      </span>

                    )}

                  </div>



                  {user.phone && (

                    <div className="text-sm">

                      <span className="text-muted-foreground">
                        Phone:{' '}
                      </span>

                      <span>
                        {user.phone}
                      </span>

                    </div>

                  )}



                  <div className="flex gap-2 pt-2">

                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() =>
                        openEditUser(
                          user
                        )
                      }
                    >

                      <Icons.Edit className="h-4 w-4 mr-1" />

                      Manage

                    </Button>


                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive border-destructive hover:bg-destructive/10"
                      onClick={() =>
                        setDeleteConfirm(
                          {
                            type: 'user',
                            id: user._id,
                            name:
                              user.name,
                          }
                        )
                      }
                    >

                      <Icons.X className="h-4 w-4" />

                    </Button>

                  </div>

                </CardContent>

              </Card>

            ))}

        </div>

      )}

    </div>

  </TabsContent>
)}






















          {permissions.manageEvents && (
            <TabsContent value="events">

              <div className="space-y-6">

                <div className="flex flex-col sm:flex-row justify-between gap-4">

                  <div>
                    <h2 className="text-2xl font-bold">
                      Event Management
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      Create and manage club events
                    </p>
                  </div>

                  <Button
                    onClick={() => {
                      setEditingEvent(
                        null
                      )

                      resetEventForm()

                      setEventDialogOpen(
                        true
                      )
                    }}
                  >
                    <Icons.Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>

                </div>

                {events.length === 0 ? (
                  <Card>
                    <CardContent className="py-16 text-center">

                      <Icons.Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />

                      <h3 className="font-semibold text-lg">
                        No events yet
                      </h3>

                      <p className="text-sm text-muted-foreground mt-1 mb-5">
                        Create your first event
                      </p>

                      <Button
                        onClick={() => {
                          setEditingEvent(
                            null
                          )
                          resetEventForm()
                          setEventDialogOpen(
                            true
                          )
                        }}
                      >
                        <Icons.Plus className="h-4 w-4 mr-2" />
                        Add Event
                      </Button>

                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {events.map(
                      (event) => {

                        const image =
                          getImageUrl(
                            event.coverImage
                          )

                        return (
                          <Card
                            key={
                              event._id
                            }
                            className="overflow-hidden group hover:shadow-lg transition-all"
                          >

                            {image ? (
                              <div className="relative h-52 overflow-hidden">

                                <img
                                  src={
                                    image
                                  }
                                  alt={
                                    event.title
                                  }
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                {event.category && (
                                  <span className="absolute top-3 left-3 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium">
                                    {
                                      event.category
                                    }
                                  </span>
                                )}

                              </div>
                            ) : (
                              <div className="h-52 bg-muted flex items-center justify-center">
                                <Icons.Image className="h-12 w-12 text-muted-foreground" />
                              </div>
                            )}

                            <CardContent className="p-5">

                              <h3 className="text-lg font-bold line-clamp-1">
                                {event.title ||
                                  event.name}
                              </h3>

                              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                {
                                  event.description
                                }
                              </p>

                              <div className="mt-4 space-y-2 text-sm text-muted-foreground">

                                {event.date && (
                                  <div className="flex items-center gap-2">
                                    <Icons.Calendar className="h-4 w-4" />

                                    {new Date(
                                      event.date
                                    ).toLocaleDateString()}
                                  </div>
                                )}

                                {event.venue && (
                                  <div className="flex items-center gap-2">
                                    <Icons.MapPin className="h-4 w-4" />

                                    {
                                      event.venue
                                    }
                                  </div>
                                )}

                              </div>

                              <div className="flex gap-2 mt-5">

                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() =>
                                    openEditEvent(
                                      event
                                    )
                                  }
                                >
                                  <Icons.Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>

                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-destructive border-destructive hover:bg-destructive/10"
                                  onClick={() =>
                                    setDeleteConfirm(
                                      {
                                        type: 'event',
                                        id: event._id,
                                        name:
                                          event.title ||
                                          event.name,
                                      }
                                    )
                                  }
                                >
                                  <Icons.X className="h-4 w-4" />
                                </Button>

                              </div>

                            </CardContent>

                          </Card>
                        )
                      }
                    )}

                  </div>
                )}

              </div>

            </TabsContent>
          )}


          {permissions.manageProjects && (
            <TabsContent value="projects">

              <div className="space-y-6">

                <div className="flex flex-col sm:flex-row justify-between gap-4">

                  <div>
                    <h2 className="text-2xl font-bold">
                      Project Management
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      Showcase your club projects
                    </p>
                  </div>

                  <Button
                    onClick={() => {
                      setEditingProject(
                        null
                      )

                      resetProjectForm()

                      setProjectDialogOpen(
                        true
                      )
                    }}
                  >
                    <Icons.Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>

                </div>

                {projects.length === 0 ? (
                  <Card>
                    <CardContent className="py-16 text-center">

                      <Icons.Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />

                      <h3 className="font-semibold text-lg">
                        No projects yet
                      </h3>

                      <Button
                        className="mt-5"
                        onClick={() => {
                          setEditingProject(
                            null
                          )
                          resetProjectForm()
                          setProjectDialogOpen(
                            true
                          )
                        }}
                      >
                        <Icons.Plus className="h-4 w-4 mr-2" />
                        Add Project
                      </Button>

                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {projects.map(
                      (project) => {

                        const image =
                          getImageUrl(
                            project.coverImage
                          )

                        return (
                          <Card
                            key={
                              project._id
                            }
                            className="overflow-hidden group hover:shadow-lg transition-all"
                          >

                            {image ? (
                              <div className="relative h-52 overflow-hidden">

                                <img
                                  src={
                                    image
                                  }
                                  alt={
                                    project.title
                                  }
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                {project.featured && (
                                  <span className="absolute top-3 right-3 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold">
                                    Featured
                                  </span>
                                )}

                              </div>
                            ) : (
                              <div className="h-52 bg-muted flex items-center justify-center">
                                <Icons.Code className="h-12 w-12 text-muted-foreground" />
                              </div>
                            )}

                            <CardContent className="p-5">

                              <div className="flex items-start justify-between gap-3">

                                <h3 className="text-lg font-bold line-clamp-1">
                                  {project.title ||
                                    project.name}
                                </h3>

                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                  {project.year}
                                </span>

                              </div>

                              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                {
                                  project.description
                                }
                              </p>

                              {Array.isArray(
                                project.techStack
                              ) &&
                                project.techStack.length >
                                  0 && (
                                  <div className="flex flex-wrap gap-1.5 mt-4">

                                    {project.techStack
                                      .slice(
                                        0,
                                        4
                                      )
                                      .map(
                                        (
                                          tech: string,
                                          index: number
                                        ) => (
                                          <span
                                            key={
                                              index
                                            }
                                            className="px-2 py-1 rounded-md bg-muted text-xs"
                                          >
                                            {
                                              tech
                                            }
                                          </span>
                                        )
                                      )}

                                  </div>
                                )}

                              <div className="flex gap-2 mt-5">

                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() =>
                                    openEditProject(
                                      project
                                    )
                                  }
                                >
                                  <Icons.Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>

                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-destructive border-destructive hover:bg-destructive/10"
                                  onClick={() =>
                                    setDeleteConfirm(
                                      {
                                        type: 'project',
                                        id: project._id,
                                        name:
                                          project.title ||
                                          project.name,
                                      }
                                    )
                                  }
                                >
                                  <Icons.X className="h-4 w-4" />
                                </Button>

                              </div>

                            </CardContent>

                          </Card>
                        )
                      }
                    )}

                  </div>
                )}

              </div>

            </TabsContent>
          )}


          {permissions.manageGallery && (
            <TabsContent value="gallery">

              <div className="space-y-6">

                <div className="flex flex-col sm:flex-row justify-between gap-4">

                  <div>
                    <h2 className="text-2xl font-bold">
                      Gallery Management
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      Manage event and club photos
                    </p>
                  </div>

                  <Button
                    onClick={() => {
                      setEditingGallery(
                        null
                      )

                      resetGalleryForm()

                      setGalleryDialogOpen(
                        true
                      )
                    }}
                  >
                    <Icons.Plus className="h-4 w-4 mr-2" />
                    Add Gallery
                  </Button>

                </div>

                {gallery.length === 0 ? (
                  <Card>
                    <CardContent className="py-16 text-center">

                      <Icons.Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />

                      <h3 className="font-semibold text-lg">
                        No gallery items
                      </h3>

                      <Button
                        className="mt-5"
                        onClick={() => {
                          setEditingGallery(
                            null
                          )
                          resetGalleryForm()
                          setGalleryDialogOpen(
                            true
                          )
                        }}
                      >
                        <Icons.Plus className="h-4 w-4 mr-2" />
                        Add Gallery
                      </Button>

                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {gallery.map(
                      (item) => {

                        const photos =
                          Array.isArray(
                            item.photos
                          )
                            ? item.photos
                            : []

                        return (
                          <Card
                            key={
                              item._id
                            }
                            className="overflow-hidden hover:shadow-lg transition-all"
                          >

                            {photos.length >
                            0 ? (
                              <div className="h-52 overflow-hidden">
                                <img
                                  src={photos[0].url}
                                  alt={item.title || 'Gallery'}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="h-52 bg-muted flex items-center justify-center">
                                <Icons.Image className="h-12 w-12 text-muted-foreground" />
                              </div>
                            )}

                            <CardContent className="p-5">

                              <div className="flex justify-between gap-3">

                                <div>
                                  <h3 className="font-bold">
                                    {item.title ||
                                      item.name}
                                  </h3>

                                  <p className="text-xs text-muted-foreground mt-1">
                                    {photos.length}{' '}
                                    photo
                                    {photos.length !==
                                    1
                                      ? 's'
                                      : ''}
                                  </p>
                                </div>

                                {item.category && (
                                  <span className="text-xs bg-muted px-2 py-1 rounded-full h-fit">
                                    {
                                      item.category
                                    }
                                  </span>
                                )}

                              </div>

                              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                                {
                                  item.description
                                }
                              </p>

                              <div className="flex gap-2 mt-5">

                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() =>
                                    openEditGallery(
                                      item
                                    )
                                  }
                                >
                                  <Icons.Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>

                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() => openGalleryViewer(item)}
                                >
                                  View More
                                </Button>

                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-destructive border-destructive hover:bg-destructive/10"
                                  onClick={() =>
                                    setDeleteConfirm(
                                      {
                                        type: 'gallery',
                                        id: item._id,
                                        name:
                                          item.title ||
                                          item.name,
                                      }
                                    )
                                  }
                                >
                                  <Icons.X className="h-4 w-4" />
                                </Button>

                              </div>

                            </CardContent>

                          </Card>
                        )
                      }
                    )}

                  </div>
                )}

              </div>

            </TabsContent>
          )}

          {permissions.manageQuizzes && (
  <TabsContent value="quizzes">

    <div className="space-y-6">


      <div className="flex flex-col sm:flex-row justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold">
            Quiz Management
          </h2>

          <p className="text-sm text-muted-foreground">
            Create quizzes and manage questions
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingQuiz(null)
            resetQuizForm()
            setQuizDialogOpen(true)
          }}
        >
          <Icons.Plus className="h-4 w-4 mr-2" />
          New Quiz
        </Button>

      </div>



      {quizzes.length === 0 ? (

        <Card>
          <CardContent className="py-16 text-center">

            <Icons.Trophy
              className="h-12 w-12 mx-auto text-muted-foreground mb-4"
            />

            <h3 className="font-semibold text-lg">
              No quizzes yet
            </h3>

            <p className="text-sm text-muted-foreground mt-1 mb-5">
              Create your first quiz
            </p>

            <Button
              onClick={() => {
                setEditingQuiz(null)
                resetQuizForm()
                setQuizDialogOpen(true)
              }}
            >
              <Icons.Plus className="h-4 w-4 mr-2" />
              Create Quiz
            </Button>

          </CardContent>
        </Card>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {quizzes.map((quiz) => (

            <Card
              key={quiz._id}
              className="overflow-hidden hover:shadow-lg transition-all"
            >

              <CardHeader>

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <CardTitle className="line-clamp-2">
                      {quiz.title}
                    </CardTitle>

                    <p className="text-sm text-muted-foreground mt-1">
                      {quiz.category}
                    </p>

                  </div>

                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      quiz.isPublished
                        ? 'bg-green-500/10 text-green-600'
                        : 'bg-yellow-500/10 text-yellow-600'
                    }`}
                  >
                    {quiz.isPublished
                      ? 'Published'
                      : 'Draft'}
                  </span>

                </div>

              </CardHeader>


              <CardContent className="space-y-4">

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {quiz.description ||
                    'No description'}
                </p>


                <div className="grid grid-cols-3 gap-2 text-center">

                  <div className="rounded-lg bg-muted p-3">
                    <div className="font-bold">
                      {quiz.questions?.length || 0}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Questions
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted p-3">
                    <div className="font-bold">
                      {quiz.timeLimit}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Minutes
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted p-3">
                    <div className="font-bold">
                      {quiz.points || 0}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Points
                    </div>
                  </div>

                </div>


                <div className="flex gap-2">

                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setEditingQuiz(quiz)

                      setQuizForm({
                        title: quiz.title || '',
                        category: quiz.category || '',
                        description:
                          quiz.description || '',
                        difficulty:
                          quiz.difficulty || 'Easy',
                        timeLimit:
                          quiz.timeLimit || 15,
                        isPublished:
                          Boolean(
                            quiz.isPublished
                          ),
                      })

                      setQuizDialogOpen(true)
                    }}
                  >
                    <Icons.Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>


                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSelectedQuiz(quiz)
                    }}
                  >
                    <Icons.List className="h-4 w-4 mr-1" />
                    Questions
                  </Button>


                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive border-destructive hover:bg-destructive/10"
                    onClick={() =>
                      setDeleteConfirm({
                        type: 'quiz',
                        id: quiz._id,
                        name: quiz.title,
                      })
                    }
                  >
                    <Icons.X className="h-4 w-4" />
                  </Button>

                </div>

              </CardContent>

            </Card>

          ))}

        </div>

      )}

    </div>

  </TabsContent>
)}

        </Tabs>
      </div>

      <Dialog
        open={Boolean(viewingGallery)}
        onOpenChange={(open) => {
          if (!open) {
            setViewingGallery(null)
            setSelectedGalleryPhotos([])
          }
        }}
      >
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {viewingGallery?.title || 'Gallery images'}
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Select images you want to permanently delete.
            </p>
            <Button
              variant="destructive"
              disabled={!selectedGalleryPhotos.length || loading}
              onClick={deleteSelectedGalleryPhotos}
            >
              Delete selected ({selectedGalleryPhotos.length})
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-2">
            {(viewingGallery?.photos || []).map((photo: any, index: number) => {
              const publicId = photo.publicId || `${index}`
              const selected = selectedGalleryPhotos.includes(publicId)
              return (
                <button
                  type="button"
                  key={publicId}
                  className={`relative overflow-hidden rounded-xl border-2 text-left transition-colors ${
                    selected ? 'border-destructive ring-2 ring-destructive/30' : 'border-transparent'
                  }`}
                  onClick={() => toggleGalleryPhoto(publicId)}
                  aria-pressed={selected}
                >
                  <img
                    src={photo.url}
                    alt={`${viewingGallery?.title || 'Gallery image'} ${index + 1}`}
                    className="h-48 w-full object-cover"
                  />
                  <span className="absolute top-2 right-2 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                    {selected ? 'Selected' : 'Select'}
                  </span>
                </button>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>


      <Dialog
        open={eventDialogOpen}
        onOpenChange={
          setEventDialogOpen
        }
      >

        <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto">

          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingEvent
                ? 'Edit Event'
                : 'Create New Event'}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-3">

            <div className="md:col-span-2">
              <Label>Event Title</Label>

              <Input
                className="mt-2"
                placeholder="Enter event title"
                value={
                  eventForm.title
                }
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    title:
                      e.target.value,
                  })
                }
              />
            </div>

            <div className="md:col-span-2">
              <Label>Description</Label>

              <Textarea
                className="mt-2 min-h-28"
                placeholder="Describe the event..."
                value={
                  eventForm.description
                }
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    description:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Category</Label>

              <Input
                className="mt-2"
                placeholder="Workshop, Seminar..."
                value={
                  eventForm.category
                }
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    category:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Date</Label>

              <Input
                className="mt-2"
                type="date"
                value={
                  eventForm.date
                }
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    date:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Start Time</Label>

              <Input
                className="mt-2"
                type="time"
                value={
                  eventForm.startTime
                }
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    startTime:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>End Time</Label>

              <Input
                className="mt-2"
                type="time"
                value={
                  eventForm.endTime
                }
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    endTime:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Speaker</Label>

              <Input
                className="mt-2"
                placeholder="Speaker name"
                value={
                  eventForm.speaker
                }
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    speaker:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Venue</Label>

              <Input
                className="mt-2"
                placeholder="Auditorium / Lab"
                value={
                  eventForm.venue
                }
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    venue:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Department</Label>

              <Input
                className="mt-2"
                value={
                  eventForm.department
                }
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    department:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Room No</Label>

              <Input
                className="mt-2"
                value={
                  eventForm.roomNo
                }
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    roomNo:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Organizer</Label>

              <Input
                className="mt-2"
                value={
                  eventForm.organizer
                }
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    organizer:
                      e.target.value,
                  })
                }
              />
            </div>


            <div className="md:col-span-2 space-y-3">

              <Label>
                Cover Image
              </Label>

              <Input
                id="event-cover-image"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="hidden"
                onChange={(e) => {

                  const file =
                    e.target.files?.[0]

                  if (!file) return

                  if (
                    file.size >
                    5 * 1024 * 1024
                  ) {
                    toast.error(
                      'Image must be smaller than 5MB'
                    )

                    return
                  }

                  setEventCoverFile(
                    file
                  )

                  const preview =
                    URL.createObjectURL(
                      file
                    )

                  setEventForm({
                    ...eventForm,
                    coverImagePreview:
                      preview,
                  })
                }}
              />

              <label
                htmlFor="event-cover-image"
                className="border-2 border-dashed rounded-2xl p-7 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
              >

                <div className="p-4 rounded-full bg-primary/10 mb-3">
                  <Icons.Image className="h-8 w-8 text-primary" />
                </div>

                <span className="font-semibold">
                  {eventCoverFile
                    ? 'Change Cover Image'
                    : 'Choose Cover Image'}
                </span>

                <span className="text-xs text-muted-foreground mt-1">
                  PNG, JPG or WEBP · Max 5MB
                </span>

              </label>

              {eventForm.coverImagePreview && (
                <div className="relative rounded-2xl overflow-hidden border">

                  <img
                    src={
                      eventForm.coverImagePreview
                    }
                    alt="Event preview"
                    className="w-full h-64 object-cover"
                  />

                  <label
                    htmlFor="event-cover-image"
                    className="absolute bottom-3 right-3 bg-black/70 text-white px-4 py-2 rounded-lg text-sm cursor-pointer backdrop-blur"
                  >
                    <Icons.Edit className="inline h-4 w-4 mr-1" />
                    Change Image
                  </label>

                </div>
              )}

            </div>

            <div className="md:col-span-2 flex items-center gap-3 p-4 rounded-xl bg-muted/50">

              <input
                type="checkbox"
                checked={
                  eventForm.registrationRequired
                }
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    registrationRequired:
                      e.target.checked,
                  })
                }
                className="h-4 w-4"
              />

              <Label>
                Registration required
              </Label>

            </div>

            {eventForm.registrationRequired && (
              <div className="md:col-span-2">
                <Label>
                  Registration Link
                </Label>

                <Input
                  className="mt-2"
                  placeholder="https://..."
                  value={
                    eventForm.registrationLink
                  }
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      registrationLink:
                        e.target.value,
                    })
                  }
                />
              </div>
            )}

          </div>

          <DialogFooter>

            <Button
              variant="outline"
              onClick={() =>
                setEventDialogOpen(
                  false
                )
              }
            >
              Cancel
            </Button>

            <Button
              onClick={saveEvent}
              disabled={loading}
            >
              {loading
                ? 'Uploading...'
                : editingEvent
                ? 'Save Changes'
                : 'Create Event'}
            </Button>

          </DialogFooter>

        </DialogContent>

      </Dialog>


      <Dialog
        open={projectDialogOpen}
        onOpenChange={
          setProjectDialogOpen
        }
      >

        <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto">

          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingProject
                ? 'Edit Project'
                : 'Create New Project'}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-3">

            <div className="md:col-span-2">
              <Label>
                Project Title
              </Label>

              <Input
                className="mt-2"
                placeholder="Project name"
                value={
                  projectForm.title
                }
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    title:
                      e.target.value,
                  })
                }
              />
            </div>

            <div className="md:col-span-2">
              <Label>
                Description
              </Label>

              <Textarea
                className="mt-2 min-h-28"
                placeholder="Describe your project..."
                value={
                  projectForm.description
                }
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    description:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Year</Label>

              <Input
                className="mt-2"
                type="number"
                value={
                  projectForm.year
                }
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    year: Number(
                      e.target.value
                    ),
                  })
                }
              />
            </div>

            <div>
              <Label>
                Categories
              </Label>

              <Input
                className="mt-2"
                placeholder="AI, Web, IoT"
                value={
                  projectForm.category
                }
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    category:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>
                Tech Stack
              </Label>

              <Input
                className="mt-2"
                placeholder="React, Node, MongoDB"
                value={
                  projectForm.techStack
                }
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    techStack:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Team</Label>

              <Input
                className="mt-2"
                placeholder="Member 1, Member 2"
                value={
                  projectForm.team
                }
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    team:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>
                GitHub
              </Label>

              <Input
                className="mt-2"
                placeholder="https://github.com/..."
                value={
                  projectForm.github
                }
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    github:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>
                Demo Link
              </Label>

              <Input
                className="mt-2"
                placeholder="https://..."
                value={
                  projectForm.demo
                }
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    demo:
                      e.target.value,
                  })
                }
              />
            </div>


            <div className="md:col-span-2 space-y-3">

              <Label>
                Project Cover Image
              </Label>

              <Input
                id="project-cover-image"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="hidden"
                onChange={(e) => {

                  const file =
                    e.target.files?.[0]

                  if (!file) return

                  if (
                    file.size >
                    5 * 1024 * 1024
                  ) {
                    toast.error(
                      'Image must be smaller than 5MB'
                    )

                    return
                  }

                  setProjectCoverFile(
                    file
                  )

                  setProjectForm({
                    ...projectForm,
                    coverImagePreview:
                      URL.createObjectURL(
                        file
                      ),
                  })
                }}
              />

              <label
                htmlFor="project-cover-image"
                className="border-2 border-dashed rounded-2xl p-7 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
              >

                <div className="p-4 rounded-full bg-primary/10 mb-3">
                  <Icons.Image className="h-8 w-8 text-primary" />
                </div>

                <span className="font-semibold">
                  {projectCoverFile
                    ? 'Change Project Image'
                    : 'Choose Project Image'}
                </span>

                <span className="text-xs text-muted-foreground mt-1">
                  PNG, JPG or WEBP · Max 5MB
                </span>

              </label>

              {projectForm.coverImagePreview && (
                <div className="relative rounded-2xl overflow-hidden border">

                  <img
                    src={
                      projectForm.coverImagePreview
                    }
                    alt="Project preview"
                    className="w-full h-64 object-cover"
                  />

                  <label
                    htmlFor="project-cover-image"
                    className="absolute bottom-3 right-3 bg-black/70 text-white px-4 py-2 rounded-lg text-sm cursor-pointer backdrop-blur"
                  >
                    <Icons.Edit className="inline h-4 w-4 mr-1" />
                    Change Image
                  </label>

                </div>
              )}

            </div>

            <div className="md:col-span-2 flex items-center gap-3 p-4 rounded-xl bg-muted/50">

              <input
                type="checkbox"
                checked={
                  projectForm.featured
                }
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    featured:
                      e.target.checked,
                  })
                }
                className="h-4 w-4"
              />

              <Label>
                Featured Project
              </Label>

            </div>

          </div>

          <DialogFooter>

            <Button
              variant="outline"
              onClick={() =>
                setProjectDialogOpen(
                  false
                )
              }
            >
              Cancel
            </Button>

            <Button
              onClick={saveProject}
              disabled={loading}
            >
              {loading
                ? 'Uploading...'
                : editingProject
                ? 'Save Changes'
                : 'Create Project'}
            </Button>

          </DialogFooter>

        </DialogContent>

      </Dialog>


      <Dialog
        open={galleryDialogOpen}
        onOpenChange={
          setGalleryDialogOpen
        }
      >

        <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto">

          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingGallery
                ? 'Edit Gallery'
                : 'Create Gallery'}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-3">

            <div className="md:col-span-2">
              <Label>
                Gallery Title
              </Label>

              <Input
                className="mt-2"
                placeholder="Event memories..."
                value={
                  galleryForm.title
                }
                onChange={(e) =>
                  setGalleryForm({
                    ...galleryForm,
                    title:
                      e.target.value,
                  })
                }
              />
            </div>

            <div className="md:col-span-2">
              <Label>
                Description
              </Label>

              <Textarea
                className="mt-2"
                placeholder="Describe this gallery..."
                value={
                  galleryForm.description
                }
                onChange={(e) =>
                  setGalleryForm({
                    ...galleryForm,
                    description:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>
                Category
              </Label>

              <Input
                className="mt-2"
                value={
                  galleryForm.category
                }
                onChange={(e) =>
                  setGalleryForm({
                    ...galleryForm,
                    category:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Date</Label>

              <Input
                className="mt-2"
                type="date"
                value={
                  galleryForm.date
                }
                onChange={(e) =>
                  setGalleryForm({
                    ...galleryForm,
                    date:
                      e.target.value,
                  })
                }
              />
            </div>


            <div className="md:col-span-2 space-y-4">

              <Label>
                Gallery Images
              </Label>

              <Input
                id="gallery-images"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || [])
                  if (files.length) addGalleryFiles(files)
                  e.currentTarget.value = ''
                }}
              />

              <label
                htmlFor="gallery-images"
                className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
              >

                <div className="p-4 rounded-full bg-primary/10 mb-3">
                  <Icons.Image className="h-8 w-8 text-primary" />
                </div>

                <span className="font-semibold">
                  {galleryFiles.length
                    ? 'Add More Images'
                    : editingGallery
                    ? 'Add Images'
                    : 'Choose Gallery Images'}
                </span>

                <span className="text-xs text-muted-foreground mt-1">
                  Select multiple images · Max 5MB each
                </span>

              </label>


              {galleryPreviews.length >
                0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                  {galleryPreviews.map(
                    (
                      src,
                      index
                    ) => (
                      <div
                        key={
                          `${src}-${index}`
                        }
                        className="relative aspect-video rounded-xl overflow-hidden border group"
                      >

                        <img
                          src={src}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />

                        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                          {index + 1}
                        </div>

                        <button
                          type="button"
                          className="absolute bottom-2 right-2 rounded-full bg-destructive p-2 text-white"
                          onClick={() => removePendingGalleryFile(index)}
                          aria-label={`Remove image ${index + 1}`}
                        >
                          <Icons.X className="h-4 w-4" />
                        </button>

                      </div>
                    )
                  )}

                </div>
              )}

            </div>

          </div>

          <DialogFooter>

            <Button
              variant="outline"
              onClick={() =>
                setGalleryDialogOpen(
                  false
                )
              }
            >
              Cancel
            </Button>

            <Button
              onClick={saveGallery}
              disabled={loading}
            >
              {loading
                ? 'Uploading...'
                : editingGallery
                ? 'Save Changes'
                : 'Create Gallery'}
            </Button>

          </DialogFooter>

        </DialogContent>

      </Dialog>

      <Dialog
  open={userDialogOpen}
  onOpenChange={
    setUserDialogOpen
  }
>

  <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto">

    <DialogHeader>

      <DialogTitle className="text-2xl">
        Manage User
      </DialogTitle>

    </DialogHeader>


    <div className="space-y-5 py-4">


      <div>
        <Label>
          Full Name
        </Label>

        <Input
          className="mt-2"
          value={
            userForm.name
          }
          onChange={(e) =>
            setUserForm({
              ...userForm,
              name:
                e.target.value,
            })
          }
        />
      </div>



      <div>
        <Label>
          Email
        </Label>

        <Input
          className="mt-2"
          type="email"
          value={
            userForm.email
          }
          onChange={(e) =>
            setUserForm({
              ...userForm,
              email:
                e.target.value,
            })
          }
        />
      </div>



      <div>
        <Label>
          Phone
        </Label>

        <Input
          className="mt-2"
          value={
            userForm.phone
          }
          onChange={(e) =>
            setUserForm({
              ...userForm,
              phone:
                e.target.value,
            })
          }
        />
      </div>



      <div>

        <Label>
          User Role
        </Label>

     <input
  type="text"
  value={userForm.role}
  onChange={(e) =>
    setUserForm({
      ...userForm,
      role: e.target.value,
    })
  }
  placeholder="Enter role"
  className="mt-2 w-full h-10 rounded-md border bg-background px-3 text-sm"
/>

      </div>



      <div>

        <Label>
          New Password
        </Label>

        <Input
          className="mt-2"
          type="password"
          placeholder="Leave empty to keep current password"
          value={
            userForm.password
          }
          onChange={(e) =>
            setUserForm({
              ...userForm,
              password:
                e.target.value,
            })
          }
        />

        <p className="text-xs text-muted-foreground mt-1">
          Only enter a password if you
          want to change it.
        </p>

      </div>



      <div className="flex items-center justify-between border rounded-xl p-4">

        <div>

          <p className="font-medium">
            Email Verified
          </p>

          <p className="text-xs text-muted-foreground">
            Allow this user to be treated
            as verified.
          </p>

        </div>

        <input
          type="checkbox"
          className="h-5 w-5"
          checked={
            userForm.isVerified
          }
          onChange={(e) =>
            setUserForm({
              ...userForm,
              isVerified:
                e.target.checked,
            })
          }
        />

      </div>



      <div className="flex items-center justify-between border rounded-xl p-4">

        <div>

          <p className="font-medium">
            Account Active
          </p>

          <p className="text-xs text-muted-foreground">
            Disable the account to prevent
            normal access.
          </p>

        </div>

        <input
          type="checkbox"
          className="h-5 w-5"
          checked={
            userForm.isActive
          }
          onChange={(e) =>
            setUserForm({
              ...userForm,
              isActive:
                e.target.checked,
            })
          }
        />

      </div>



      {(userForm.role ===
        'admin' ||
        userForm.role ===
          'president') && (

        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4">

          <p className="font-semibold text-yellow-700 dark:text-yellow-400">
            ⚠️ Privileged Role
          </p>

          <p className="text-sm text-muted-foreground mt-1">
            This user will have administrative
            permissions. Only assign this role
            to trusted users.
          </p>

        </div>

      )}

    </div>


    <DialogFooter>

      <Button
        variant="outline"
        onClick={() =>
          setUserDialogOpen(
            false
          )
        }
      >
        Cancel
      </Button>

      <Button
        onClick={saveUser}
        disabled={loading}
      >
        {loading
          ? 'Saving...'
          : 'Save Changes'}
      </Button>

    </DialogFooter>

  </DialogContent>

</Dialog>

<Dialog
  open={Boolean(selectedQuiz)}
  onOpenChange={(open) => {
    if (!open) {
      setSelectedQuiz(null)
    }
  }}
>
  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">

    <DialogHeader>
      <DialogTitle>
        {selectedQuiz?.title} — Questions
      </DialogTitle>
    </DialogHeader>


    <div className="flex justify-between items-center">

      <p className="text-sm text-muted-foreground">
        {selectedQuiz?.questions?.length || 0}
        {' '}questions
      </p>

      <Button
        onClick={() => {
          resetQuestionForm()
          setQuestionDialogOpen(true)
        }}
      >
        <Icons.Plus className="h-4 w-4 mr-2" />
        Add Question
      </Button>

    </div>


    <div className="space-y-4 mt-4">

      {(selectedQuiz?.questions || []).map(
        (question: any, index: number) => (

          <Card key={question._id}>

            <CardContent className="p-5">

              <div className="flex justify-between gap-4">

                <div className="flex-1">

                  <div className="font-semibold">
                    Q{index + 1}. {question.question}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">

                    {question.options.map(
                      (option: string, i: number) => (

                        <div
                          key={i}
                          className={`p-3 rounded-lg border ${
                            i === question.correctAnswer
                              ? 'border-green-500 bg-green-500/10'
                              : 'bg-muted/30'
                          }`}
                        >
                          {String.fromCharCode(65 + i)}. {option}
                        </div>

                      )
                    )}

                  </div>

                  <div className="mt-3 text-xs text-muted-foreground">
                    Points: {question.points}
                  </div>

                </div>


                <div className="flex gap-2">

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {

                      setEditingQuestion(question)

                      setQuestionForm({
                        question:
                          question.question || '',

                        options:
                          question.options?.length === 4
                            ? question.options
                            : [
                                ...(question.options || []),
                                '',
                                '',
                                '',
                              ].slice(0, 4),

                        correctAnswer:
                          question.correctAnswer ?? 0,

                        points:
                          question.points ?? 10,
                      })

                      setQuestionDialogOpen(true)
                    }}
                  >
                    <Icons.Edit className="h-4 w-4" />
                  </Button>


                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive border-destructive"
                    onClick={() => {
                      if (
                        window.confirm(
                          'Delete this question?'
                        )
                      ) {
                        handleDeleteQuestion(
                          selectedQuiz._id,
                          question._id
                        )
                      }
                    }}
                  >
                    <Icons.X className="h-4 w-4" />
                  </Button>

                </div>

              </div>

            </CardContent>

          </Card>

        )
      )}

    </div>

  </DialogContent>
</Dialog>

<Dialog
  open={quizDialogOpen}
  onOpenChange={setQuizDialogOpen}
>
  <DialogContent className="max-w-2xl">

    <DialogHeader>

      <DialogTitle>
        {editingQuiz
          ? 'Edit Quiz'
          : 'Create New Quiz'}
      </DialogTitle>

    </DialogHeader>


    <div className="space-y-5 py-3">

      <div>
        <Label>Quiz Title</Label>

        <Input
          className="mt-2"
          placeholder="AI Tools & Technologies"
          value={quizForm.title}
          onChange={(e) =>
            setQuizForm({
              ...quizForm,
              title: e.target.value,
            })
          }
        />
      </div>


      <div>
        <Label>Category</Label>

        <Input
          className="mt-2"
          placeholder="AI/ML"
          value={quizForm.category}
          onChange={(e) =>
            setQuizForm({
              ...quizForm,
              category: e.target.value,
            })
          }
        />
      </div>


      <div>
        <Label>Description</Label>

        <Textarea
          className="mt-2"
          placeholder="Describe this quiz..."
          value={quizForm.description}
          onChange={(e) =>
            setQuizForm({
              ...quizForm,
              description: e.target.value,
            })
          }
        />
      </div>


      <div className="grid grid-cols-2 gap-4">

        <div>
          <Label>Difficulty</Label>

          <select
            className="w-full mt-2 h-10 rounded-md border bg-background px-3"
            value={quizForm.difficulty}
            onChange={(e) =>
              setQuizForm({
                ...quizForm,
                difficulty: e.target.value,
              })
            }
          >
            <option value="Easy">
              Easy
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Hard">
              Hard
            </option>
          </select>
        </div>


        <div>
          <Label>Time Limit (minutes)</Label>

          <Input
            className="mt-2"
            type="number"
            min="1"
            value={quizForm.timeLimit}
            onChange={(e) =>
              setQuizForm({
                ...quizForm,
                timeLimit: Number(
                  e.target.value
                ),
              })
            }
          />
        </div>

      </div>


      <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-4">

        <input
          type="checkbox"
          checked={quizForm.isPublished}
          onChange={(e) =>
            setQuizForm({
              ...quizForm,
              isPublished:
                e.target.checked,
            })
          }
          className="h-4 w-4"
        />

        <div>
          <Label>Publish Quiz</Label>

          <p className="text-xs text-muted-foreground">
            Published quizzes are visible to students.
          </p>
        </div>

      </div>

    </div>


    <DialogFooter>

      <Button
        variant="outline"
        onClick={() =>
          setQuizDialogOpen(false)
        }
      >
        Cancel
      </Button>

      <Button
        onClick={saveQuiz}
        disabled={loading}
      >
        {editingQuiz
          ? 'Update Quiz'
          : 'Create Quiz'}
      </Button>

    </DialogFooter>

  </DialogContent>
</Dialog>
<Dialog
  open={questionDialogOpen}
  onOpenChange={setQuestionDialogOpen}
>
  <DialogContent className="max-w-2xl">

    <DialogHeader>

      <DialogTitle>
        {editingQuestion
          ? 'Edit Question'
          : 'Add New Question'}
      </DialogTitle>

    </DialogHeader>


    <div className="space-y-5">

      <div>
        <Label>Question</Label>

        <Textarea
          className="mt-2 min-h-24"
          placeholder="Enter your question..."
          value={questionForm.question}
          onChange={(e) =>
            setQuestionForm({
              ...questionForm,
              question: e.target.value,
            })
          }
        />
      </div>


      <div>

        <Label>Options</Label>

        <div className="space-y-3 mt-2">

          {questionForm.options.map(
            (option, index) => (

              <div
                key={index}
                className="flex gap-2 items-center"
              >

                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                  {String.fromCharCode(
                    65 + index
                  )}
                </div>

                <Input
                  placeholder={`Option ${
                    String.fromCharCode(
                      65 + index
                    )
                  }`}
                  value={option}
                  onChange={(e) => {

                    const options = [
                      ...questionForm.options,
                    ]

                    options[index] =
                      e.target.value

                    setQuestionForm({
                      ...questionForm,
                      options,
                    })
                  }}
                />

              </div>

            )
          )}

        </div>

      </div>


      <div className="grid grid-cols-2 gap-4">

        <div>

          <Label>
            Correct Answer
          </Label>

          <select
            className="w-full mt-2 h-10 rounded-md border bg-background px-3"
            value={
              questionForm.correctAnswer
            }
            onChange={(e) =>
              setQuestionForm({
                ...questionForm,
                correctAnswer:
                  Number(
                    e.target.value
                  ),
              })
            }
          >

            {questionForm.options.map(
              (_, index) => (
                <option
                  key={index}
                  value={index}
                >
                  Option{' '}
                  {String.fromCharCode(
                    65 + index
                  )}
                </option>
              )
            )}

          </select>

        </div>


        <div>

          <Label>
            Points
          </Label>

          <Input
            className="mt-2"
            type="number"
            min="0"
            value={questionForm.points}
            onChange={(e) =>
              setQuestionForm({
                ...questionForm,
                points:
                  Number(
                    e.target.value
                  ),
              })
            }
          />

        </div>

      </div>

    </div>


    <DialogFooter>

      <Button
        variant="outline"
        onClick={() =>
          setQuestionDialogOpen(false)
        }
      >
        Cancel
      </Button>

      <Button
        onClick={saveQuestion}
        disabled={loading}
      >
        {editingQuestion
          ? 'Update Question'
          : 'Add Question'}
      </Button>

    </DialogFooter>

  </DialogContent>
</Dialog>






      <AlertDialog
        open={!!deleteConfirm}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteConfirm(
              null
            )
          }
        }}
      >

        <AlertDialogContentBase>

          <AlertDialogHeader>

            <AlertDialogTitle>
              Delete{' '}
              {deleteConfirm?.type}?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to
              delete "
              {deleteConfirm?.name}
              "? This action cannot be
              undone.
            </AlertDialogDescription>

          </AlertDialogHeader>

          <div className="flex justify-end gap-2">

            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {

                if (
                  deleteConfirm?.type ===
                  'event'
                ) {
                  handleDeleteEvent(
                    deleteConfirm.id
                  )
                }

                if (
  deleteConfirm?.type === 'quiz'
) {
  handleDeleteQuiz(
    deleteConfirm.id
  )
}

                if (
                  deleteConfirm?.type ===
                  'project'
                ) {
                  handleDeleteProject(
                    deleteConfirm.id
                  )
                }

                 if (
                  deleteConfirm?.type ===
                  'user'
                ) {
                  handleDeleteUser(
                    deleteConfirm.id
                  )
                }

                if (
                  deleteConfirm?.type ===
                  'gallery'
                ) {
                  handleDeleteGallery(
                    deleteConfirm.id
                  )
                }

              }}
            >
              Delete
            </AlertDialogAction>

          </div>

        </AlertDialogContentBase>

      </AlertDialog>

    </div>
  )
}

