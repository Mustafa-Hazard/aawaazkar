import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ReportForm from './pages/ReportForm'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import MapView from './pages/MapView'

export default function App() {
  const [page, setPage] = useState('home')
  const [lang, setLang] = useState('en')

  const labels = {
    en: { home: 'Home', report: 'Report Issue', map: 'Live Map', dashboard: 'Dashboard', admin: 'Admin' },
    ur: { home: 'ہوم', report: 'مسئلہ رپورٹ کریں', map: 'نقشہ', dashboard: 'ڈیش بورڈ', admin: 'ایڈمن' },
  }

  const t = labels[lang]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar page={page} setPage={setPage} lang={lang} setLang={setLang} t={t} />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px' }}>
        {page === 'home' && <Home setPage={setPage} lang={lang} />}
        {page === 'report' && <ReportForm lang={lang} />}
        {page === 'map' && <MapView />}
        {page === 'dashboard' && <Dashboard lang={lang} />}
        {page === 'admin' && <AdminPanel lang={lang} />}
      </main>
    </div>
  )
}