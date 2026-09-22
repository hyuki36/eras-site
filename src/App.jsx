import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Tool from './pages/Tool.jsx'
import Api from './pages/Api.jsx'
import Updates from './pages/Updates.jsx'
import Announcement from './pages/Announcement.jsx'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0 }); }, [pathname])
  return null
}

export default function App() {
  return (
    <Layout>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api" element={<Api />} />
        <Route path="/tool" element={<Tool />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/update" element={<Navigate to="/updates" replace />} />
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/announcements" element={<Navigate to="/announcement" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
