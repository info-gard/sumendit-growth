'use client'
import { useState } from 'react'
import type { Client, CreativeItem, AngleItem, HookItem } from '@/lib/types'
import { C, PageHeader, SectionLabel, Card, Grid, TabBar, TextArea, Input, Btn, StatusBadge, InsightBadge } from '../ui'

type Props = { client: Client; onUpdate: (c: Client) => void }

const ANGLE_TYPES = ['Founder story', 'UGC testimonial', 'Problem → solution', 'Before/after', 'Us vs them', 'Lifestyle', 'Educational', 'Meme/trend', 'AI creator', 'Influencer', 'Customer result', 'Behind the scenes']
const CREATIVE_TYPES = ['video', 'image', 'ugc', 'founder', 'meme', 'lifestyle', 'static'] as const

export default function ModuleCreative({ client, onUpdate }: Props) {
  const [tab, setTab] = useState('creatives')
  const cr = client.creative
  const upd = (patch: Partial<typeof cr>) => onUpdate({ ...client, creative: { ...cr, ...patch } })

  const addCreative = () => {
    const c: CreativeItem = { id: Date.now().toString(), name: 'Creative ' + (cr.winningCreatives.length + 1), type: 'video', hookRate: '', cpa: '', ctr: '', holdRate: '', status: 'testing', notes: '', angle: '' }
    upd({ winningCreatives: [...cr.winningCreatives, c] })
  }
  const updateCreative = (id: string, patch: Partial<CreativeItem>) => upd({ winningCreatives: cr.winningCreatives.map(c => c.id === id ? { ...c, ...patch } : c) })
  const removeCreative = (id: string) => upd({ winningCreatives: cr.winningCreatives.filter(c => c.id !== id) })

  const addAngle = () => {
    const a: AngleItem = { id: Date.now().toString(), angle: '', type: ANGLE_TYPES[0], result: 'testing', notes: '' }
    upd({ anglesTested: [...cr.anglesTested, a] })
  }
  const updateAngle = (id: string, patch: Partial<AngleItem>) => upd({ anglesTested: cr.anglesTested.map(a => a.id === id ? { ...a, ...patch } : a) })

  const addHook = () => {
    const h: HookItem = { id: Date.now().toString(), hookText: '', hookRate: '', result: 'testing' }
    upd({ hooks: [...cr.hooks, h] })
  }
  const updateHook = (id: string, patch: Partial<HookItem>) => upd({ hooks: cr.hooks.map(h => h.id === id ? { ...h, ...patch } : h) })

  const tabs = [
    { id: 'creatives', label: '🎥 Active Creatives' },
    { id: 'angles', label: '📐 Angles Tested' },
    { id: 'hooks', label: '🪝 Hook Testing' },
    { id: 'script', label: '📝 Script Framework' },
    { id: 'strategy', label: '🗺️ Strategy' },
  ]

  return (
    <div>
      <PageHeader icon="🎬" color="#7C3AED" title="Module 4 — Creative Intelligence Engine"
        subtitle="Creative is the targeting. Creative is the differentiator. Start with what's already working. 10x it. Then test new things." />
      <TabBar tabs={tabs} active={tab} onChange={setTab} />

      {tab === 'creatives' && (
        <div>
          <SectionLabel action={<Btn onClick={addCreative} size="sm">+ Add Creative</Btn>}>Active Creatives — Performance Tracker</SectionLabel>
          <InsightBadge type="info" text="Always start with the 3–5 winning creatives from before. Make 10x more variations of what already works before trying new things." />
          {cr.winningCreatives.map(c => (
            <Card key={c.id} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Input label="" value={c.name} onChange={v => updateCreative(c.id, { name: v })} placeholder="Creative name" />
                  <StatusBadge status={c.status} />
                </div>
                <Btn variant="danger" size="sm" onClick={() => removeCreative(c.id)}>✕</Btn>
              </div>
              <Grid cols={4}>
                <div>
                  <label style={{ fontSize: 12, color: C.textSub, display: 'block', marginBottom: 5 }}>Type</label>
                  <select value={c.type} onChange={e => updateCreative(c.id, { type: e.target.value as CreativeItem['type'] })}>
                    {CREATIVE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: C.textSub, display: 'block', marginBottom: 5 }}>Status</label>
                  <select value={c.status} onChange={e => updateCreative(c.id, { status: e.target.value as CreativeItem['status'] })}>
                    {['winner', 'testing', 'fatigue', 'paused'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <Input label="Hook Rate (%)" value={c.hookRate} onChange={v => updateCreative(c.id, { hookRate: v })} placeholder="e.g. 68%" />
                <Input label="Hold Rate (%)" value={c.holdRate} onChange={v => updateCreative(c.id, { holdRate: v })} placeholder="e.g. 45%" />
                <Input label="CTR (%)" value={c.ctr} onChange={v => updateCreative(c.id, { ctr: v })} placeholder="e.g. 3.2%" />
                <Input label="CPA" value={c.cpa} onChange={v => updateCreative(c.id, { cpa: v })} placeholder="e.g. $31" />
                <Input label="Angle used" value={c.angle} onChange={v => updateCreative(c.id, { angle: v })} placeholder="e.g. Problem-first founder story" />
              </Grid>
              <TextArea label="Notes — what's working? Why? What to iterate?" value={c.notes} onChange={v => updateCreative(c.id, { notes: v })} rows={2} />
            </Card>
          ))}
          {cr.winningCreatives.length === 0 && (
            <div style={{ background: C.bgCard, border: `1px dashed ${C.border}`, borderRadius: 10, padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: C.textMuted }}>Add your active creatives to track performance.</div>
              <Btn onClick={addCreative} style={{ marginTop: 12 }}>+ Add First Creative</Btn>
            </div>
          )}
        </div>
      )}

      {tab === 'angles' && (
        <div>
          <SectionLabel action={<Btn onClick={addAngle} size="sm">+ Add Angle</Btn>}>Angles Tested — What Resonates With This Audience</SectionLabel>
          <div style={{ background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', marginBottom: '1rem' }}>
            <p style={{ fontSize: 12, color: C.textSub, margin: 0 }}>Test: Problem-first, Founder story, Before/after, Us vs them, Lifestyle, Educational, Meme/trend, AI creator, UGC. Track what resonates. Scale winners. Kill losers.</p>
          </div>
          {cr.anglesTested.map(a => (
            <Card key={a.id} style={{ marginBottom: 10 }}>
              <Grid cols={4}>
                <Input label="Angle name / description" value={a.angle} onChange={v => updateAngle(a.id, { angle: v })} placeholder="e.g. Founder morning routine" />
                <div>
                  <label style={{ fontSize: 12, color: C.textSub, display: 'block', marginBottom: 5 }}>Type</label>
                  <select value={a.type} onChange={e => updateAngle(a.id, { type: e.target.value })}>
                    {ANGLE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: C.textSub, display: 'block', marginBottom: 5 }}>Result</label>
                  <select value={a.result} onChange={e => updateAngle(a.id, { result: e.target.value as AngleItem['result'] })}>
                    <option value="winner">Winner</option>
                    <option value="testing">Testing</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <TextArea label="Notes" value={a.notes} onChange={v => updateAngle(a.id, { notes: v })} rows={1} />
              </Grid>
            </Card>
          ))}
        </div>
      )}

      {tab === 'hooks' && (
        <div>
          <SectionLabel action={<Btn onClick={addHook} size="sm">+ Add Hook</Btn>}>Hook Testing — Test 4–5 Hooks Per Creative</SectionLabel>
          <InsightBadge type="info" text="After 3 seconds — how many people are still watching? That's the hook rate. Problem-first hooks consistently beat lifestyle hooks. Test relentlessly." />
          <div style={{ background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', marginBottom: '1rem' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 6 }}>Hook formulas to test:</div>
            {[
              '"I was so embarrassed by my [problem] until I found this..."',
              '"This one thing changed my [result] in just [time]..."',
              '"Why [competitor approach] doesn\'t work — and what actually does"',
              '"[Number] things I wish I knew before [problem]"',
              '"POV: you finally found something that actually works for [problem]"',
              '"If you have [specific problem], stop scrolling"',
              '"The [industry] doesn\'t want you to know this..."',
              '"Real results after [X days] — no filter"',
            ].map(h => <div key={h} style={{ fontSize: 12, color: C.textSub, marginBottom: 4, paddingLeft: 8, borderLeft: `2px solid ${C.accent}` }}>{h}</div>)}
          </div>
          {cr.hooks.map(h => (
            <Card key={h.id} style={{ marginBottom: 8 }}>
              <Grid cols={3}>
                <TextArea label="Hook text" value={h.hookText} onChange={v => updateHook(h.id, { hookText: v })} rows={2} placeholder="Write the exact hook text..." />
                <Input label="Hook rate (3-sec view %)" value={h.hookRate} onChange={v => updateHook(h.id, { hookRate: v })} placeholder="e.g. 68%" />
                <div>
                  <label style={{ fontSize: 12, color: C.textSub, display: 'block', marginBottom: 5 }}>Result</label>
                  <select value={h.result} onChange={e => updateHook(h.id, { result: e.target.value as HookItem['result'] })}>
                    <option value="winner">Winner</option>
                    <option value="testing">Testing</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </Grid>
            </Card>
          ))}
        </div>
      )}

      {tab === 'script' && (
        <div>
          <SectionLabel>Video Script Framework — The Winning Structure</SectionLabel>
          <div style={{ background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px', marginBottom: '1rem' }}>
            {[
              { step: '1. Hook (0–3s)', desc: 'Stop the scroll. Problem, shock, curiosity. 4–5 variations to test.' },
              { step: '2. Problem (3–10s)', desc: "Agitate the pain. Speak their language. Make them feel understood." },
              { step: '3. Solution (10–20s)', desc: 'Introduce the product as the solution. Benefits, not features.' },
              { step: '4. Dream Outcome (20–35s)', desc: 'Paint the picture. The feeling. The transformation. The life after.' },
              { step: '5. Social Proof (35–50s)', desc: 'Other customers who got the same results. Clips, reviews, results.' },
              { step: '6. CTA + Offer (50–60s)', desc: 'What to do now. The offer, guarantee, urgency. Click the link.' },
            ].map(s => (
              <div key={s.step} style={{ display: 'flex', gap: 12, marginBottom: 10, paddingBottom: 10, borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, width: 140, flexShrink: 0 }}>{s.step}</div>
                <div style={{ fontSize: 12, color: C.textSub, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <TextArea label="Client-specific script notes and winning script templates" value={cr.scriptFramework} onChange={v => upd({ scriptFramework: v })} rows={8} placeholder="Paste winning scripts here. Note what worked. Build a library of proven hooks, bodies, and CTAs..." />
          <TextArea label="A/B test results — what worked, what didn't" value={cr.abTestResults} onChange={v => upd({ abTestResults: v })} rows={4} />
        </div>
      )}

      {tab === 'strategy' && (
        <div>
          <SectionLabel>Creative Strategy & Production Plan</SectionLabel>
          <Grid cols={2}>
            <TextArea label="Influencer / creator ideas — who should be in the content?" value={cr.influencerIdeas} onChange={v => upd({ influencerIdeas: v })} rows={4} placeholder="Types of creators, specific names, audience match, follower size needed..." />
            <TextArea label="UGC strategy — how to get authentic customer content" value={cr.ugcStrategy} onChange={v => upd({ ugcStrategy: v })} rows={4} placeholder="Reach out to past buyers, offer product in exchange for content, briefs..." />
            <TextArea label="Founder content plan — what should the founder film?" value={cr.founderContentPlan} onChange={v => upd({ founderContentPlan: v })} rows={4} placeholder="Morning routine, product demo, founder story, Q&A, behind the scenes..." />
            <TextArea label="Video length analysis — what lengths are working?" value={cr.videoLengthAnalysis} onChange={v => upd({ videoLengthAnalysis: v })} rows={4} placeholder="15s: hook+CTA. 30s: problem+solution+CTA. 60s: full story. 90s: deep education..." />
          </Grid>
          <TextArea label="Content calendar — what to create this week/month" value={cr.contentCalendar} onChange={v => upd({ contentCalendar: v })} rows={5} />

          <div style={{ background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px', marginTop: '1rem' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>All creative formats to test</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {[
                'Static image ads (graphic designer)', 'Moving image / GIF ads',
                'Lifestyle ads (product in use)', 'UGC testimonial videos',
                'Founder talking-head videos', 'Meme format ads',
                'Before/after transformation', 'Us vs competitor',
                'Product demo / tutorial', 'Customer review screengrabs',
                'Social proof compilation', 'AI creator videos',
                'Unboxing experience', '10+ creator compilation',
                'Text-only hook with B-roll', 'Voiceover with product footage',
              ].map(f => (
                <div key={f} style={{ fontSize: 12, color: C.textSub, display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ color: C.accent, flexShrink: 0 }}>›</span>{f}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
