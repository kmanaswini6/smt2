import { motion, useReducedMotion } from 'framer-motion';

interface Note {
  quote: string;
  name: string;
  role: string;
  color: string;
  rotate: number;
}

const notes: Note[] = [
  {
    quote:
      'We cut our monthly onboarding cleanup from three days to under an hour. The audit trail alone sold our security team.',
    name: 'Dana Whitfield',
    role: 'Data Ops Lead, Meridian Group',
    color: 'bg-paper',
    rotate: -3,
  },
  {
    quote:
      'It feels like handing the file to a careful analyst who actually reads it. Duplicates get caught before they ever hit Postgres.',
    name: 'Theo Nakamura',
    role: 'Engineering Manager, Atlas Logistics',
    color: 'bg-accent-light',
    rotate: 2.5,
  },
  {
    quote:
      'The validation rules are versioned and reviewable. That is rare. Our compliance team finally stopped arguing with us about imports.',
    name: 'Priya Raman',
    role: 'Head of Data Governance, Hooli',
    color: 'bg-success-bg',
    rotate: -2,
  },
  {
    quote:
      'Imports roll back if anything fails. No more half-written tables at 2am. I trust this software with important company data.',
    name: 'Marcus Bauer',
    role: 'Platform Engineer, Northwind',
    color: 'bg-warning-bg',
    rotate: 3.5,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Testimonials() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-editorial px-6 lg:px-10">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-[12px] uppercase tracking-wider text-accent">From the field</span>
          <h2 className="mt-3 text-[32px] sm:text-[40px] leading-[1.1] tracking-tightest font-semibold text-ink text-balance">
            Pinned to the board by the teams who use it.
          </h2>
        </div>

        {/* corkboard */}
        <div className="relative rounded-2xl bg-sidebar/60 border border-border p-6 sm:p-10">
          {/* corkboard pins */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.04] rounded-2xl" style={{ backgroundImage: 'radial-gradient(#2A2623 1px, transparent 1px)', backgroundSize: '6px 6px' }} />

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {notes.map((n, i) => (
              <motion.figure
                key={n.name}
                initial={{ opacity: 0, y: 28, rotate: n.rotate * 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: n.rotate }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 2) * 0.1 }}
                whileHover={reduce ? undefined : { y: -4, rotate: 0, transition: { duration: 0.3, ease: EASE } }}
                className={`relative rounded-sm ${n.color} shadow-paper-lg px-5 py-5`}
              >
                {/* push pin */}
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-accent shadow-stamp border border-ink/20" />

                <blockquote className="text-[14.5px] leading-[1.6] text-ink/90">
                  &ldquo;{n.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 pt-3 border-t border-border-soft">
                  <p className="text-[13px] font-semibold text-ink" style={{ fontStyle: 'italic' }}>
                    {n.name}
                  </p>
                  <p className="text-[11.5px] text-ink-secondary mt-0.5">{n.role}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
