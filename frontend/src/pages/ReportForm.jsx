import { useState } from 'react'
import { createReport } from '../api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const categories = [
    { value: 'road', label: 'Road / Pothole', labelUr: 'سڑک / گڑھا' },
    { value: 'sanitation', label: 'Garbage / Sanitation', labelUr: 'کچرا / صفائی' },
    { value: 'water', label: 'Water Shortage', labelUr: 'پانی کی کمی' },
    { value: 'electricity', label: 'Street Light / Electricity', labelUr: 'بجلی / روشنی' },
    { value: 'safety', label: 'Public Safety', labelUr: 'عوامی تحفظ' },
    { value: 'flood', label: 'Flood / Drainage', labelUr: 'سیلاب / نکاسی' },
]

const areas = ['Gulshan', 'Saddar', 'Clifton', 'North Nazimabad', 'Korangi', 'Malir', 'Lyari', 'PECHS', 'Orangi', 'Landhi']

function getPriorityScore(category, description) {
    let score = 0
    if (category === 'safety') score += 40
    else if (category === 'water') score += 35
    else if (category === 'flood') score += 35
    else if (category === 'road') score += 25
    else if (category === 'sanitation') score += 20
    else score += 15

    const urgentWords = ['emergency', 'urgent', 'critical', 'dangerous', 'broken', 'no water', 'flood']
    urgentWords.forEach(w => { if (description.toLowerCase().includes(w)) score += 10 })

    return Math.min(score, 100)
}

function getPriorityLabel(score) {
    if (score >= 70) return { label: 'Critical', color: '#E63946', bg: '#FFE4E6' }
    if (score >= 45) return { label: 'High', color: '#D97706', bg: '#FEF3C7' }
    if (score >= 25) return { label: 'Medium', color: '#2563EB', bg: '#DBEAFE' }
    return { label: 'Low', color: '#6B7280', bg: '#F3F4F6' }
}

export default function ReportForm({ lang }) {
    const ur = lang === 'ur'
    const [form, setForm] = useState({ title: '', category: '', area: '', description: '', photo: null })
    const [submitted, setSubmitted] = useState(false)
    const [locating, setLocating] = useState(false)
    const [location, setLocation] = useState(null)
    const [preview, setPreview] = useState(null)

    const score = form.category ? getPriorityScore(form.category, form.description) : null
    const priority = score !== null ? getPriorityLabel(score) : null

    function handlePhoto(e) {
        const file = e.target.files[0]
        if (!file) return
        setForm({ ...form, photo: file })
        setPreview(URL.createObjectURL(file))
    }

    function getLocation() {
        setLocating(true)
        navigator.geolocation.getCurrentPosition(
            pos => {
                setLocation({ lat: pos.coords.latitude.toFixed(5), lng: pos.coords.longitude.toFixed(5) })
                setLocating(false)
            },
            () => setLocating(false)
        )
    }

    async function handleSubmit() {
        if (!form.title || !form.category || !form.area) return
        try {
            await createReport({
                title: form.title,
                category: form.category,
                area: form.area,
                description: form.description,
                lat: location?.lat || null,
                lng: location?.lng || null,
            })
            setSubmitted(true)
            toast.success('Report submitted successfully!')
        } catch (err) {
            console.error(err)
        }
    }

    if (submitted) return (
        <div className="card" style={{ textAlign: 'center', padding: 60, maxWidth: 500, margin: '0 auto' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                {ur ? 'رپورٹ جمع ہو گئی' : 'Report Submitted!'}
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: 8 }}>
                {ur ? 'آپ کی رپورٹ موصول ہو گئی ہے' : 'Your issue has been received and assigned a priority score.'}
            </p>
            {priority && (
                <span className="badge" style={{ background: priority.bg, color: priority.color, fontSize: 14, padding: '6px 20px', margin: '12px 0', display: 'inline-block' }}>
                    {ur ? 'ترجیح:' : 'Priority:'} {priority.label} ({score}/100)
                </span>
            )}
            <br />
            <button className="btn-primary" style={{ marginTop: 24 }} onClick={() => { setSubmitted(false); setForm({ title: '', category: '', area: '', description: '', photo: null }); setPreview(null); setLocation(null) }}>
                {ur ? 'نئی رپورٹ' : 'Submit Another'}
            </button>
        </div>
    )

    return (
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <div className="card">
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
                    {ur ? 'مسئلہ رپورٹ کریں' : 'Report a Civic Issue'}
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>
                    {ur ? 'تفصیلات بھریں تاکہ مسئلہ جلد حل ہو' : 'Fill in the details to help us prioritize and resolve faster'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                            {ur ? 'عنوان' : 'Issue Title'} *
                        </label>
                        <input placeholder={ur ? 'مثال: شاہراہ فیصل پر گڑھا' : 'e.g. Large pothole on Shahrae Faisal'}
                            value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                                {ur ? 'قسم' : 'Category'} *
                            </label>
                            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                <option value="">{ur ? 'قسم منتخب کریں' : 'Select category'}</option>
                                {categories.map(c => <option key={c.value} value={c.value}>{ur ? c.labelUr : c.label}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                                {ur ? 'علاقہ' : 'Area'} *
                            </label>
                            <select value={form.area} onChange={e => setForm({ ...form, area: e.target.value })}>
                                <option value="">{ur ? 'علاقہ منتخب کریں' : 'Select area'}</option>
                                {areas.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                            {ur ? 'تفصیل' : 'Description'}
                        </label>
                        <textarea rows={3} placeholder={ur ? 'مسئلے کی تفصیل لکھیں...' : 'Describe the issue in detail...'}
                            value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                            style={{ resize: 'vertical' }} />
                    </div>

                    {/* AI Priority Score */}
                    {priority && (
                        <div style={{ background: priority.bg, border: `1.5px solid ${priority.color}`, borderRadius: 12, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: priority.color }}>
                                    {ur ? 'AI ترجیحی اسکور' : 'AI Priority Score'}
                                </div>
                                <div style={{ fontSize: 12, color: priority.color, opacity: 0.8 }}>
                                    {ur ? 'خودکار حساب' : 'Auto-calculated based on issue type'}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 28, fontWeight: 700, color: priority.color }}>{score}</div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: priority.color }}>{priority.label}</div>
                            </div>
                        </div>
                    )}

                    {/* Location */}
                    <div>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                            {ur ? 'مقام' : 'Location'}
                        </label>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                            <button type="button" className="btn-outline" style={{ padding: '10px 16px', fontSize: 13, whiteSpace: 'nowrap' }} onClick={getLocation}>
                                {locating ? '...' : (ur ? '📍 مقام حاصل کریں' : '📍 Get My Location')}
                            </button>
                            {location && <span style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500 }}>✅ {location.lat}, {location.lng}</span>}
                        </div>
                    </div>

                    {/* Photo */}
                    <div>
                        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                            {ur ? 'تصویر' : 'Photo (optional)'}
                        </label>
                        <input type="file" accept="image/*" onChange={handlePhoto} style={{ padding: '8px 12px' }} />
                        {preview && <img src={preview} alt="preview" style={{ marginTop: 10, width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 10 }} />}
                    </div>

                    <button className="btn-primary" style={{ marginTop: 8, fontSize: 16, padding: '14px' }} onClick={handleSubmit}>
                        {ur ? 'رپورٹ جمع کریں' : 'Submit Report'}
                    </button>
                </div>
            </div>
        </div>
    )
}