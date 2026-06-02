export type ModuleId = 'command' | 'research' | 'attribution' | 'cro' | 'creative' | 'paid' | 'retention'

export interface Client {
  id: string
  name: string
  industry: string
  color: string
  avatar: string
  monthlyRevenue: string
  status: 'active' | 'onboarding' | 'paused'
  createdAt: string
  // Research module data
  research: ResearchData
  // Attribution
  attribution: AttributionData
  // CRO
  cro: CROData
  // Creative
  creative: CreativeData
  // Paid
  paid: PaidData
  // Retention
  retention: RetentionData
}

export interface ResearchData {
  // Part 1: Customer
  customerDemographics: string
  customerPainPoints: string
  customerMotivations: string
  onlineHangouts: string
  shoppingBehaviors: string
  objections: string
  buyerPersonas: PersonaData[]
  // Part 2: Brand
  brandMission: string
  brandUSP: string
  brandPersonality: string
  brandStory: string
  winningProducts: string
  marketingChannels: string
  futureGoals: string
  brandFeedback: string
  // Part 3: What worked
  bestMonths: string
  bestAds: string
  bestContent: string
  bestOffers: string
  bestProducts: string
  // Part 4: What didn't work
  worstMonths: string
  worstAds: string
  worstContent: string
  worstOffers: string
  // Product deep dive
  productValue: string
  customerFrustrations: string
  customerAnger: string
  keepThemUpAtNight: string
  consequenceOfNotBuying: string
  dreamOutcome: string
  productUSP: string
  productMargins: string
  // Platform history
  metaTested: string
  metaWorked: string
  metaToTest: string
  googleTested: string
  googleWorked: string
  googleToTest: string
  tiktokTested: string
  snapchatTested: string
  pinterestTested: string
  // Top products
  topProducts: TopProduct[]
  // Competitors
  competitors: Competitor[]
  // Offers
  currentOffer: string
  guaranteeIdea: string
  urgencyOffer: string
  scarcityOffer: string
  bundleIdeas: string
  provenOffers: string
}

export interface PersonaData {
  id: string
  name: string
  age: string
  gender: string
  platforms: string
  problems: string
  language: string
  dreamOutcome: string
  objections: string
}

export interface TopProduct {
  id: string
  name: string
  features: string
  advantages: string
  benefits: string
  dreamOutcome: string
  margin: string
  monthlyRevenue: string
}

export interface Competitor {
  id: string
  name: string
  website: string
  adsLibrary: string
  revenue: string
  whyAhead: string
  longestRunningAd: string
  notes: string
}

export interface AttributionData {
  pixelInstalled: boolean
  gaInstalled: boolean
  thirdPartyTracking: string
  cac: string
  ncRoas: string
  mer: string
  ltv: string
  aov: string
  blendedRoas: string
  repeatPurchaseRate: string
  channelBreakdown: ChannelData[]
  notes: string
}

export interface ChannelData {
  channel: string
  spend: string
  revenue: string
  roas: string
  cac: string
  status: 'scale' | 'maintain' | 'review' | 'pause'
}

export interface CROData {
  hotjarInstalled: boolean
  overallCVR: string
  mobileCVR: string
  desktopCVR: string
  funnelSteps: FunnelStep[]
  homepageChecklist: ChecklistItem[]
  productPageChecklist: ChecklistItem[]
  landingPageChecklist: ChecklistItem[]
  cartChecklist: ChecklistItem[]
  checkoutChecklist: ChecklistItem[]
  thankYouChecklist: ChecklistItem[]
  criticalFixes: string
  abTestsRunning: string
  sentToClient: boolean
  clientDoingItThemselves: boolean
}

export interface FunnelStep {
  name: string
  pct: number
  critical: boolean
}

export interface ChecklistItem {
  id: string
  text: string
  status: 'yes' | 'no' | 'na' | 'todo'
  priority: 'critical' | 'high' | 'medium' | 'low'
  notes: string
}

export interface CreativeData {
  winningCreatives: CreativeItem[]
  anglesTested: AngleItem[]
  hooks: HookItem[]
  scriptFramework: string
  influencerIdeas: string
  contentCalendar: string
  abTestResults: string
  videoLengthAnalysis: string
  ugcStrategy: string
  founderContentPlan: string
}

export interface CreativeItem {
  id: string
  name: string
  type: 'video' | 'image' | 'ugc' | 'founder' | 'meme' | 'lifestyle' | 'static'
  hookRate: string
  cpa: string
  ctr: string
  holdRate: string
  status: 'winner' | 'testing' | 'fatigue' | 'paused'
  notes: string
  angle: string
}

export interface AngleItem {
  id: string
  angle: string
  type: string
  result: 'winner' | 'testing' | 'failed'
  notes: string
}

export interface HookItem {
  id: string
  hookText: string
  hookRate: string
  result: 'winner' | 'testing' | 'failed'
}

export interface PaidData {
  totalWeeklyBudget: string
  tofPct: number
  mofPct: number
  bofPct: number
  retargetingPct: number
  platforms: PlatformData[]
  campaignStructure: string
  testingCampaign: string
  winningCampaign: string
  scalingRules: string
  backendRevenueAligned: boolean
  backendNotes: string
  copyFramework: CopyFramework
  clientCommunicationLog: string
}

export interface PlatformData {
  platform: string
  active: boolean
  spend: string
  roas: string
  cac: string
  status: 'scale' | 'maintain' | 'review' | 'pause' | 'not-tested'
  notes: string
}

export interface CopyFramework {
  headline: string
  primaryText: string
  description: string
  cta: string
  offer: string
}

export interface RetentionData {
  platform: string
  klaviyoIntegrated: boolean
  listSize: string
  emailRevenue30d: string
  repeatPurchaseRate: string
  winbackRate: string
  flows: FlowData[]
  segments: SegmentData[]
  smsActive: boolean
  referralProgram: boolean
  referralNotes: string
  segmentationStrategy: string
  personalizationNotes: string
}

export interface FlowData {
  id: string
  name: string
  status: 'live' | 'draft' | 'build' | 'optimize'
  trigger: string
  emails: number
  openRate: string
  cvr: string
  revenue30d: string
  notes: string
}

export interface SegmentData {
  id: string
  name: string
  size: string
  ltv: string
  strategy: string
}

// Default empty client template
export function createEmptyClient(name: string, industry: string): Client {
  const id = Date.now().toString()
  const colors = ['#4F46E5', '#0F766E', '#B45309', '#7C3AED', '#0369A1', '#065F46', '#DC2626', '#D97706']
  const color = colors[Math.floor(Math.random() * colors.length)]
  const avatars = ['🛍️', '💄', '👟', '🏋️', '🍃', '💊', '🏠', '🎯', '🔥', '⚡']
  const avatar = avatars[Math.floor(Math.random() * avatars.length)]

  return {
    id, name, industry, color, avatar,
    monthlyRevenue: '—', status: 'onboarding', createdAt: new Date().toISOString(),
    research: {
      customerDemographics: '', customerPainPoints: '', customerMotivations: '',
      onlineHangouts: '', shoppingBehaviors: '', objections: '',
      buyerPersonas: [], brandMission: '', brandUSP: '', brandPersonality: '',
      brandStory: '', winningProducts: '', marketingChannels: '', futureGoals: '',
      brandFeedback: '', bestMonths: '', bestAds: '', bestContent: '',
      bestOffers: '', bestProducts: '', worstMonths: '', worstAds: '',
      worstContent: '', worstOffers: '', productValue: '', customerFrustrations: '',
      customerAnger: '', keepThemUpAtNight: '', consequenceOfNotBuying: '',
      dreamOutcome: '', productUSP: '', productMargins: '', metaTested: '',
      metaWorked: '', metaToTest: '', googleTested: '', googleWorked: '',
      googleToTest: '', tiktokTested: '', snapchatTested: '', pinterestTested: '',
      topProducts: [], competitors: [], currentOffer: '', guaranteeIdea: '',
      urgencyOffer: '', scarcityOffer: '', bundleIdeas: '', provenOffers: '',
    },
    attribution: {
      pixelInstalled: false, gaInstalled: false, thirdPartyTracking: '',
      cac: '', ncRoas: '', mer: '', ltv: '', aov: '', blendedRoas: '',
      repeatPurchaseRate: '', channelBreakdown: [], notes: '',
    },
    cro: {
      hotjarInstalled: false, overallCVR: '', mobileCVR: '', desktopCVR: '',
      funnelSteps: [
        { name: 'Landing page', pct: 100, critical: false },
        { name: 'Product page', pct: 0, critical: false },
        { name: 'Add to cart', pct: 0, critical: false },
        { name: 'Checkout start', pct: 0, critical: false },
        { name: 'Shipping step', pct: 0, critical: false },
        { name: 'Purchase', pct: 0, critical: false },
      ],
      homepageChecklist: [], productPageChecklist: [], landingPageChecklist: [],
      cartChecklist: [], checkoutChecklist: [], thankYouChecklist: [],
      criticalFixes: '', abTestsRunning: '', sentToClient: false, clientDoingItThemselves: false,
    },
    creative: {
      winningCreatives: [], anglesTested: [], hooks: [], scriptFramework: '',
      influencerIdeas: '', contentCalendar: '', abTestResults: '',
      videoLengthAnalysis: '', ugcStrategy: '', founderContentPlan: '',
    },
    paid: {
      totalWeeklyBudget: '', tofPct: 70, mofPct: 15, bofPct: 10, retargetingPct: 5,
      platforms: [
        { platform: 'Meta', active: false, spend: '', roas: '', cac: '', status: 'not-tested', notes: '' },
        { platform: 'Google', active: false, spend: '', roas: '', cac: '', status: 'not-tested', notes: '' },
        { platform: 'TikTok', active: false, spend: '', roas: '', cac: '', status: 'not-tested', notes: '' },
        { platform: 'Snapchat', active: false, spend: '', roas: '', cac: '', status: 'not-tested', notes: '' },
        { platform: 'Pinterest', active: false, spend: '', roas: '', cac: '', status: 'not-tested', notes: '' },
      ],
      campaignStructure: '', testingCampaign: '', winningCampaign: '',
      scalingRules: '', backendRevenueAligned: false, backendNotes: '',
      copyFramework: { headline: '', primaryText: '', description: '', cta: '', offer: '' },
      clientCommunicationLog: '',
    },
    retention: {
      platform: 'Klaviyo', klaviyoIntegrated: false, listSize: '', emailRevenue30d: '',
      repeatPurchaseRate: '', winbackRate: '',
      flows: [
        { id: '1', name: 'Welcome Series', status: 'build', trigger: 'Joins email list', emails: 5, openRate: '', cvr: '', revenue30d: '', notes: '' },
        { id: '2', name: 'Abandoned Cart', status: 'build', trigger: 'Started checkout', emails: 3, openRate: '', cvr: '', revenue30d: '', notes: '' },
        { id: '3', name: 'Browse Abandonment', status: 'build', trigger: 'Viewed product', emails: 2, openRate: '', cvr: '', revenue30d: '', notes: '' },
        { id: '4', name: 'Post-Purchase', status: 'build', trigger: 'Placed order', emails: 4, openRate: '', cvr: '', revenue30d: '', notes: '' },
        { id: '5', name: 'Review Request', status: 'build', trigger: 'Fulfilled order', emails: 2, openRate: '', cvr: '', revenue30d: '', notes: '' },
        { id: '6', name: 'Win-Back', status: 'build', trigger: '60d no purchase', emails: 4, openRate: '', cvr: '', revenue30d: '', notes: '' },
        { id: '7', name: 'Replenishment', status: 'build', trigger: 'Day 37 post-purchase', emails: 2, openRate: '', cvr: '', revenue30d: '', notes: '' },
        { id: '8', name: 'VIP Flow', status: 'build', trigger: '3+ orders', emails: 3, openRate: '', cvr: '', revenue30d: '', notes: '' },
        { id: '9', name: 'Back-in-Stock', status: 'build', trigger: 'Item restocked', emails: 1, openRate: '', cvr: '', revenue30d: '', notes: '' },
        { id: '10', name: 'Price Drop', status: 'build', trigger: 'Price reduced', emails: 1, openRate: '', cvr: '', revenue30d: '', notes: '' },
      ],
      segments: [
        { id: '1', name: 'Non-buyers', size: '', ltv: '$0', strategy: '' },
        { id: '2', name: 'First-time customers', size: '', ltv: '', strategy: '' },
        { id: '3', name: 'Repeat customers (2+)', size: '', ltv: '', strategy: '' },
        { id: '4', name: 'VIPs (high LTV)', size: '', ltv: '', strategy: '' },
        { id: '5', name: 'At-risk (45d+)', size: '', ltv: '', strategy: '' },
        { id: '6', name: 'Lapsed (90d+)', size: '', ltv: '', strategy: '' },
        { id: '7', name: 'Discount-sensitive', size: '', ltv: '', strategy: '' },
        { id: '8', name: 'Full-price buyers', size: '', ltv: '', strategy: '' },
      ],
      smsActive: false, referralProgram: false, referralNotes: '',
      segmentationStrategy: '', personalizationNotes: '',
    },
  }
}
