import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FaqItem = { q: string; a: string };

// Native <details>: answers are in the initial HTML and work without JavaScript.
export default function FaqList({ items, className, itemClassName }: { items: FaqItem[]; className?: string; itemClassName?: string }) {
  return (
    <div className={cn('w-full space-y-4', className)}>
      {items.map((item) => (
        <details
          key={item.q}
          className={cn('group border border-border bg-secondary/10 rounded-2xl px-6 open:border-primary/40', itemClassName)}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-lg font-black tracking-tight text-white hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="pb-6 text-lg leading-relaxed text-white/80">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
