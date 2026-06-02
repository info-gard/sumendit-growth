'use client'
import type { Client, ModuleId } from '@/lib/types'
import { C, SectionLabel, InsightBadge, Card, Grid, KpiCard } from '../ui'

export default function CommandCenter({ client, onNavigate }: { client: Client; onUpdate: (c: Client) => void; onNavigate: (id: ModuleId) => void }) {
  const quickLinks: { label: string; id: ModuleId; icon: string; desc: string }[] = [
    { label: 'Research Intelligence', id: 'research', icon: '🔬', desc: 'ICP, brand, competitors, products, offers' },
    { label: 'Attribution Engine', id: 'attribution', icon: '🎯', desc: 'CAC, MER, ROAS, channel revenue' },
    { label: 'Website / CRO', id: 'cro', icon: '🔍', desc: 'Funnel leaks, checklists, Hotjar, A/B tests' },
    { label: 'Creative Intelligence', id: 'creative', icon: '🎬', desc: 'Hooks, angles, scripts, creators' },
    { label: 'Paid Ads Engine', id: 'paid', icon: '💸', desc: 'TOF/MOF/BOF, platforms, copy, scaling' },
    { label: 'Retention & Email', id: 'retention', icon: '🔁', desc: 'Klaviyo flows, segments, SMS, referrals' },
  ]

  const completionScore = (() => {
    let score = 0; let total = 12
    if (client.research.customerDemographics) score++
    if (client.research.buyerPersonas.length) score++
    if (client.research.topProducts.length) score++
    if (client.research.competitors.length) score++
    if (client.attribution.cac) score++
    if (client.attribution.pixelInstalled) score++
    if (client.cro.overallCVR) score++
    if (client.cro.hotjarInstalled) score++
    if (client.creative.winningCreatives.length) score++
    if (client.paid.totalWeeklyBudget) score++
    if (client.retention.klaviyoIntegrated) score++
    if (client.retention.flows.some(f => f.status === 'live')) score++
    return Math.round((score / total) * 100)
  })()

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.5px' }}>
              {client.avatar} {client.name}
            </h1>
            <p style={{ fontSize: 13, color: C.textSub, margin: '4px 0 0' }}>{client.industry} · Command Center · All modules</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 4 }}>Profile completion</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: completionScore > 70 ? C.green : completionScore > 40 ? C.amber : C.red }}>{completionScore}%</div>
            <div style={{ width: 120, height: 4, background: C.bgSection, borderRadius: 4, marginTop: 4 }}>
              <div style={{ width: `${completionScore}%`, height: '100%', background: completionScore > 70 ? C.green : completionScore > 40 ? C.amber : C.red, borderRadius: 4 }} />
            </div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <Grid cols={5} style={{ marginBottom: '1.5rem' }}>
        <KpiCard label="Monthly Revenue" value={client.monthlyRevenue || '—'} />
        <KpiCard label="Blended CAC" value={client.attribution.cac || '—'} />
        <KpiCard label="MER" value={client.attribution.mer || '—'} />
        <KpiCard label="90d LTV" value={client.attribution.ltv || '—'} />
        <KpiCard label="CVR" value={client.cro.overallCVR || '—'} />
      </Grid>

      {/* Alerts */}
      <SectionLabel>System alerts</SectionLabel>
      {!client.research.customerDemographics && <InsightBadge type="warn" text="Research not started — fill Module 1 first. Everything downstream depends on understanding your customer and client." />}
      {!client.attribution.pixelInstalled && <InsightBadge type="critical" text="Pixel not confirmed installed. Attribution is blind until tracking is verified. Fix this before spending another dollar on ads." />}
      {!client.cro.hotjarInstalled && <InsightBadge type="warn" text="Hotjar not installed. You can't see where customers are falling off the funnel without heatmaps and session recordings." />}
      {!client.retention.klaviyoIntegrated && <InsightBadge type="action" text="Klaviyo not integrated. Email retention is where profit compounds — get this connected immediately." />}
      {client.retention.flows.every(f => f.status === 'build') && <InsightBadge type="action" text="No email flows are live yet. Abandoned cart and welcome series should be your first two — they pay for themselves." />}
      {completionScore === 100 && <InsightBadge type="win" text="All modules complete. System fully operational. Focus on scaling what's working and communicating daily with the client." />}

      {/* Modules grid */}
      <SectionLabel>All modules</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {quickLinks.map(q => (
          <button key={q.id} onClick={() => onNavigate(q.id)} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px', cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = C.accent)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{q.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>{q.label}</div>
            <div style={{ fontSize: 12, color: C.textSub, lineHeight: 1.5 }}>{q.desc}</div>
          </button>
        ))}
      </div>

      {/* The golden rule */}
      <div style={{ marginTop: '1.5rem', background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 12, padding: '1.25rem 1.5rem' }}>
        <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: C.accent, marginBottom: 8 }}>The only metric that matters</div>
        <p style={{ fontSize: 14, color: C.text, lineHeight: 1.65, margin: 0 }}>
          Are you increasing sales and profits compared to the month before or year before under the same period? If yes — you are scaling. If no — something is broken. The client does not care about Facebook ROAS. They care about profit in the back end. Check the back end revenue. Always.
        </p>
      </div>
    </div>
  )
}
