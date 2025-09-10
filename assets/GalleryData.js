const galleryItems = [
    {
        id: 1,
        title: "AIspire 2.0 Opening Ceremony",
        category: "events",
        date: "April 2024",
        image: "https://images.unsplash.com/photo-1582192904915-d89c7250b235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZSUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NTY0OTYxOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Grand opening of our flagship recruitment program"
    },
    {
        id: 2,
        title: "Machine Learning Workshop",
        category: "workshops",
        date: "March 2024",
        image: "https://images.unsplash.com/photo-1753162658596-2ccba5e4246a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc2hvcCUyMHRlYW0lMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc1NjQ5Njg3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Hands-on ML workshop with industry experts"
    },
    {
        id: 3,
        title: "Hackathon 2024",
        category: "events",
        date: "February 2024",
        image: "https://images.unsplash.com/photo-1565687981296-535f09db714e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjBjb2RpbmclMjBldmVudHxlbnwxfHx8fDE3NTY0OTY4ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "48-hour coding marathon with amazing projects"
    },
    {
        id: 4,
        title: "Robotics Project Demo",
        category: "projects",
        date: "January 2024",
        image: "https://images.unsplash.com/photo-1743495851178-56ace672e545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHJvYm90aWNzJTIwcHJvamVjdHxlbnwxfHx8fDE3NTY0OTY4ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Autonomous navigation robot in action"
    },
    {
        id: 5,
        title: "Tech Talk Series",
        category: "events",
        date: "December 2023",
        image: "https://images.unsplash.com/photo-1670382417551-d2f1ee29aea4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc2VtaW5hciUyMGF1ZGllbmNlfGVufDF8fHx8MTc1NjQ5Njg5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Industry insights on future of AI"
    },
    {
        id: 6,
        title: "Project Presentation Day",
        category: "projects",
        date: "November 2023",
        image: "https://images.unsplash.com/photo-1605778336713-0a7fb1b80c2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMHByb2plY3QlMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzU2NDk2ODk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Students showcasing their innovative AI projects"
    },
    // Additional dummy entries
    {
        id: 7,
        title: "Deep Learning Bootcamp",
        category: "workshops",
        date: "October 2023",
        image: "https://images.unsplash.com/photo-1552581234-26160f608093?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWVwJTIwbGVhcm5pbmclMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NTY0OTY5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Intensive neural networks training session"
    },
    {
        id: 8,
        title: "National Award Ceremony",
        category: "awards",
        date: "September 2023",
        image: "https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd2FyZCUyMGNlcmVtb255fGVufDF8fHx8MTc1NjQ5NjkzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "DSAI receives Best Innovation Award"
    },
    {
        id: 9,
        title: "AI Ethics Workshop",
        category: "workshops",
        date: "August 2023",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpY3MlMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NTY0OTY5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Discussion on responsible AI development"
    },
    {
        id: 10,
        title: "Computer Vision Project",
        category: "projects",
        date: "July 2023",
        image: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHZpc2lvbiUyMHByb2plY3R8ZW58MXx8fHwxNzU2NDk2OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Real-time object detection system demo"
    },
    {
        id: 11,
        title: "Startup Pitch Competition",
        category: "events",
        date: "June 2023",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwcGl0Y2glMjBjb21wZXRpdGlvbnxlbnwxfHx8fDE3NTY0OTY5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Students pitching AI-based business ideas"
    },
    {
        id: 12,
        title: "Research Paper Publication",
        category: "awards",
        date: "May 2023",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMHBhcGVyJTIwcHVibGljYXRpb258ZW58MXx8fHwxNzU2NDk2OTYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Our research featured in IEEE conference"
    }
]
export default galleryItems;