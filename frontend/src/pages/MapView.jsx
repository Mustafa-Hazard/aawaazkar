import { useEffect, useRef, useState } from 'react'
import { getReports } from '../api'

const priorityColors = {
    Critical: '#E63946',
    High: '#F4A261',
    Medium: '#2563EB',
    Low: '#6B7280',
}

// Rough center point for Karachi, used as the default map view
const KARACHI_CENTER = [24.8607, 67.0011]

export default function MapView() {
    const mapRef = useRef(null)
    const mapInstance = useRef(null)
    const markersRef = useRef([])
    const [issues, setIssues] = useState([])
    const [loading, setLoading] = useState(true)
    const [mapReady, setMapReady] = useState(false)

    // Load real reports from the backend
    useEffect(() => {
        getReports()
            .then(res => setIssues(res.data))
            .catch(err => console.error('Failed to load reports for map:', err))
            .finally(() => setLoading(false))
    }, [])

    // Load Leaflet once
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
            const map = L.map(mapRef.current).setView(KARACHI_CENTER, 12)
            mapInstance.current = map

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map)

            setMapReady(true)
        }
        document.head.appendChild(script)
    }, [])

    // Plot markers whenever issues or map-readiness changes
    useEffect(() => {
        if (!mapReady || !mapInstance.current) return
        const L = window.L
        const map = mapInstance.current

        // Clear previously drawn markers before redrawing
        markersRef.current.forEach(m => map.removeLayer(m))
        markersRef.current = []

        const plottable = issues.filter(i => i.lat != null && i.lng != null)

        plottable.forEach(issue => {
            const color = priorityColors[issue.priority] || priorityColors.Low
            const marker = L.circleMarker([Number(issue.lat), Number(issue.lng)], {
                radius: 10 + Math.min(issue.votes, 100) / 10,
                fillColor: color,
                color: 'white',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.85,
            }).addTo(map)

            marker.bindPopup(`
                <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 180px;">
                    <div style="font-weight: 700; font-size: 14px; margin-bottom: 4px;">${escapeHtml(issue.title)}</div>
                    <div style="font-size: 12px; color: #6B7280; margin-bottom: 8px;">📍 ${escapeHtml(issue.area)} · ${escapeHtml(issue.category)}</div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="background:${color}22; color:${color}; padding: 2px 10px; border-radius: 999px; font-size: 12px; font-weight: 600;">${escapeHtml(issue.priority)}</span>
                        <span style="font-size: 12px; color: #6B7280;">👍 ${issue.votes}</span>
                    </div>
                </div>
            `)

            markersRef.current.push(marker)
        })
    }, [issues, mapReady])

    const plottableCount = issues.filter(i => i.lat != null && i.lng != null).length
    const unplottableCount = issues.length - plottableCount

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

            {!loading && unplottableCount > 0 && (
                <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>
                    {unplottableCount} report{unplottableCount === 1 ? '' : 's'} without location data {unplottableCount === 1 ? "isn't" : "aren't"} shown on the map.
                </p>
            )}

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div ref={mapRef} style={{ height: 520, width: '100%', borderRadius: 16 }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {['Critical', 'High', 'Medium', 'Low'].map(p => {
                    const count = issues.filter(i => i.priority === p).length
                    return (
                        <div key={p} className="card" style={{ padding: 16, textAlign: 'center' }}>
                            <div style={{ fontSize: 22, fontWeight: 700, color: priorityColors[p] }}>{loading ? '...' : count}</div>
                            <div style={{ fontSize: 13, color: 'var(--muted)' }}>{p} Issues</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// Minimal escaping so report titles/areas can't break out of the popup HTML string
function escapeHtml(str) {
    if (str == null) return ''
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
}