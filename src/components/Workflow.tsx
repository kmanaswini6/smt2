import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { FileDown, ArrowRight, Stamp, CopyX, CheckCheck, Database } from 'lucide-react';

interface Stage {
  icon: typeof FileDown;
  label: string;
  detail: string;
}

const stages: Stage[] = [
  { icon: FileDown, label: 'CSV arrives', detail: 'File dropped into the inbox tray' },
  { icon: ArrowRight, label: 'Paper moves', detail: 'Routed to the validation desk' },
  { icon: Stamp, label: 'Validation stamp', detail: 'Each row checked against schema' },
  { icon: CopyX, label: 'Duplicate review', detail: 'Matches flagged for a human eye' },
  { icon: CheckCheck, label: 'Approval stamp', detail: 'Reviewer signs off the batch' },
  { icon: Database, label: 'Database cabinet', detail: 'Committed in a single transaction' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Workflow() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.2'],
  });

  // Move the desk horizontally as the user scrolls.
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-62%']);

  return (
    <section id="workflow" ref={ref} className="relative py-24 lg:py-32 bg-sidebar/40 border-y border-border-soft overflow-hidden">
      <div className="mx-auto max-w-editorial px-6 lg:px-10 mb-14">
        <div className="max-w-2xl">
          <span className="font-mono text-[12px] uppercase tracking-wider text-accent">The workflow</span>
          <h2 className="mt-3 text-[32px] sm:text-[40px] leading-[1.1] tracking-tightest font-semibold text-ink text-balance">
            Like documents moving through a business process.
          </h2>
          <p className="mt-5 text-[16px] leading-[1.65] text-ink-secondary">
            Scroll to walk a file from the inbox tray to the database cabinet.
            Each stage is a physical step on the desk.
          </p>
        </div>
      </div>

      {/* desk surface with horizontal track */}
      <div className="relative">
        {/* desk edge */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-border" />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3px] bg-border-soft" />

        <motion.div
          style={reduce ? undefined : { x }}
          className="flex items-stretch gap-8 px-6 lg:px-10 will-change-transform"
        >
          {stages.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="relative flex-shrink-0 w-[280px] sm:w-[320px]">
                {/* connector */}
                {i < stages.length - 1 && (
                  <div className="absolute top-1/2 -right-8 h-px w-8 bg-border" />
                )}

                <motion.div
                  initial={{ opacity: 0, y: 30, rotate: -1 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
                  className="relative rounded-lg bg-card border border-border shadow-paper paper-grain"
                >
                  {/* step number tab */}
                  <div className="absolute -top-3 left-5 rounded-md bg-ink text-btn-text text-[11px] font-mono font-semibold px-2 py-0.5">
                    Step {i + 1}
                  </div>

                  <div className="px-5 pt-6 pb-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-sidebar text-ink mb-4">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <h3 className="text-[16px] font-semibold text-ink">{s.label}</h3>
                    <p className="mt-1.5 text-[13px] leading-[1.55] text-ink-secondary">{s.detail}</p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* scroll hint */}
        <div className="mx-auto max-w-editorial px-6 lg:px-10 mt-10 flex items-center gap-2 text-[12px] text-ink-secondary/70">
          <span className="font-mono">scroll</span>
          <span className="h-px w-12 bg-border" />
          <span>documents move left to right</span>
        </div>
      </div>
    </section>
  );
}
