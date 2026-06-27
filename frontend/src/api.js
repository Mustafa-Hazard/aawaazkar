import axios from 'axios'

const API_BASE_URL = 'http://localhost:4000/api'

const api = axios.create({
    baseURL: API_BASE_URL,
})

// Attach the saved admin token to every request automatically, if one exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// ---- Reports ----

export function getReports() {
    return api.get('/reports')
}

export function getStats() {
    return api.get('/reports/stats')
}

export function getReportById(id) {
    return api.get(`/reports/${id}`)
}

export function createReport(data) {
    return api.post('/reports', data)
}

export function updateStatus(id, status) {
    return api.patch(`/reports/${id}/status`, { status })
}

export function upvoteReport(id) {
    return api.patch(`/reports/${id}/upvote`)
}

// ---- Auth ----

export function login(username, password) {
    return api.post('/auth/login', { username, password })
}

export default api