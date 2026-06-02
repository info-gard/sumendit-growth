'use client'
import { useState, useEffect } from 'react'
import type { Client, ChecklistItem } from '@/lib/types'
import { C, PageHeader, SectionLabel, Card, Grid, TabBar, TextArea, Input, Btn, Toggle, InsightBadge } from '../ui'

type Props = { client: Client; onUpdate: (c: Client) => void }

const HOME_CHECKS: Omit<ChecklistItem, 'status' | 'notes'>[] = [
  { id: 'h1', text: 'Main pages load in 5 seconds or less', priority: 'critical' },
  { id: 'h2', text: 'Every page has a clear CTA (including 404, no-results, blog, about)', priority: 'high' },
  { id: 'h3', text: 'Site-wide offer bar at top of page with urgency + CTA ("Only today — Shop now")', priority: 'high' },
  { id: 'h4', text: 'Value proposition clearly stated on homepage (tagline or welcome blurb)', priority: 'high' },
  { id: 'h5', text: 'One or two prominent CTAs above the fold', priority: 'critical' },
  { id: 'h6', text: 'Founder story visible on homepage', priority: 'medium' },
  { id: 'h7', text: 'Customer reviews / social proof visible on homepage', priority: 'high' },
  { id: 'h8', text: 'Trust badges, certificates, PR logos shown', priority: 'high' },
  { id: 'h9', text: 'UGC / Instagram photos shown', priority: 'medium' },
  { id: 'h10', text: 'Sticky navigation (categories, search, cart always visible)', priority: 'critical' },
  { id: 'h11', text: 'Search bar prominent with autocomplete and spell-check', priority: 'medium' },
  { id: 'h12', text: 'Cookie bar easy to close in under 2 seconds', priority: 'low' },
  { id: 'h13', text: 'Wishlist option available', priority: 'medium' },
  { id: 'h14', text: 'Recently viewed items for returning visitors', priority: 'low' },
  { id: 'h15', text: 'Mini cart shows total, items, free shipping progress', priority: 'high' },
]

const PRODUCT_CHECKS: Omit<ChecklistItem, 'status' | 'notes'>[] = [
  { id: 'p1', text: 'Main CTA is most visible element on page (contains cart icon)', priority: 'critical' },
  { id: 'p2', text: 'Price is prominent and placed near main CTA', priority: 'critical' },
  { id: 'p3', text: 'Old price (strike-through) + savings shown when on sale', priority: 'high' },
  { id: 'p4', text: 'Sticky product bar with name, image, CTA on scroll', priority: 'high' },
  { id: 'p5', text: 'Product gallery with zoom, arrows, video, swipe on mobile', priority: 'high' },
  { id: 'p6', text: 'Quantity discounts shown near CTA (1x, 2x recommended, 3x best value)', priority: 'high' },
  { id: 'p7', text: 'Express payment options (PayPal, Apple Pay, Google Pay, Shop Pay)', priority: 'critical' },
  { id: 'p8', text: 'Installment options (Klarna, AfterPay) for higher-price products', priority: 'medium' },
  { id: 'p9', text: 'Urgency trigger near CTA ("Today only", "Ships in next 2h if ordered now")', priority: 'high' },
  { id: 'p10', text: 'Scarcity trigger ("Only 3 left in stock")', priority: 'high' },
  { id: 'p11', text: 'Social proof — reviews with photos, verified badge, name, rating', priority: 'critical' },
  { id: 'p12', text: 'Video testimonials on product page', priority: 'medium' },
  { id: 'p13', text: 'Free shipping info shown near CTA', priority: 'high' },
  { id: 'p14', text: 'Returns, refund, money-back guarantee info near CTA', priority: 'high' },
  { id: 'p15', text: 'Customers shown how many viewed / bought in last 24h', priority: 'medium' },
  { id: 'p16', text: 'Cross-sell / upsell products shown', priority: 'high' },
  { id: 'p17', text: 'Product FAQs shown', priority: 'medium' },
  { id: 'p18', text: '"How to use" explained in 3 easy steps', priority: 'medium' },
  { id: 'p19', text: 'Social media reviews/screenshots embedded (TikTok, Instagram, WhatsApp)', priority: 'medium' },
  { id: 'p20', text: 'Live chat or phone option on product page', priority: 'medium' },
]

const LANDING_CHECKS: Omit<ChecklistItem, 'status' | 'notes'>[] = [
  { id: 'l1', text: 'Buy button goes directly to checkout (skip cart page)', priority: 'critical' },
  { id: 'l2', text: 'No outgoing links (no clickable logo, nav, or footer)', priority: 'critical' },
  { id: 'l3', text: 'Upsell step between buy button and thank you page', priority: 'high' },
  { id: 'l4', text: 'Sticky bar with product, price, CTA on scroll', priority: 'high' },
  { id: 'l5', text: 'Product title under 65 characters', priority: 'medium' },
  { id: 'l6', text: 'Subtitle with power words (exclusive, secret, effortless, new)', priority: 'medium' },
  { id: 'l7', text: 'All CTA, trust, urgency, scarcity elements match product page checks', priority: 'high' },
]

const CART_CHECKS: Omit<ChecklistItem, 'status' | 'notes'>[] = [
  { id: 'c1', text: 'Free shipping progress bar shown in cart', priority: 'critical' },
  { id: 'c2', text: 'Urgency trigger ("Items reserved for 10 minutes")', priority: 'high' },
  { id: 'c3', text: 'Scarcity shown per item ("Only 1 left")', priority: 'high' },
  { id: 'c4', text: 'Upsell / cross-sell products shown in cart', priority: 'high' },
  { id: 'c5', text: 'Coupon code field hidden (so users don\'t leave to find codes)', priority: 'high' },
  { id: 'c6', text: 'Expected delivery date shown in cart', priority: 'medium' },
  { id: 'c7', text: 'Trust badges + reassuring copy below main CTA', priority: 'high' },
  { id: 'c8', text: 'Alternative payment options (PayPal, Apple Pay) below CTA', priority: 'high' },
  { id: 'c9', text: 'Returns and refund info visible without leaving page', priority: 'medium' },
]

const CHECKOUT_CHECKS: Omit<ChecklistItem, 'status' | 'notes'>[] = [
  { id: 'ch1', text: 'Guest checkout available (no forced registration)', priority: 'critical' },
  { id: 'ch2', text: 'Progress bar showing checkout steps', priority: 'high' },
  { id: 'ch3', text: 'Email requested FIRST (so you can follow up if they abandon)', priority: 'critical' },
  { id: 'ch4', text: 'Order bump shown (e.g. gift packaging, urgent shipping under $5)', priority: 'high' },
  { id: 'ch5', text: 'Upsell page between checkout and thank you page', priority: 'high' },
  { id: 'ch6', text: 'Urgency trigger ("Complete order in next 12 min — ships today")', priority: 'high' },
  { id: 'ch7', text: 'Trust badge + "Shop with confidence" copy below CTA', priority: 'high' },
  { id: 'ch8', text: 'No outgoing links (no nav, no footer)', priority: 'critical' },
  { id: 'ch9', text: 'Mobile keyboard optimized for number fields (phone, postcode)', priority: 'medium' },
  { id: 'ch10', text: 'Address autocomplete enabled', priority: 'medium' },
  { id: 'ch11', text: '"Billing = shipping" checkbox to avoid duplicate entry', priority: 'medium' },
  { id: 'ch12', text: 'Installment options visible (Klarna, AfterPay) for higher prices', priority: 'medium' },
]

const THANKYOU_CHECKS: Omit<ChecklistItem, 'status' | 'notes'>[] = [
  { id: 'ty1', text: 'Clearly states order was successful + congratulations', priority: 'critical' },
  { id: 'ty2', text: 'Order summary and expected delivery date shown', priority: 'critical' },
  { id: 'ty3', text: 'Upsell offer — buy complementary product (added to same order)', priority: 'high' },
  { id: 'ty4', text: 'Coupon code for next purchase or to share with friends', priority: 'medium' },
  { id: 'ty5', text: 'Package tracking instructions shown', priority: 'medium' },
  { id: 'ty6', text: 'Social sharing or referral prompt', priority: 'medium' },
]

function ChecklistSection({ items, title, storedItems, onUpdate }: { items: Omit<ChecklistItem, 'status' | 'notes'>[]; title: string; storedItems: ChecklistItem[]; onUpdate: (items: ChecklistItem[]) => void }) {
  const getItem = (id: string): ChecklistItem => storedItems.find(i => i.id === id) || { id, text: '', status: 'todo', priority: 'medium', notes: '' }

  const setStatus = (id: string, status: ChecklistItem['status']) => {
    const existing = storedItems.find(i => i.id === id)
    if (existing) onUpdate(storedItems.map(i => i.id === id ? { ...i, status } : i))
    else onUpdate([...storedItems, { ...getItem(id), status, text: items.find(i => i.id === id)?.text || '' }])
  }

  const counts = { yes: 0, no: 0, todo: 0, na: 0 }
  items.forEach(item => { counts[getItem(item.id).status]++ })
  const score = Math.round((counts.yes / (items.length - counts.na)) * 100) || 0

  const priorityColor = { critical: C.red, high: C.amber, medium: C.blue, low: C.textMuted }

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <SectionLabel>{title}</SectionLabel>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
          <span style={{ color: C.green }}>✓ {counts.yes}</span>
          <span style={{ color: C.red }}>✗ {counts.no}</span>
          <span style={{ color: C.textMuted }}>— {counts.na}</span>
          <span style={{ fontWeight: 700, color: score > 70 ? C.green : score > 40 ? C.amber : C.red }}>{score}%</span>
        </div>
      </div>
      {items.map(item => {
        const stored = getItem(item.id)
        return (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, marginBottom: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: priorityColor[item.priority], flexShrink: 0 }} title={item.priority} />
            <span style={{ flex: 1, fontSize: 12, color: stored.status === 'yes' ? C.textSub : C.text, textDecoration: stored.status === 'yes' ? 'line-through' : 'none', lineHeight: 1.4 }}>{item.text}</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {(['yes', 'no', 'na', 'todo'] as const).map(s => (
                <button key={s} onClick={() => setStatus(item.id, s)} style={{ padding: '3px 8px', fontSize: 11, fontWeight: 600, borderRadius: 5, border: `1px solid ${stored.status === s ? (s === 'yes' ? C.green : s === 'no' ? C.red : C.textSub) : C.border}`, background: stored.status === s ? (s === 'yes' ? C.greenBg : s === 'no' ? C.redBg : C.bgSection) : 'transparent', color: stored.status === s ? (s === 'yes' ? C.green : s === 'no' ? C.red : C.textSub) : C.textMuted, cursor: 'pointer' }}>
                  {s === 'yes' ? '✓' : s === 'no' ? '✗' : s === 'na' ? 'N/A' : '?'}
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function ModuleCRO({ client, onUpdate }: Props) {
  const [tab, setTab] = useState('overview')
  const cro = client.cro
  const upd = (patch: Partial<typeof cro>) => onUpdate({ ...client, cro: { ...cro, ...patch } })

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'homepage', label: '🏠 Homepage' },
    { id: 'product', label: '📦 Product Page' },
    { id: 'landing', label: '🎯 Landing Page' },
    { id: 'cart', label: '🛒 Cart' },
    { id: 'checkout', label: '💳 Checkout' },
    { id: 'thankyou', label: '🎉 Thank You' },
    { id: 'fixes', label: '🔧 Action Plan' },
  ]

  const funnelColors = ['#4F46E5', '#4F46E5', '#B45309', '#B45309', '#DC2626', '#22c55e']

  return (
    <div>
      <PageHeader icon="🔍" color="#B45309" title="Module 3 — Website / CRO Engine"
        subtitle="Leak detection system. Find friction, drop-offs, and conversion blockers across every page. Use Hotjar. Fix what bleeds revenue." />
      <TabBar tabs={tabs} active={tab} onChange={setTab} />

      {tab === 'overview' && (
        <div>
          <SectionLabel>Tracking Setup</SectionLabel>
          <Card style={{ marginBottom: '1.25rem' }}>
            <Toggle label="Hotjar installed? (heatmaps + session recordings)" value={cro.hotjarInstalled} onChange={v => upd({ hotjarInstalled: v })} />
          </Card>
          {!cro.hotjarInstalled && <InsightBadge type="critical" text="Hotjar is not installed. You cannot see where customers are going, pressing, and falling off. Install it now at hotjar.com — it's free to start." />}

          <Grid cols={3}>
            <div><label style={{ fontSize: 12, color: C.textSub, display: 'block', marginBottom: 5 }}>Overall CVR (%)</label><input value={cro.overallCVR} onChange={e => upd({ overallCVR: e.target.value })} placeholder="e.g. 2.4%" /></div>
            <div><label style={{ fontSize: 12, color: C.textSub, display: 'block', marginBottom: 5 }}>Mobile CVR (%)</label><input value={cro.mobileCVR} onChange={e => upd({ mobileCVR: e.target.value })} placeholder="e.g. 1.6%" /></div>
            <div><label style={{ fontSize: 12, color: C.textSub, display: 'block', marginBottom: 5 }}>Desktop CVR (%)</label><input value={cro.desktopCVR} onChange={e => upd({ desktopCVR: e.target.value })} placeholder="e.g. 3.8%" /></div>
          </Grid>

          <SectionLabel>Funnel Drop-Off (update % at each step)</SectionLabel>
          {cro.funnelSteps.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 14px', background: C.bgCard, border: `1px solid ${step.critical ? `${C.red}50` : C.border}`, borderRadius: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: C.text, width: 130, flexShrink: 0 }}>{step.name}</span>
              <div style={{ flex: 1, background: C.bgSection, borderRadius: 4, height: 8, overflow: 'hidden' }}>
                <div style={{ width: `${step.pct}%`, height: '100%', background: funnelColors[i] || C.accent, borderRadius: 4 }} />
              </div>
              <input type="number" value={step.pct} min={0} max={100} onChange={e => { const s = [...cro.funnelSteps]; s[i] = { ...s[i], pct: Number(e.target.value) }; upd({ funnelSteps: s }) }} style={{ width: 60, textAlign: 'center' }} />
              <span style={{ fontSize: 11, color: C.textMuted }}>%</span>
              <button onClick={() => { const s = [...cro.funnelSteps]; s[i] = { ...s[i], critical: !s[i].critical }; upd({ funnelSteps: s }) }} style={{ fontSize: 11, padding: '3px 8px', background: step.critical ? C.redBg : C.bgSection, color: step.critical ? C.red : C.textMuted, border: `1px solid ${step.critical ? C.red + '40' : C.border}`, borderRadius: 6, cursor: 'pointer' }}>
                {step.critical ? '🔥 Critical' : 'Flag'}
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'homepage' && <ChecklistSection title="Homepage CRO Checklist" items={HOME_CHECKS} storedItems={cro.homepageChecklist} onUpdate={v => upd({ homepageChecklist: v })} />}
      {tab === 'product' && <ChecklistSection title="Product Page CRO Checklist" items={PRODUCT_CHECKS} storedItems={cro.productPageChecklist} onUpdate={v => upd({ productPageChecklist: v })} />}
      {tab === 'landing' && <ChecklistSection title="Landing Page CRO Checklist" items={LANDING_CHECKS} storedItems={cro.landingPageChecklist} onUpdate={v => upd({ landingPageChecklist: v })} />}
      {tab === 'cart' && <ChecklistSection title="Cart Page CRO Checklist" items={CART_CHECKS} storedItems={cro.cartChecklist} onUpdate={v => upd({ cartChecklist: v })} />}
      {tab === 'checkout' && <ChecklistSection title="Checkout Page CRO Checklist" items={CHECKOUT_CHECKS} storedItems={cro.checkoutChecklist} onUpdate={v => upd({ checkoutChecklist: v })} />}
      {tab === 'thankyou' && <ChecklistSection title="Thank You Page CRO Checklist" items={THANKYOU_CHECKS} storedItems={cro.thankYouChecklist} onUpdate={v => upd({ thankYouChecklist: v })} />}

      {tab === 'fixes' && (
        <div>
          <SectionLabel>Action Plan & A/B Tests</SectionLabel>
          <TextArea label="Critical fixes — what MUST be fixed first? (rank by revenue impact)" value={cro.criticalFixes} onChange={v => upd({ criticalFixes: v })} rows={5} placeholder="1. Shipping step — fix delivery transparency (11% drop). 2. Mobile sticky CTA..." />
          <TextArea label="A/B tests currently running or planned" value={cro.abTestsRunning} onChange={v => upd({ abTestsRunning: v })} rows={4} placeholder="Test 1: Problem-led headline vs outcome-led (running, 1,000 sessions)..." />
          <Card style={{ marginBottom: '1rem' }}>
            <Toggle label="CRO audit sent to client for review?" value={cro.sentToClient} onChange={v => upd({ sentToClient: v })} />
            <Toggle label="Client doing the fixes themselves?" value={cro.clientDoingItThemselves} onChange={v => upd({ clientDoingItThemselves: v })} />
          </Card>
          {!cro.clientDoingItThemselves && cro.sentToClient && (
            <InsightBadge type="action" text="Client wants you to handle the fixes. Scope the CRO work, price it, and present as an add-on. This is a direct revenue-recovery service." />
          )}
        </div>
      )}
    </div>
  )
}
