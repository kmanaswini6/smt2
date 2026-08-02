import { motion, useReducedMotion } from 'framer-motion';
import { Folder, FileCheck2, CopyX, Filter, Database, ScrollText, ShieldCheck } from 'lucide-react';

interface Feature {
  icon: typeof FileCheck2;
  title: string;
  preview: string;
  description: string;
  status: 'Shipped' | 'Beta' | 'Core';
}

const features: Feature[] = [
  {
    icon: FileCheck2,
    title: 'Validation Engine',
    preview: 'email · required · type · regex',
    description: 'Every column is checked against your schema before a row is accepted. Errors are surfaced inline, never silently dropped.',
    status: 'Core',
  },
  {
    icon: CopyX,
    title: 'Duplicate Detection',
    preview: 'fuzzy + exact match',
    description: 'Identifies duplicates across the whole file and against existing records, then merges or flags them for your review.',
    status: 'Core',
  },
  {
    icon: Filter,
    title: 'Smart Coercion',
    preview: 'dates · currency · phones',
    description: 'Normalizes inconsistent formats — dates, currencies, phone numbers — into a single canonical shape your database expects.',
    status: 'Shipped',
  },
  {
    icon: Database,
    title: 'Direct Database Import',
    preview: 'Postgres · MySQL · Snowflake',
    description: 'Validated rows write straight to your warehouse inside a transaction. Nothing commits until every row passes.',
    status: 'Shipped',
  },
  {
    icon: ScrollText,
    title: 'Audit Trail',
    preview: 'every change, signed',
    description: 'Each correction is logged with the original value, the new value, and who approved it — exportable for compliance.',
    status: 'Shipped',
  },
  {
    icon: ShieldCheck,
    title: 'Role Approvals',
    preview: 'reviewer · approver · importer',
    description: 'Separate the people who review from the people who import. Sensitive tables can require a second pair of eyes.',
    status: 'Beta',
  },
];

const statusTone: Record<Feature['status'], string> = {
  Core: 'text-accent border-accent/30 bg-accent-light',
  Shipped: 'text-success border-success/30 bg-success-bg',
  Beta: 'text-warning border-warning/30 bg-warning-bg',
};

const EASE = [0.22, 1, 0.36, 1] as const;

function FolderCard({ feature, index }: { feature: Feature; index: number }) {
  const reduce = useReducedMotion();
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: EASE, delay: (index % 3) * 0.08 }}
      className="group relative"
    >
      {/* folder tab */}
      <div className="relative z-10 mx-4 h-7 rounded-t-lg bg-sidebar border border-b-0 border-border group-hover:bg-accent-light transition-colors duration-300">
        <div className="absolute left-1/2 -translate-x-1/2 -top-px h-px w-10 bg-border" />
      </div>

      {/* folder body — opens on hover via clip-path */}
      <motion.div
        initial={false}
        className="relative -mt-px rounded-lg rounded-tl-none bg-card border border-border shadow-paper paper-grain overflow-hidden transition-shadow duration-300 group-hover:shadow-paper-lg"
      >
        {/* closed state header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border-soft">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sidebar text-ink group-hover:bg-ink group-hover:text-btn-text transition-colors duration-300">
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-semibold text-ink leading-tight">{feature.title}</h3>
          </div>
          <span className={`stamp-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded ${statusTone[feature.status]}`}>
            {feature.status}
          </span>
        </div>

        {/* opens on hover: preview + description revealed by clip-path */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <div className="overflow-hidden">
            <div className="px-5 pt-3.5 pb-4">
              <div className="rounded-md bg-sidebar/70 border border-border-soft px-3 py-2 mb-3">
                <span className="font-mono text-[11px] text-ink-secondary">{feature.preview}</span>
              </div>
              <p className="text-[13.5px] leading-[1.6] text-ink-secondary">{feature.description}</p>
            </div>
          </div>
        </div>

        {/* always-visible collapsed description */}
        <div className="group-hover:hidden px-5 py-4">
          <p className="text-[13.5px] leading-[1.6] text-ink-secondary line-clamp-1">{feature.description}</p>
        </div>
      </motion.div>

      {reduce ? null : (
        <motion.div
          aria-hidden
          initial={false}
          className="pointer-events-none absolute -bottom-1 left-6 right-6 h-3 rounded-full bg-ink/5 blur-md group-hover:bg-ink/10 transition-colors"
        />
      )}
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-editorial px-6 lg:px-10">
        <div className="max-w-2xl mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-mono text-[12px] uppercase tracking-wider text-accent"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
            className="mt-3 text-[32px] sm:text-[40px] leading-[1.1] tracking-tightest font-semibold text-ink text-balance"
          >
            Every file is treated like a document worth reviewing.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
            className="mt-5 text-[16px] leading-[1.65] text-ink-secondary"
          >
            Open a folder to see exactly what happens inside. Nothing runs
            silently — each step is a visible, reviewable action.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {features.map((f, i) => (
            <FolderCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
