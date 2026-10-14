import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/+$/, '')}/api`
  : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('collabrix_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;

      if (
        currentPath.startsWith('/brand') ||
        currentPath.startsWith('/creator')
      ) {
        localStorage.removeItem('collabrix_token');
        localStorage.removeItem('collabrix_user');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const creatorAPI = {
  getCreators: (params?: any) => api.get('/creators', { params }),
  getCreatorById: (id: string) => api.get(`/creators/${id}`),
  getCreatorByHandle: (handle: string) =>
    api.get(`/creators/handle/${handle}`),
  updateMyProfile: (data: any) => api.put('/creators/me', data),
  toggleDemoVerification: (id: string) =>
    api.post(`/creators/${id}/toggle-demo-verification`),
};

export const portfolioAPI = {
  getCreatorPortfolio: (creatorId: string) =>
    api.get(`/portfolio/creator/${creatorId}`),
  getPortfolioItemById: (id: string) => api.get(`/portfolio/${id}`),
  addPortfolioItem: (data: any) => api.post('/portfolio', data),
  updatePortfolioItem: (id: string, data: any) =>
    api.put(`/portfolio/${id}`, data),
  deletePortfolioItem: (id: string) => api.delete(`/portfolio/${id}`),
};

export const briefAPI = {
  createBrief: (data: any) => api.post('/briefs', data),
  getBriefs: (params?: any) => api.get('/briefs', { params }),
  getBriefById: (id: string) => api.get(`/briefs/${id}`),
  updateBrief: (id: string, data: any) => api.put(`/briefs/${id}`, data),
  deleteBrief: (id: string) => api.delete(`/briefs/${id}`),
  generateAiBrief: (ideaPrompt: string) =>
    api.post('/briefs/ai-assist', { ideaPrompt }),
};

export const matchAPI = {
  getMatchesForBrief: (briefId: string) => api.get(`/matches/${briefId}`),
  quickAnalyze: (ideaPrompt: string) =>
    api.post('/matches/quick-analyze', { ideaPrompt }),
};

export const proposalAPI = {
  createProposal: (data: any) => api.post('/proposals', data),
  getProposals: () => api.get('/proposals'),
  respondProposal: (
    id: string,
    data: { status: 'accepted' | 'declined'; responseNotes?: string }
  ) => api.patch(`/proposals/${id}/respond`, data),
};

export const collaborationAPI = {
  getCollaborations: () => api.get('/collaborations'),
  getCollaborationById: (id: string) => api.get(`/collaborations/${id}`),
  submitAsset: (id: string, data: any) =>
    api.post(`/collaborations/${id}/assets`, data),
  requestRevision: (id: string, data: { feedback: string }) =>
    api.post(`/collaborations/${id}/revisions`, data),
  completeCollaboration: (id: string) =>
    api.post(`/collaborations/${id}/complete`),
};

export const savedCreatorAPI = {
  saveCreator: (creatorId: string, notes?: string) =>
    api.post('/saved-creators', { creatorId, notes }),
  unsaveCreator: (creatorId: string) =>
    api.delete(`/saved-creators/${creatorId}`),
  getSavedCreators: () => api.get('/saved-creators'),
};

export const messageAPI = {
  getConversations: () => api.get('/conversations'),
  getOrCreateConversation: (recipientId: string, briefId?: string) =>
    api.post('/conversations', { recipientId, briefId }),
  getMessages: (conversationId: string) =>
    api.get(`/conversations/${conversationId}/messages`),
  sendMessage: (conversationId: string, content: string) =>
    api.post(`/conversations/${conversationId}/messages`, { content }),
};

export const notificationAPI = {
  getNotifications: () => api.get('/notifications'),
  markRead: (id: string) => api.patch(`/notifications/${id}/read`),
  markAllRead: () => api.patch('/notifications/read-all'),
};

export const dashboardAPI = {
  getBrandStats: () => api.get('/dashboard/brand'),
  getCreatorStats: () => api.get('/dashboard/creator'),
};

export default api;