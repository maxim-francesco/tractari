'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Servicii', href: '#servicii' },
    { name: 'Despre noi', href: '#despre' },
    { name: 'Testimoniale', href: '#testimoniale' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-primary font-bold tracking-tight text-lg">TRACTĂRI SIBIU</span>
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Profesional 24/7</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
          <Button variant="default" className="bg-primary hover:bg-primary/90 rounded-full font-bold h-11 px-6 shadow-lg shadow-primary/20" asChild>
            <a href="tel:0700000000">
              <Phone className="w-4 h-4 mr-2" />
              0700 000 000
            </a>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-primary" asChild>
            <a href="tel:0700000000">
              <Phone className="w-5 h-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "absolute top-16 left-0 w-full bg-background border-b border-border transition-all duration-300 overflow-hidden md:hidden",
        isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-lg font-bold py-2 border-b border-border/50 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button className="w-full bg-primary font-bold h-14 text-lg" asChild>
            <a href="tel:0700000000">Sunați Acum: 0700 000 000</a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
