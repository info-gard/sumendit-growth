'use client'
import { useState } from 'react'
import type { Client } from '@/lib/types'
import { StatusBadge } from './ui'

export default function ClientSelector({ clients, activeId, onSelect }: { clients: Client[]; activeId: string; onSelect: (id: string) => void }) {
  const [open, setOpen] = useState(false)
  const active = clients.find(c => c.id === activeId) || clients[0]

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 12px', background: '#111120', border: '1px solid #1e1e32', borderRadius: 8, cursor: 'pointer', color: '#e8e8f0' }}>
        <span style={{ fontSize: 16 }}>{active?.avatar}</span>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#e8e8f0' }}>{active?.name}</div>
          <div style={{ fontSize: 11, color: '#555570' }}>{active?.industry}</div>
        </div>
        <span style={{ color: '#444460', fontSize: 12, marginLeft: 4 }}>▾</span>
      </button>

      {open && (
        <div style={{ position: 'absolute', top: '110%', left: 0, background: '#0d0d1a', border: '1px solid #1e1e32', borderRadius: 10, minWidth: 240, zIndex: 50, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid #1e1e32', fontSize: 11, color: '#444460', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Switch Client</div>
          {clients.map(c => (
            <div key={c.id} onClick={() => { onSelect(c.id); setOpen(false) }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', cursor: 'pointer', background: c.id === activeId ? '#111120' : 'transparent', borderBottom: '1px solid #0f0f1e' }}>
              <span style={{ fontSize: 18 }}>{c.avatar}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#e8e8f0' }}>{c.name}</div>
                <div style={{ fontSize: 11, color: '#555570' }}>{c.industry} · {c.monthlyRevenue}</div>
              </div>
              <StatusBadge status={c.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
