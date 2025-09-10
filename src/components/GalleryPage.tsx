// import { useState } from 'react'
// import { Icons } from './Icons'
// import { Button } from './ui/button'
// import { Card, CardContent } from './ui/card'
// import { Badge } from './ui/badge'
// import { ImageWithFallback } from './figma/ImageWithFallback'

// export function GalleryPage() {
//   const [selectedCategory, setSelectedCategory] = useState('all')
//   const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid')

//   const categories = [
//     { id: 'all', name: 'All Photos', icon: Icons.Camera, count: 36 },
//     { id: 'events', name: 'Events', icon: Icons.Calendar, count: 15 },
//     { id: 'workshops', name: 'Workshops', icon: Icons.Users, count: 12 },
//     { id: 'projects', name: 'Projects', icon: Icons.Code, count: 9 },
//     { id: 'awards', name: 'Awards & Recognition', icon: Icons.Award, count: 6 }
//   ]

//   const galleryItems = [
//     {
//       id: 1,
//       title: "AIspire 2.0 Opening Ceremony",
//       category: "events",
//       date: "April 2024",
//       image: "https://images.unsplash.com/photo-1582192904915-d89c7250b235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZSUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NTY0OTYxOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       description: "Grand opening of our flagship recruitment program"
//     },
//     {
//       id: 2,
//       title: "Machine Learning Workshop",
//       category: "workshops",
//       date: "March 2024",
//       image: "https://images.unsplash.com/photo-1753162658596-2ccba5e4246a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc2hvcCUyMHRlYW0lMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc1NjQ5Njg3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       description: "Hands-on ML workshop with industry experts"
//     },
//     {
//       id: 3,
//       title: "Hackathon 2024",
//       category: "events",
//       date: "February 2024",
//       image: "https://images.unsplash.com/photo-1565687981296-535f09db714e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjBjb2RpbmclMjBldmVudHxlbnwxfHx8fDE3NTY0OTY4ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       description: "48-hour coding marathon with amazing projects"
//     },
//     {
//       id: 4,
//       title: "Robotics Project Demo",
//       category: "projects",
//       date: "January 2024",
//       image: "https://images.unsplash.com/photo-1743495851178-56ace672e545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHJvYm90aWNzJTIwcHJvamVjdHxlbnwxfHx8fDE3NTY0OTY4ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       description: "Autonomous navigation robot in action"
//     },
//     {
//       id: 5,
//       title: "Tech Talk Series",
//       category: "events",
//       date: "December 2023",
//       image: "https://images.unsplash.com/photo-1670382417551-d2f1ee29aea4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc2VtaW5hciUyMGF1ZGllbmNlfGVufDF8fHx8MTc1NjQ5Njg5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       description: "Industry insights on future of AI"
//     },
//     {
//       id: 6,
//       title: "Project Presentation Day",
//       category: "projects",
//       date: "November 2023",
//       image: "https://images.unsplash.com/photo-1605778336713-0a7fb1b80c2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMHByb2plY3QlMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzU2NDk2ODk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       description: "Students showcasing their innovative AI projects"
//     },
//     // Additional dummy entries
//     {
//       id: 7,
//       title: "Deep Learning Bootcamp",
//       category: "workshops",
//       date: "October 2023",
//       image: "https://images.unsplash.com/photo-1552581234-26160f608093?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWVwJTIwbGVhcm5pbmclMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NTY0OTY5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       description: "Intensive neural networks training session"
//     },
//     {
//       id: 8,
//       title: "National Award Ceremony",
//       category: "awards",
//       date: "September 2023",
//       image: "https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd2FyZCUyMGNlcmVtb255fGVufDF8fHx8MTc1NjQ5NjkzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       description: "DSAI receives Best Innovation Award"
//     },
//     {
//       id: 9,
//       title: "AI Ethics Workshop",
//       category: "workshops",
//       date: "August 2023",
//       image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpY3MlMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NTY0OTY5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       description: "Discussion on responsible AI development"
//     },
//     {
//       id: 10,
//       title: "Computer Vision Project",
//       category: "projects",
//       date: "July 2023",
//       image: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHZpc2lvbiUyMHByb2plY3R8ZW58MXx8fHwxNzU2NDk2OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       description: "Real-time object detection system demo"
//     },
//     {
//       id: 11,
//       title: "Startup Pitch Competition",
//       category: "events",
//       date: "June 2023",
//       image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwcGl0Y2glMjBjb21wZXRpdGlvbnxlbnwxfHx8fDE3NTY0OTY5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       description: "Students pitching AI-based business ideas"
//     },
//     {
//       id: 12,
//       title: "Research Paper Publication",
//       category: "awards",
//       date: "May 2023",
//       image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMHBhcGVyJTIwcHVibGljYXRpb258ZW58MXx8fHwxNzU2NDk2OTYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//       description: "Our research featured in IEEE conference"
//     }
//   ]

//   const filteredItems = selectedCategory === 'all' 
//     ? galleryItems 
//     : galleryItems.filter(item => item.category === selectedCategory)

//   const getCategoryColor = (category: string) => {
//     switch (category) {
//       case 'events': return 'bg-accent/10 text-accent border-accent/20'
//       case 'workshops': return 'bg-secondary/10 text-secondary border-secondary/20'
//       case 'projects': return 'bg-primary/10 text-primary border-primary/20'
//       case 'awards': return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
//       default: return 'bg-muted text-muted-foreground'
//     }
//   }

//   return (
//     <div className="min-h-screen pt-24 pb-24">
//       {/* Hero Section */}
//       <section className="py-16 px-4">
//         <div className="max-w-7xl mx-auto text-center">
//           <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">Gallery</h1>
//           <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
//             Capturing moments of innovation, collaboration, and achievement. 
//             Explore our journey through photos from events, workshops, projects, and celebrations.
//           </p>
//         </div>
//       </section>

//       {/* Filter and View Controls */}
//       <section className="px-4 mb-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
//             {/* Category Filters */}
//             <div className="flex flex-wrap gap-3">
//               {categories.map((category) => (
//                 <Button
//                   key={category.id}
//                   variant={selectedCategory === category.id ? "default" : "outline"}
//                   onClick={() => setSelectedCategory(category.id)}
//                   className={`${selectedCategory === category.id 
//                     ? 'bg-accent text-accent-foreground' 
//                     : 'border-border hover:border-accent/50'
//                   } transition-all duration-300`}
//                 >
//                   <category.icon className="h-4 w-4 mr-2" />
//                   {category.name}
//                   <Badge variant="secondary" className="ml-2 px-2 py-0.5 text-xs">
//                     {category.count}
//                   </Badge>
//                 </Button>
//               ))}
//             </div>

//             {/* View Mode Toggle */}
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-muted-foreground">View:</span>
//               <Button
//                 variant={viewMode === 'grid' ? 'default' : 'outline'}
//                 size="sm"
//                 onClick={() => setViewMode('grid')}
//               >
//                 <Icons.Grid className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant={viewMode === 'masonry' ? 'default' : 'outline'}
//                 size="sm"
//                 onClick={() => setViewMode('masonry')}
//               >
//                 <Icons.List className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Gallery Grid */}
//       <section className="px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className={`grid gap-6 ${
//             viewMode === 'grid' 
//               ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
//               : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
//           }`}>
//             {filteredItems.map((item, index) => (
//               <Card 
//                 key={item.id} 
//                 className={`group overflow-hidden border-border/50 hover:border-accent/50 transition-all duration-300 hover:glow-accent cursor-pointer ${
//                   viewMode === 'masonry' && index % 3 === 1 ? 'md:row-span-2' : ''
//                 }`}
//               >
//                 <div className="relative overflow-hidden">
//                   <ImageWithFallback
//                     src={item.image}
//                     alt={item.title}
//                     className={`w-full object-cover group-hover:scale-110 transition-transform duration-300 ${
//                       viewMode === 'masonry' && index % 3 === 1 ? 'h-80' : 'h-48'
//                     }`}
//                   />
//                   <div className="absolute top-4 right-4">
//                     <Badge className={getCategoryColor(item.category)}>
//                       {categories.find(c => c.id === item.category)?.name}
//                     </Badge>
//                   </div>
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                   <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
//                     <h3 className="text-white font-semibold mb-1">{item.title}</h3>
//                     <p className="text-white/80 text-sm">{item.description}</p>
//                   </div>
//                 </div>
//                 <CardContent className="p-4">
//                   <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
//                     {item.title}
//                   </h3>
//                   <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
//                   <div className="flex items-center justify-between">
//                     <span className="text-xs text-muted-foreground flex items-center gap-1">
//                       <Icons.Calendar className="h-3 w-3" />
//                       {item.date}
//                     </span>
//                     <Badge variant="outline" className={getCategoryColor(item.category)}>
//                       {categories.find(c => c.id === item.category)?.name}
//                     </Badge>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Load More Button */}
//           <div className="text-center mt-12">
//             <Button 
//               variant="outline" 
//               size="lg"
//               className="border-accent text-accent hover:bg-accent/10"
//             >
//               Load More Photos
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-20 px-4 bg-muted/30 mt-20">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//             <div>
//               <div className="text-3xl font-bold text-accent mb-2">500+</div>
//               <div className="text-muted-foreground">Photos Captured</div>
//             </div>
//             <div>
//               <div className="text-3xl font-bold text-secondary mb-2">25+</div>
//               <div className="text-muted-foreground">Events Documented</div>
//             </div>
//             <div>
//               <div className="text-3xl font-bold text-primary mb-2">15+</div>
//               <div className="text-muted-foreground">Workshops Recorded</div>
//             </div>
//             <div>
//               <div className="text-3xl font-bold text-accent mb-2">50+</div>
//               <div className="text-muted-foreground">Project Showcases</div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

import React from "react";

function GalleryPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-dark-100 text-white">
      <h1 className="text-4xl font-bold">Gallery Page Coming Soon 🚀</h1>
    </div>
  );
}

export default GalleryPage;
