'use client'
import { useState, useEffect } from 'react'
import type { Client, ModuleId } from '@/lib/types'
import { createEmptyClient } from '@/lib/types'
import Sidebar from '@/components/Sidebar'
import CommandCenter from '@/components/modules/CommandCenter'
import ModuleResearch from '@/components/modules/ModuleResearch'
import ModuleAttribution from '@/components/modules/ModuleAttribution'
import ModuleCRO from '@/components/modules/ModuleCRO'
import ModuleCreative from '@/components/modules/ModuleCreative'
import ModulePaid from '@/components/modules/ModulePaid'
import ModuleRetention from '@/components/modules/ModuleRetention'
import ClientSelector from '@/components/ClientSelector'

const STORAGE_KEY = 'sumen_growth_os_clients'
const ACTIVE_KEY = 'sumen_active_client'

const DEMO_CLIENT = createEmptyClient('Demo Brand', 'Beauty & Skincare')
DEMO_CLIENT.id = 'demo'
DEMO_CLIENT.monthlyRevenue = '$106k'
DEMO_CLIENT.status = 'active'
DEMO_CLIENT.attribution.cac = '$38'
DEMO_CLIENT.attribution.mer = '3.2x'
DEMO_CLIENT.attribution.ltv = '$124'
DEMO_CLIENT.attribution.aov = '$67'

export default function Home() {
  const [clients, setClients] = useState<Client[]>([DEMO_CLIENT])
  const [activeClientId, setActiveClientId] = useState<string>('demo')
  const [activeModule, setActiveModule] = useState<ModuleId>('command')
  const [showNewClient, setShowNewClient] = useState(false)
  const [newName, setNewName] = useState('')
  const [newIndustry, setNewIndustry] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const storedActive = localStorage.getItem(ACTIVE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setClients([DEMO_CLIENT, ...parsed.filter((c: Client) => c.id !== 'demo')])
      } catch {}
    }
    if (storedActive) setActiveClientId(storedActive)
  }, [])

  const saveClients = (updated: Client[]) => {
    setClients(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.filter(c => c.id !== 'demo')))
  }

  const activeClient = clients.find(c => c.id === activeClientId) || clients[0]

  const updateClient = (updated: Client) => {
    const newClients = clients.map(c => c.id === updated.id ? updated : c)
    saveClients(newClients)
  }

  const addClient = () => {
    if (!newName.trim()) return
    const c = createEmptyClient(newName.trim(), newIndustry || 'General')
    const updated = [...clients, c]
    saveClients(updated)
    setActiveClientId(c.id)
    localStorage.setItem(ACTIVE_KEY, c.id)
    setActiveModule('command')
    setShowNewClient(false)
    setNewName('')
    setNewIndustry('')
  }

  const switchClient = (id: string) => {
    setActiveClientId(id)
    localStorage.setItem(ACTIVE_KEY, id)
    setActiveModule('command')
  }

  const moduleProps = { client: activeClient, onUpdate: updateClient }

  const panels: Record<ModuleId, React.ReactNode> = {
    command: <CommandCenter {...moduleProps} onNavigate={setActiveModule} />,
    research: <ModuleResearch {...moduleProps} />,
    attribution: <ModuleAttribution {...moduleProps} />,
    cro: <ModuleCRO {...moduleProps} />,
    creative: <ModuleCreative {...moduleProps} />,
    paid: <ModulePaid {...moduleProps} />,
    retention: <ModuleRetention {...moduleProps} />,
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#07070f' }}>
      <Sidebar activeModule={activeModule} onNavigate={setActiveModule} client={activeClient} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top client bar */}
        <div style={{ background: '#0a0a16', borderBottom: '1px solid #1e1e32', padding: '0 2rem', display: 'flex', alignItems: 'center', gap: 12, height: 52, flexShrink: 0 }}>
          <ClientSelector clients={clients} activeId={activeClientId} onSelect={switchClient} />
          <button
            onClick={() => setShowNewClient(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: '#4F46E5', color: '#fff', border: 'none', borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
          >+ New Client</button>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#444460' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
            Sumen Growth OS
          </div>
        </div>

        {/* Main content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '2rem 2.5rem' }}>
          {panels[activeModule]}
        </main>
      </div>

      {/* New client modal */}
      {showNewClient && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#0d0d1a', border: '1px solid #2e2e4a', borderRadius: 14, padding: '2rem', width: 420 }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#e8e8f0', marginBottom: 4 }}>Add New Client</div>
            <div style={{ fontSize: 13, color: '#555570', marginBottom: 20 }}>A fresh Growth OS workspace will be created for this client.</div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, color: '#888899', display: 'block', marginBottom: 5 }}>Client / Brand Name *</label>
              <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Glow Beauty Co." onKeyDown={e => e.key === 'Enter' && addClient()} autoFocus />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, color: '#888899', display: 'block', marginBottom: 5 }}>Industry</label>
              <input value={newIndustry} onChange={e => setNewIndustry(e.target.value)} placeholder="e.g. Beauty, Fashion, Supplements..." />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={addClient} disabled={!newName.trim()} style={{ flex: 1, padding: '10px', background: newName.trim() ? '#4F46E5' : '#2a2a3a', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: newName.trim() ? 'pointer' : 'default' }}>
                Create workspace ↗
              </button>
              <button onClick={() => setShowNewClient(false)} style={{ padding: '10px 16px', background: 'transparent', color: '#888899', border: '1px solid #1e1e32', borderRadius: 8, fontSize: 14, cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
