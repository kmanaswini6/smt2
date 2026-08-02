import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Search, CheckCheck, AlertTriangle, CopyX, Filter } from 'lucide-react';

type RowStatus = 'error' | 'duplicate' | 'fixed' | 'valid';

interface DataRow {
  id: string;
  name: string;
  email: string;
  amount: string;
  status: RowStatus;
  note: string;
}

const initialRows: DataRow[] = [
  { id: 'INV-2041', name: 'Atlas Logistics', email: 'ops@atlas.co', amount: '1,240.00', status: 'valid', note: '' },
  { id: 'INV-2042', name: 'Atlas Logistics', email: 'ops@atlas.co', amount: '1,240.00', status: 'duplicate', note: 'Duplicate of INV-2041' },
  { id: 'INV-2043', name: 'Meridian Group', email: 'billing@meridian', amount: '3,890.50', status: 'error', note: 'Email missing TLD' },
  { id: 'INV-2044', name: 'Northwind Traders', email: 'accounts@northwind.com', amount: '750.00', status: 'valid', note: '' },
  { id: 'INV-2045', name: 'Globex Inc', email: 'ap@globex.io', amount: '2,100.75', status: 'error', note: 'Amount has letters' },
  { id: 'INV-2046', name: 'Initech LLC', email: 'finance@initech.com', amount: '540.00', status: 'valid', note: '' },
  { id: 'INV-2047', name: 'Hooli Corp', email: 'hooli@hooli.com', amount: '9,999.99', status: 'duplicate', note: 'Duplicate of INV-2046' },
  { id: 'INV-2048', name: 'Pied Piper', email: 'team@piedpiper.io', amount: '12,400.00', status: 'error', note: 'Amount exceeds limit' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const statusMeta: Record<RowStatus, { label: string; badge: string; row: string }> = {
  valid: { label: 'Valid', badge: 'text-success border-success/40 bg-success-bg', row: '' },
  fixed: { label: 'Fixed', badge: 'text-success border-success/40 bg-success-bg', row: 'bg-success-bg/40' },
  duplicate: { label: 'Duplicate', badge: 'text-warning border-warning/40 bg-warning-bg', row: 'bg-warning-bg/50' },
  error: { label: 'Error', badge: 'text-error border-error/40 bg-error-bg', row: 'bg-error-bg/50' },
};

export default function Workspace() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 drives the cleanup
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | RowStatus>('all');

  // Drive cleanup progress from scroll position through the section.
  useEffect(() => {
    if (reduce) {
      setProgress(1);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // progress from when section top hits 80% of viewport to when it reaches 30%
        const start = vh * 0.8;
        const end = vh * 0.3;
        const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  // Apply cleanup: as progress rises, errors/duplicates resolve into fixed/valid.
  const rows = useMemo(() => {
    return initialRows.map((r) => {
      if (r.status === 'valid') return r;
      // duplicate resolves at 0.55, errors resolve at 0.8
      if (r.status === 'duplicate' && progress >= 0.55) {
        return { ...r, status: 'fixed' as RowStatus, note: 'Merged — duplicate removed' };
      }
      if (r.status === 'error' && progress >= 0.8) {
        return { ...r, status: 'fixed' as RowStatus, note: 'Auto-corrected' };
      }
      return r;
    });
  }, [progress]);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (filter !== 'all' && r.status !== filter) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          r.id.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [rows, filter, query]);

  const counts = useMemo(() => {
    const c = { valid: 0, fixed: 0, duplicate: 0, error: 0 };
    rows.forEach((r) => (c[r.status] += 1));
    return c;
  }, [rows]);

  const ready = progress >= 0.95;
  const remaining = counts.error + counts.duplicate;

  return (
    <section id="workspace" ref={sectionRef} className="relative py-24 lg:py-32 paper-texture">
      <div className="mx-auto max-w-editorial px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-[12px] uppercase tracking-wider text-accent">The workspace</span>
          <h2 className="mt-3 text-[32px] sm:text-[40px] leading-[1.1] tracking-tightest font-semibold text-ink text-balance">
            A realistic data repair table.
          </h2>
          <p className="mt-5 text-[16px] leading-[1.65] text-ink-secondary">
            Scroll slowly. As you do, the table cleans itself — errors get
            corrected, duplicates merge, and the batch moves toward ready to
            import. Search and filter work the whole time.
          </p>
        </div>

        {/* toolbar */}
        <div className="rounded-t-xl bg-card border border-b-0 border-border px-4 py-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] rounded-lg border border-border bg-paper px-3 py-2">
            <Search className="h-4 w-4 text-ink-secondary/70" strokeWidth={1.8} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search rows…"
              className="bg-transparent text-[13px] text-ink placeholder:text-ink-secondary/60 outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="h-4 w-4 text-ink-secondary/70 mr-1" strokeWidth={1.8} />
            {(['all', 'error', 'duplicate', 'fixed', 'valid'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-[12px] font-medium px-2.5 py-1.5 rounded-md border transition-colors ${
                  filter === f
                    ? 'bg-ink text-btn-text border-ink'
                    : 'bg-paper text-ink-secondary border-border hover:text-ink'
                }`}
              >
                {f === 'all' ? 'All' : statusMeta[f].label}
              </button>
            ))}
          </div>
        </div>

        {/* table */}
        <div className="rounded-b-xl bg-card border border-border shadow-paper-lg overflow-hidden">
          {/* progress bar */}
          <div className="h-1 bg-border-soft">
            <motion.div
              className="h-full bg-success"
              initial={false}
              animate={{ width: `${Math.round(progress * 100)}%` }}
              transition={{ ease: 'linear', duration: 0.1 }}
            />
          </div>

          {/* header */}
          <div className="grid grid-cols-[1fr_1.3fr_1.6fr_1fr_0.9fr] gap-2 px-4 py-2.5 border-b border-border bg-sidebar/50">
            {['Invoice', 'Customer', 'Email', 'Amount', 'Status'].map((h) => (
              <span key={h} className="font-mono text-[10.5px] font-semibold uppercase tracking-wide text-ink-secondary/80">
                {h}
              </span>
            ))}
          </div>

          {/* rows */}
          <div className="divide-y divide-border-soft min-h-[320px]">
            <AnimatePresence initial={false}>
              {filtered.map((row) => {
                const meta = statusMeta[row.status];
                return (
                  <motion.div
                    key={row.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className={`grid grid-cols-[1fr_1.3fr_1.6fr_1fr_0.9fr] gap-2 px-4 py-2.5 items-center ${meta.row}`}
                  >
                    <span className="font-mono text-[12px] text-ink-secondary">{row.id}</span>
                    <span className="text-[13px] text-ink truncate">{row.name}</span>
                    <span className={`text-[12.5px] font-mono truncate ${row.status === 'fixed' ? 'text-success' : 'text-ink'}`}>
                      {row.email}
                      {row.note && (
                        <span className="block text-[10.5px] font-sans not-italic text-ink-secondary/80 mt-0.5">{row.note}</span>
                      )}
                    </span>
                    <span className="font-mono text-[12.5px] text-ink">{row.amount}</span>
                    <span className="justify-self-end">
                      <span className={`inline-flex items-center gap-1 rounded-md stamp-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${meta.badge}`}>
                        {row.status === 'error' && <AlertTriangle className="h-3 w-3" strokeWidth={2.2} />}
                        {row.status === 'duplicate' && <CopyX className="h-3 w-3" strokeWidth={2.2} />}
                        {row.status === 'fixed' && <CheckCheck className="h-3 w-3" strokeWidth={2.2} />}
                        {meta.label}
                      </span>
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* footer summary */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-border bg-sidebar/40">
            <div className="flex items-center gap-4 text-[12px] text-ink-secondary">
              <span><span className="font-mono text-ink">{filtered.length}</span> rows shown</span>
              <span className="text-error"><span className="font-mono">{counts.error}</span> errors</span>
              <span className="text-warning"><span className="font-mono">{counts.duplicate}</span> duplicates</span>
              <span className="text-success"><span className="font-mono">{counts.fixed}</span> fixed</span>
            </div>

            <motion.div
              animate={ready ? { scale: [1, 1.03, 1] } : {}}
              transition={{ duration: 0.5, ease: EASE }}
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
                ready ? 'bg-success text-white' : 'bg-ink/5 text-ink-secondary'
              }`}
            >
              <CheckCheck className="h-4 w-4" strokeWidth={2} />
              {ready ? 'Ready to Import' : `${remaining} issues remaining`}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
