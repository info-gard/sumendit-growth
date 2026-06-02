'use client'
import { useState } from 'react'
import type { Client, PersonaData, TopProduct, Competitor } from '@/lib/types'
import { C, PageHeader, SectionLabel, Card, Grid, TabBar, TextArea, Input, Btn, Tag } from '../ui'

type Props = { client: Client; onUpdate: (c: Client) => void }
const tabs = [
  { id: 'customer', label: '👤 Customer (ICP)' },
  { id: 'brand', label: '🏷️ Brand' },
  { id: 'worked', label: '✅ What Worked' },
  { id: 'notworked', label: '❌ What Didn\'t' },
  { id: 'products', label: '📦 Products' },
  { id: 'offers', label: '🎁 Offers' },
  { id: 'competitors', label: '🏆 Competitors' },
  { id: 'platforms', label: '📡 Platforms' },
]

export default function ModuleResearch({ client, onUpdate }: Props) {
  const [tab, setTab] = useState('customer')
  const r = client.research
  const upd = (patch: Partial<typeof r>) => onUpdate({ ...client, research: { ...r, ...patch } })

  const addPersona = () => {
    const p: PersonaData = { id: Date.now().toString(), name: 'Persona ' + (r.buyerPersonas.length + 1), age: '', gender: '', platforms: '', problems: '', language: '', dreamOutcome: '', objections: '' }
    upd({ buyerPersonas: [...r.buyerPersonas, p] })
  }
  const updatePersona = (id: string, patch: Partial<PersonaData>) => upd({ buyerPersonas: r.buyerPersonas.map(p => p.id === id ? { ...p, ...patch } : p) })
  const removePersona = (id: string) => upd({ buyerPersonas: r.buyerPersonas.filter(p => p.id !== id) })

  const addProduct = () => {
    const p: TopProduct = { id: Date.now().toString(), name: 'Product ' + (r.topProducts.length + 1), features: '', advantages: '', benefits: '', dreamOutcome: '', margin: '', monthlyRevenue: '' }
    upd({ topProducts: [...r.topProducts, p] })
  }
  const updateProduct = (id: string, patch: Partial<TopProduct>) => upd({ topProducts: r.topProducts.map(p => p.id === id ? { ...p, ...patch } : p) })
  const removeProduct = (id: string) => upd({ topProducts: r.topProducts.filter(p => p.id !== id) })

  const addCompetitor = () => {
    const c: Competitor = { id: Date.now().toString(), name: 'Competitor ' + (r.competitors.length + 1), website: '', adsLibrary: '', revenue: '', whyAhead: '', longestRunningAd: '', notes: '' }
    upd({ competitors: [...r.competitors, c] })
  }
  const updateCompetitor = (id: string, patch: Partial<Competitor>) => upd({ competitors: r.competitors.map(c => c.id === id ? { ...c, ...patch } : c) })
  const removeCompetitor = (id: string) => upd({ competitors: r.competitors.filter(c => c.id !== id) })

  return (
    <div>
      <PageHeader icon="🔬" color="#4F46E5" title="Module 1 — Research Intelligence Engine"
        subtitle="This is the foundation. Everything downstream — ads, content, funnels, email — depends on what you build here. Spend the most time here." />
      <TabBar tabs={tabs} active={tab} onChange={setTab} />

      {/* CUSTOMER */}
      {tab === 'customer' && (
        <div>
          <SectionLabel>Part 1 — Understand Your Customer</SectionLabel>
          <div style={{ background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: 13, color: C.textSub, margin: 0, lineHeight: 1.6 }}>The brand and company that truly cares the most about their customer wins. Know them better than they know themselves.</p>
          </div>
          <Grid cols={2}>
            <TextArea label="Who are your customers? (demographics — age, gender, location, income)" value={r.customerDemographics} onChange={v => upd({ customerDemographics: v })} placeholder="e.g. Women, 28–44, middle income, urban, health-conscious..." rows={4} />
            <TextArea label="What are their pain points and needs?" value={r.customerPainPoints} onChange={v => upd({ customerPainPoints: v })} placeholder="e.g. Embarrassed about skin, frustrated by products that don't work..." rows={4} />
            <TextArea label="What motivates them? What drives their decisions?" value={r.customerMotivations} onChange={v => upd({ customerMotivations: v })} placeholder="e.g. Confidence, feeling beautiful, simplicity, results..." rows={4} />
            <TextArea label="Where do they hang out online? (platforms, communities, groups)" value={r.onlineHangouts} onChange={v => upd({ onlineHangouts: v })} placeholder="e.g. TikTok, Instagram, Reddit r/skincare, Facebook groups..." rows={4} />
            <TextArea label="What are their shopping behaviors?" value={r.shoppingBehaviors} onChange={v => upd({ shoppingBehaviors: v })} placeholder="e.g. Research before buying, trust reviews, respond to before/after..." rows={4} />
            <TextArea label="What objections and hesitations do they have?" value={r.objections} onChange={v => upd({ objections: v })} placeholder="e.g. Price, will it work for me, what if it doesn't work..." rows={4} />
          </Grid>

          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '1.25rem', marginTop: '0.5rem' }}>
            <SectionLabel action={<Btn onClick={addPersona} size="sm">+ Add Persona</Btn>}>Buyer Personas (build at least 3)</SectionLabel>
            <div style={{ background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 10, padding: '10px 14px', marginBottom: '1rem' }}>
              <p style={{ fontSize: 12, color: C.textSub, margin: 0 }}>Build 3 detailed personas. Name them. Describe how they think, speak, feel. Use their exact language in your ads and content.</p>
            </div>
            {r.buyerPersonas.map(p => (
              <Card key={p.id} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <Input label="" value={p.name} onChange={v => updatePersona(p.id, { name: v })} placeholder="Persona name (e.g. 'Anxious Anna')" />
                  <Btn variant="danger" size="sm" onClick={() => removePersona(p.id)} style={{ marginLeft: 8, marginTop: -8 }}>✕</Btn>
                </div>
                <Grid cols={2}>
                  <Input label="Age & Gender" value={p.age} onChange={v => updatePersona(p.id, { age: v })} placeholder="e.g. Female, 32" />
                  <Input label="Platforms she's on" value={p.platforms} onChange={v => updatePersona(p.id, { platforms: v })} placeholder="e.g. TikTok, Instagram" />
                  <TextArea label="Problems she has — what keeps her up at night?" value={p.problems} onChange={v => updatePersona(p.id, { problems: v })} placeholder="What is she angry at? Frustrated by? Scared of?" rows={3} />
                  <TextArea label="Exact language she uses (copy from reviews/comments)" value={p.language} onChange={v => updatePersona(p.id, { language: v })} placeholder={`"finally works for me" "wish I found this sooner" "so embarrassed before"`} rows={3} />
                  <TextArea label="Dream outcome — what does she actually want?" value={p.dreamOutcome} onChange={v => updatePersona(p.id, { dreamOutcome: v })} placeholder="The feeling, the result, the transformation she desires..." rows={3} />
                  <TextArea label="Her objections — why hasn't she bought yet?" value={p.objections} onChange={v => updatePersona(p.id, { objections: v })} placeholder="Price? Trust? Tried everything before? Doesn't believe it works?" rows={3} />
                </Grid>
              </Card>
            ))}
            {r.buyerPersonas.length === 0 && (
              <div style={{ background: C.bgCard, border: `1px dashed ${C.border}`, borderRadius: 10, padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: C.textMuted }}>No personas yet. Add at least 3 to build powerful messaging.</div>
                <Btn onClick={addPersona} style={{ marginTop: 12 }}>+ Create First Persona</Btn>
              </div>
            )}
          </div>

          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '1.25rem', marginTop: '1rem' }}>
            <SectionLabel>Deep Customer Psychology</SectionLabel>
            <div style={{ background: '#1a0a0a', border: `1px solid ${C.red}30`, borderRadius: 10, padding: '12px 14px', marginBottom: '1rem' }}>
              <p style={{ fontSize: 12, color: '#888', margin: 0 }}>A good marketer sells features. A better marketer sells benefits. The <strong style={{ color: C.text }}>best marketer sells the feeling</strong> the customer will have. That's what you advertise.</p>
            </div>
            <Grid cols={2}>
              <TextArea label="What are they frustrated by? Why? How are they feeling?" value={r.customerFrustrations} onChange={v => upd({ customerFrustrations: v })} rows={3} />
              <TextArea label="What are they angry at? Why?" value={r.customerAnger} onChange={v => upd({ customerAnger: v })} rows={3} />
              <TextArea label="What keeps them up at night, eyes wide open, staring at the ceiling?" value={r.keepThemUpAtNight} onChange={v => upd({ keepThemUpAtNight: v })} rows={3} />
              <TextArea label="What happens if they DON'T buy and make a change?" value={r.consequenceOfNotBuying} onChange={v => upd({ consequenceOfNotBuying: v })} rows={3} />
              <TextArea label="The DREAM OUTCOME + FEELING they get from the solution" value={r.dreamOutcome} onChange={v => upd({ dreamOutcome: v })} rows={3} />
              <TextArea label="USP — what bodacious claims does this brand make?" value={r.productUSP} onChange={v => upd({ productUSP: v })} rows={3} />
            </Grid>
          </div>
        </div>
      )}

      {/* BRAND */}
      {tab === 'brand' && (
        <div>
          <SectionLabel>Part 2 — Understand the Brand</SectionLabel>
          <Grid cols={2}>
            <TextArea label="What is the brand's mission and values?" value={r.brandMission} onChange={v => upd({ brandMission: v })} rows={3} />
            <TextArea label="What sets this brand apart from competitors? (USP)" value={r.brandUSP} onChange={v => upd({ brandUSP: v })} rows={3} />
            <TextArea label="What is the brand's personality? How does it speak?" value={r.brandPersonality} onChange={v => upd({ brandPersonality: v })} rows={3} />
            <TextArea label="What is the brand's story and history?" value={r.brandStory} onChange={v => upd({ brandStory: v })} rows={3} />
            <TextArea label="What are the brand's winning products or services?" value={r.winningProducts} onChange={v => upd({ winningProducts: v })} rows={3} />
            <TextArea label="What channels do they currently use for marketing?" value={r.marketingChannels} onChange={v => upd({ marketingChannels: v })} rows={3} />
            <TextArea label="What are the brand's future goals and aspirations?" value={r.futureGoals} onChange={v => upd({ futureGoals: v })} rows={3} />
            <TextArea label="What feedback and reviews does the brand receive?" value={r.brandFeedback} onChange={v => upd({ brandFeedback: v })} rows={3} />
          </Grid>
        </div>
      )}

      {/* WHAT WORKED */}
      {tab === 'worked' && (
        <div>
          <SectionLabel>Part 3 — What Has WORKED</SectionLabel>
          <div style={{ background: C.greenBg, border: `1px solid ${C.green}30`, borderRadius: 10, padding: '12px 14px', marginBottom: '1rem' }}>
            <p style={{ fontSize: 13, color: C.textSub, margin: 0 }}>Find what has worked best and do 10x more of it. The answer is already there — you just need to find it and scale it.</p>
          </div>
          <Grid cols={2}>
            <TextArea label="Best months (in terms of sales) — when and why?" value={r.bestMonths} onChange={v => upd({ bestMonths: v })} rows={3} placeholder="e.g. November 2023 — BFCM campaign, founder video went viral..." />
            <TextArea label="What products were selling the most during best periods?" value={r.bestProducts} onChange={v => upd({ bestProducts: v })} rows={3} />
            <TextArea label="What ads were running during best months? What worked?" value={r.bestAds} onChange={v => upd({ bestAds: v })} rows={3} />
            <TextArea label="What offers were running? What drove the most conversions?" value={r.bestOffers} onChange={v => upd({ bestOffers: v })} rows={3} />
            <TextArea label="What content types worked best?" value={r.bestContent} onChange={v => upd({ bestContent: v })} placeholder="Videos, UGC, founder content, static images, what format?" onChange={v => upd({ bestContent: v })} rows={3} />
          </Grid>
        </div>
      )}

      {/* WHAT DIDN'T WORK */}
      {tab === 'notworked' && (
        <div>
          <SectionLabel>Part 4 — What Has NOT Worked</SectionLabel>
          <div style={{ background: C.redBg, border: `1px solid ${C.red}30`, borderRadius: 10, padding: '12px 14px', marginBottom: '1rem' }}>
            <p style={{ fontSize: 13, color: C.textSub, margin: 0 }}>Understand what didn't work so you never waste budget there again. Drop these things. Now.</p>
          </div>
          <Grid cols={2}>
            <TextArea label="Worst months — when and why? What failed?" value={r.worstMonths} onChange={v => upd({ worstMonths: v })} rows={3} />
            <TextArea label="What ads were running during worst months?" value={r.worstAds} onChange={v => upd({ worstAds: v })} rows={3} />
            <TextArea label="What content types did NOT work?" value={r.worstContent} onChange={v => upd({ worstContent: v })} rows={3} />
            <TextArea label="What offers failed or under-performed?" value={r.worstOffers} onChange={v => upd({ worstOffers: v })} rows={3} />
          </Grid>
        </div>
      )}

      {/* PRODUCTS */}
      {tab === 'products' && (
        <div>
          <SectionLabel action={<Btn onClick={addProduct} size="sm">+ Add Product</Btn>}>Top Winning Products — Features → Advantages → Benefits → Dream Outcome</SectionLabel>
          <div style={{ background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', marginBottom: '1rem' }}>
            <p style={{ fontSize: 12, color: C.textSub, margin: 0 }}><strong style={{ color: C.text }}>Feature</strong> → what it does. <strong style={{ color: C.text }}>Advantage</strong> → why that's useful. <strong style={{ color: C.text }}>Benefit</strong> → what it means for the customer. <strong style={{ color: C.text }}>Dream Outcome</strong> → the FEELING you market.</p>
          </div>
          {r.topProducts.map((p, i) => (
            <Card key={p.id} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Product #{i + 1}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Btn variant="danger" size="sm" onClick={() => removeProduct(p.id)}>✕ Remove</Btn>
                </div>
              </div>
              <Grid cols={2}>
                <Input label="Product Name" value={p.name} onChange={v => updateProduct(p.id, { name: v })} placeholder="e.g. Glow Serum 30ml" />
                <Grid cols={2} style={{ margin: 0 }}>
                  <Input label="Margin %" value={p.margin} onChange={v => updateProduct(p.id, { margin: v })} placeholder="e.g. 65%" />
                  <Input label="Monthly Revenue" value={p.monthlyRevenue} onChange={v => updateProduct(p.id, { monthlyRevenue: v })} placeholder="e.g. $28k" />
                </Grid>
              </Grid>
              <Grid cols={2}>
                <TextArea label="Features — what does the product do? (specs)" value={p.features} onChange={v => updateProduct(p.id, { features: v })} rows={3} placeholder="Clinical-grade formula, 2% retinol, 30-day supply..." />
                <TextArea label="Advantages — why is each feature helpful?" value={p.advantages} onChange={v => updateProduct(p.id, { advantages: v })} rows={3} placeholder="Clinically proven to reduce fine lines by 34%..." />
                <TextArea label="Benefits — what does this mean for the customer?" value={p.benefits} onChange={v => updateProduct(p.id, { benefits: v })} rows={3} placeholder="Clearer skin in 3 weeks, looks younger, feels confident..." />
                <TextArea label="Dream Outcome + FEELING — this is what you market" value={p.dreamOutcome} onChange={v => updateProduct(p.id, { dreamOutcome: v })} rows={3} placeholder="The feeling of finally walking into a room without worrying about your skin..." />
              </Grid>
            </Card>
          ))}
          {r.topProducts.length === 0 && (
            <div style={{ background: C.bgCard, border: `1px dashed ${C.border}`, borderRadius: 10, padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: C.textMuted }}>No products added. Add your top 5–10 winning products.</div>
              <Btn onClick={addProduct} style={{ marginTop: 12 }}>+ Add First Product</Btn>
            </div>
          )}
          <div style={{ marginTop: '1rem' }}>
            <TextArea label="Product margins overview — what is the margin ROAS target?" value={r.productMargins} onChange={v => upd({ productMargins: v })} rows={2} placeholder="e.g. Average margin 62%, ROAS target 3.5x to be profitable..." />
          </div>
        </div>
      )}

      {/* OFFERS */}
      {tab === 'offers' && (
        <div>
          <SectionLabel>Offer Intelligence — What Drives Conversions</SectionLabel>
          <div style={{ background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', marginBottom: '1rem' }}>
            <p style={{ fontSize: 12, color: C.textSub, margin: 0 }}>The right offer can 2–5x conversions overnight. Guarantee the dream outcome, not the product.</p>
          </div>
          <Grid cols={2}>
            <TextArea label="Current best offer running right now" value={r.currentOffer} onChange={v => upd({ currentOffer: v })} rows={3} placeholder="e.g. Buy 2 get 1 free, 20% off first order..." />
            <TextArea label="Proven offers from the past that WORKED — 10x these" value={r.provenOffers} onChange={v => upd({ provenOffers: v })} rows={3} placeholder="Which past offers drove the most sales? What was the mechanism?" />
          </Grid>
          <div style={{ background: '#0a1a2a', border: `1px solid ${C.blue}30`, borderRadius: 10, padding: '14px', marginBottom: '1rem' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.blue, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Offer Framework Ideas</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['2 for 1', '3 for 2', 'Free shipping over $X', 'Buy more → cheaper per unit', 'If you buy X, get X free', 'Bundle discount', 'Subscribe & save', 'Flash sale (24h only)', 'Launch discount', 'Referral reward', 'Loyalty points', 'Gift with purchase'].map(t => <Tag key={t} label={t} color={C.blue} />)}
            </div>
          </div>
          <Grid cols={2}>
            <TextArea label="Guarantee idea — guarantee the DREAM OUTCOME within X days or full refund" value={r.guaranteeIdea} onChange={v => upd({ guaranteeIdea: v })} rows={3} placeholder="e.g. See results in 30 days or 100% money back. No questions asked." />
            <TextArea label="Urgency offer — time-limited incentive" value={r.urgencyOffer} onChange={v => upd({ urgencyOffer: v })} rows={3} placeholder="e.g. Order in next 24h → free express shipping. Offer ends Sunday." />
            <TextArea label="Scarcity offer — limited availability" value={r.scarcityOffer} onChange={v => upd({ scarcityOffer: v })} rows={3} placeholder="e.g. Only 47 units left at this price. Next batch ships in 3 weeks." />
            <TextArea label="Bundle ideas — what products go together?" value={r.bundleIdeas} onChange={v => upd({ bundleIdeas: v })} rows={3} placeholder="e.g. Serum + moisturiser bundle at 25% off — highest AOV combo..." />
          </Grid>
        </div>
      )}

      {/* COMPETITORS */}
      {tab === 'competitors' && (
        <div>
          <SectionLabel action={<Btn onClick={addCompetitor} size="sm">+ Add Competitor</Btn>}>Competitor Intelligence — Top 5 Brands in the Space</SectionLabel>
          <div style={{ background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', marginBottom: '1rem' }}>
            <p style={{ fontSize: 12, color: C.textSub, margin: 0 }}>The ads running the longest = the ads working best. Find their oldest active ads in the ad library. That's your research.</p>
          </div>
          {r.competitors.map((comp, i) => (
            <Card key={comp.id} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Competitor #{i + 1}</div>
                <Btn variant="danger" size="sm" onClick={() => removeCompetitor(comp.id)}>✕</Btn>
              </div>
              <Grid cols={3}>
                <Input label="Brand Name" value={comp.name} onChange={v => updateCompetitor(comp.id, { name: v })} placeholder="e.g. The Ordinary" />
                <Input label="Website" value={comp.website} onChange={v => updateCompetitor(comp.id, { website: v })} placeholder="theordinary.com" />
                <Input label="Ads Library URL" value={comp.adsLibrary} onChange={v => updateCompetitor(comp.id, { adsLibrary: v })} placeholder="facebook.com/ads/library/..." />
              </Grid>
              <Grid cols={2}>
                <TextArea label="Estimated revenue / size" value={comp.revenue} onChange={v => updateCompetitor(comp.id, { revenue: v })} rows={2} placeholder="e.g. $50M+ annual, 400k Instagram followers..." />
                <TextArea label="Longest-running ad (oldest active ad = best performing)" value={comp.longestRunningAd} onChange={v => updateCompetitor(comp.id, { longestRunningAd: v })} rows={2} placeholder="Running since Jan 2023 — founder talking to camera, problem hook..." />
                <TextArea label="Why are they ahead of us? What do they do better?" value={comp.whyAhead} onChange={v => updateCompetitor(comp.id, { whyAhead: v })} rows={2} placeholder="Better product imagery, stronger social proof, more founder content..." />
                <TextArea label="Notes — messaging, offers, positioning, content" value={comp.notes} onChange={v => updateCompetitor(comp.id, { notes: v })} rows={2} />
              </Grid>
            </Card>
          ))}
          {r.competitors.length === 0 && (
            <div style={{ background: C.bgCard, border: `1px dashed ${C.border}`, borderRadius: 10, padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: C.textMuted }}>Add at least 5 competitors. Go to the Meta Ads Library and find their oldest running ads.</div>
              <Btn onClick={addCompetitor} style={{ marginTop: 12 }}>+ Add Competitor</Btn>
            </div>
          )}
        </div>
      )}

      {/* PLATFORMS */}
      {tab === 'platforms' && (
        <div>
          <SectionLabel>Platform History — What Has Been Tested Where</SectionLabel>
          <Grid cols={2}>
            <TextArea label="META — What have they tested?" value={r.metaTested} onChange={v => upd({ metaTested: v })} rows={3} />
            <TextArea label="META — What has worked? What has not?" value={r.metaWorked} onChange={v => upd({ metaWorked: v })} rows={3} />
            <TextArea label="META — What should we test next / make more of?" value={r.metaToTest} onChange={v => upd({ metaToTest: v })} rows={3} />
            <TextArea label="GOOGLE — What have they tested?" value={r.googleTested} onChange={v => upd({ googleTested: v })} rows={3} />
            <TextArea label="GOOGLE — What has worked? What has not?" value={r.googleWorked} onChange={v => upd({ googleWorked: v })} rows={3} />
            <TextArea label="GOOGLE — What should we test next?" value={r.googleToTest} onChange={v => upd({ googleToTest: v })} rows={3} />
            <TextArea label="TikTok — Tested? What happened? Worth testing?" value={r.tiktokTested} onChange={v => upd({ tiktokTested: v })} rows={3} />
            <TextArea label="Snapchat + Pinterest — Tested? Worth it for this audience?" value={r.snapchatTested} onChange={v => upd({ snapchatTested: v })} rows={3} />
          </Grid>
        </div>
      )}
    </div>
  )
}
