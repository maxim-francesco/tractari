import Link from 'next/link';
import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CookieSettingsButton } from '@/components/ConsentBanner';
import { CUI, LEGAL_NAME, PHONE_DISPLAY, PHONE_HREF, REG_COM, WHATSAPP_URL } from '@/lib/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background pt-20 pb-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Column 1 - Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                <span className="text-white font-bold text-xl uppercase">T</span>
              </div>
              <span className="text-primary font-bold tracking-tight text-xl uppercase">RDL TRACTĂRI AUTO SIBIU</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed mb-8 font-medium">
              Tractări auto și asistență rutieră în Sibiu, împrejurimi și pe A1. Preluăm apeluri non-stop.
            </p>
            <div className="space-y-4">
              <a href={PHONE_HREF} data-cta="footer" className="flex items-center gap-3 text-white hover:text-primary transition-colors font-black text-lg tracking-tight">
                <Phone className="w-5 h-5 text-primary" /> {PHONE_DISPLAY}
              </a>
              <Button size="sm" className="bg-[#25D366] hover:bg-[#25D366]/90 text-white font-black rounded-xl h-10 px-6" asChild>
                <a href={WHATSAPP_URL} data-cta="footer" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Column 2 - Services: every page links to the money pages with descriptive anchors */}
          <nav aria-label="Servicii">
            <h4 className="font-black text-white uppercase tracking-widest text-sm mb-8">Servicii</h4>
            <ul className="space-y-4 font-bold uppercase tracking-wider text-xs text-muted-foreground">
              <li><Link href="/tractari-auto-sibiu" className="hover:text-primary transition-colors">Tractări auto Sibiu</Link></li>
              <li><Link href="/asistenta-rutiera-sibiu" className="hover:text-primary transition-colors">Asistență rutieră Sibiu</Link></li>
              <li><Link href="/depanare-auto-sibiu" className="hover:text-primary transition-colors">Depanare auto Sibiu</Link></li>
              <li><Link href="/transport-auto-sibiu" className="hover:text-primary transition-colors">Transport auto pe platformă</Link></li>
            </ul>
          </nav>

          {/* Column 3 - Navigation */}
          <nav aria-label="Navigare footer">
            <h4 className="font-black text-white uppercase tracking-widest text-sm mb-8">Navigare Rapidă</h4>
            <ul className="space-y-4 font-bold uppercase tracking-wider text-xs text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Acasă</Link></li>
              <li><Link href="/#servicii" className="hover:text-primary transition-colors">Servicii</Link></li>
              <li><Link href="/#coverage" className="hover:text-primary transition-colors">Zone Acoperite</Link></li>
              <li><Link href="/intrebari-frecvente" className="hover:text-primary transition-colors">Întrebări Frecvente</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </nav>

          {/* Column 3 - Legal */}
          <div>
            <h4 className="font-black text-white uppercase tracking-widest text-sm mb-8">Informații Legale</h4>
            <ul className="space-y-4 font-bold uppercase tracking-wider text-xs text-muted-foreground">
              <li><Link href="/politica-de-confidentialitate" className="hover:text-primary transition-colors">Politică de Confidențialitate</Link></li>
              <li><Link href="/termeni-si-conditii" className="hover:text-primary transition-colors">Termeni și Condiții</Link></li>
              <li><Link href="/politica-cookies" className="hover:text-primary transition-colors">Politică Cookies</Link></li>
              <li><Link href="/anpc" className="hover:text-primary transition-colors">ANPC</Link></li>
              <li><CookieSettingsButton className="font-bold uppercase tracking-wider text-xs hover:text-primary transition-colors" /></li>
            </ul>
            <div className="mt-8 pt-6 border-t border-border/50 text-[10px] text-muted-foreground space-y-1 font-bold uppercase tracking-widest">
              <p>CUI: {CUI}</p>
              <p>Reg. Com.: {REG_COM}</p>
              <p>{LEGAL_NAME}</p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground text-center md:text-left">
            © {currentYear} {LEGAL_NAME} Toate drepturile rezervate.
          </p>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
            Construit și proiectat de Francesco Maxim | +40758990675
          </div>
        </div>
      </div>
    </footer>
  );
}
