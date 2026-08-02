import { motion } from 'framer-motion';
import { KeyRound, ScrollText, ShieldCheck, Gauge } from 'lucide-react';

interface Policy {
  icon: typeof KeyRound;
  title: string;
  ref: string;
  body: string;
}

const policies: Policy[] = [
  {
    icon: KeyRound,
    title: 'Secure Authentication',
    ref: 'POL-SEC-01',
    body: 'SAML SSO, SCIM provisioning, and mandatory MFA for every importer and reviewer. Service accounts use scoped, rotating keys — never shared passwords.',
  },
  {
    icon: ScrollText,
    title: 'Audit Trail',
    ref: 'POL-SEC-02',
    body: 'Every correction, approval, and import is logged with actor, timestamp, before-and-after values, and a signed hash. Exportable to your SIEM in real time.',
  },
  {
    icon: ShieldCheck,
    title: 'Transaction Safety',
    ref: 'POL-SEC-03',
    body: 'Imports run inside a single database transaction. If any row fails final validation, the whole batch rolls back — no partial writes ever reach your tables.',
  },
  {
    icon: Gauge,
    title: 'Validation Engine',
    ref: 'POL-SEC-04',
    body: 'A deterministic rules engine checks schema, types, uniqueness, and business constraints before data is accepted. Rules are versioned and reviewable.',
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Trust() {
  return (
    <section id="trust" className="relative py-24 lg:py-32 bg-sidebar/40 border-y border-border-soft">
      <div className="mx-auto max-w-editorial px-6 lg:px-10">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-[12px] uppercase tracking-wider text-accent">Security &amp; compliance</span>
          <h2 className="mt-3 text-[32px] sm:text-[40px] leading-[1.1] tracking-tightest font-semibold text-ink text-balance">
            An enterprise compliance board.
          </h2>
          <p className="mt-5 text-[16px] leading-[1.65] text-ink-secondary">
            Each card is an internal policy document — the same ones your
            security team will ask to see before signing off.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {policies.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 2) * 0.08 }}
                className="relative rounded-lg bg-card border border-border shadow-paper paper-grain overflow-hidden"
              >
                {/* document header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-border-soft bg-sidebar/40">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink text-btn-text">
                      <Icon className="h-4 w-4" strokeWidth={1.9} />
                    </span>
                    <span className="font-mono text-[11px] text-ink-secondary">{p.ref}</span>
                  </div>
                  <span className="stamp-border rounded text-success px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                    Enforced
                  </span>
                </div>

                <div className="px-5 py-5">
                  <h3 className="text-[17px] font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-[1.6] text-ink-secondary">{p.body}</p>
                </div>

                {/* signature line */}
                <div className="px-5 pb-5 pt-3 border-t border-border-soft flex items-center justify-between">
                  <span className="text-[11px] text-ink-secondary/70">Policy owner: Security</span>
                  <span className="font-mono text-[11px] text-ink-secondary/70">v4.2 · reviewed quarterly</span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* compliance strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12.5px] font-mono text-ink-secondary"
        >
          {['SOC 2 Type II', 'GDPR', 'HIPAA-ready', 'ISO 27001', 'Data residency: US / EU'].map((b) => (
            <span key={b} className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              {b}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
