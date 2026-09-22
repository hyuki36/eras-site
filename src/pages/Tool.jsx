import { useState, useRef, useEffect } from 'react'
import { TOOLS, PRESETS, callTool, getOutput, API_BASE, API_KEY } from '../data/tools.js'

async function checkObfuscator(signal) {
  const fd = new FormData()
  fd.append('file', new Blob(['print("ping")'], { type: 'text/plain' }), 'ping.lua')
  const res = await fetch(`${API_BASE}/obfuscate?preset=RobloxExecutor`, {
    method: 'POST', headers: { 'X-Api-Key': API_KEY }, body: fd, signal,
  })
  const txt = await res.text().catch(() => '')
  if (/down|maintenance|offline|1-2 days/i.test(txt)) return 'down'
  if (res.ok) return 'working'
  // server answered (even 4xx = alive, just rejected ping file) -> treat as working unless it says down
  if (res.status >= 400 && res.status < 500 && txt) return 'working'
  return 'down'
}

export default function Tool() {
  const [tool, setTool] = useState(TOOLS[0])
  const [file, setFile] = useState(null)
  const [code, setCode] = useState('')
  const [preset, setPreset] = useState(PRESETS[0])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [cooldown, setCooldown] = useState(0)
  const [copied, setCopied] = useState(false)
  const [drag, setDrag] = useState(false)
  const [obfStatus, setObfStatus] = useState('checking') // checking | working | down
  const fileRef = useRef(null)

  useEffect(() => {
    const ctl = new AbortController()
    const t = setTimeout(() => ctl.abort(), 12000)
    checkObfuscator(ctl.signal).then(setObfStatus).catch(() => setObfStatus('down')).finally(() => clearTimeout(t))
    return () => ctl.abort()
  }, [])

  const obfBadge = obfStatus === 'working' ? 'Working' : obfStatus === 'checking' ? 'Checking' : 'Down'
  const isDown = tool.id === 'obfuscate' && obfStatus !== 'working'

  useEffect(() => {
    if (cooldown <= 0) return
    const t = setInterval(() => setCooldown(c => c - 1), 1000)
    return () => clearInterval(t)
  }, [cooldown])

  const pick = (t) => { setTool(t); setResult(null); setError(''); setFile(null); setCode(''); if (fileRef.current) fileRef.current.value = '' }

  const onFile = (f) => {
    if (!f) return
    if (f.size > 4 * 1024 * 1024) { setError('File exceeds the 4 MB limit (max 4 MB).'); return }
    setFile(f); setCode(''); setError('')
  }

  const run = async () => {
    if (isDown || loading || cooldown > 0) return
    if (!file && !code.trim()) { setError('Please provide a script (upload a file or paste Lua code).'); return }
    if (file && file.size > 4 * 1024 * 1024) { setError('File exceeds the 4 MB limit (max 4 MB).'); return }
    if (!file && code && new Blob([code]).size > 4 * 1024 * 1024) { setError('Script code exceeds the 4 MB limit (max 4 MB).'); return }
    setLoading(true); setError(''); setResult(null)
    try {
      const data = await callTool(tool.id, { file, code, preset: preset.id })
      setResult(data)
    } catch (e) { setError(e.message || 'Connection error: API is currently unreachable.') }
    finally { setLoading(false); setCooldown(5) }
  }

  const out = getOutput(result)

  return (
    <div className="tool-layout" style={{ display: 'flex', gap: 20, alignItems: 'flex-start', paddingBottom: 40 }}>
      <div className="tool-side" style={{ width: 390, flexShrink: 0, position: 'sticky', top: 80 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#9ca3af', marginBottom: 8 }}>TOOLS ({TOOLS.length})</div>
        <div className="tool-grid">
          {TOOLS.map(t => {
            const badge = t.id === 'obfuscate' ? obfBadge : t.badge
            const badgeCls = badge === 'Working' ? '' : badge === 'Down' ? 'badge-down' : 'badge-beta'
            const badgeStyle = badge === 'Working' ? { background: 'rgba(52,211,153,0.15)', color: '#6ee7b7', borderColor: 'rgba(52,211,153,0.35)' } : undefined
            return (
            <button key={t.id} onClick={() => pick(t)} className={'tool-btn' + (tool.id === t.id ? ' sel' : '')}>
              <span style={{ flex: 1 }}>{t.name}</span>
              {(badge === 'Beta' || badge === 'Down' || badge === 'Working' || badge === 'Checking') && <span className={'badge ' + badgeCls} style={badgeStyle}>{badge}</span>}
            </button>
            )
          })}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="glass-panel" style={{ borderRadius: 24, padding: 24 }}>
          <h2 style={{ fontSize: 32, fontWeight: 900 }}>{tool.name}</h2>
          <p style={{ color: '#9ca3af', fontSize: 14, margin: '6px 0' }}>{tool.description}</p>
          {tool.github && <a href={tool.github} target="_blank" rel="noreferrer" className="mono" style={{ fontSize: 12, color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 10px', borderRadius: 10, display: 'inline-block' }}>Source Code: {tool.github.replace('https://github.com/', '')}</a>}
          {tool.id === 'goofyscator' && <div style={{ marginTop: 12, border: '1px solid rgba(52,211,153,0.4)', background: 'rgba(52,211,153,0.1)', padding: 12, borderRadius: 14, fontSize: 13 }}><b>Full V10 & 10.1 Support:</b> Supports V10, 10.1 & BETA-3-unstable.</div>}
          {tool.id === 'moonveil' && <div style={{ marginTop: 12, border: '1px solid rgba(245,158,11,0.4)', background: 'rgba(245,158,11,0.1)', padding: 12, borderRadius: 14, fontSize: 13 }}><b>Beta WIP:</b> output may be incomplete.</div>}
          {tool.id === 'detect' && <div style={{ marginTop: 12, border: '1px solid rgba(245,158,11,0.4)', background: 'rgba(245,158,11,0.1)', padding: 12, borderRadius: 14, fontSize: 13 }}><b>Notice:</b> detector not up to date with newest obfuscators.</div>}
          {tool.id === 'obfuscate' && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#9ca3af', marginBottom: 6 }}>STATUS: <span className="mono" style={{ color: obfStatus === 'working' ? '#6ee7b7' : obfStatus === 'checking' ? '#fcd34d' : '#fca5a5' }}>{obfStatus === 'working' ? 'WORKING (LIVE)' : obfStatus === 'checking' ? 'CHECKING...' : 'DOWN (1-2 DAYS)'}</span></div>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#9ca3af', marginBottom: 6 }}>ENVIRONMENT PRESET</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {PRESETS.map(p => <button key={p.id} onClick={() => setPreset(p)} disabled={isDown} className="tool-btn sel" style={{ width: 'auto', borderColor: preset.id === p.id ? '#fff' : undefined, opacity: isDown ? 0.4 : 1 }}>{p.label}</button>)}
              </div>
              {obfStatus === 'working'
                ? <div style={{ marginTop: 12, border: '1px solid rgba(52,211,153,0.35)', background: 'rgba(52,211,153,0.08)', padding: 12, borderRadius: 14, fontSize: 13 }}><b>Obfuscator Working:</b> API is live, you can execute.</div>
                : obfStatus === 'checking'
                ? <div style={{ marginTop: 12, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', padding: 12, borderRadius: 14, fontSize: 13 }}>Checking obfuscator status...</div>
                : <div style={{ marginTop: 12, border: '1px solid rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.1)', padding: 12, borderRadius: 14, fontSize: 13 }}><b>Obfuscator Down (1-2 Days):</b> offline for updates.</div>}
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 20 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, color: '#9ca3af', marginBottom: 6 }}>UPLOAD FILE (.lua,.luau,.txt max 4MB)</div>
              <div onDragOver={e => { e.preventDefault(); setDrag(true) }} onDragLeave={() => setDrag(false)} onDrop={e => { e.preventDefault(); setDrag(false); onFile(e.dataTransfer.files?.[0]) }} onClick={() => fileRef.current?.click()} style={{ minHeight: 190, border: '2px dashed rgba(255,255,255,0.15)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', background: drag ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.4)', cursor: 'pointer', padding: 16, textAlign: 'center' }}>
                <input ref={fileRef} type="file" accept=".lua,.luau,.txt,.log" style={{ display: 'none' }} onChange={e => onFile(e.target.files?.[0])} />
                {file ? <div><div style={{ fontWeight: 800 }}>{file.name}</div><div className="mono" style={{ color: '#34d399', fontSize: 12 }}>{(file.size / 1024).toFixed(2)} KB — Ready</div></div> : <div><div style={{ fontWeight: 700 }}>Drop script file here</div><div style={{ fontSize: 12, color: '#6b7280' }}>or click to browse</div></div>}
              </div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 11, color: '#9ca3af', marginBottom: 6 }}>OR PASTE SCRIPT {code.length > 0 ? `(${code.length} chars)` : ''}</div>
              <textarea value={code} onChange={e => { setCode(e.target.value); setFile(null) }} placeholder="-- Paste raw Lua script code here directly..." style={{ width: '100%', minHeight: 190, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: 14, color: '#fff', fontFamily: 'monospace', fontSize: 13, resize: 'vertical' }} />
            </div>
          </div>
          <button onClick={run} disabled={isDown || loading || cooldown > 0 || (!file && !code.trim())} className="btn-white" style={{ marginTop: 16 }}>
            {tool.id === 'obfuscate' && obfStatus !== 'working' ? (obfStatus === 'checking' ? 'CHECKING STATUS...' : 'OBFUSCATOR UNDER MAINTENANCE (1-2 DAYS)') : loading ? 'PROCESSING REQUEST...' : cooldown > 0 ? `COOLDOWN ACTIVE (${cooldown}S)` : `EXECUTE ${tool.name.toUpperCase()}`}
          </button>
          {error && <div style={{ marginTop: 12, background: 'rgba(127,29,29,0.4)', border: '1px solid rgba(239,68,68,0.4)', padding: 12, borderRadius: 14, fontSize: 13 }}>{error}</div>}
        </div>
        {result && (
          <div className="card" style={{ marginTop: 16, padding: 20, borderColor: 'rgba(52,211,153,0.4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <div><span style={{ color: '#34d399' }}>●</span> <b>{tool.name} Output</b> <span className="mono" style={{ fontSize: 11, color: '#34d399' }}>Execution Successful</span></div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => { navigator.clipboard.writeText(out); setCopied(true); setTimeout(() => setCopied(false), 2000) }} style={{ padding: '8px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: '#fff', color: '#000', fontWeight: 800, fontSize: 12 }}>{copied ? 'COPIED!' : 'COPY CODE'}</button>
                <button onClick={() => { const b = new Blob([out], { type: 'text/plain' }); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = `${tool.id}_output.lua`; a.click(); URL.revokeObjectURL(u) }} style={{ padding: '8px 14px', borderRadius: 10, border: '1px solid rgba(52,211,153,0.4)', background: 'rgba(52,211,153,0.2)', color: '#6ee7b7', fontWeight: 800, fontSize: 12 }}>DOWNLOAD</button>
              </div>
            </div>
            {tool.id === 'detect' && result.top_result && (
              <div style={{ marginTop: 12 }}>
                <div>Top: <b style={{ fontSize: 20 }}>{result.top_result.name}</b> <span className="mono" style={{ color: '#34d399' }}>{result.top_result.confidence}%</span></div>
                <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 99, marginTop: 8 }}><div style={{ width: `${result.top_result.confidence || 0}%`, height: '100%', background: '#34d399', borderRadius: 99 }} /></div>
              </div>
            )}
            <div style={{ marginTop: 12, background: '#000', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, overflow: 'hidden' }}>
              <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>deobfuscated.lua — Ready</div>
              <pre className="custom-scrollbar mono" style={{ padding: 14, fontSize: 12, maxHeight: 500, overflow: 'auto' }}>{out}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
