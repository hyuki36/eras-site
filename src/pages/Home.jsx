import { Link } from 'react-router-dom'
import { TOOLS } from '../data/tools.js'
const BRAND_ICON = 'https://media.discordapp.net/attachments/1550135756339552316/1551971953143975946/3b482209-7cd6-4655-bf05-e2c4f4b243e4.png?ex=6ab3ea03&is=6ab29883&hm=fb4bedeada75230cd2229820ca94162d0af044912e3d69ec5fda257dc8cb2be9&=&format=webp&quality=lossless&width=640&height=640'
export default function Home() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 0 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <img src={BRAND_ICON} alt="Eras" style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.15)' }} />
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>Eras</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, margin: '2px 0 0' }}>Free Lua deobfuscator tools.</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <Link to="/tool" className="btn-white" style={{ width: 160, padding: 12 }}>Open Tools</Link>
        <Link to="/api" style={{ width: 160, padding: 12, textAlign: 'center', borderRadius: 14, border: '1px solid rgba(255,255,255,0.15)', fontWeight: 700, fontSize: 13 }}>API Docs</Link>
      </div>
      <div className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '24px 0 8px' }}>TOOLS ({TOOLS.length})</div>
      <div className="card" style={{ borderRadius: 14 }}>
        {TOOLS.map((t, i) => (
          <Link key={t.id} to="/tool" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: i < TOOLS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', fontSize: 13 }}>
            <span style={{ fontWeight: 700 }}>{t.name}</span>
            <span className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>POST /{t.id}</span>
            <span className="mono" style={{ marginLeft: 'auto', fontSize: 11, color: t.badge === 'Down' ? '#fca5a5' : t.badge === 'Beta' ? '#fcd34d' : 'rgba(255,255,255,0.4)' }}>{t.badge}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
