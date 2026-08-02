import { motion } from 'framer-motion';
import { FileSpreadsheet } from 'lucide-react';

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto max-w-editorial px-6 lg:px-10">
        <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-paper/85 backdrop-blur-sm shadow-paper px-5 py-3">
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink text-btn-text">
              <FileSpreadsheet className="h-4 w-4" strokeWidth={2.2} />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-ink">
              Smart Data Importer
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-[13.5px] text-ink-secondary">
            <a href="#features" className="hover:text-ink transition-colors">Features</a>
            <a href="#workflow" className="hover:text-ink transition-colors">Workflow</a>
            <a href="#workspace" className="hover:text-ink transition-colors">Workspace</a>
            <a href="#trust" className="hover:text-ink transition-colors">Security</a>
            <a href="#faq" className="hover:text-ink transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#workspace"
              className="hidden sm:inline-flex text-[13.5px] font-medium text-ink-secondary hover:text-ink px-3 py-2 transition-colors"
            >
              Sign in
            </a>
            <a
              href="#cta"
              className="inline-flex items-center rounded-lg bg-ink text-btn-text text-[13.5px] font-medium px-4 py-2.5 hover:bg-btn-hover transition-colors shadow-paper"
            >
              Start importing
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
