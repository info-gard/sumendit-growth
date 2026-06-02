'use client'
import { useState } from 'react'
import type { Client, ChannelData } from '@/lib/types'
import { C, PageHeader, SectionLabel, Grid, KpiCard, Card, TabBar, TextArea, Input, Btn, Toggle, Select, StatusBadge, InsightBadge } from '../ui'

type Props = { client: Client; onUpdate: (c: Client) => void }

export default function ModuleAttribution({ client, onUpdate }: Props) {
  const [tab, setTab] = useState('setup')
  const a = client.attribution
  const upd = (patch: Partial<typeof a>) => onUpdate({ ...client, attribution: { ...a, ...patch } })

  const addChannel = () => {
    const c: ChannelData = { channel: 'New Channel', spend: '', revenue: '', roas: '', cac: '', status: 'review' }
    upd({ channelBreakdown: [...a.channelBreakdown, c] })
  }
  const updateChannel = (i: number, patch: Partial<ChannelData>) => {
    const updated = [...a.channelBreakdown]
    updated[i] = { ...updated[i], ...patch }
    upd({ channelBreakdown: updated })
  }

  const tabs = [{ id: 'setup', label: '⚙️ Setup & Tracking' }, { id: 'kpis', label: '📊 Core KPIs' }, { id: 'channels', label: '📡 Channel Breakdown' }, { id: 'notes', label: '💡 Insights' }]

  return (
    <div>
      <PageHeader icon="🎯" color="#0F766E" title="Module 2 — Tracking & Attribution Engine"
        subtitle="The financial truth layer. Without correct tracking, everything breaks. Do NOT get tricked by Facebook ROAS — check the back end revenue." />
      <TabBar tabs={tabs} active={tab} onChange={setTab} />

      {tab === 'setup' && (
        <div>
          <SectionLabel>Tracking Setup — Confirm Everything Is Live</SectionLabel>
          <Card style={{ marginBottom: '1.25rem' }}>
            <Toggle label="Meta Pixel installed and verified?" value={a.pixelInstalled} onChange={v => upd({ pixelInstalled: v })} />
            <Toggle label="Google Analytics 4 (GA4) installed?" value={a.gaInstalled} onChange={v => upd({ gaInstalled: v })} />
          </Card>
          <Grid cols={2}>
            <Input label="Third-party tracking software (Triple Whale, Hyros, Northbeam, etc.)" value={a.thirdPartyTracking} onChange={v => upd({ thirdPartyTracking: v })} placeholder="e.g. Triple Whale — connected, showing blended ROAS of 3.1x" />
          </Grid>
          <InsightBadge type="critical" text="Do NOT trust Facebook or Google ROAS alone. They count customers who would have bought anyway. You need a third-party attribution tool to see TRUE new customer ROAS. Triple Whale, Hyros, or Northbeam." />
          <InsightBadge type="action" text="The only number that matters: is back-end revenue increasing compared to the month before or same period last year? If yes — scaling. If no — something is broken." />
        </div>
      )}

      {tab === 'kpis' && (
        <div>
          <SectionLabel>Core KPIs — Fill In From Your Data</SectionLabel>
          <Grid cols={3}>
            <Input label="Blended CAC (cost to acquire any customer)" value={a.cac} onChange={v => upd({ cac: v })} placeholder="e.g. $38" />
            <Input label="NC-ROAS (new customer return on ad spend)" value={a.ncRoas} onChange={v => upd({ ncRoas: v })} placeholder="e.g. 2.8x" />
            <Input label="MER (Marketing Efficiency Ratio)" value={a.mer} onChange={v => upd({ mer: v })} placeholder="e.g. 3.2x" />
            <Input label="LTV (90-day customer lifetime value)" value={a.ltv} onChange={v => upd({ ltv: v })} placeholder="e.g. $124" />
            <Input label="Average Order Value (AOV)" value={a.aov} onChange={v => upd({ aov: v })} placeholder="e.g. $67" />
            <Input label="Blended ROAS (all channels combined)" value={a.blendedRoas} onChange={v => upd({ blendedRoas: v })} placeholder="e.g. 3.8x" />
            <Input label="Repeat Purchase Rate (%)" value={a.repeatPurchaseRate} onChange={v => upd({ repeatPurchaseRate: v })} placeholder="e.g. 31%" />
          </Grid>
          <Grid cols={3}>
            <KpiCard label="CAC" value={a.cac || '—'} />
            <KpiCard label="MER" value={a.mer || '—'} />
            <KpiCard label="NC-ROAS" value={a.ncRoas || '—'} />
            <KpiCard label="LTV (90d)" value={a.ltv || '—'} />
            <KpiCard label="AOV" value={a.aov || '—'} />
            <KpiCard label="Repeat Rate" value={a.repeatPurchaseRate || '—'} />
          </Grid>
        </div>
      )}

      {tab === 'channels' && (
        <div>
          <SectionLabel action={<Btn onClick={addChannel} size="sm">+ Add Channel</Btn>}>Revenue By Channel</SectionLabel>
          {a.channelBreakdown.map((ch, i) => (
            <Card key={i} style={{ marginBottom: 10 }}>
              <Grid cols={6} style={{ margin: 0, alignItems: 'end' }}>
                <Input label="Channel" value={ch.channel} onChange={v => updateChannel(i, { channel: v })} placeholder="Meta Ads" />
                <Input label="Spend" value={ch.spend} onChange={v => updateChannel(i, { spend: v })} placeholder="$12k" />
                <Input label="Revenue" value={ch.revenue} onChange={v => updateChannel(i, { revenue: v })} placeholder="$48k" />
                <Input label="ROAS" value={ch.roas} onChange={v => updateChannel(i, { roas: v })} placeholder="4.0x" />
                <Input label="CAC" value={ch.cac} onChange={v => updateChannel(i, { cac: v })} placeholder="$31" />
                <div>
                  <label style={{ fontSize: 12, color: C.textSub, display: 'block', marginBottom: 5 }}>Status</label>
                  <select value={ch.status} onChange={e => updateChannel(i, { status: e.target.value as ChannelData['status'] })}>
                    <option value="scale">Scale</option>
                    <option value="maintain">Maintain</option>
                    <option value="review">Review</option>
                    <option value="pause">Pause</option>
                  </select>
                </div>
              </Grid>
            </Card>
          ))}
          {a.channelBreakdown.length === 0 && (
            <div style={{ background: C.bgCard, border: `1px dashed ${C.border}`, borderRadius: 10, padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: C.textMuted }}>Add your channels to see where revenue is coming from.</div>
              <Btn onClick={addChannel} style={{ marginTop: 12 }}>+ Add Channel</Btn>
            </div>
          )}
        </div>
      )}

      {tab === 'notes' && (
        <div>
          <SectionLabel>AI Insights & Scaling Notes</SectionLabel>
          <TextArea label="Attribution insights — what is the data telling you?" value={a.notes} onChange={v => upd({ notes: v })} rows={8} placeholder="e.g. Google search drives 31% lower CAC but weaker LTV than Meta founder creatives. Email/SMS producing highest returning customer revenue at $0 additional CAC..." />
          <InsightBadge type="info" text="Always cross-reference: when you launched ads, did back-end revenue increase on that specific product? If Facebook ROAS looks good but back-end revenue didn't move — do not scale." />
        </div>
      )}
    </div>
  )
}
