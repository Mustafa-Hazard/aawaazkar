const stats = [
    { label: 'Issues Reported', labelUr: 'رپورٹ شدہ مسائل', value: '1,284', icon: '📋' },
    { label: 'Resolved', labelUr: 'حل شدہ', value: '892', icon: '✅' },
    { label: 'Active Reports', labelUr: 'فعال رپورٹس', value: '312', icon: '🔴' },
    { label: 'Areas Covered', labelUr: 'علاقے', value: '24', icon: '📍' },
]

const issues = [
    { id: 1, title: 'Pothole on Shahrae Faisal', titleUr: 'شاہراہ فیصل پر گڑھا', area: 'Gulshan', type: 'Road', priority: 'High', votes: 47, status: 'In Progress' },
    { id: 2, title: 'Garbage overflow near Tariq Road', titleUr: 'طارق روڈ کے قریب کچرا', area: 'Saddar', type: 'Sanitation', priority: 'Critical', votes: 89, status: 'Pending' },
    { id: 3, title: 'Street light broken at Clifton', titleUr: 'کلفٹن میں بجلی کا کھمبا خراب', area: 'Clifton', type: 'Utilities', priority: 'Medium', votes: 23, status: 'Resolved' },
    { id: 4, title: 'Water shortage in North Nazimabad', titleUr: 'نارتھ ناظم آباد میں پانی کی کمی', area: 'North Nazimabad', type: 'Water', priority: 'Critical', votes: 134, status: 'Pending' },
]

const priorityColor = {
    Critical: 'badge-red',
    High: 'badge-yellow',
    Medium: 'badge-gray',
}

const statusColor = {
    Pending: 'badge-red',
    'In Progress': 'badge-yellow',
    Resolved: 'badge-green',
}

export default function Home({ setPage, lang }) {
    const ur = lang === 'ur'

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            {/* Hero */}
            <div style={{
                background: 'linear-gradient(135deg, #1B4332 0%, #40916C 100%)',
                borderRadius: 20,
                padding: '48px 40px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: -60, right: 80, width: 150, height: 150, background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
                <p style={{ fontSize: 13, fontWeight: 600, color: '#74C69D', marginBottom: 8, letterSpacing: 1 }}>KARACHI CIVIC PLATFORM</p>
                <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, lineHeight: 1.2 }}>
                    {ur ? 'اپنی آواز اٹھائیں' : 'Report. Verify. Resolve.'}
                </h1>
                <p style={{ fontSize: 16, color: '#B7E4C7', marginBottom: 28, maxWidth: 480 }}>
                    {ur
                        ? 'کراچی کے شہری مسائل کو رپورٹ کریں اور حل کروائیں'
                        : 'Empowering Karachi citizens to report civic issues, track resolution, and hold authorities accountable.'}
                </p>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn-primary" onClick={() => setPage('report')}
                        style={{ background: 'white', color: '#1B4332' }}>
                        {ur ? '+ مسئلہ رپورٹ کریں' : '+ Report an Issue'}
                    </button>
                    <button className="btn-outline" onClick={() => setPage('map')}
                        style={{ borderColor: 'white', color: 'white' }}>
                        {ur ? 'نقشہ دیکھیں' : 'View Live Map'}
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {stats.map(s => (
                    <div key={s.label} className="card" style={{ textAlign: 'center', padding: 20 }}>
                        <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                        <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--primary)' }}>{s.value}</div>
                        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
                            {ur ? s.labelUr : s.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Issues */}
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700 }}>{ur ? 'حالیہ مسائل' : 'Recent Issues'}</h2>
                    <button className="btn-outline" style={{ padding: '6px 16px', fontSize: 13 }} onClick={() => setPage('dashboard')}>
                        {ur ? 'سب دیکھیں' : 'View All'}
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {issues.map(issue => (
                        <div key={issue.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '16px',
                            background: '#F9FAFB',
                            borderRadius: 12,
                            border: '1.5px solid #E5E7EB',
                        }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                                    {ur ? issue.titleUr : issue.title}
                                </div>
                                <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                                    📍 {issue.area} · {issue.type}
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ fontSize: 13, color: 'var(--muted)' }}>👍 {issue.votes}</span>
                                <span className={`badge ${priorityColor[issue.priority]}`}>{issue.priority}</span>
                                <span className={`badge ${statusColor[issue.status]}`}>{issue.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}