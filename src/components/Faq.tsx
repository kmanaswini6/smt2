import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface QA {
  q: string;
  a: string;
}

const faqs: QA[] = [
  {
    q: 'How does Smart Data Importer handle duplicates?',
    a: 'On upload, every row is fingerprinted across the columns you choose — usually email, ID, or a composite key. The engine flags exact and fuzzy matches within the file and against existing records in your target table. You can auto-merge, keep the newest, or send duplicates to a review queue for a human decision.',
  },
  {
    q: 'Can I define my own validation rules?',
    a: 'Yes. Rules are written as versioned, reviewable expressions against your schema — required fields, type checks, regex patterns, value ranges, and custom business constraints. Rules are scoped per table and can be exported for compliance review.',
  },
  {
    q: 'What happens if an import fails partway through?',
    a: 'Nothing partial ever commits. Every import runs inside a single database transaction. If any row fails final validation at commit time, the entire batch rolls back and the failed rows are returned to the repair table with the exact reason. Your tables are never left in a half-written state.',
  },
  {
    q: 'Which databases do you support?',
    a: 'Postgres, MySQL, Snowflake, and BigQuery out of the box. We also write to any S3-compatible bucket as Parquet for downstream loading. Each destination is configured once and scoped to a specific role.',
  },
  {
    q: 'Is my data stored after the import completes?',
    a: 'No. Files are processed in memory and discarded once the transaction commits or rolls back. The only persistent record is the signed audit log of corrections and approvals, which you control and can export or purge at any time.',
  },
  {
    q: 'How do approvals and roles work?',
    a: 'You define three roles per workspace: importer, reviewer, and approver. Sensitive tables can require a reviewer to sign off before an approver commits. Every approval is logged with the actor, timestamp, and the row-level diff they reviewed.',
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function FaqItem({ qa, index, open, onToggle }: { qa: QA; index: number; open: boolean; onToggle: () => void }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative">
      {/* folder tab */}
      <button
        onClick={onToggle}
        className="relative z-10 w-full text-left"
        aria-expanded={open}
      >
        <div className={`mx-4 h-7 rounded-t-lg border border-b-0 transition-colors duration-300 ${open ? 'bg-accent-light border-border' : 'bg-sidebar border-border'}`} />
      </button>

      <div className="relative -mt-px">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 rounded-lg rounded-tl-none bg-card border border-border shadow-paper paper-grain px-5 py-4 text-left hover:bg-paper transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-[11px] text-ink-secondary/70 flex-shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-[15.5px] font-medium text-ink">{qa.q}</span>
          </div>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-sidebar text-ink-secondary flex-shrink-0"
          >
            <ChevronDown className="h-4 w-4" strokeWidth={2} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-1">
                <div className="border-t border-border-soft pt-4">
                  <p className="text-[14px] leading-[1.65] text-ink-secondary max-w-2xl">{qa.a}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-[12px] uppercase tracking-wider text-accent">Questions</span>
          <h2 className="mt-3 text-[32px] sm:text-[40px] leading-[1.1] tracking-tightest font-semibold text-ink text-balance">
            Open a folder to read the answer.
          </h2>
        </div>

        <div className="space-y-5">
          {faqs.map((qa, i) => (
            <FaqItem
              key={qa.q}
              qa={qa}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
