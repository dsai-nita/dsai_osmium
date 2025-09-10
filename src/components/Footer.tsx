import { Link } from 'react-router-dom'
import { Icons } from './Icons'
import { Separator } from './ui/separator'
import { SiQuizlet } from "react-icons/si";
import { FaBlog } from "react-icons/fa";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdDeveloperMode } from "react-icons/md";
import { GiRingmaster } from "react-icons/gi"; // example for Founders icon
import { FaClipboardList } from "react-icons/fa"; // example for Quiz & Polls


export function Footer() {
  const currentYear = new Date().getFullYear()

  const navigationLinks = [
    { label: 'Home', path: '/' },
    { label: 'Events', path: '/events' },
    { label: 'Innovations', path: '/innovations' },
    { label: 'DSAI Squad', path: '/squad' },
    { label: 'AIspire', path: '/aispire' },
    { label: 'About Us', path: '/about' },
  ]

  const quickLinks = [
  { icon: SiQuizlet, label: 'Gallery', path: '/gallery' },
  { icon: FaClipboardList, label: 'Quiz & Polls', path: '/quiz' },
  { icon: FaBlog, label: 'Blog', path: '/blog' },
  { icon: AiOutlineQuestionCircle, label: 'FAQ', path: '/faq' },
  { icon: MdDeveloperMode, label: 'Developers', path: '/developers' },
  { icon: GiRingmaster, label: 'Founders', path: '/founders' },
];


  const socialLinks = [
    // { icon: 'Twitter', href: 'https://twitter.com/dsai_club', label: 'Twitter' },
    { icon: 'Instagram', href: 'https://instagram.com/', label: 'Instagram' },
    { icon: 'Linkedin', href: 'https://linkedin.com/company/', label: 'LinkedIn' },
    { icon: 'Github', href: 'https://github.com/dsai-nita', label: 'GitHub' },
    { icon: 'Youtube', href: 'https://youtube.com/@dsaiclub', label: 'YouTube' }
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Grid - 4 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              {/* <div className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-lg p-2"> */}
                {/* <Icons.Brain className="h-full w-full text-accent-foreground" />
                 */}
                 <img className="h-10 w-10" src="./logo.png" alt="dsai_logo"  />
              {/* </div> */}
              <span className="text-2xl font-bold gradient-text">DSAI</span>
            </div>
            <p className=" text-gray-200 text-sm text-foreground mb-6 leading-relaxed">
              A student welfare club of NIT Agartala, working towards the empowerment of students in field of machine learning.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const IconComponent = Icons[social.icon as keyof typeof Icons]
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <IconComponent className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <div className="space-y-3">
              {navigationLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-gray-100 block text-sm text-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-gray-100 block text-sm text-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-1">
            {/* Contact Section */}
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Icons.MapPin className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm text-foreground">
                  <div>SAC Building, NIT Agartala,</div>
                  <div>Jirania, Agartala, Tripura,</div>
                  <div>799046</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icons.Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm text-muted-foreground">+91 7294xxxxxxx</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icons.Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm text-muted-foreground">officialdatascienceaiclub.nita@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {currentYear} DSAI Club. All rights reserved.
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Developed with</span>
            <Icons.Award className="h-4 w-4 text-accent" />
            <span>by</span>
            <Link 
              to="/developers"
              className="font-medium text-accent hover:text-secondary transition-colors"
            >
              DSAI Team
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}