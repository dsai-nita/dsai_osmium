// import { useState } from 'react'
// import { Calendar, Clock, User, ArrowRight, Search, Tag, Heart, Share2, BookOpen } from 'lucide-react'
// import { Button } from './ui/button'
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
// import { Input } from './ui/input'
// import { Badge } from './ui/badge'
// import { ImageWithFallback } from './figma/ImageWithFallback'
// import { FloatingKeywords } from './FloatingKeywords'

// interface BlogPost {
//   id: string
//   title: string
//   excerpt: string
//   content: string
//   author: string
//   date: string
//   readTime: string
//   image: string
//   tags: string[]
//   category: string
//   likes: number
//   featured: boolean
// }

// export function BlogPage() {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [selectedCategory, setSelectedCategory] = useState('All')
//   const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

//   const blogPosts: BlogPost[] = [
//     {
//       id: '1',
//       title: 'The Future of Artificial Intelligence in Healthcare',
//       excerpt: 'Exploring how AI is revolutionizing medical diagnosis, treatment, and patient care in modern healthcare systems.',
//       content: 'Artificial Intelligence is transforming healthcare in unprecedented ways. From early disease detection to personalized treatment plans, AI technologies are enabling medical professionals to provide better care and improve patient outcomes...',
//       author: 'Dr. Sarah Johnson',
//       date: '2025-01-15',
//       readTime: '8 min read',
//       image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
//       tags: ['AI', 'Healthcare', 'Machine Learning', 'Technology'],
//       category: 'Healthcare AI',
//       likes: 156,
//       featured: true
//     },
//     {
//       id: '2',
//       title: 'Getting Started with Machine Learning: A Beginner\'s Guide',
//       excerpt: 'Complete roadmap for beginners to start their journey in machine learning with practical examples and resources.',
//       content: 'Machine Learning might seem daunting at first, but with the right approach and resources, anyone can master the fundamentals. This comprehensive guide will take you through the essential concepts...',
//       author: 'Arjun Sharma',
//       date: '2025-01-12',
//       readTime: '12 min read',
//       image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop',
//       tags: ['Machine Learning', 'Tutorial', 'Beginner', 'Python'],
//       category: 'Education',
//       likes: 243,
//       featured: true
//     },
//     {
//       id: '3',
//       title: 'Computer Vision Applications in Smart Cities',
//       excerpt: 'How computer vision technology is being used to create smarter, more efficient urban environments.',
//       content: 'Smart cities are leveraging computer vision to solve complex urban challenges. From traffic management to public safety, these technologies are making cities more livable...',
//       author: 'Priya Patel',
//       date: '2025-01-10',
//       readTime: '6 min read',
//       image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&h=400&fit=crop',
//       tags: ['Computer Vision', 'Smart Cities', 'Urban Tech', 'AI'],
//       category: 'Technology',
//       likes: 89,
//       featured: false
//     },
//     {
//       id: '4',
//       title: 'Data Science in Climate Change Research',
//       excerpt: 'Utilizing big data and analytics to understand and combat climate change through innovative research methods.',
//       content: 'Climate change research has been revolutionized by data science techniques. Researchers are now able to analyze vast amounts of environmental data to predict climate patterns...',
//       author: 'Dr. Michael Chen',
//       date: '2025-01-08',
//       readTime: '10 min read',
//       image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=400&fit=crop',
//       tags: ['Data Science', 'Climate Change', 'Research', 'Environment'],
//       category: 'Research',
//       likes: 198,
//       featured: false
//     },
//     {
//       id: '5',
//       title: 'Building Your First Neural Network with TensorFlow',
//       excerpt: 'Step-by-step tutorial on creating and training your first neural network using TensorFlow and Python.',
//       content: 'Neural networks are the backbone of modern AI applications. In this hands-on tutorial, we\'ll build a neural network from scratch using TensorFlow...',
//       author: 'Rahul Mehta',
//       date: '2025-01-05',
//       readTime: '15 min read',
//       image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
//       tags: ['Neural Networks', 'TensorFlow', 'Deep Learning', 'Tutorial'],
//       category: 'Technical',
//       likes: 312,
//       featured: true
//     },
//     {
//       id: '6',
//       title: 'The Ethics of Artificial Intelligence',
//       excerpt: 'Discussing the moral implications and ethical considerations in AI development and deployment.',
//       content: 'As AI becomes more prevalent in our daily lives, it\'s crucial to address the ethical implications of these technologies. This article explores key ethical challenges...',
//       author: 'Dr. Lisa Wang',
//       date: '2025-01-03',
//       readTime: '9 min read',
//       image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop',
//       tags: ['AI Ethics', 'Philosophy', 'Technology', 'Society'],
//       category: 'Ethics',
//       likes: 176,
//       featured: false
//     }
//   ]

//   const categories = ['All', 'Healthcare AI', 'Education', 'Technology', 'Research', 'Technical', 'Ethics']

//   const filteredPosts = blogPosts.filter(post => {
//     const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
//     const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
//     return matchesSearch && matchesCategory
//   })

//   const featuredPosts = blogPosts.filter(post => post.featured)

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     })
//   }

//   if (selectedPost) {
//     return (
//       <div className="min-h-screen pt-24 pb-24">
//         {/* Back Button */}
//         <div className="container mx-auto px-6 mb-8">
//           <Button
//             variant="outline"
//             onClick={() => setSelectedPost(null)}
//             className="border-accent text-accent hover:bg-accent/10"
//           >
//             ← Back to Blog
//           </Button>
//         </div>

//         {/* Article Content */}
//         <article className="container mx-auto px-6 max-w-4xl">
//           <div className="mb-8">
//             <ImageWithFallback
//               src={selectedPost.image}
//               alt={selectedPost.title}
//               className="w-full h-64 md:h-96 object-cover rounded-lg"
//             />
//           </div>

//           <div className="mb-8">
//             <div className="flex flex-wrap gap-2 mb-4">
//               {selectedPost.tags.map((tag, index) => (
//                 <Badge key={index} variant="outline" className="border-accent/30 text-accent">
//                   {tag}
//                 </Badge>
//               ))}
//             </div>

//             <h1 className="text-3xl md:text-4xl font-bold mb-4">{selectedPost.title}</h1>

//             <div className="flex items-center gap-6 text-muted-foreground mb-6">
//               <div className="flex items-center gap-2">
//                 <User className="h-4 w-4" />
//                 <span>{selectedPost.author}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Calendar className="h-4 w-4" />
//                 <span>{formatDate(selectedPost.date)}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Clock className="h-4 w-4" />
//                 <span>{selectedPost.readTime}</span>
//               </div>
//             </div>

//             <div className="flex items-center gap-4 mb-8">
//               <Button variant="outline" size="sm" className="gap-2">
//                 <Heart className="h-4 w-4" />
//                 {selectedPost.likes}
//               </Button>
//               <Button variant="outline" size="sm" className="gap-2">
//                 <Share2 className="h-4 w-4" />
//                 Share
//               </Button>
//             </div>
//           </div>

//           <div className="prose prose-lg max-w-none text-foreground">
//             <p className="text-lg text-muted-foreground mb-6">{selectedPost.excerpt}</p>
//             <div className="space-y-4">
//               {selectedPost.content.split('\n\n').map((paragraph, index) => (
//                 <p key={index}>{paragraph}</p>
//               ))}
//             </div>
//           </div>
//         </article>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen pt-24 pb-24 relative overflow-hidden">
//       <FloatingKeywords count={12} area="full" opacity={0.1} />
      
//       {/* Hero Section */}
//       <section className="py-16 relative">
//         <div className="container mx-auto px-6 relative z-10">
//           <div className="text-center mb-16">
//             <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
//               DSAI Blog
//             </h1>
//             <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//               Insights, tutorials, and thoughts on artificial intelligence, data science, 
//               and the future of technology from our community of researchers and practitioners.
//             </p>
//           </div>

//           {/* Search and Filter */}
//           <div className="max-w-4xl mx-auto mb-12">
//             <div className="flex flex-col md:flex-row gap-4 mb-6">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search articles..."
//                   className="pl-10"
//                 />
//               </div>
//             </div>

//             {/* Categories */}
//             <div className="flex flex-wrap gap-2">
//               {categories.map((category) => (
//                 <Button
//                   key={category}
//                   variant={selectedCategory === category ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setSelectedCategory(category)}
//                   className={selectedCategory === category ? "bg-accent text-accent-foreground" : ""}
//                 >
//                   {category}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Articles */}
//       {selectedCategory === 'All' && (
//         <section className="py-16 bg-muted/30">
//           <div className="container mx-auto px-6">
//             <div className="flex items-center gap-2 mb-8">
//               <BookOpen className="h-6 w-6 text-accent" />
//               <h2 className="text-2xl font-bold">Featured Articles</h2>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               {featuredPosts.slice(0, 2).map((post) => (
//                 <Card key={post.id} className="border-border/50 hover:border-accent/50 transition-all duration-300 hover:glow-accent cursor-pointer group">
//                   <div className="relative overflow-hidden rounded-t-lg">
//                     <ImageWithFallback
//                       src={post.image}
//                       alt={post.title}
//                       className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                     <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
//                       Featured
//                     </Badge>
//                   </div>
//                   <CardHeader>
//                     <div className="flex flex-wrap gap-2 mb-3">
//                       {post.tags.slice(0, 3).map((tag, index) => (
//                         <Badge key={index} variant="outline" className="border-accent/30 text-accent text-xs">
//                           {tag}
//                         </Badge>
//                       ))}
//                     </div>
//                     <CardTitle className="text-lg group-hover:text-accent transition-colors">
//                       {post.title}
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-muted-foreground mb-4">{post.excerpt}</p>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                         <span>{post.author}</span>
//                         <span>{formatDate(post.date)}</span>
//                         <span>{post.readTime}</span>
//                       </div>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => setSelectedPost(post)}
//                         className="text-accent hover:text-accent/80"
//                       >
//                         Read More <ArrowRight className="ml-1 h-4 w-4" />
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* All Articles */}
//       <section className="py-16">
//         <div className="container mx-auto px-6">
//           <h2 className="text-2xl font-bold mb-8">
//             {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredPosts.map((post) => (
//               <Card key={post.id} className="border-border/50 hover:border-accent/50 transition-all duration-300 hover:glow-accent cursor-pointer group">
//                 <div className="relative overflow-hidden rounded-t-lg">
//                   <ImageWithFallback
//                     src={post.image}
//                     alt={post.title}
//                     className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                   {post.featured && (
//                     <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs">
//                       Featured
//                     </Badge>
//                   )}
//                 </div>
//                 <CardHeader>
//                   <div className="flex flex-wrap gap-1 mb-3">
//                     {post.tags.slice(0, 2).map((tag, index) => (
//                       <Badge key={index} variant="outline" className="border-accent/30 text-accent text-xs">
//                         {tag}
//                       </Badge>
//                     ))}
//                   </div>
//                   <CardTitle className="text-lg group-hover:text-accent transition-colors line-clamp-2">
//                     {post.title}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                       <span>{post.author}</span>
//                       <span>•</span>
//                       <span>{post.readTime}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="flex items-center gap-1 text-xs text-muted-foreground">
//                         <Heart className="h-3 w-3" />
//                         {post.likes}
//                       </div>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => setSelectedPost(post)}
//                         className="text-accent hover:text-accent/80 p-1"
//                       >
//                         <ArrowRight className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {filteredPosts.length === 0 && (
//             <div className="text-center py-16">
//               <div className="text-muted-foreground mb-4">
//                 <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
//                 <p className="text-lg">No articles found matching your criteria.</p>
//                 <p className="text-sm">Try adjusting your search or category filter.</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Newsletter Signup */}
//       <section className="py-24 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(100,255,218,0.1),transparent_70%)]" />
//         <FloatingKeywords count={8} area="full" opacity={0.2} />
//         <div className="container mx-auto px-6 text-center relative z-10">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
//           <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
//             Subscribe to our newsletter to get the latest articles, tutorials, 
//             and insights delivered straight to your inbox.
//           </p>

//           <div className="max-w-md mx-auto flex gap-3">
//             <Input
//               type="email"
//               placeholder="Enter your email"
//               className="bg-background border-border focus:border-accent"
//             />
//             <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
//               Subscribe
//             </Button>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }
import React from "react";

function BlogPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-dark-100 text-white">
      <h1 className="text-4xl font-bold">Blog Page Coming Soon 🚀</h1>
    </div>
  );
}

export default BlogPage;
