import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Auth service
const authService = {
    login: (credentials) => api.post('/users/login', credentials),
    register: (userData) => api.post('/users/register', userData),
};

// Channel service
const channelService = {
    create: (channelData) => api.post('/channels', channelData),
    getMyChannel: () => api.get('/channels/me'),
    getByHandle: (handle) => api.get(`/channels/${handle}`),
};

// Video service
const videoService = {
    create: (videoData) => api.post('/videos', videoData),
    getAll: (params) => api.get('/videos', { params }),
    // getById: (id) => api.get(`/videos/${id}`),
    // like: (id) => api.post(`/videos/${id}/like`),
    // dislike: (id) => api.post(`/videos/${id}/dislike`),
};

// Comment service
const commentService = {
    create: (videoId, text) => api.post(`/comments/${videoId}`, { text }),
    getForVideo: (videoId) => api.get(`/comments/${videoId}`),
};

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
);

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const auth = authService;
export const channels = channelService;
export const videos = videoService;
export const comments = commentService;

export default api;
