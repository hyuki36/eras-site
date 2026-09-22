import { Link } from 'react-router-dom'
import { TOOLS } from '../data/tools.js'
const BRAND_ICON = 'https://media.discordapp.net/attachments/1550135756339552316/1551971953143975946/3b482209-7cd6-4655-bf05-e2c4f4b243e4.png?ex=6ab3ea03&is=6ab29883&hm=fb4bedeada75230cd2229820ca94162d0af044912e3d69ec5fda257dc8cb2be9&=&format=webp&quality=lossless&width=640&height=640'
export default function Home() {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px 0 32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src={BRAND_ICON} alt="Eras" className="glow-icon" style={{ width: 40, height: 40, borderRadius: 11, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.15)' }} />
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, lineHeight: 1 }}>Eras</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, margin: '2px 0 0' }}>Free Lua deobfuscator tools.</p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <Link to="/tool" className="btn-white" style={{ width: 110, padding: '9px 0', fontSize: 11, textAlign: 'center' }}>Open Tools</Link>
          <Link to="/api" style={{ width: 90, padding: 9, textAlign: 'center', borderRadius: 14, border: '1px solid rgba(255,255,255,0.15)', fontWeight: 700, fontSize: 11 }}>API</Link>
        </div>
      </div>
      <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: '18px 0 6px' }}>TOOLS ({TOOLS.length})</div>
      <div className="card" style={{ borderRadius: 12 }}>
        {TOOLS.map((t, i) => (
          <Link key={t.id} to="/tool" className="row-hover" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderBottom: i < TOOLS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', fontSize: 12 }}>
            <span style={{ fontWeight: 700 }}>{t.name}</span>
            <span className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>/{t.id}</span>
            <span className="mono" style={{ marginLeft: 'auto', fontSize: 10, color: t.badge === 'Down' ? '#fca5a5' : t.badge === 'Beta' ? '#fcd34d' : 'rgba(255,255,255,0.35)' }}>{t.badge}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
