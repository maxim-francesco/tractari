import { ShieldCheck, Clock, Zap, CreditCard } from 'lucide-react';

const stats = [
  { label: 'Ajungem în 20-30 minute', value: 'Răspuns Rapid', icon: Zap },
  { label: '24/7, 365 zile pe an', value: 'Non-Stop', icon: Clock },
  { label: 'Fără costuri ascunse', value: 'Tarife Corecte', icon: CreditCard },
  { label: 'Mașina ta este în siguranță', value: 'Asigurare CMR', icon: ShieldCheck },
];

export default function TrustSignals() {
  return (
    <section className="py-20 bg-secondary/20 border-y border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center mb-4 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(255,107,0,0.1)]">
                <stat.icon className="w-8 h-8 text-primary" aria-hidden="true" />
              </div>
              <div className="text-2xl md:text-3xl font-black mb-1 font-headline uppercase tracking-tight">{stat.value}</div>
              <div className="text-muted-foreground font-bold text-xs md:text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
