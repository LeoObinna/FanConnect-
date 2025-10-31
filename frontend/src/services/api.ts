import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: {
    email: string;
    username: string;
    password: string;
    role: string;
  }) => api.post('/api/auth/register', userData),
  
  login: (credentials: {
    email: string;
    password: string;
  }) => api.post('/api/auth/login', credentials),
};

// User API
export const userAPI = {
  verifyAge: (userId: string, selfie: File) => {
    const formData = new FormData();
    formData.append('selfie', selfie);
    formData.append('userId', userId);
    return api.post('/api/verify-age', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  getProfile: (userId: string) => api.get(`/api/users/${userId}`),
  
  updateProfile: (userId: string, profileData: any) => 
    api.put(`/api/users/${userId}`, profileData),
};

// Posts API
export const postsAPI = {
  createPost: (postData: {
    title: string;
    content: string;
    creatorId: string;
  }) => api.post('/api/posts', postData),
  
  getAllPosts: () => api.get('/api/posts'),
  
  getPost: (postId: string) => api.get(`/api/posts/${postId}`),
  
  getUserPosts: (userId: string) => api.get(`/api/posts/user/${userId}`),
  
  deletePost: (postId: string) => api.delete(`/api/posts/${postId}`),
};

// Payments API
export const paymentsAPI = {
  createSubscription: (subscriptionData: {
    priceId: string;
    creatorId: string;
  }) => api.post('/api/subscriptions', subscriptionData),
  
  createTip: (tipData: {
    amount: number;
    creatorId: string;
  }) => api.post('/api/tips', tipData),
  
  getSubscriptions: (userId: string) => api.get(`/api/subscriptions/user/${userId}`),
  
  cancelSubscription: (subscriptionId: string) => 
    api.delete(`/api/subscriptions/${subscriptionId}`),
};

// Stream API (for live streaming)
export const streamAPI = {
  createStream: (streamData: {
    title: string;
    description: string;
    creatorId: string;
  }) => api.post('/api/streams', streamData),
  
  getStream: (streamId: string) => api.get(`/api/streams/${streamId}`),
  
  endStream: (streamId: string) => api.post(`/api/streams/${streamId}/end`),
};

export default api;