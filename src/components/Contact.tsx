'use client';

import { Phone, MessageCircle, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    window.location.href = `mailto:contact@tractarimasinisibiu.ro?subject=Solicitare Asistenta: ${name}&body=Telefon: ${phone}%0D%0AMesaj: ${message}`;
  };

  return (
    <section id="contact" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase font-headline tracking-tighter">
              Contactați-ne <span className="text-primary">Acum</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Suntem disponibili 24 de ore din 24, 7 zile din 7. Alegeți metoda de contact preferată pentru o intervenție promptă în tot județul Sibiu.
            </p>

            <div className="space-y-8">
              <a href="tel:+40742916370" className="flex items-center gap-6 p-6 rounded-3xl bg-secondary/20 border border-border hover:border-primary transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm uppercase font-black tracking-widest">Sunați acum (24/7)</p>
                  <p className="text-3xl font-black text-white">+40 742 916 370</p>
                </div>
              </a>

              <a href="https://wa.me/40742916370" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-6 rounded-3xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm uppercase font-black tracking-widest">Trimiteți mesaj WhatsApp</p>
                  <p className="text-3xl font-black text-white">WhatsApp Direct</p>
                </div>
              </a>

              <div className="flex flex-col gap-4 text-muted-foreground pl-4">
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="font-bold">contact@tractarimasinisibiu.ro</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-bold">Sibiu, România (Acoperire Județeană)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary/20 p-10 rounded-3xl border border-border">
            <h3 className="text-2xl font-black mb-8 uppercase tracking-tight">Trimiteți un mesaj</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest ml-1">Nume Complet</label>
                <Input name="name" placeholder="Ex: Popescu Andrei" required className="bg-background border-border h-14 rounded-xl focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest ml-1">Număr Telefon</label>
                <Input name="phone" placeholder="Ex: 07xx xxx xxx" type="tel" required className="bg-background border-border h-14 rounded-xl focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest ml-1">Mesaj / Locație</label>
                <Textarea name="message" placeholder="Descrieți problema și locația..." required className="bg-background border-border min-h-[150px] rounded-xl focus:ring-primary" />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-black h-16 rounded-xl text-lg shadow-lg">
                TRIMITEȚI SOLICITAREA <Send className="w-5 h-5 ml-3" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
