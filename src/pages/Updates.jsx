import { Link } from 'react-router-dom'
import { UPDATES } from '../data/updates.js'
export default function Updates() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', paddingBottom: 40 }}>
      <div style={{ textAlign: 'center', margin: '20px 0 30px' }}>
        <div className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>CHANGELOG</div>
        <h1 style={{ fontSize: 44, fontWeight: 900 }}>Updates</h1>
        <p style={{ color: 'rgba(255,255,255,0.55)' }}>Recent additions and changes to Eras.</p>
      </div>
      {UPDATES.map((u, i) => (
        <div key={i} className="card" style={{ marginBottom: 16 }}>
          <div style={{ padding: 18, borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
            <div className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{u.date}</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: '4px 0' }}>{u.title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>{u.description}</p>
          </div>
          <div style={{ padding: 18 }}>
            {u.items.map((it, j) => <div key={j} style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 12, marginBottom: 8 }}><b style={{ fontSize: 14 }}>{it.title}</b><div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{it.text}</div></div>)}
          </div>
          <div style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            {u.links.map((l, k) => l.external ? <a key={k} href={l.href} target="_blank" rel="noreferrer" style={{ border: '1px solid rgba(255,255,255,0.15)', padding: '6px 12px', borderRadius: 10, fontSize: 12, fontWeight: 700 }}>{l.label}</a> : <Link key={k} to={l.to} style={{ border: '1px solid rgba(255,255,255,0.15)', padding: '6px 12px', borderRadius: 10, fontSize: 12, fontWeight: 700 }}>{l.label}</Link>)}
          </div>
        </div>
      ))}
    </div>
  )
}
