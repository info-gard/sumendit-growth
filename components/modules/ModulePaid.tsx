'use client'
import { useState } from 'react'
import type { Client, PlatformData } from '@/lib/types'
import { C, PageHeader, SectionLabel, Card, Grid, TabBar, TextArea, Input, Btn, Toggle, InsightBadge, StatusBadge } from '../ui'

type Props = { client: Client; onUpdate: (c: Client) => void }

export default function ModulePaid({ client, onUpdate }: Props) {
  const [tab, setTab] = useState('budget')
  const p = client.paid
  const upd = (patch: Partial<typeof p>) => onUpdate({ ...client, paid: { ...p, ...patch } })

  const updatePlatform = (i: number, patch: Partial<PlatformData>) => {
    const updated = [...p.platforms]
    updated[i] = { ...updated[i], ...patch }
    upd({ platforms: updated })
  }

  const total = p.tofPct + p.mofPct + p.bofPct + p.retargetingPct
  const pctColor = total === 100 ? C.green : total > 100 ? C.red : C.amber

  const tabs = [
    { id: 'budget', label: '💰 Budget Allocation' },
    { id: 'platforms', label: '📡 Platform Data' },
    { id: 'campaigns', label: '⚙️ Campaign Structure' },
    { id: 'copy', label: '✍️ Ad Copy' },
    { id: 'scaling', label: '📈 Scaling Rules' },
    { id: 'comms', label: '📣 Client Comms' },
  ]

  return (
    <div>
      <PageHeader icon="💸" color="#0369A1" title="Module 5 — Paid Media Engine"
        subtitle="Budget orchestration. TOF, MOF, BOF, retargeting. Scale what works. Kill what doesn't. Always check the back-end revenue first." />
      <TabBar tabs={tabs} active={tab} onChange={setTab} />

      {tab === 'budget' && (
        <div>
          <SectionLabel>Budget Allocation — TOF/MOF/BOF/Retargeting</SectionLabel>
          <InsightBadge type="info" text="For most clients, 70–80% of budget should go to TOF (cold audiences). Most agencies under-invest in TOF and wonder why they can't scale." />
          <Grid cols={2}>
            <Input label="Total weekly budget" value={p.totalWeeklyBudget} onChange={v => upd({ totalWeeklyBudget: v })} placeholder="e.g. $22,000/week" />
          </Grid>
          <div style={{ background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 10, padding: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { label: 'TOF (Top of Funnel)', key: 'tofPct', desc: 'Cold audiences — attention generation', color: C.accent },
                { label: 'MOF (Middle)', key: 'mofPct', desc: 'Warm audiences — trust building', color: '#0F766E' },
                { label: 'BOF (Bottom)', key: 'bofPct', desc: 'Hot audiences — conversion', color: '#B45309' },
                { label: 'Retargeting', key: 'retargetingPct', desc: 'Visited but didn\'t buy', color: '#7C3AED' },
              ].map(s => (
                <div key={s.key} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: C.textSub, marginBottom: 6 }}>{s.label}</div>
                  <div style={{ background: C.bgCard, borderRadius: 8, height: 100, position: 'relative', overflow: 'hidden', marginBottom: 8 }}>
                    <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${p[s.key as keyof typeof p] as number}%`, background: s.color, borderRadius: '4px 4px 0 0', transition: 'height 0.3s' }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#fff' }}>{p[s.key as keyof typeof p] as number}%</div>
                  </div>
                  <input type="number" min={0} max={100} value={p[s.key as keyof typeof p] as number} onChange={e => upd({ [s.key]: Number(e.target.value) } as any)} style={{ width: '100%', textAlign: 'center' }} />
                  <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>{s.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, textAlign: 'center', fontSize: 13, color: pctColor, fontWeight: 600 }}>Total: {total}% {total !== 100 ? `(should equal 100%)` : '✓'}</div>
          </div>
        </div>
      )}

      {tab === 'platforms' && (
        <div>
          <SectionLabel>Platform Performance — What Is Profitable?</SectionLabel>
          <InsightBadge type="warn" text="Check the back-end revenue when you launched each platform. Does Shopify revenue increase on that product? If not, it's not working — regardless of what the ad account says." />
          {p.platforms.map((pl, i) => (
            <Card key={pl.platform} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{pl.platform}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <StatusBadge status={pl.status} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.textSub }}>
                    Active
                    <div onClick={() => updatePlatform(i, { active: !pl.active })} style={{ width: 34, height: 18, borderRadius: 9, background: pl.active ? C.accent : C.bgSection, border: `1px solid ${pl.active ? C.accent : C.border}`, cursor: 'pointer', position: 'relative' }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: pl.active ? 18 : 2, transition: 'left 0.2s' }} />
                    </div>
                  </div>
                </div>
              </div>
              {pl.active && (
                <Grid cols={5}>
                  <Input label="Weekly spend" value={pl.spend} onChange={v => updatePlatform(i, { spend: v })} placeholder="$8,000" />
                  <Input label="ROAS" value={pl.roas} onChange={v => updatePlatform(i, { roas: v })} placeholder="3.8x" />
                  <Input label="CAC" value={pl.cac} onChange={v => updatePlatform(i, { cac: v })} placeholder="$31" />
                  <div>
                    <label style={{ fontSize: 12, color: C.textSub, display: 'block', marginBottom: 5 }}>Status</label>
                    <select value={pl.status} onChange={e => updatePlatform(i, { status: e.target.value as PlatformData['status'] })}>
                      {['scale', 'maintain', 'review', 'pause', 'not-tested'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </Grid>
              )}
              <TextArea label="Notes — what's working? What to test? What to scale?" value={pl.notes} onChange={v => updatePlatform(i, { notes: v })} rows={2} />
            </Card>
          ))}
          <Card style={{ marginTop: '1rem' }}>
            <Toggle label="Back-end revenue aligns with ad platform reporting?" value={p.backendRevenueAligned} onChange={v => upd({ backendRevenueAligned: v })} />
            <TextArea label="Back-end revenue notes" value={p.backendNotes} onChange={v => upd({ backendNotes: v })} rows={3} placeholder="Compare: week before ads launched vs week after. Product X: revenue went from $4k to $11k. Aligned." />
          </Card>
        </div>
      )}

      {tab === 'campaigns' && (
        <div>
          <SectionLabel>Campaign Structure — Testing + Scaling</SectionLabel>
          <InsightBadge type="action" text="Testing campaign: 1 product per ad set, 4–5 creatives per ad set. Run 25–30 ads at once. Find winners in 3–5 days. Scale winners into a separate winning campaign." />
          <Grid cols={2}>
            <TextArea label="Testing campaign structure" value={p.testingCampaign} onChange={v => upd({ testingCampaign: v })} rows={5} placeholder="CBO testing campaign. 5 ad sets. 1 product per ad set. 5 creatives each = 25 ads. $20/day per ad set. Run 5 days. Find winner..." />
            <TextArea label="Winning campaign structure (scaling)" value={p.winningCampaign} onChange={v => upd({ winningCampaign: v })} rows={5} placeholder="Take winning creatives from testing. Move to scaling campaign. Increase budget 20% every 3 days if ROAS holds..." />
          </Grid>
          <TextArea label="Full campaign structure notes" value={p.campaignStructure} onChange={v => upd({ campaignStructure: v })} rows={5} placeholder="TOF: 5 ad sets, broad targeting, winner creatives. MOF: website visitors 30d. BOF: add to cart, initiate checkout. Retention: past purchasers..." />
        </div>
      )}

      {tab === 'copy' && (
        <div>
          <SectionLabel>Ad Copywriting Framework</SectionLabel>
          <div style={{ background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', marginBottom: '1rem' }}>
            <p style={{ fontSize: 12, color: C.textSub, margin: 0 }}>Every ad answers: <strong style={{ color: C.text }}>Why this?</strong> (why they should care) + <strong style={{ color: C.text }}>Why now?</strong> (urgency) + <strong style={{ color: C.text }}>Why trust us?</strong> (proof) + <strong style={{ color: C.text }}>What next?</strong> (CTA)</p>
          </div>
          <Grid cols={2}>
            <TextArea label="Headline — short, punchy, benefit-led" value={p.copyFramework.headline} onChange={v => upd({ copyFramework: { ...p.copyFramework, headline: v } })} rows={3} placeholder="e.g. Finally — clear skin in 30 days (or your money back)" />
            <TextArea label="Primary Text — the story, problem, solution, proof" value={p.copyFramework.primaryText} onChange={v => upd({ copyFramework: { ...p.copyFramework, primaryText: v } })} rows={3} placeholder="I used to wake up every morning embarrassed to look in the mirror..." />
            <TextArea label="Description — supporting copy, benefit summary" value={p.copyFramework.description} onChange={v => upd({ copyFramework: { ...p.copyFramework, description: v } })} rows={3} placeholder="Dermatologist tested. 19,222 happy customers. Free shipping over $50." />
            <TextArea label="CTA — what happens when they click?" value={p.copyFramework.cta} onChange={v => upd({ copyFramework: { ...p.copyFramework, cta: v } })} rows={3} placeholder="Shop now — 20% off today only" />
          </Grid>
          <TextArea label="Current best offer to use in ads" value={p.copyFramework.offer} onChange={v => upd({ copyFramework: { ...p.copyFramework, offer: v } })} rows={2} placeholder="e.g. Buy 2 get 1 free — 30-day money back guarantee — Free express shipping" />
        </div>
      )}

      {tab === 'scaling' && (
        <div>
          <SectionLabel>Scaling Rules — When to Scale, When to Stop</SectionLabel>
          <div style={{ background: '#0a1a0a', border: `1px solid ${C.green}30`, borderRadius: 10, padding: '14px', marginBottom: '1rem' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.green, marginBottom: 8 }}>GREEN LIGHT — Scale when:</div>
            {['Back-end revenue increasing vs same period month/year before', 'ROAS above your profitable threshold for 3+ days', 'NC-ROAS confirms new customers are profitable', 'Shopify revenue aligned with ad account reporting', 'CAC below LTV breakeven point'].map(t => <div key={t} style={{ fontSize: 12, color: C.textSub, marginBottom: 4 }}>✓ {t}</div>)}
          </div>
          <div style={{ background: C.redBg, border: `1px solid ${C.red}30`, borderRadius: 10, padding: '14px', marginBottom: '1rem' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.red, marginBottom: 8 }}>RED LIGHT — Stop or review when:</div>
            {['Back-end revenue NOT increasing (regardless of what Facebook shows)', 'CAC keeps rising week over week', 'Creative fatigue detected (hook rate dropping)', 'NC-ROAS below profitable threshold', 'Scaling budget but profits not moving'].map(t => <div key={t} style={{ fontSize: 12, color: C.textSub, marginBottom: 4 }}>✗ {t}</div>)}
          </div>
          <TextArea label="Client-specific scaling rules and thresholds" value={p.scalingRules} onChange={v => upd({ scalingRules: v })} rows={5} placeholder="Profitable ROAS threshold: 3.2x. Scale 20% every 3 days if held. CAC must stay under $42. Check back-end Monday morning every week..." />
        </div>
      )}

      {tab === 'comms' && (
        <div>
          <SectionLabel>Client Communication Log — Overcommunicate Everything</SectionLabel>
          <div style={{ background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px', marginBottom: '1rem' }}>
            <p style={{ fontSize: 13, color: C.text, margin: 0, lineHeight: 1.65 }}>
              You have to communicate with your client every single day. What have you done? What's working? What's not? What are you testing next? What's the plan? If you don't communicate, the client doesn't know you're working. Communicate, communicate, communicate.
            </p>
          </div>
          <InsightBadge type="win" text="Two things keep clients: (1) You are increasing their sales and profits vs month before / same period last year. (2) You are communicating daily and they feel you care. Do both." />
          <TextArea label="Communication log — dates, updates, decisions, next steps" value={p.clientCommunicationLog} onChange={v => upd({ clientCommunicationLog: v })} rows={10} placeholder="[2024-01-15] — Launched 3 new founder video ads. Testing against 2 existing winners. Brief sent to client. Expected results in 5 days.&#10;[2024-01-17] — Founder video #2 showing 3.4x ROAS in 2 days. Back-end revenue up 22% vs last week. Scaling budget 20%.&#10;..." />
        </div>
      )}
    </div>
  )
}
