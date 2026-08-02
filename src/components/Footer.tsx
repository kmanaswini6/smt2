import { FileSpreadsheet } from 'lucide-react';

const cols = [
  {
    title: 'Product',
    links: ['Features', 'Workflow', 'Workspace', 'Validation engine', 'Changelog'],
  },
  {
    title: 'Security',
    links: ['Compliance board', 'Audit trail', 'SOC 2 report', 'Data residency', 'Trust center'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'API reference', 'Import guides', 'Status', 'Support'],
  },
  {
    title: 'Company',
    links: ['About', 'Customers', 'Careers', 'Contact', 'Privacy'],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-paper">
      <div className="mx-auto max-w-editorial px-6 lg:px-10 py-16">
        <div className="grid lg:grid-cols-[1.4fr_2fr] gap-12">
          {/* brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink text-btn-text">
                <FileSpreadsheet className="h-4 w-4" strokeWidth={2.2} />
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-ink">
                Smart Data Importer
              </span>
            </div>
            <p className="mt-4 text-[13px] leading-[1.6] text-ink-secondary">
              Enterprise CSV imports without the manual cleanup. Validated,
              de-duplicated, and committed in a single transaction.
            </p>
            <p className="mt-6 font-mono text-[11px] text-ink-secondary/70">
              © {new Date().getFullYear()} Smart Data Importer, Inc.
            </p>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-ink-secondary/80 mb-3">
                  {c.title}
                </h3>
                <ul className="space-y-2">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-[13px] text-ink-secondary hover:text-ink transition-colors">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* thin divider + fine print */}
        <div className="mt-14 pt-6 border-t border-border-soft flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-ink-secondary/70">
            Documentation · v4.2 · last reviewed 2026-07-30
          </p>
          <div className="flex items-center gap-5 text-[11px] text-ink-secondary/70">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              All systems operational
            </span>
            <a href="#" className="hover:text-ink transition-colors">Terms</a>
            <a href="#" className="hover:text-ink transition-colors">Privacy</a>
            <a href="#" className="hover:text-ink transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
