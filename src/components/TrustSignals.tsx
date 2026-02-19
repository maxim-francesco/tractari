import { Shield, Clock, Award, Users } from 'lucide-react';

const stats = [
  { label: 'Ani Experiență', value: '10+', icon: Award },
  { label: 'Tractări Finalizate', value: '5000+', icon: Shield },
  { label: 'Clienți Mulțumiți', value: '4800+', icon: Users },
  { label: 'Disponibilitate', value: '100%', icon: Clock },
];

export default function TrustSignals() {
  return (
    <section className="py-20 bg-secondary/20 border-y border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center mb-4 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(255,107,0,0.1)]">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-black mb-1 font-headline">{stat.value}</div>
              <div className="text-muted-foreground font-medium text-sm md:text-base uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
