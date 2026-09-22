import { Link } from 'react-router-dom'
export default function Announcement() {
  return (
    <div style={{ maxWidth: 820, margin: '0 auto', paddingBottom: 40 }}>
      <div style={{ textAlign: 'center', margin: '20px 0 30px' }}>
        <div className="mono" style={{ fontSize: 12, color: '#fcd34d' }}>OFFICIAL NOTICE</div>
        <h1 style={{ fontSize: 48, fontWeight: 900 }}>Eras Announcement</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)' }}>Incident, security clarifications, and the future of the project.</p>
      </div>
      <div className="card" style={{ padding: 28 }}>
        <h3>What Happened: The Server Raid</h3>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, margin: '8px 0 16px' }}>The Discord server was raided due to a vulnerability found in one of our dumpers. My sole intention from day one was to make useful tools freely accessible without paywalls.</p>
        <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <h3 style={{ marginTop: 16 }}>Clarification Regarding Script Logging</h3>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, margin: '8px 0 16px' }}>To clear up rumors: <b>I never logged your raw, unobfuscated scripts</b>. Only obfuscated scripts were recorded, and outputs inspected strictly to fix bugs.</p>
        <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <h3 style={{ marginTop: 16 }}>Future & The API</h3>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, margin: '8px 0 16px' }}>The Discord server will most likely <b>not be returning</b>. However, <b style={{ color: '#6ee7b7' }}>the API will remain completely online</b>, updated when I have spare time.</p>
        <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <h3 style={{ marginTop: 16 }}>Open-Sourcing All Deobfuscators</h3>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, marginTop: 8 }}>I will be <b>sharing the source code of all my current and future deobfuscators</b> for anyone to learn from.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
        <Link to="/api" className="card" style={{ padding: 20 }}><b>API Documentation</b><div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>Endpoints and integration examples.</div></Link>
        <Link to="/tool" className="card" style={{ padding: 20 }}><b>Web Tools</b><div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>Deobfuscate and obfuscate Lua scripts.</div></Link>
      </div>
    </div>
  )
}
