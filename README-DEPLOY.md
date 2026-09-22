# ERAS - Deploy len GitHub + Vercel lay domain eras.vercel.app

## 1. Day len GitHub
1. Vao https://github.com/new -> ten repo `eras` -> Public -> Create
2. Mo terminal trong folder `eras-site`:
```
cd "C:\Users\THU\Downloads\eras-site"
git init
git add .
git commit -m "eras v1"
git branch -M main
git remote add origin https://github.com/<ten-ban>/eras.git
git push -u origin main
```

## 2. Deploy Vercel free
1. Vao https://vercel.com -> Sign in bang GitHub
2. Add New Project -> Import repo `eras`
3. Framework: Vite, Build: `npm run build`, Output: `dist`
4. Env: khong can
5. Deploy -> se co domain tam `eras-xxx.vercel.app`
6. Vao Project Settings -> Domains -> Add `eras.vercel.app`
   - Neu `eras.vercel.app` da co nguoi dung, Vercel se bao taken. Thu `eras-tools.vercel.app` hoac doi ten project thanh `eras` thi domain mac dinh la `eras.vercel.app`.
   - De chac lay `eras.vercel.app`: Vercel Dashboard -> Settings -> General -> Project Name = `eras` -> Save. Domain mac dinh se la `eras.vercel.app`.
7. Routes tu dong co: eras.vercel.app/ , /tool , /api , /updates , /announcement

## 3. Test API
curl.exe -sL https://leakd.up.railway.app/
POST tool VD: form-data file len /api-proxy/prometheus (local) hoac https://leakd.up.railway.app/prometheus (prod)

## 4. Cau truc
src/App.jsx, src/pages/Tool.jsx (15 API), Api.jsx, Updates.jsx, Announcement.jsx, src/data/tools.js
vercel.json da cau hinh proxy /api-proxy/:path* -> https://leakd.up.railway.app/:path* + SPA fallback.
