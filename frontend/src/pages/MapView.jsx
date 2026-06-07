import { useEffect, useRef } from 'react'

const mockIssues = [
    { id: 1, lat: 24.8607, lng: 67.0011, title: 'Pothole on Shahrae Faisal', type: 'Road', priority: 'High', votes: 47, area: 'Gulshan' },
    { id: 2, lat: 24.8555, lng: 67.0104, title: 'Garbage overflow near Tariq Road', type: 'Sanitation', priority: 'Critical', votes: 89, area: 'Saddar' },
    { id: 3, lat: 24.8120, lng: 67.0300, title: 'Street light broken at Clifton', type: 'Utilities', priority: 'Medium', votes: 23, area: 'Clifton' },
    { id: 4, lat: 24.9217, lng: 67.0645, title: 'Water shortage North Nazimabad', type: 'Water', priority: 'Critical', votes: 134, area: 'North Nazimabad' },
    { id: 5, lat: 24.8900, lng: 67.0750, title: 'Broken road Gulshan Chowrangi', type: 'Road', priority: 'High', votes: 56, area: 'Gulshan' },
    { id: 6, lat: 24.8700, lng: 67.0600, title: 'Sewerage leakage PECHS', type: 'Sanitation', priority: 'Critical', votes: 102, area: 'PECHS' },
    { id: 7, lat: 24.8400, lng: 66.9900, title: 'Flooding near Lyari', type: 'Flood', priority: 'Critical', votes: 201, area: 'Lyari' },
    { id: 8, lat: 24.9000, lng: 67.1200, title: 'No street lights Korangi', type: 'Utilities', priority: 'Medium', votes: 34, area: 'Korangi' },
]

const priorityColors = {
    Critical: '#E63946',
    High: '#F4A261',
    Medium: '#2563EB',
    Low: '#6B7280',
}

export default function MapView() {
    const mapRef = useRef(null)
    const mapInstance = useRef(null)

    useEffect(() => {
        if (mapInstance.current) return

        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)

        const script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        script.onload = () => {
            const L = window.L
            const map = L.map(mapRef.current).setView([24.8607, 67.0011], 12)
            mapInstance.current = map

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map)

            mockIssues.forEach(issue => {
                const color = priorityColors[issue.priority]
                const marker = L.circleMarker([issue.lat, issue.lng], {
                    radius: 10 + issue.votes / 20,
                    fillColor: color,
                    color: 'white',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.85,
                }).addTo(map)

                marker.bindPopup(`
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 180px;">
            <div style="font-weight: 700; font-size: 14px; margin-bottom: 4px;">${issue.title}</div>
            <div style="font-size: 12px; color: #6B7280; margin-bottom: 8px;">📍 ${issue.area} · ${issue.type}</div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="background:${color}22; color:${color}; padding: 2px 10px; border-radius: 999px; font-size: 12px; font-weight: 600;">${issue.priority}</span>
              <span style="font-size: 12px; color: #6B7280;">👍 ${issue.votes}</span>
            </div>
          </div>
        `)
            })
        }
        document.head.appendChild(script)
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: 22, fontWeight: 700 }}>Live Issue Map</h2>
                    <p style={{ color: 'var(--muted)', fontSize: 14 }}>Real-time civic issues across Karachi</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    {Object.entries(priorityColors).map(([label, color]) => (
                        <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                            <span style={{ width: 12, height: 12, borderRadius: '50%', background: color, display: 'inline-block' }} />
                            {label}
                        </span>
                    ))}
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div ref={mapRef} style={{ height: 520, width: '100%', borderRadius: 16 }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {['Critical', 'High', 'Medium', 'Low'].map(p => {
                    const count = mockIssues.filter(i => i.priority === p).length
                    return (
                        <div key={p} className="card" style={{ padding: 16, textAlign: 'center' }}>
                            <div style={{ fontSize: 22, fontWeight: 700, color: priorityColors[p] }}>{count}</div>
                            <div style={{ fontSize: 13, color: 'var(--muted)' }}>{p} Issues</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}