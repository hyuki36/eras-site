export const API_BASE = 'https://leakd.up.railway.app';
export const API_KEY = 'cq?tiBAT@zBmPhKM7?!';

export const TOOLS = [
  { id: 'detect', name: 'Detector', badge: 'Scanner', description: 'Detect the obfuscator used on a Lua script by Eras (not up to date with new obfuscators).' },
  { id: 'moonsec', name: 'MoonSec V3', badge: 'Deobfuscator', description: 'Deobfuscate MoonSec V3 (not made by Eras).' },
  { id: 'prometheus', name: 'Prometheus', badge: 'Deobfuscator', description: 'Deobfuscate Prometheus by Eras.', github: 'https://github.com/prostone4/Prometheus-Deobfuscator' },
  { id: 'ironbrew2', name: 'Ironbrew2', badge: 'Deobfuscator', description: 'Deobfuscate Ironbrew2 (not made by Eras).' },
  { id: 'ironveil', name: 'Ironveil', badge: 'Deobfuscator', description: 'Deobfuscate Ironveil by Eras.', github: 'https://github.com/prostone55/Ironveil-Deobfuscator-V1' },
  { id: 'hercules', name: 'Hercules', badge: 'Deobfuscator', description: 'Deobfuscate Hercules (1.6.x, 2.0.0, 2.0.1) (not made by Eras).', github: 'https://github.com/memcpython/lua-deobfuscators' },
  { id: 'goofyscator', name: 'Goofyscator', badge: 'Deobfuscator', description: 'Deobfuscate Goofyscator by Eras.' },
  { id: 'clydedeobf', name: 'Clyde Protection', badge: 'Deobfuscator', description: 'Deobfuscate Clyde Protection by Eras (does not support cipher preset).' },
  { id: '77fuscator', name: '77fuscator', badge: 'Deobfuscator', description: 'Deobfuscate 77fuscator (0.6.1 Early Build) (not made by Eras).', github: 'https://github.com/Bytecoded1337/77fuscatorDeobfuscator' },
  { id: 'psu', name: 'PSU', badge: 'Deobfuscator', description: 'Deobfuscate PSU (not made by Eras).', github: 'https://github.com/memcpython/PSU-Deobfuscator' },
  { id: 'xhider', name: 'XHider', badge: 'Deobfuscator', description: 'Deobfuscate XHider (not made by Eras).', github: 'https://github.com/memcpython/lua-deobfuscators' },
  { id: 'luaobfuscator', name: 'LuaObfuscator', badge: 'Deobfuscator', description: 'Deobfuscate LuaObfuscator.com v0.10.9 (supports all presets) by Eras.' },
  { id: 'moonveil', name: 'Moonveil 2.x', badge: 'Beta', description: 'Deobfuscate Moonveil 2.x by Eras (Beta — work in progress, output may be incomplete or flawed).' },
  { id: 'obfuscate', name: 'Obfuscator', badge: 'Down', description: 'Obfuscate Lua scripts using Eras Obfuscator (Prometheus Fork).' },
  { id: 'beautify', name: 'Beautifier', badge: 'Formatter', description: 'Format and beautify Lua code for maximum readability.' },
];

export const PRESETS = [
  { id: 'RobloxExecutor', label: 'RobloxExecutor', description: 'LuaU In Executor' },
  { id: 'RobloxStudio', label: 'RobloxStudio', description: 'LuaU In Roblox Studio' },
  { id: 'Lua51', label: 'Lua 5.1', description: 'Lua 5.1' },
  { id: 'Lua52', label: 'Lua 5.2', description: 'Lua 5.2' },
  { id: 'Lua53', label: 'Lua 5.3', description: 'Lua 5.3' },
  { id: 'Lua54', label: 'Lua 5.4', description: 'Lua 5.4' },
];

export async function callTool(toolId, { file, code, preset }) {
  // beautify: try JSON first
  if (toolId === 'beautify' && !file && code) {
    try {
      const r = await fetch(`${API_BASE}/beautify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Api-Key': API_KEY },
        body: JSON.stringify({ code }),
      });
      if (r.ok) {
        const j = await r.json();
        return j;
      }
    } catch {}
  }
  const fd = new FormData();
  if (file) fd.append('file', file);
  else fd.append('file', new Blob([code || ''], { type: 'text/plain' }), 'script.lua');
  const qs = toolId === 'obfuscate' && preset ? `?preset=${preset}` : '';
  let res;
  try {
    res = await fetch(`/api-proxy/${toolId}${qs}`, { method: 'POST', headers: { 'X-Api-Key': API_KEY }, body: fd });
  } catch {
    res = await fetch(`${API_BASE}/${toolId}${qs}`, { method: 'POST', headers: { 'X-Api-Key': API_KEY }, body: fd });
  }
  // vercel rewrite returns direct; if 404 fallback direct
  if (res.status === 404) {
    res = await fetch(`${API_BASE}/${toolId}${qs}`, { method: 'POST', headers: { 'X-Api-Key': API_KEY }, body: fd });
  }
  const txt = await res.text();
  let data;
  try { data = JSON.parse(txt); } catch { data = { success: res.ok, deobfuscated_code: txt }; }
  if (!res.ok || data.success === false) {
    let e = data.error || 'Execution failed. Check script format.';
    if (typeof e === 'string' && (e.toLowerCase().includes('retarded') || e.toLowerCase().includes('not the right obfuscator')))
      e = 'This script does not appear to be obfuscated with this tool or is invalid.';
    throw new Error(e);
  }
  if (data.success === undefined) data.success = true;
  return data;
}

export function getOutput(data) {
  if (!data) return '';
  return data.obfuscated_code || data.beautified_code || data.deobfuscated_code || data.code || '';
}
