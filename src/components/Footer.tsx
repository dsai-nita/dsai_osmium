import { Link } from 'react-router-dom';
import { Heart, Instagram, Linkedin, Github, Youtube, MapPin, Phone, Mail, ClipboardList, BookOpen, HelpCircle, Code, Award } from 'lucide-react';
import { Separator } from './ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { useState, useEffect } from 'react';

// --- HELPER HOOK for RESPONSIVENESS ---
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);
  return matches;
};

// --- MAIN FOOTER COMPONENT ---
export function Footer() {
  const currentYear = new Date().getFullYear();
  const isDesktop = useMediaQuery("(min-width: 768px)"); // md breakpoint

  const navigationLinks = [
    { label: 'Home', path: '/' },
    { label: 'Events', path: '/events' },
    { label: 'Innovations', path: '/innovations' },
    { label: 'DSAI Squad', path: '/squad' },
    { label: 'AIspire', path: '/aispire' },
    { label: 'About Us', path: '/about' },
  ];

  const quickLinks = [
    { icon: Instagram, label: 'Gallery', path: '/gallery' },
    { icon: ClipboardList, label: 'Quiz & Polls', path: '/quiz' },
    { icon: BookOpen, label: 'Blog', path: '/blog' },
    { icon: HelpCircle, label: 'FAQ', path: '/faq' },
    { icon: Code, label: 'Developers', path: '/developers' },
    { icon: Award, label: 'Founders', path: '/founders' },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/dsai-nita', label: 'GitHub' },
    { icon: Youtube, href: 'https://youtube.com/@dsaiclub', label: 'YouTube' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {isDesktop ? (
          // --- DESKTOP VIEW: 4-Column Grid ---
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FooterInfo socialLinks={socialLinks} />
            <FooterLinks title="Navigation" links={navigationLinks} />
            <FooterLinks title="Quick Links" links={quickLinks} showIcons />
            <ContactInfo />
          </div>
        ) : (
          // --- MOBILE VIEW: Info + Accordion ---
          <>
            <FooterInfo socialLinks={socialLinks} />
            <Accordion type="single" collapsible className="w-full mt-8">
              <AccordionItem value="navigation">
                <AccordionTrigger className="font-semibold text-lg">Navigation</AccordionTrigger>
                <AccordionContent><FooterLinks links={navigationLinks} /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="quick-links">
                <AccordionTrigger className="font-semibold text-lg">Quick Links</AccordionTrigger>
                <AccordionContent><FooterLinks links={quickLinks} showIcons /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="contact">
                <AccordionTrigger className="font-semibold text-lg">Contact Us</AccordionTrigger>
                <AccordionContent><ContactInfo /></AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        )}

        <Separator className="my-12 bg-border" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {currentYear} DSAI Club. All rights reserved.
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Developed with ❤️</span>
            {/* <Heart className="h-4 w-4 text-red-500" /> */}
            <span>by the</span>
            <Link to="/developers" className="font-medium text-accent hover:text-accent/80 transition-colors">
              DSAI Tech Team
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- HELPER COMPONENTS to keep the main component clean ---

const FooterInfo = ({ socialLinks }: { socialLinks: {icon: any, href: string, label: string}[]}) => (
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
        <Link to="/" className="flex items-center space-x-3 mb-4">
            <img src="/logo.png" alt="DSAI Logo" className="h-10 w-10 rounded-full object-contain transition-transform group-hover:scale-105" />
            <span className="text-3xl font-bold gradient-text">DSAI</span>
        </Link>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
            A student community of NIT Agartala, fostering learning and innovation in Data Science, AI, and Machine Learning.
        </p>
        <div className="flex space-x-2">
            {socialLinks.map((social) => (
                <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-110"
                aria-label={social.label}
                title={social.label}
                >
                <social.icon className="h-4 w-4" />
                </a>
            ))}
        </div>
    </div>
);

const FooterLinks = ({ title, links, showIcons = false }: { title?: string, links: {path: string, label: string, icon?: any}[], showIcons?: boolean }) => (
    <div>
        {title && <h3 className="font-semibold text-lg text-foreground mb-4 tracking-tight">{title}</h3>}
        <div className="space-y-3">
            {links.map((link) => (
                <Link
                    key={link.label}
                    to={link.path}
                    className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                    {showIcons && link.icon && <link.icon className="h-4 w-4" />}
                    <span>{link.label}</span>
                </Link>
            ))}
        </div>
    </div>
);

const ContactInfo = () => (
    <div>
        <h3 className="font-semibold text-lg text-foreground mb-4 tracking-tight hidden md:block">Contact Us</h3>
        <div className="space-y-4">
            <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                    <div>SAC Building, NIT Agartala,</div>
                    <div>Jirania, Tripura, 799046</div>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm text-muted-foreground">+91 7294xxxxxx</span>
            </div>
            <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <a href="mailto:officialdatascienceaiclub.nita@gmail.com" className="text-sm text-muted-foreground break-all hover:text-accent transition-colors">
                    officialdatascienceaiclub.nita@gmail.com
                </a>
            </div>
        </div>
    </div>
);