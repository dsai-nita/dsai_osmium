import { Icons } from './Icons'
import { Button } from './ui/button'
import { useAuth } from '../App'

interface MemberDashboardProps {
  userData: any
}

export function MemberDashboard({ userData }: MemberDashboardProps) {
  const { handleLogout } = useAuth()

  return (
    <div className="min-h-screen pt-24 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Welcome back, {userData.name}!
            </h1>
            <p className="text-muted-foreground">
              Member since {userData.joinDate} • {userData.role}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
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

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full opacity-20 blur-xl"></div>
            <Icons.Brain className="relative h-24 w-24 text-accent mx-auto" />
          </div>
          
          <h2 className="text-2xl font-bold gradient-text mb-4">
            Member Dashboard
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Your personalized DSAI member experience is being crafted with cutting-edge features. 
            This space will soon showcase your projects, achievements, event participation, 
            and exclusive member benefits.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full max-w-4xl">
            <div className="p-6 rounded-lg border border-border bg-card/50 text-center">
              <Icons.Code className="h-8 w-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Projects</h3>
              <p className="text-sm text-muted-foreground">Track your work</p>
            </div>
            
            <div className="p-6 rounded-lg border border-border bg-card/50 text-center">
              <Icons.Calendar className="h-8 w-8 text-secondary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Events</h3>
              <p className="text-sm text-muted-foreground">Your participation</p>
            </div>
            
            <div className="p-6 rounded-lg border border-border bg-card/50 text-center">
              <Icons.Award className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Achievements</h3>
              <p className="text-sm text-muted-foreground">Your progress</p>
            </div>
            
            <div className="p-6 rounded-lg border border-border bg-card/50 text-center">
              <Icons.Users className="h-8 w-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Community</h3>
              <p className="text-sm text-muted-foreground">Member network</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}