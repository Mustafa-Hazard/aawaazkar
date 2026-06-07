import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

export const getReports = () => api.get('/reports')
export const createReport = (data) => api.post('/reports', data)
export const updateStatus = (id, status) => api.patch(`/reports/${id}/status`, { status })
export const upvoteReport = (id) => api.patch(`/reports/${id}/upvote`)
export const getStats = () => api.get('/reports/stats')
export const login = (username, password) => api.post('/auth/login', { username, password })

export default api