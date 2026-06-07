import { useState } from 'react'

const initialIssues = [
    { id: 1, title: 'Pothole on Shahrae Faisal', area: 'Gulshan', type: 'Road', priority: 'High', votes: 47, status: 'In Progress', score: 65, date: '2026-06-05' },
    { id: 2, title: 'Garbage overflow near Tariq Road', area: 'Saddar', type: 'Sanitation', priority: 'Critical', votes: 89, status: 'Pending', score: 89, date: '2026-06-06' },
    { id: 3, title: 'Street light broken Clifton', area: 'Clifton', type: 'Utilities', priority: 'Medium', votes: 23, status: 'Resolved', score: 40, date: '2026-06-04' },
    { id: 4, title: 'Water shortage North Nazimabad', area: 'North Nazimabad', type: 'Water', priority: 'Critical', votes: 134, status: 'Pending', score: 95, date: '2026-06-06' },
    { id: 5, title: 'Sewerage leakage PECHS', area: 'PECHS', type: 'Sanitation', priority: 'Critical', votes: 102, status: 'In Progress', score: 91, date: '2026-06-05' },
    { id: 6, title: 'Flooding near Lyari', area: 'Lyari', type: 'Flood', priority: 'Critical', votes: 201, status: 'Pending', score: 98, date: '2026-06-07' },
    { id: 7, title: 'No street lights Korangi', area: 'Korangi', type: 'Utilities', priority: 'Medium', votes: 34, status: 'Resolved', score: 38, date: '2026-06-03' },
    { id: 8, title: 'Broken road Gulshan Chowrangi', area: 'Gulshan', type: 'Road', priority: 'High', votes: 56, status: 'In Progress', score: 70, date: '2026-06-05' },
]

const priorityColor = { Critical: 'badge-red', High: 'badge-yellow', Medium: 'badge-gray', Low: 'badge-gray' }
const statusColor = { Pending: 'badge-red', 'In Progress': 'badge-yellow', Resolved: 'badge-green' }

export default function AdminPanel({ lang }) {
    const ur = lang === 'ur'
    const [issues, setIssues] = useState(initialIssues)
    const [filter, setFilter] = useState('All')
    const [selected, setSelected] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [creds, setCreds] = useState({ user: '', pass: '' })
    const [error, setError] = useState('')

    function login() {
        if (creds.user === 'admin' && creds.pass === 'aawaazkar') {
            setLoggedIn(true); setError('')
        } else setError('Invalid credentials')
    }

    function updateStatus(id, status) {
        setIssues(issues.map(i => i.id === id ? { ...i, status } : i))
        setSelected(null)
    }

    const filtered = filter === 'All' ? issues : issues.filter(i => i.status === filter)

    if (!loggedIn) return (
        <div style={{ maxWidth: 400, margin: '60px auto' }}>
            <div className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔐</div>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
                    {ur ? 'ایڈمن لاگ ان' : 'Admin Login'}
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 24 }}>
                    {ur ? 'صرف مجاز اہلکاروں کے لیے' : 'Authorized personnel only'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <input placeholder={ur ? 'صارف نام' : 'Username'}
                        value={creds.user} onChange={e => setCreds({ ...creds, user: e.target.value })} />
                    <input type="password" placeholder={ur ? 'پاس ورڈ' : 'Password'}
                        value={creds.pass} onChange={e => setCreds({ ...creds, pass: e.target.value })}
                        onKeyDown={e => e.key === 'Enter' && login()} />
                    {error && <p style={{ color: '#E63946', fontSize: 13 }}>{error}</p>}
                    <button className="btn-primary" onClick={login}>
                        {ur ? 'داخل ہوں' : 'Login'}
                    </button>
                    <p style={{ fontSize: 12, color: 'var(--muted)' }}>Demo: admin / aawaazkar</p>
                </div>
            </div>
        </div>
    )

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: 22, fontWeight: 700 }}>{ur ? 'ایڈمن پینل' : 'Admin Panel'}</h2>
                    <p style={{ color: 'var(--muted)', fontSize: 14 }}>{ur ? 'مسائل کا انتظام کریں' : 'Manage and resolve citizen reports'}</p>
                </div>
                <button className="btn-outline" style={{ fontSize: 13, padding: '8px 16px' }}
                    onClick={() => setLoggedIn(false)}>
                    {ur ? 'لاگ آؤٹ' : 'Logout'}
                </button>
            </div>

            {/* Summary cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                {[
                    { label: 'Total', labelUr: 'کل', value: issues.length, color: '#1B4332' },
                    { label: 'Pending', labelUr: 'زیر التواء', value: issues.filter(i => i.status === 'Pending').length, color: '#E63946' },
                    { label: 'In Progress', labelUr: 'جاری', value: issues.filter(i => i.status === 'In Progress').length, color: '#D97706' },
                    { label: 'Resolved', labelUr: 'حل شدہ', value: issues.filter(i => i.status === 'Resolved').length, color: '#059669' },
                ].map(s => (
                    <div key={s.label} className="card" style={{ padding: 16, textAlign: 'center', cursor: 'pointer', border: filter === s.label ? '2px solid var(--accent)' : '' }}
                        onClick={() => setFilter(filter === s.label ? 'All' : s.label)}>
                        <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{ur ? s.labelUr : s.label}</div>
                    </div>
                ))}
            </div>

            {/* Issue list */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '16px 24px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700 }}>{ur ? 'مسائل کی فہرست' : 'Issue Queue'} — sorted by AI score</h3>
                    <select style={{ width: 'auto', padding: '6px 12px' }} value={filter} onChange={e => setFilter(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                        <thead>
                            <tr style={{ background: '#F9FAFB' }}>
                                {['Issue', 'Area', 'AI Score', 'Votes', 'Priority', 'Status', 'Action'].map(h => (
                                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--muted)', fontSize: 12, textTransform: 'uppercase' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.sort((a, b) => b.score - a.score).map((issue, i) => (
                                <tr key={issue.id} style={{ borderTop: '1px solid #F3F4F6', background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                                    <td style={{ padding: '14px 16px', fontWeight: 500, maxWidth: 200 }}>{issue.title}</td>
                                    <td style={{ padding: '14px 16px', color: 'var(--muted)' }}>{issue.area}</td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ width: 60, height: 6, background: '#F3F4F6', borderRadius: 99 }}>
                                                <div style={{ height: 6, width: `${issue.score}%`, background: issue.score >= 70 ? '#E63946' : '#F4A261', borderRadius: 99 }} />
                                            </div>
                                            <span style={{ fontSize: 12, fontWeight: 700 }}>{issue.score}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '14px 16px', color: 'var(--muted)' }}>👍 {issue.votes}</td>
                                    <td style={{ padding: '14px 16px' }}><span className={`badge ${priorityColor[issue.priority]}`}>{issue.priority}</span></td>
                                    <td style={{ padding: '14px 16px' }}><span className={`badge ${statusColor[issue.status]}`}>{issue.status}</span></td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            {issue.status !== 'In Progress' && (
                                                <button onClick={() => updateStatus(issue.id, 'In Progress')}
                                                    style={{ fontSize: 11, padding: '4px 10px', background: '#FEF3C7', color: '#D97706', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
                                                    Start
                                                </button>
                                            )}
                                            {issue.status !== 'Resolved' && (
                                                <button onClick={() => updateStatus(issue.id, 'Resolved')}
                                                    style={{ fontSize: 11, padding: '4px 10px', background: '#D1FAE5', color: '#059669', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
                                                    Resolve
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}