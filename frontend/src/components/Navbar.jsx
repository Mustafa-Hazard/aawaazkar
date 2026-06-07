export default function Navbar({ page, setPage, lang, setLang, t }) {
    const navItems = ['home', 'report', 'map', 'dashboard', 'admin']

    return (
        <nav style={{
            background: 'var(--primary)',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 22 }}>📢</span>
                <span style={{ color: 'white', fontWeight: 700, fontSize: 20 }}>AawaazKar</span>
                <span style={{ color: '#74C69D', fontSize: 14, marginLeft: 4 }}>آواز کر</span>
            </div>

            <div style={{ display: 'flex', gap: 4 }}>
                {navItems.map(item => (
                    <button
                        key={item}
                        onClick={() => setPage(item)}
                        style={{
                            background: page === item ? '#40916C' : 'transparent',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: 10,
                            cursor: 'pointer',
                            fontWeight: page === item ? 600 : 400,
                            fontSize: 14,
                            transition: 'all 0.2s',
                        }}
                    >
                        {t[item]}
                    </button>
                ))}
            </div>

            <button
                onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
                style={{
                    background: '#40916C',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 10,
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: 14,
                }}
            >
                {lang === 'en' ? 'اردو' : 'English'}
            </button>
        </nav>
    )
}