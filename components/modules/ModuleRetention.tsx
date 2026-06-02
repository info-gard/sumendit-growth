'use client'
import { useState } from 'react'
import type { Client, FlowData, SegmentData } from '@/lib/types'
import { C, PageHeader, SectionLabel, Card, Grid, TabBar, TextArea, Input, Btn, Toggle, InsightBadge, StatusBadge } from '../ui'

type Props = { client: Client; onUpdate: (c: Client) => void }

const FLOW_PRIORITY_ORDER = ['Welcome Series', 'Abandoned Cart', 'Browse Abandonment', 'Post-Purchase', 'Review Request', 'Cross-sell', 'Replenishment', 'Win-Back', 'Back-in-Stock', 'VIP Flow', 'Price Drop Flow', 'Sunset / Unengaged']

export default function ModuleRetention({ client, onUpdate }: Props) {
  const [tab, setTab] = useState('setup')
  const r = client.retention
  const upd = (patch: Partial<typeof r>) => onUpdate({ ...client, retention: { ...r, ...patch } })

  const updateFlow = (id: string, patch: Partial<FlowData>) => upd({ flows: r.flows.map(f => f.id === id ? { ...f, ...patch } : f) })
  const updateSegment = (id: string, patch: Partial<SegmentData>) => upd({ segments: r.segments.map(s => s.id === id ? { ...s, ...patch } : s) })

  const liveFlows = r.flows.filter(f => f.status === 'live').length
  const totalFlowRevenue = r.flows.filter(f => f.revenue30d).reduce((sum, f) => {
    const val = parseFloat(f.revenue30d.replace(/[^0-9.]/g, '')) || 0
    return sum + val
  }, 0)

  const tabs = [
    { id: 'setup', label: '⚙️ Setup' },
    { id: 'flows', label: '📧 Email Flows' },
    { id: 'segments', label: '👥 Segments' },
    { id: 'sms', label: '📱 SMS & Referral' },
    { id: 'strategy', label: '🧠 Strategy' },
  ]

  return (
    <div>
      <PageHeader icon="🔁" color="#065F46" title="Module 6 — Retention & Email Engine"
        subtitle="This is where profit compounds. Right message, right customer, right time. Segment properly. Personalize everything. Get them coming back." />
      <TabBar tabs={tabs} active={tab} onChange={setTab} />

      {tab === 'setup' && (
        <div>
          <SectionLabel>Platform Setup</SectionLabel>
          <Card style={{ marginBottom: '1.25rem' }}>
            <Toggle label="Klaviyo integrated with the store?" value={r.klaviyoIntegrated} onChange={v => upd({ klaviyoIntegrated: v })} />
            <Toggle label="SMS marketing active?" value={r.smsActive} onChange={v => upd({ smsActive: v })} />
            <Toggle label="Referral program live?" value={r.referralProgram} onChange={v => upd({ referralProgram: v })} />
          </Card>
          {!r.klaviyoIntegrated && <InsightBadge type="critical" text="Klaviyo not integrated. Email and SMS is the highest-ROAS channel you have — $0 CAC for repeat customers. Get this connected immediately." />}
          <Grid cols={2}>
            <div>
              <label style={{ fontSize: 12, color: C.textSub, display: 'block', marginBottom: 5 }}>Email platform</label>
              <select value={r.platform} onChange={e => upd({ platform: e.target.value })}>
                <option value="Klaviyo">Klaviyo (recommended)</option>
                <option value="Mailchimp">Mailchimp</option>
                <option value="Omnisend">Omnisend</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </Grid>
          <Grid cols={3}>
            <Input label="List size (total subscribers)" value={r.listSize} onChange={v => upd({ listSize: v })} placeholder="e.g. 24,800" />
            <Input label="Email revenue (last 30 days)" value={r.emailRevenue30d} onChange={v => upd({ emailRevenue30d: v })} placeholder="e.g. $18,400" />
            <Input label="Repeat purchase rate (%)" value={r.repeatPurchaseRate} onChange={v => upd({ repeatPurchaseRate: v })} placeholder="e.g. 31%" />
            <Input label="Win-back rate (%)" value={r.winbackRate} onChange={v => upd({ winbackRate: v })} placeholder="e.g. 12%" />
          </Grid>

          <div style={{ background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', marginTop: '1rem' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 8 }}>Flow priority order (build in this sequence)</div>
            {FLOW_PRIORITY_ORDER.map((name, i) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.accent, width: 20 }}>{i + 1}.</span>
                <span style={{ fontSize: 12, color: C.textSub }}>{name}</span>
                {r.flows.find(f => f.name === name)?.status === 'live' && <span style={{ fontSize: 10, fontWeight: 700, color: C.green, background: C.greenBg, padding: '2px 7px', borderRadius: 10 }}>LIVE</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'flows' && (
        <div>
          <SectionLabel>Email Flows — Status & Performance</SectionLabel>
          <div style={{ display: 'flex', gap: 12, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 16px', fontSize: 12 }}>
              <div style={{ color: C.textMuted, marginBottom: 2 }}>Flows live</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: liveFlows > 4 ? C.green : C.amber }}>{liveFlows} / {r.flows.length}</div>
            </div>
            {totalFlowRevenue > 0 && (
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 16px', fontSize: 12 }}>
                <div style={{ color: C.textMuted, marginBottom: 2 }}>Flow revenue (30d)</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: C.green }}>${totalFlowRevenue.toLocaleString()}</div>
              </div>
            )}
          </div>
          {r.flows.map(flow => (
            <Card key={flow.id} style={{ marginBottom: 10, borderColor: flow.status === 'live' ? `${C.green}30` : flow.status === 'build' ? `${C.amber}30` : C.border }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{flow.name}</div>
                  <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>Trigger: {flow.trigger} · {flow.emails} email{flow.emails !== 1 ? 's' : ''}</div>
                </div>
                <div style={{ display: 'flex', align: 'center', gap: 8 }}>
                  <select value={flow.status} onChange={e => updateFlow(flow.id, { status: e.target.value as FlowData['status'] })} style={{ fontSize: 12, padding: '4px 8px', width: 'auto' }}>
                    <option value="live">Live</option>
                    <option value="draft">Draft</option>
                    <option value="build">Build now</option>
                    <option value="optimize">Optimize</option>
                  </select>
                </div>
              </div>
              {flow.status === 'live' && (
                <Grid cols={3}>
                  <Input label="Open rate" value={flow.openRate} onChange={v => updateFlow(flow.id, { openRate: v })} placeholder="e.g. 44%" />
                  <Input label="CVR / Recovery rate" value={flow.cvr} onChange={v => updateFlow(flow.id, { cvr: v })} placeholder="e.g. 8.2%" />
                  <Input label="Revenue (30d)" value={flow.revenue30d} onChange={v => updateFlow(flow.id, { revenue30d: v })} placeholder="e.g. $5,100" />
                </Grid>
              )}
              <TextArea label="Notes — copy style, splits, what to improve" value={flow.notes} onChange={v => updateFlow(flow.id, { notes: v })} rows={2} />
            </Card>
          ))}
        </div>
      )}

      {tab === 'segments' && (
        <div>
          <SectionLabel>Segmentation — Right Message to Right Customer</SectionLabel>
          <InsightBadge type="critical" text="If a man gets women's product emails, he unsubscribes. If someone who bought shoes gets makeup emails, they're gone. Segment the list properly. Personalize everything." />
          {r.segments.map(seg => (
            <Card key={seg.id} style={{ marginBottom: 10 }}>
              <Grid cols={4}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>{seg.name}</div>
                  <Input label="List size" value={seg.size} onChange={v => updateSegment(seg.id, { size: v })} placeholder="e.g. 4,100" />
                </div>
                <Input label="Average LTV" value={seg.ltv} onChange={v => updateSegment(seg.id, { ltv: v })} placeholder="e.g. $74" />
                <div style={{ gridColumn: 'span 2' }}>
                  <TextArea label="Strategy — how to communicate with this segment" value={seg.strategy} onChange={v => updateSegment(seg.id, { strategy: v })} rows={2} placeholder="e.g. Educational sequences, no discounts, high-quality content..." />
                </div>
              </Grid>
            </Card>
          ))}
          <TextArea label="Overall segmentation strategy notes" value={r.segmentationStrategy} onChange={v => upd({ segmentationStrategy: v })} rows={4} placeholder="How to segment: by gender, by product purchased, by order frequency, by spend level, by engagement..." />
          <TextArea label="Personalization approach — how to make emails feel 1-to-1" value={r.personalizationNotes} onChange={v => upd({ personalizationNotes: v })} rows={4} placeholder={`e.g. "Hey [first name], I'm [founder name] reaching out personally because you bought [product]..." — use purchase data, behavior, product category to personalize every flow`} />
        </div>
      )}

      {tab === 'sms' && (
        <div>
          <SectionLabel>SMS Strategy</SectionLabel>
          <div style={{ background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px', marginBottom: '1rem' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 8 }}>Email vs SMS — know the difference</div>
            <Grid cols={2}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.blue, marginBottom: 6 }}>Email = story, education, depth</div>
                {['Founder stories and brand narrative', 'Product education and how-to guides', 'Long-form social proof and case studies', 'Detailed promotions with context', 'Newsletters and content series'].map(t => <div key={t} style={{ fontSize: 11, color: C.textSub, marginBottom: 3 }}>· {t}</div>)}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.green, marginBottom: 6 }}>SMS = short, urgent, direct action</div>
                {['Abandoned cart reminders (1 message)', 'Back-in-stock alerts', 'VIP early access drops', 'Flash sale announcements', 'Replenishment nudges', 'Conversational buying guides'].map(t => <div key={t} style={{ fontSize: 11, color: C.textSub, marginBottom: 3 }}>· {t}</div>)}
              </div>
            </Grid>
          </div>

          <SectionLabel>Referral Program</SectionLabel>
          <Card>
            <Toggle label="Referral program live?" value={r.referralProgram} onChange={v => upd({ referralProgram: v })} />
            <TextArea label="Referral program details — mechanic, reward, platform" value={r.referralNotes} onChange={v => upd({ referralNotes: v })} rows={4} placeholder="e.g. ReferralCandy / Friendbuy. Customer refers friend → both get 20% off next purchase. Creates viral loop of new customer acquisition at near-zero CAC." />
          </Card>
          <InsightBadge type="win" text="A referral program creates an ecosystem where loyal customers constantly refer new ones. Every referred customer comes in at near-zero CAC with higher trust. This compounds over time." />
        </div>
      )}

      {tab === 'strategy' && (
        <div>
          <SectionLabel>30-Day Email Implementation Plan</SectionLabel>
          <div style={{ background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px', marginBottom: '1.25rem' }}>
            {[
              { week: 'Week 1', tasks: 'Set up tracking, lists, consent, branding, templates, core segments. Integrate Klaviyo. Build first welcome email.' },
              { week: 'Week 2', tasks: 'Build welcome series (5 emails), abandoned cart (3 emails), browse abandonment (2 emails). Go live.' },
              { week: 'Week 3', tasks: 'Build post-purchase flow, review request, cross-sell. Launch. Monitor open rates and CVR.' },
              { week: 'Week 4', tasks: 'Build win-back, VIP, replenishment, price-drop. Set up optimization dashboard. Review all metrics.' },
            ].map(w => (
              <div key={w.week} style={{ display: 'flex', gap: 12, marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, width: 70, flexShrink: 0 }}>{w.week}</div>
                <div style={{ fontSize: 12, color: C.textSub, lineHeight: 1.5 }}>{w.tasks}</div>
              </div>
            ))}
          </div>

          <SectionLabel>The Customer Journey We're Building</SectionLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: '1.25rem', overflowX: 'auto' }}>
            {['Visitor', 'Subscriber', 'First purchase', 'Repeat buyer', 'Loyal customer', 'Brand advocate'].map((stage, i, arr) => (
              <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                <div style={{ background: C.accent, color: '#fff', fontSize: 11, fontWeight: 600, padding: '6px 12px', borderRadius: 6, whiteSpace: 'nowrap' }}>{stage}</div>
                {i < arr.length - 1 && <div style={{ fontSize: 14, color: C.textMuted, padding: '0 4px' }}>→</div>}
              </div>
            ))}
          </div>
          <InsightBadge type="win" text="Goal: convert visitors to subscribers → first purchase → repeat buyer → loyal customer → brand advocate who refers others. Email and SMS are the engine that moves people through every stage." />
        </div>
      )}
    </div>
  )
}
