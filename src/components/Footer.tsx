import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary/10 pt-20 pb-28 md:pb-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-white font-bold tracking-tight text-xl uppercase">Tractări Sibiu</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Partenerul tău de încredere pentru asistență rutieră și transport auto în Sibiu. Intervenim rapid în tot județul, 24/7.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Servicii</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/tractari-auto-sibiu" className="hover:text-primary transition-colors">Tractări Autoturisme</Link></li>
              <li><Link href="/tractari-auto-sibiu" className="hover:text-primary transition-colors">Tractări SUV & Dubite</Link></li>
              <li><Link href="/depanare-auto-sibiu" className="hover:text-primary transition-colors">Pornire Curent</Link></li>
              <li><Link href="/depanare-auto-sibiu" className="hover:text-primary transition-colors">Depanare Baterie</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+40742916370" className="hover:text-white transition-colors">+40 742 916 370</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:contact@tractarimasinisibiu.ro" className="hover:text-white transition-colors">contact@tractarimasinisibiu.ro</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Sibiu, România (Acoperire Județ)</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Program</h4>
            <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl text-center">
              <div className="text-primary font-black text-2xl mb-1 tracking-tighter">NON-STOP</div>
              <p className="text-muted-foreground text-sm uppercase font-bold tracking-widest">Suntem disponibili 24/7</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Tractări Mașini Sibiu. Toate drepturile rezervate.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
            <Link href="#" className="hover:text-white transition-colors">Confidențialitate</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
