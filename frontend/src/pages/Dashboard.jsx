import { useState, useEffect } from 'react'
import { getReports, getStats, upvoteReport } from '../api'

const priorityColor = { Critical: 'badge-red', High: 'badge-yellow', Medium: 'badge-gray', Low: 'badge-gray' }
const statusColor = { Pending: 'badge-red', 'In Progress': 'badge-yellow', Resolved: 'badge-green' }

const areaList = ['Gulshan', 'Saddar', 'Clifton', 'North Nazimabad', 'PECHS', 'Lyari', 'Korangi', 'Malir']

export default function Dashboard({ lang }) {
    const ur = lang === 'ur'
    const [issues, setIssues] = useState([])
    const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 })
    const [loading, setLoading] = useState(true)

    async function load() {
        try {
            const [r, s] = await Promise.all([getReports(), getStats()])
            setIssues(r.data)
            setStats(s.data)
        } catch {
            console.error('API not available, using mock data')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { load() }, [])

    async function handleUpvote(id) {
        await upvoteReport(id)
        load()
    }

    const resolved = stats.resolved
    const total = stats.total
    const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0

    const areaStats = areaList.map(area => ({
        area,
        count: issues.filter(i => i.area === area).length,
    })).filter(a => a.count > 0).sort((a, b) => b.count - a.count).slice(0, 5)

    const maxCount = areaStats[0]?.count || 1

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
                <h2 style={{ fontSize: 22, fontWeight: 700 }}>{ur ? 'عوامی ڈیش بورڈ' : 'Public Transparency Dashboard'}</h2>
                <p style={{ color: 'var(--muted)', fontSize: 14 }}>{ur ? 'تمام مسائل کی تفصیل' : 'Live status of all reported civic issues in Karachi'}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                {[
                    { label: ur ? 'کل مسائل' : 'Total Issues', value: stats.total, color: '#1B4332' },
                    { label: ur ? 'زیر التواء' : 'Pending', value: stats.pending, color: '#E63946' },
                    { label: ur ? 'جاری' : 'In Progress', value: stats.inProgress, color: '#D97706' },
                    { label: ur ? 'حل شدہ' : 'Resolved', value: stats.resolved, color: '#059669' },
                ].map(s => (
                    <div key={s.label} className="card" style={{ padding: 18, textAlign: 'center' }}>
                        <div style={{ fontSize: 30, fontWeight: 700, color: s.color }}>{loading ? '...' : s.value}</div>
                        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{s.label}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="card">
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>{ur ? 'حل کی شرح' : 'Resolution Rate'}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <div style={{ position: 'relative', width: 90, height: 90 }}>
                            <svg viewBox="0 0 90 90" width="90" height="90">
                                <circle cx="45" cy="45" r="38" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                                <circle cx="45" cy="45" r="38" fill="none" stroke="#40916C" strokeWidth="10"
                                    strokeDasharray={`${2 * Math.PI * 38 * resolutionRate / 100} ${2 * Math.PI * 38}`}
                                    strokeLinecap="round" transform="rotate(-90 45 45)" />
                            </svg>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontWeight: 700, fontSize: 18, color: 'var(--primary)' }}>
                                {resolutionRate}%
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            {[
                                { label: ur ? 'حل شدہ' : 'Resolved', value: stats.resolved, color: '#059669' },
                                { label: ur ? 'جاری' : 'In Progress', value: stats.inProgress, color: '#D97706' },
                                { label: ur ? 'زیر التواء' : 'Pending', value: stats.pending, color: '#E63946' },
                            ].map(item => (
                                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <span style={{ fontSize: 13, color: 'var(--muted)' }}>{item.label}</span>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: item.color }}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>{ur ? 'علاقہ وار مسائل' : 'Issues by Area'}</h3>
                    {areaStats.length === 0 ? (
                        <p style={{ color: 'var(--muted)', fontSize: 13 }}>No data yet</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {areaStats.map(a => (
                                <div key={a.area}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                                        <span style={{ fontWeight: 500 }}>{a.area}</span>
                                        <span style={{ color: 'var(--muted)' }}>{a.count} issues</span>
                                    </div>
                                    <div style={{ height: 8, background: '#F3F4F6', borderRadius: 99 }}>
                                        <div style={{ height: 8, width: `${(a.count / maxCount) * 100}%`, background: '#40916C', borderRadius: 99, transition: 'width 0.6s' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #F3F4F6' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700 }}>{ur ? 'تمام رپورٹس' : 'All Reports'}</h3>
                </div>
                {loading ? (
                    <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>Loading...</div>
                ) : issues.length === 0 ? (
                    <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>No reports yet. Be the first to report an issue!</div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: '#F9FAFB' }}>
                                    {['Issue', 'Area', 'Type', 'AI Score', 'Votes', 'Priority', 'Status', ''].map(h => (
                                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--muted)', fontSize: 12, textTransform: 'uppercase' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {issues.map((issue, i) => (
                                    <tr key={issue.id} style={{ borderTop: '1px solid #F3F4F6', background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                                        <td style={{ padding: '14px 16px', fontWeight: 500, maxWidth: 180 }}>{issue.title}</td>
                                        <td style={{ padding: '14px 16px', color: 'var(--muted)' }}>{issue.area}</td>
                                        <td style={{ padding: '14px 16px', color: 'var(--muted)' }}>{issue.category}</td>
                                        <td style={{ padding: '14px 16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{ width: 60, height: 6, background: '#F3F4F6', borderRadius: 99 }}>
                                                    <div style={{ height: 6, width: `${issue.score}%`, background: issue.score >= 70 ? '#E63946' : issue.score >= 45 ? '#F4A261' : '#40916C', borderRadius: 99 }} />
                                                </div>
                                                <span style={{ fontSize: 12, fontWeight: 600 }}>{issue.score}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '14px 16px', color: 'var(--muted)' }}>👍 {issue.votes}</td>
                                        <td style={{ padding: '14px 16px' }}><span className={`badge ${priorityColor[issue.priority]}`}>{issue.priority}</span></td>
                                        <td style={{ padding: '14px 16px' }}><span className={`badge ${statusColor[issue.status]}`}>{issue.status}</span></td>
                                        <td style={{ padding: '14px 16px' }}>
                                            <button onClick={() => handleUpvote(issue.id)}
                                                style={{ fontSize: 12, padding: '4px 10px', background: '#D1FAE5', color: '#059669', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
                                                👍 Confirm
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}