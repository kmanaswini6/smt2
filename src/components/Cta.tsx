import { motion, useReducedMotion } from 'framer-motion';
import { FileSpreadsheet } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Cta() {
  const reduce = useReducedMotion();
  return (
    <section id="cta" className="relative py-24 lg:py-32 paper-texture">
      <div className="mx-auto max-w-editorial px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative mx-auto max-w-2xl rounded-2xl bg-card border border-border shadow-paper-lg paper-grain overflow-hidden"
        >
          {/* document header */}
          <div className="flex items-center justify-between px-8 py-4 border-b border-border-soft bg-sidebar/40">
            <span className="flex items-center gap-2 font-mono text-[11px] text-ink-secondary">
              <FileSpreadsheet className="h-4 w-4" strokeWidth={1.9} />
              import_request.pdf
            </span>
            <span className="font-mono text-[10.5px] text-ink-secondary/70">Page 1 of 1</span>
          </div>

          <div className="px-8 sm:px-12 py-14 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="text-[34px] sm:text-[44px] leading-[1.08] tracking-tightest font-semibold text-ink text-balance"
            >
              Ready to clean your next dataset?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              className="mt-5 text-[16px] leading-[1.65] text-ink-secondary max-w-md mx-auto"
            >
              Drop in a CSV. Smart Data Importer validates, de-duplicates, and
              corrects every row — then hands you a clean batch ready to commit.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <motion.a
                href="#top"
                whileHover={reduce ? undefined : { y: -2 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="inline-flex items-center rounded-lg bg-ink text-btn-text text-[15px] font-medium px-6 py-3.5 hover:bg-btn-hover transition-colors shadow-paper"
              >
                Start importing
              </motion.a>
              <a
                href="#features"
                className="inline-flex items-center rounded-lg border border-border bg-paper text-ink text-[15px] font-medium px-6 py-3.5 hover:bg-sidebar transition-colors"
              >
                Read the capabilities
              </a>
            </motion.div>

            <p className="mt-6 text-[12px] text-ink-secondary/70">
              No credit card. First 1,000 rows free.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
