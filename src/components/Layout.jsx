import { Link, useLocation } from 'react-router-dom'
const VIDEO_BG = 'https://i.pinimg.com/originals/4f/79/d1/4f79d16b5be08fbbdfd8a1978bb59075.gif'
const TOP_ICON = 'https://media.discordapp.net/attachments/1550135756339552316/1551971953143975946/3b482209-7cd6-4655-bf05-e2c4f4b243e4.png?ex=6ab3ea03&is=6ab29883&hm=fb4bedeada75230cd2229820ca94162d0af044912e3d69ec5fda257dc8cb2be9&=&format=webp&quality=lossless&width=640&height=640'
export default function Layout({ children }) {
  const { pathname } = useLocation()
  const link = (to, label) => (
    <Link to={to} style={{ background: pathname === to ? 'rgba(255,255,255,0.12)' : undefined, color: pathname === to ? '#fff' : undefined }} className={pathname === to ? 'active' : ''}>{label}</Link>
  )
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="video-bg"><img src={VIDEO_BG} alt="" /></div>
      <div className="video-overlay" />
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" style={{ fontWeight: 900, fontSize: 20, letterSpacing: -0.5, display: 'flex', alignItems: 'center', gap: 10 }}><img src={TOP_ICON} alt="Eras" style={{ width: 32, height: 32, borderRadius: 10, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.2)' }} />Eras</Link>
          <div className="nav-links">
            {link('/', 'Home')}
            {link('/tool', 'Tools')}
            {link('/api', 'API')}
            {link('/updates', 'Updates')}
            {link('/announcement', 'Announcement')}
          </div>
        </div>
      </nav>
      <div className="container">{children}</div>
      <footer style={{ textAlign: 'center', padding: 30, color: 'rgba(255,255,255,0.35)', fontSize: 12, position: 'relative', zIndex: 1 }} className="mono">
        Eras — free Lua deobfuscator tools. API: https://leakd.up.railway.app/ — Join: https://discord.gg/c3xVMnUUBv
      </footer>
    </div>
  )
}
