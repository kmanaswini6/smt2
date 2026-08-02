import { motion, useReducedMotion } from 'framer-motion';
import { usePaperCursor } from '@/hooks/usePaperCursor';

/* ---------- shared motion variants ---------- */

const EASE = [0.22, 1, 0.36, 1] as const;

function sheet(initial: { x: number; y: number; rotate: number }) {
  return {
    initial: { x: initial.x, y: initial.y, rotate: initial.rotate, opacity: 0 },
    animate: { x: 0, y: 0, rotate: initial.rotate * 0.15, opacity: 1 },
    transition: { duration: 0.9, ease: EASE },
  };
}

/* ---------- small UI atoms ---------- */

function ValidationBadge({
  label,
  tone,
  delay,
}: {
  label: string;
  tone: 'success' | 'warning' | 'error';
  delay: number;
}) {
  const tones = {
    success: 'text-success border-success/40 bg-success-bg',
    warning: 'text-warning border-warning/40 bg-warning-bg',
    error: 'text-error border-error/40 bg-error-bg',
  };
  return (
    <motion.span
      initial={{ scale: 2.4, opacity: 0, rotate: -14 }}
      animate={{ scale: 1, opacity: 1, rotate: -3 }}
      transition={{ delay, duration: 0.45, ease: EASE }}
      className={`inline-flex items-center gap-1 rounded-md stamp-border px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider ${tones[tone]}`}
    >
      {label}
    </motion.span>
  );
}

/* ---------- CSV preview sheet ---------- */

const csvRows = [
  { id: 'C-1042', name: 'Atlas Logistics', email: 'ops@atlas.co', status: 'valid' },
  { id: 'C-1043', name: 'Atlas Logistics', email: 'ops@atlas.co', status: 'duplicate' },
  { id: 'C-1044', name: 'Meridian Group', email: 'billing@meridian.com', status: 'valid' },
  { id: 'C-1045', name: 'Northwind Traders', email: 'accounts@northwind', status: 'fixed' },
  { id: 'C-1046', name: 'Globex Inc', email: 'ap@globex.io', status: 'valid' },
];

function CsvSheet() {
  return (
    <motion.div
      {...sheet({ x: -60, y: 40, rotate: -4 })}
      data-paper-layer
      data-depth="1.4"
      className="absolute left-0 top-8 w-[300px] sm:w-[340px] rounded-lg bg-card border border-border shadow-paper-lg paper-grain overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-sidebar/60">
        <span className="font-mono text-[11px] text-ink-secondary">customers_q3.csv</span>
        <span className="font-mono text-[10px] text-ink-secondary/70">5 rows</span>
      </div>
      <div className="px-2 py-2">
        <div className="grid grid-cols-[1fr_1.4fr_1.6fr] gap-1 px-2 pb-1.5 border-b border-border-soft">
          {['ID', 'Name', 'Email'].map((h) => (
            <span key={h} className="font-mono text-[10px] font-semibold uppercase tracking-wide text-ink-secondary/80">
              {h}
            </span>
          ))}
        </div>
        <div className="divide-y divide-border-soft">
          {csvRows.map((row, i) => {
            const tone =
              row.status === 'duplicate'
                ? 'bg-warning-bg/70'
                : row.status === 'fixed'
                ? 'bg-success-bg/50'
                : '';
            return (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.16, duration: 0.4, ease: EASE }}
                className={`grid grid-cols-[1fr_1.4fr_1.6fr] gap-1 px-2 py-1.5 font-mono text-[11px] ${tone}`}
              >
                <span className="text-ink-secondary">{row.id}</span>
                <span className={row.status === 'duplicate' ? 'text-warning line-through' : 'text-ink'}>
                  {row.name}
                </span>
                <span className={row.status === 'fixed' ? 'text-success' : 'text-ink'}>
                  {row.email}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Validation panel sheet ---------- */

function ValidationSheet() {
  const checks = [
    { label: 'Email format', state: 'pass', delay: 1.9 },
    { label: 'Duplicate rows', state: 'warn', delay: 2.05 },
    { label: 'Required fields', state: 'pass', delay: 2.2 },
    { label: 'Type coercion', state: 'pass', delay: 2.35 },
  ];
  return (
    <motion.div
      {...sheet({ x: 70, y: -30, rotate: 3 })}
      data-paper-layer
      data-depth="0.9"
      className="absolute right-0 top-0 w-[260px] sm:w-[280px] rounded-lg bg-card border border-border shadow-paper-lg paper-grain overflow-hidden"
    >
      <div className="px-4 py-2.5 border-b border-border bg-sidebar/60 flex items-center justify-between">
        <span className="text-[12px] font-semibold text-ink">Validation</span>
        <span className="font-mono text-[10px] text-ink-secondary">4 checks</span>
      </div>
      <div className="p-3 space-y-2">
        {checks.map((c) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: c.delay, duration: 0.4, ease: EASE }}
            className="flex items-center justify-between"
          >
            <span className="text-[12px] text-ink-secondary">{c.label}</span>
            <ValidationBadge label={c.state === 'pass' ? 'Pass' : 'Review'} tone={c.state === 'pass' ? 'success' : 'warning'} delay={c.delay + 0.15} />
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.4, ease: EASE }}
          className="mt-2 flex items-center gap-2 rounded-md bg-success-bg border border-success/30 px-2.5 py-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          <span className="text-[11.5px] font-medium text-success">3 issues auto-corrected</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ---------- Import summary sheet ---------- */

function SummarySheet() {
  return (
    <motion.div
      {...sheet({ x: 40, y: 60, rotate: -2 })}
      data-paper-layer
      data-depth="1.1"
      className="absolute right-6 bottom-0 w-[230px] sm:w-[250px] rounded-lg bg-card border border-border shadow-paper-lg paper-grain overflow-hidden"
    >
      <div className="px-4 py-2.5 border-b border-border bg-sidebar/60">
        <span className="text-[12px] font-semibold text-ink">Import summary</span>
      </div>
      <div className="p-3 space-y-2.5">
        {[
          { k: 'Rows received', v: '5', d: 2.9 },
          { k: 'Duplicates removed', v: '1', d: 3.05 },
          { k: 'Fields corrected', v: '3', d: 3.2 },
          { k: 'Ready to import', v: '4', d: 3.35 },
        ].map((s) => (
          <motion.div
            key={s.k}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: s.d, duration: 0.35, ease: EASE }}
            className="flex items-center justify-between border-b border-border-soft pb-2 last:border-0 last:pb-0"
          >
            <span className="text-[11.5px] text-ink-secondary">{s.k}</span>
            <span className="font-mono text-[13px] font-semibold text-ink">{s.v}</span>
          </motion.div>
        ))}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.5, ease: EASE }}
          style={{ originX: 0 }}
          className="mt-1 flex items-center justify-center rounded-md bg-ink text-btn-text py-2 text-[11.5px] font-medium"
        >
          Ready to import
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ---------- Sticky note ---------- */

function StickyNote({
  children,
  className,
  rotate,
  delay,
}: {
  children: React.ReactNode;
  className: string;
  rotate: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16, rotate: rotate * 2 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ delay, duration: 0.5, ease: EASE }}
      data-paper-layer
      data-depth="1.7"
      className={`absolute rounded-sm shadow-paper px-3 py-2.5 text-[11px] leading-snug text-ink/85 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Hero ---------- */

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = usePaperCursor<HTMLDivElement>(reduce ? 0 : 3);

  return (
    <section id="top" className="relative pt-28 lg:pt-36 pb-20 lg:pb-28 paper-texture">
      <div className="mx-auto max-w-editorial px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-8 items-center">
          {/* Left: editorial copy */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-paper px-3 py-1 text-[12px] text-ink-secondary mb-7"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Trusted by 2,400+ data teams
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
              className="text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.04] tracking-tightest font-semibold text-ink text-balance"
            >
              Enterprise CSV Imports
              <br />
              <span className="text-ink-secondary">Without the</span>{' '}
              <span className="text-ink">Manual Cleanup.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              className="mt-7 text-[17px] leading-[1.65] text-ink-secondary max-w-lg"
            >
              Smart Data Importer reads every file like a careful analyst —
              flagging duplicates, correcting formats, and validating each row
              before a single record touches your database. Your team reviews.
              The cleanup is already done.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#cta"
                className="inline-flex items-center rounded-lg bg-ink text-btn-text text-[14.5px] font-medium px-5 py-3 hover:bg-btn-hover transition-colors shadow-paper"
              >
                Start importing
              </a>
              <a
                href="#workspace"
                className="inline-flex items-center rounded-lg border border-border bg-paper text-ink text-[14.5px] font-medium px-5 py-3 hover:bg-sidebar transition-colors"
              >
                See the workspace
              </a>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 grid grid-cols-3 gap-6 max-w-md"
            >
              {[
                ['12M+', 'Rows cleaned / mo'],
                ['99.2%', 'Import accuracy'],
                ['SOC 2', 'Type II'],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="text-[22px] font-semibold tracking-tight text-ink">{n}</dt>
                  <dd className="text-[12px] text-ink-secondary mt-0.5">{l}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Right: floating workspace */}
          <div ref={ref} className="relative h-[460px] sm:h-[520px] lg:h-[560px] hidden md:block">
            {/* desk surface */}
            <div className="absolute inset-0 rounded-2xl bg-sidebar/40 border border-border-soft" />

            <CsvSheet />
            <ValidationSheet />
            <SummarySheet />

            <StickyNote
              className="left-2 top-0 bg-accent-light"
              rotate={-5}
              delay={3.7}
            >
              <span className="font-mono text-[10px] uppercase tracking-wide text-accent">Note</span>
              <p className="mt-1">Duplicate on row 2 — same email as row 1. Auto-merged.</p>
            </StickyNote>

            <StickyNote
              className="right-1 bottom-3 bg-warning-bg"
              rotate={4}
              delay={3.9}
            >
              <span className="font-mono text-[10px] uppercase tracking-wide text-warning">Review</span>
              <p className="mt-1">Row 4 email missing TLD — corrected to .com</p>
            </StickyNote>
          </div>
        </div>
      </div>
    </section>
  );
}
