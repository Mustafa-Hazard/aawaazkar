const issues = [
    { id: 1, title: 'Pothole on Shahrae Faisal', titleUr: 'شاہراہ فیصل پر گڑھا', area: 'Gulshan', type: 'Road', priority: 'High', votes: 47, status: 'In Progress', date: '2026-06-05', score: 65 },
    { id: 2, title: 'Garbage overflow near Tariq Road', titleUr: 'طارق روڈ کے قریب کچرا', area: 'Saddar', type: 'Sanitation', priority: 'Critical', votes: 89, status: 'Pending', date: '2026-06-06', score: 89 },
    { id: 3, title: 'Street light broken Clifton', titleUr: 'کلفٹن میں بجلی خراب', area: 'Clifton', type: 'Utilities', priority: 'Medium', votes: 23, status: 'Resolved', date: '2026-06-04', score: 40 },
    { id: 4, title: 'Water shortage North Nazimabad', titleUr: 'نارتھ ناظم آباد میں پانی کی کمی', area: 'North Nazimabad', type: 'Water', priority: 'Critical', votes: 134, status: 'Pending', date: '2026-06-06', score: 95 },
    { id: 5, title: 'Sewerage leakage PECHS', titleUr: 'پی ای سی ایچ ایس میں سیوریج', area: 'PECHS', type: 'Sanitation', priority: 'Critical', votes: 102, status: 'In Progress', date: '2026-06-05', score: 91 },
    { id: 6, title: 'Flooding near Lyari', titleUr: 'لیاری کے قریب سیلاب', area: 'Lyari', type: 'Flood', priority: 'Critical', votes: 201, status: 'Pending', date: '2026-06-07', score: 98 },
    { id: 7, title: 'No street lights Korangi', titleUr: 'کورنگی میں روشنی نہیں', area: 'Korangi', type: 'Utilities', priority: 'Medium', votes: 34, status: 'Resolved', date: '2026-06-03', score: 38 },
    { id: 8, title: 'Broken road Gulshan Chowrangi', titleUr: 'گلشن چورنگی میں سڑک خراب', area: 'Gulshan', type: 'Road', priority: 'High', votes: 56, status: 'In Progress', date: '2026-06-05', score: 70 },
]

const priorityColor = { Critical: 'badge-red', High: 'badge-yellow', Medium: 'badge-gray', Low: 'badge-gray' }
const statusColor = { Pending: 'badge-red', 'In Progress': 'badge-yellow', Resolved: 'badge-green' }

const areaStats = [
    { area: 'Lyari', count: 3, color: '#E63946' },
    { area: 'Saddar', count: 2, color: '#F4A261' },
    { area: 'PECHS', count: 2, color: '#F4A261' },
    { area: 'Gulshan', count: 2, color: '#40916C' },
    { area: 'Clifton', count: 1, color: '#40916C' },
]

export default function Dashboard({ lang }) {
    const ur = lang === 'ur'
    const total = issues.length
    const resolved = issues.filter(i => i.status === 'Resolved').length
    const pending = issues.filter(i => i.status === 'Pending').length
    const inProgress = issues.filter(i => i.status === 'In Progress').length
    const resolutionRate = Math.round((resolved / total) * 100)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            <div>
                <h2 style={{ fontSize: 22, fontWeight: 700 }}>{ur ? 'عوامی ڈیش بورڈ' : 'Public Transparency Dashboard'}</h2>
                <p style={{ color: 'var(--muted)', fontSize: 14 }}>{ur ? 'تمام مسائل کی تفصیل' : 'Live status of all reported civic issues in Karachi'}</p>
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                {[
                    { label: ur ? 'کل مسائل' : 'Total Issues', value: total, color: '#1B4332' },
                    { label: ur ? 'زیر التواء' : 'Pending', value: pending, color: '#E63946' },
                    { label: ur ? 'جاری' : 'In Progress', value: inProgress, color: '#D97706' },
                    { label: ur ? 'حل شدہ' : 'Resolved', value: resolved, color: '#059669' },
                ].map(s => (
                    <div key={s.label} className="card" style={{ padding: 18, textAlign: 'center' }}>
                        <div style={{ fontSize: 30, fontWeight: 700, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Resolution rate + area breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

                {/* Resolution rate */}
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
                                { label: ur ? 'حل شدہ' : 'Resolved', value: resolved, color: '#059669' },
                                { label: ur ? 'جاری' : 'In Progress', value: inProgress, color: '#D97706' },
                                { label: ur ? 'زیر التواء' : 'Pending', value: pending, color: '#E63946' },
                            ].map(item => (
                                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <span style={{ fontSize: 13, color: 'var(--muted)' }}>{item.label}</span>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: item.color }}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Area breakdown */}
                <div className="card">
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>{ur ? 'علاقہ وار مسائل' : 'Issues by Area'}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {areaStats.map(a => (
                            <div key={a.area}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                                    <span style={{ fontWeight: 500 }}>{a.area}</span>
                                    <span style={{ color: 'var(--muted)' }}>{a.count} issues</span>
                                </div>
                                <div style={{ height: 8, background: '#F3F4F6', borderRadius: 99 }}>
                                    <div style={{ height: 8, width: `${(a.count / 3) * 100}%`, background: a.color, borderRadius: 99, transition: 'width 0.6s' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Issues table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #F3F4F6' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700 }}>{ur ? 'تمام رپورٹس' : 'All Reports'}</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                        <thead>
                            <tr style={{ background: '#F9FAFB' }}>
                                {[ur ? 'عنوان' : 'Issue', ur ? 'علاقہ' : 'Area', ur ? 'قسم' : 'Type', ur ? 'اسکور' : 'AI Score', ur ? 'ووٹ' : 'Votes', ur ? 'ترجیح' : 'Priority', ur ? 'حالت' : 'Status'].map(h => (
                                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--muted)', fontSize: 12, textTransform: 'uppercase' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {issues.sort((a, b) => b.score - a.score).map((issue, i) => (
                                <tr key={issue.id} style={{ borderTop: '1px solid #F3F4F6', background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                                    <td style={{ padding: '14px 16px', fontWeight: 500 }}>{ur ? issue.titleUr : issue.title}</td>
                                    <td style={{ padding: '14px 16px', color: 'var(--muted)' }}>{issue.area}</td>
                                    <td style={{ padding: '14px 16px', color: 'var(--muted)' }}>{issue.type}</td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ flex: 1, height: 6, background: '#F3F4F6', borderRadius: 99 }}>
                                                <div style={{ height: 6, width: `${issue.score}%`, background: issue.score >= 70 ? '#E63946' : issue.score >= 45 ? '#F4A261' : '#40916C', borderRadius: 99 }} />
                                            </div>
                                            <span style={{ fontSize: 12, fontWeight: 600, minWidth: 28 }}>{issue.score}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '14px 16px', color: 'var(--muted)' }}>👍 {issue.votes}</td>
                                    <td style={{ padding: '14px 16px' }}><span className={`badge ${priorityColor[issue.priority]}`}>{issue.priority}</span></td>
                                    <td style={{ padding: '14px 16px' }}><span className={`badge ${statusColor[issue.status]}`}>{issue.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}