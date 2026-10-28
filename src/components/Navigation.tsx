'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/site';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Servicii', href: '/#servicii' },
    { name: 'Acoperire', href: '/#coverage' },
    { name: 'FAQ', href: '/intrebari-frecvente' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border" aria-label="Navigare principală">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" aria-label="Tractări Sibiu - Pagina principală">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-primary font-bold tracking-tight text-lg uppercase">TRACTĂRI SIBIU</span>
            <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Profesional 24/7</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={cn(
                "text-sm font-bold hover:text-primary transition-colors uppercase tracking-wider",
                pathname === link.href ? "text-primary" : "text-white"
              )}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.name}
            </Link>
          ))}
          <Button variant="default" className="bg-primary hover:bg-primary/90 rounded-full font-bold h-11 px-6 shadow-lg shadow-primary/20" asChild>
            <a href={PHONE_HREF} data-cta="nav-desktop" aria-label={`Sună la ${PHONE_DISPLAY}`}>
              <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-primary" asChild>
            <a href={PHONE_HREF} data-cta="nav-mobile" aria-label={`Sună acum la ${PHONE_DISPLAY}`}>
              <Phone className="w-5 h-5" aria-hidden="true" />
            </a>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        id="mobile-menu"
        className={cn(
          "absolute top-16 left-0 w-full bg-background border-b border-border transition-all duration-300 overflow-hidden lg:hidden",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={cn(
                "text-lg font-bold py-2 border-b border-border/50 hover:text-primary",
                pathname === link.href ? "text-primary" : "text-white"
              )}
              onClick={() => setIsMenuOpen(false)}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.name}
            </Link>
          ))}
          <Button className="w-full bg-primary font-bold h-14 text-lg" asChild>
            <a href={PHONE_HREF} data-cta="nav-menu">Sună: {PHONE_DISPLAY}</a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
