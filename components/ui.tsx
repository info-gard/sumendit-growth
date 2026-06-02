import React from 'react'

export const C = {
  bg: '#07070f', bgCard: '#0d0d1a', bgSection: '#111120',
  border: '#1e1e32', borderHover: '#2e2e4a',
  text: '#e8e8f0', textSub: '#888899', textMuted: '#444460',
  accent: '#4F46E5', accentHover: '#4338CA',
  green: '#22c55e', greenBg: '#0a2a15',
  red: '#ef4444', redBg: '#2a0a0a',
  amber: '#f59e0b', amberBg: '#2a1f0a',
  blue: '#60a5fa', blueBg: '#0a1a2a',
  purple: '#a78bfa', purpleBg: '#1a0a2a',
}

export function PageHeader({ title, subtitle, color = C.accent, icon }: { title: string; subtitle: string; color?: string; icon: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, background: C.bgSection, borderRadius: 12, padding: '1.25rem 1.5rem', border: `1px solid ${C.border}`, marginBottom: '1.5rem' }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{icon}</div>
      <div>
        <h1 style={{ fontSize: 17, fontWeight: 600, color: C.text, margin: 0 }}>{title}</h1>
        <p style={{ fontSize: 13, color: C.textSub, marginTop: 4, lineHeight: 1.55, margin: '4px 0 0' }}>{subtitle}</p>
      </div>
    </div>
  )
}

export function SectionLabel({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: C.textMuted }}>{children}</div>
      {action}
    </div>
  )
}

export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px', ...style }}>{children}</div>
}

export function Grid({ cols = 2, children, style }: { cols?: number; children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 10, marginBottom: '1.25rem', ...style }}>{children}</div>
}

export function KpiCard({ label, value, delta, deltaType = 'neutral' }: { label: string; value: string; delta?: string; deltaType?: 'up' | 'down' | 'neutral' }) {
  const dc = deltaType === 'up' ? C.green : deltaType === 'down' ? C.red : C.textSub
  return (
    <Card>
      <div style={{ fontSize: 12, color: C.textSub, marginBottom: 5 }}>{label}</div>
      <div style={{ fontSize: 21, fontWeight: 600, color: C.text }}>{value || '—'}</div>
      {delta && <div style={{ fontSize: 11, color: dc, marginTop: 3 }}>{delta}</div>}
    </Card>
  )
}

export function InsightBadge({ type, text }: { type: 'critical' | 'win' | 'action' | 'info' | 'warn'; text: string }) {
  const styles = {
    critical: { bg: C.redBg, color: C.red, label: '🔴 Critical' },
    win: { bg: C.greenBg, color: C.green, label: '🟢 Win' },
    action: { bg: C.blueBg, color: C.blue, label: '🔵 Action' },
    info: { bg: C.purpleBg, color: C.purple, label: '💡 Insight' },
    warn: { bg: C.amberBg, color: C.amber, label: '🟡 Watch' },
  }
  const s = styles[type]
  return (
    <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, padding: '11px 14px', display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 7 }}>
      <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6, background: s.bg, color: s.color, whiteSpace: 'nowrap', flexShrink: 0, marginTop: 1 }}>{s.label}</span>
      <span style={{ fontSize: 13, color: '#c8c8d8', lineHeight: 1.55 }}>{text}</span>
    </div>
  )
}

export function Tag({ label, color = C.accent, bg }: { label: string; color?: string; bg?: string }) {
  return <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 20, background: bg || `${color}20`, color, border: `1px solid ${color}40`, display: 'inline-block', marginRight: 4, marginBottom: 4 }}>{label}</span>
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { color: string; bg: string }> = {
    live: { color: C.green, bg: C.greenBg },
    winner: { color: C.green, bg: C.greenBg },
    scale: { color: C.green, bg: C.greenBg },
    active: { color: C.green, bg: C.greenBg },
    build: { color: C.amber, bg: C.amberBg },
    testing: { color: C.blue, bg: C.blueBg },
    maintain: { color: C.blue, bg: C.blueBg },
    onboarding: { color: C.amber, bg: C.amberBg },
    optimize: { color: C.purple, bg: C.purpleBg },
    fatigue: { color: C.red, bg: C.redBg },
    pause: { color: C.red, bg: C.redBg },
    paused: { color: C.textSub, bg: C.bgSection },
    draft: { color: C.textSub, bg: C.bgSection },
    review: { color: C.amber, bg: C.amberBg },
    'not-tested': { color: C.textMuted, bg: C.bgSection },
  }
  const s = map[status] || { color: C.textSub, bg: C.bgSection }
  return <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: s.bg, color: s.color, textTransform: 'capitalize' }}>{status.replace('-', ' ')}</span>
}

export function BarRow({ label, value, max, color, stat }: { label: string; value: number; max: number; color: string; stat: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 14px', background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, marginBottom: 6 }}>
      <span style={{ fontSize: 13, color: '#c8c8d8', width: 110, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, background: C.bgSection, borderRadius: 4, height: 7, overflow: 'hidden' }}>
        <div style={{ width: `${Math.min(100, (value / max) * 100)}%`, height: '100%', background: color, borderRadius: 4 }} />
      </div>
      <span style={{ fontSize: 12, color: C.textSub, width: 80, textAlign: 'right', flexShrink: 0 }}>{stat}</span>
    </div>
  )
}

export function Btn({ children, onClick, variant = 'primary', size = 'md', style }: { children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'ghost' | 'danger' | 'success'; size?: 'sm' | 'md'; style?: React.CSSProperties }) {
  const variants = {
    primary: { background: C.accent, color: '#fff', border: 'none' },
    ghost: { background: 'transparent', color: C.textSub, border: `1px solid ${C.border}` },
    danger: { background: C.redBg, color: C.red, border: `1px solid ${C.red}40` },
    success: { background: C.greenBg, color: C.green, border: `1px solid ${C.green}40` },
  }
  const sizes = { sm: { padding: '5px 12px', fontSize: 12 }, md: { padding: '8px 16px', fontSize: 13 } }
  return (
    <button onClick={onClick} style={{ borderRadius: 8, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', ...variants[variant], ...sizes[size], ...style }}>
      {children}
    </button>
  )
}

export function TextArea({ label, value, onChange, placeholder, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ fontSize: 12, color: C.textSub, display: 'block', marginBottom: 5 }}>{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} />
    </div>
  )
}

export function Input({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      {label && <label style={{ fontSize: 12, color: C.textSub, display: 'block', marginBottom: 5 }}>{label}</label>}
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  )
}

export function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
      <span style={{ fontSize: 13, color: C.text }}>{label}</span>
      <div onClick={() => onChange(!value)} style={{ width: 40, height: 22, borderRadius: 11, background: value ? C.accent : C.bgSection, border: `1px solid ${value ? C.accent : C.border}`, cursor: 'pointer', position: 'relative', transition: 'all 0.2s' }}>
        <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: value ? 20 : 2, transition: 'left 0.2s' }} />
      </div>
    </div>
  )
}

export function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div style={{ marginBottom: 12 }}>
      {label && <label style={{ fontSize: 12, color: C.textSub, display: 'block', marginBottom: 5 }}>{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

export function TabBar({ tabs, active, onChange }: { tabs: { id: string; label: string }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div style={{ display: 'flex', gap: 4, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{ padding: '6px 14px', fontSize: 12, fontWeight: 500, borderRadius: 7, border: `1px solid ${active === t.id ? C.accent : C.border}`, background: active === t.id ? C.accent : 'transparent', color: active === t.id ? '#fff' : C.textSub, cursor: 'pointer', fontFamily: 'inherit' }}>{t.label}</button>
      ))}
    </div>
  )
}
