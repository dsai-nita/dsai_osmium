import { useState } from 'react'
import { Icons } from './Icons'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useAuth } from '../Context/AuthContext'
import { usersApi } from '../lib/endpoints'
import { toast } from 'sonner'

interface MemberDashboardProps {
  userData: any
}

export function MemberDashboard({ userData }: MemberDashboardProps) {
  const { handleLogout, refreshMe } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [form, setForm] = useState({
    name: userData?.name || '',
    branch: userData?.branch || '',
    year: userData?.year || '',
    github: userData?.github || '',
    linkedin: userData?.linkedin || '',
    bio: userData?.bio || '',
  })

  const joinDate = userData?.createdAt
    ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await usersApi.updateProfile({
        name: form.name,
        branch: form.branch,
        year: form.year ? Number(form.year) : undefined,
        github: form.github,
        linkedin: form.linkedin,
        bio: form.bio,
      })
      await refreshMe()
      toast.success('Profile updated successfully')
      setIsEditing(false)
    } catch (err: any) {
      toast.error('Could not update profile', { description: err?.message })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
       
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Welcome back, {userData?.name}!
            </h1>
            <p className="text-muted-foreground">
              Member since {joinDate} • {userData?.role}
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex gap-3">
            <Button variant="outline" onClick={() => setIsEditing((v) => !v)}>
              <Icons.Users className="h-4 w-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-destructive text-destructive hover:bg-destructive/10"
            >
              <Icons.LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {isEditing && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={form.name} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="branch">Branch</Label>
                <Input id="branch" value={form.branch} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Input id="year" type="number" value={form.year} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="github">GitHub URL</Label>
                <Input id="github" value={form.github} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input id="linkedin" value={form.linkedin} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" value={form.bio} onChange={handleChange} />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="text-center p-6">
            <Icons.Award className="h-8 w-8 text-accent mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Points</h3>
            <p className="text-2xl font-bold gradient-text">{userData?.points ?? 0}</p>
          </Card>
          <Card className="text-center p-6">
            <Icons.Users className="h-8 w-8 text-secondary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Branch</h3>
            <p className="text-sm text-muted-foreground">{userData?.branch || '—'}</p>
          </Card>
          <Card className="text-center p-6">
            <Icons.Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Year</h3>
            <p className="text-sm text-muted-foreground">{userData?.year || '—'}</p>
          </Card>
          <Card className="text-center p-6">
            <Icons.Code className="h-8 w-8 text-accent mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Role</h3>
            <p className="text-sm text-muted-foreground capitalize">{userData?.role}</p>
          </Card>
        </div>

        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full opacity-20 blur-xl"></div>
            <Icons.Brain className="relative h-24 w-24 text-accent mx-auto" />
          </div>

          <h2 className="text-2xl font-bold gradient-text mb-4">
            More Coming Soon
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Your personalized DSAI member experience is being crafted with cutting-edge features.
            This space will soon showcase your projects, achievements, and event participation
            alongside the profile and points you already see above.
          </p>
        </div>
      </div>
    </div>
  )
}
