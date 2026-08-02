import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FileStack, Rows3, CopyX, Target } from 'lucide-react';

interface Stat {
  icon: typeof FileStack;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  caption: string;
}

const stats: Stat[] = [
  { icon: FileStack, label: 'Files Processed', value: 84000, suffix: '+', caption: 'CSV, TSV, XLSX this quarter' },
  { icon: Rows3, label: 'Rows Cleaned', value: 312, suffix: 'M', caption: 'Validated before import' },
  { icon: CopyX, label: 'Duplicates Removed', value: 4.8, suffix: 'M', caption: 'Caught before they reached the DB' },
  { icon: Target, label: 'Import Accuracy', value: 99.2, suffix: '%', caption: 'Rows accepted on first pass' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration, reduce]);
  return value;
}

function formatValue(v: number, stat: Stat) {
  const prefix = stat.prefix ?? '';
  if (stat.value >= 1000000) {
    return `${prefix}${(v / 1000000).toFixed(1)}M`;
  }
  if (Number.isInteger(stat.value) && stat.value >= 1000) {
    return `${prefix}${Math.round(v).toLocaleString()}${stat.suffix}`;
  }
  return `${prefix}${v.toFixed(1)}${stat.suffix}`;
}

function LedgerCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const value = useCountUp(stat.value, inView);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
      className="relative rounded-lg bg-card border border-border shadow-paper paper-grain overflow-hidden"
    >
      {/* ledger header strip */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border-soft bg-sidebar/50">
        <span className="font-mono text-[10.5px] uppercase tracking-wider text-ink-secondary/80">{stat.label}</span>
        <span className="font-mono text-[10px] text-ink-secondary/60">No. {String(index + 1).padStart(2, '0')}</span>
      </div>

      <div className="px-5 py-6">
        <div className="flex items-end justify-between">
          <span className="font-mono text-[34px] sm:text-[40px] leading-none font-semibold tracking-tight text-ink tabular-nums">
            {formatValue(value, stat)}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sidebar text-ink-secondary">
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </span>
        </div>
        <div className="mt-4 pt-3 border-t border-border-soft">
          <p className="text-[12.5px] leading-[1.5] text-ink-secondary">{stat.caption}</p>
        </div>
      </div>

      {/* ledger ruled lines */}
      <div className="px-5 pb-4 space-y-2">
        {[0, 1].map((i) => (
          <div key={i} className="h-px bg-border-soft" />
        ))}
      </div>
    </motion.div>
  );
}

export default function Statistics() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-editorial px-6 lg:px-10">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-[12px] uppercase tracking-wider text-accent">By the numbers</span>
          <h2 className="mt-3 text-[32px] sm:text-[40px] leading-[1.1] tracking-tightest font-semibold text-ink text-balance">
            Operational counters, not vanity charts.
          </h2>
          <p className="mt-5 text-[16px] leading-[1.65] text-ink-secondary">
            We report what actually happens to your files. These counters roll
            forward as each batch is processed.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <LedgerCard key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
