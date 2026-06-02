'use client'
import type { ModuleId, Client } from '@/lib/types'
import { C } from './ui'

const nav = [
  { id: 'command', label: 'Command Center', icon: '⚡', sub: 'Live overview' },
  { id: 'research', label: 'Research', icon: '🔬', sub: 'Module 1' },
  { id: 'attribution', label: 'Attribution', icon: '🎯', sub: 'Module 2' },
  { id: 'cro', label: 'Website / CRO', icon: '🔍', sub: 'Module 3' },
  { id: 'creative', label: 'Creative', icon: '🎬', sub: 'Module 4' },
  { id: 'paid', label: 'Paid Ads', icon: '💸', sub: 'Module 5' },
  { id: 'retention', label: 'Retention & Email', icon: '🔁', sub: 'Module 6' },
]

export default function Sidebar({ activeModule, onNavigate, client }: { activeModule: ModuleId; onNavigate: (id: ModuleId) => void; client: Client }) {
  return (
    <aside style={{ width: 210, minWidth: 210, background: '#09090f', borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
      {/* Logo */}
      <div style={{ padding: '1.25rem', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⚡</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: C.text, letterSpacing: '-0.3px' }}>Sumen</div>
            <div style={{ fontSize: 11, color: C.textMuted }}>Growth OS</div>
          </div>
        </div>
      </div>

      {/* Client badge */}
      <div style={{ padding: '10px 14px', borderBottom: `1px solid ${C.border}`, background: C.bgSection }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>{client.avatar}</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{client.name}</div>
            <div style={{ fontSize: 11, color: C.textMuted }}>{client.monthlyRevenue || 'No revenue data'}</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px' }}>
        {nav.map(item => {
          const isActive = activeModule === item.id
          return (
            <button key={item.id} onClick={() => onNavigate(item.id as ModuleId)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '9px 10px', marginBottom: 2, borderRadius: 8, border: 'none', cursor: 'pointer', background: isActive ? `${C.accent}20` : 'transparent', color: isActive ? C.accent : C.textSub, textAlign: 'left', borderLeft: isActive ? `2px solid ${C.accent}` : '2px solid transparent' }}
              onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = C.bgSection }}
              onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: isActive ? 600 : 400 }}>{item.label}</div>
                <div style={{ fontSize: 10, opacity: 0.6 }}>{item.sub}</div>
              </div>
            </button>
          )
        })}
      </nav>

      <div style={{ padding: '12px 14px', borderTop: `1px solid ${C.border}`, fontSize: 11, color: C.textMuted }}>
        AI Growth Transformation OS · v2.0
      </div>
    </aside>
  )
}
