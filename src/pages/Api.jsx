import { API_BASE } from '../data/tools.js'
const CURLS = [
  ['detect', 'curl -X POST https://leakd.up.railway.app/detect -F "file=@script.lua"'],
  ['moonsec', 'curl -X POST https://leakd.up.railway.app/moonsec -F "file=@moonsec_script.lua"'],
  ['prometheus', 'curl -X POST https://leakd.up.railway.app/prometheus -F "file=@prometheus_script.lua"'],
  ['ironbrew2', 'curl -X POST https://leakd.up.railway.app/ironbrew2 -F "file=@ironbrew2_script.lua"'],
  ['ironveil', 'curl -X POST https://leakd.up.railway.app/ironveil -F "file=@ironveil_script.lua"'],
  ['hercules', 'curl -X POST https://leakd.up.railway.app/hercules -F "file=@hercules_script.lua"'],
  ['goofyscator', 'curl -X POST https://leakd.up.railway.app/goofyscator -F "file=@script.lua"'],
  ['clydedeobf', 'curl -X POST https://leakd.up.railway.app/clydedeobf -F "file=@script.lua"'],
  ['77fuscator', 'curl -X POST https://leakd.up.railway.app/77fuscator -F "file=@77fuscator_script.lua"'],
  ['psu', 'curl -X POST https://leakd.up.railway.app/psu -F "file=@script.lua"'],
  ['xhider', 'curl -X POST https://leakd.up.railway.app/xhider -F "file=@script.lua"'],
  ['luaobfuscator', 'curl -X POST https://leakd.up.railway.app/luaobfuscator -F "file=@script.lua"'],
  ['moonveil', 'curl -X POST https://leakd.up.railway.app/moonveil -F "file=@script.lua"'],
  ['obfuscate', 'curl -X POST https://leakd.up.railway.app/obfuscate -F "file=@script.lua"\ncurl -X POST "https://leakd.up.railway.app/obfuscate?preset=Lua51" -F "file=@script.lua"'],
  ['beautify (JSON)', 'curl -X POST https://leakd.up.railway.app/beautify -H "Content-Type: application/json" -d \'{"code":"local x=1 if x==1 then print(\\"test\\")end"}\''],
  ['beautify (file)', 'curl -X POST https://leakd.up.railway.app/beautify -F "file=@script.lua"'],
]
export default function Api() {
  return (
    <div style={{ paddingBottom: 40 }}>
      <h1 style={{ fontSize: 40, fontWeight: 900 }}>API Documentation</h1>
      <p className="mono" style={{ color: '#9ca3af', fontSize: 13, margin: '8px 0 20px' }}>BASE: {API_BASE} — status: online — Header: X-Api-Key: cq?tiBAT@zBmPhKM7?!</p>
      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
        <div className="mono" style={{ fontSize: 11, color: '#34d399' }}>200 OK / JSON — response.json</div>
        <pre className="mono" style={{ fontSize: 12, marginTop: 8 }}>{`{"success": true,"deobfuscated_code": "-- code...","file": {"name": "script.lua"}}`}</pre>
      </div>
      {CURLS.map(([name, cmd]) => (
        <div key={name} className="card" style={{ padding: 16, marginBottom: 12 }}>
          <div style={{ fontWeight: 800 }}>POST /{name.split(' ')[0]}</div>
          <pre className="mono custom-scrollbar" style={{ background: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 12, fontSize: 12, marginTop: 8, overflow: 'auto' }}>{cmd}</pre>
        </div>
      ))}
      <div className="card" style={{ padding: 16 }}>
        <b>JS fetch (FormData)</b>
        <pre className="mono" style={{ fontSize: 12, marginTop: 8 }}>{`const fd=new FormData(); fd.append('file', file);\nfetch('${API_BASE}/prometheus',{method:'POST',headers:{'X-Api-Key':'cq?tiBAT@zBmPhKM7?!'},body:fd})`}</pre>
      </div>
    </div>
  )
}
