import Link from 'next/link';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-white font-bold tracking-tight">TRACTĂRI SIBIU</span>
            <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Profesional 24/7</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#servicii" className="text-sm font-medium hover:text-primary transition-colors">Servicii</Link>
          <Link href="#despre" className="text-sm font-medium hover:text-primary transition-colors">Despre noi</Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
          <Button variant="default" className="bg-primary hover:bg-primary/90 rounded-full font-bold h-11 px-6 shadow-lg shadow-primary/20" asChild>
            <a href="tel:0700000000">
              <Phone className="w-4 h-4 mr-2" />
              0700 000 000
            </a>
          </Button>
        </div>

        {/* Mobile Call Button Only */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 rounded-full" asChild>
            <a href="tel:0700000000">
              <Phone className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
