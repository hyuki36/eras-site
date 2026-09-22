import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TOOLS } from '../data/tools.js'
const BRAND_ICON = 'https://media.discordapp.net/attachments/1550135756339552316/1551971953143975946/3b482209-7cd6-4655-bf05-e2c4f4b243e4.png?ex=6ab3ea03&is=6ab29883&hm=fb4bedeada75230cd2229820ca94162d0af044912e3d69ec5fda257dc8cb2be9&=&format=webp&quality=lossless&width=640&height=640'
export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mono" style={{ display: 'inline-block', border: '1px solid rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: 999, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>FREE LUA TOOLS</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, margin: '16px 0' }}>
          <img src={BRAND_ICON} alt="Eras" style={{ width: 72, height: 72, borderRadius: 20, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 10px 40px rgba(0,0,0,0.6)' }} />
          <h1 style={{ fontSize: 64, fontWeight: 900, letterSpacing: -2, margin: 0 }}>Eras<span style={{ color: 'rgba(255,255,255,0.4)' }}>D</span></h1>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '0 auto 24px' }}>Deobfuscate & analyze Lua scripts. 15 free tools powered by https://leakd.up.railway.app/</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/tool" className="btn-white" style={{ width: 180 }}>Launch Tools</Link>
          <Link to="/api" style={{ width: 180, padding: 14, borderRadius: 14, border: '1px solid rgba(255,255,255,0.2)', fontWeight: 700, fontSize: 13 }}>API Docs</Link>
        </div>
      </motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 12, marginTop: 40, textAlign: 'left' }}>
        {TOOLS.map(t => (
          <Link key={t.id} to="/tool" className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 800 }}>{t.name}</div>
            <div className="mono" style={{ fontSize: 11, color: '#34d399', margin: '4px 0' }}>{t.badge}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{t.description}</div>
            <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 8 }}>POST /{t.id}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
