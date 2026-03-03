import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: add access token to headers
api.interceptors.request.use(
    (config) => {
        // We only access localStorage on the client side
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If 401 Unauthorized and not already retrying (to avoid infinite loops)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                if (typeof window !== 'undefined') {
                    const refreshToken = localStorage.getItem('refreshToken');
                    // Parse user payload to get userId (or store userId separately)
                    const userStr = localStorage.getItem('user');

                    if (refreshToken && userStr) {
                        const user = JSON.parse(userStr);

                        // Call the refresh endpoint
                        const res = await axios.post(`${baseURL}/auth/refresh`, {
                            userId: user.id,
                            refreshToken,
                        });

                        // If refresh successful, save new tokens
                        const newAccessToken = res.data.accessToken;
                        const newRefreshToken = res.data.refreshToken;

                        localStorage.setItem('accessToken', newAccessToken);
                        if (newRefreshToken) {
                            localStorage.setItem('refreshToken', newRefreshToken);
                        }

                        // Retry original request with new token
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        return api(originalRequest);
                    }
                }
            } catch (err) {
                // If refresh fails, log out the user
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
