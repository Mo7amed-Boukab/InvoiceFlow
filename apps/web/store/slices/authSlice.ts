import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/axios';

// Interfaces for our auth state and responses
export interface User {
    id: string;
    companyName: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isActive?: boolean;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

// Initial state, pulling from localStorage on client side
const initialState: AuthState = {
    user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null,
    token: typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
    isAuthenticated: typeof window !== 'undefined' && !!localStorage.getItem('accessToken'),
    loading: false,
    error: null,
};

// --- Thunks ---

// Login Thunk
export const loginThunk = createAsyncThunk(
    'auth/login',
    async (credentials: object, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/login', credentials);
            return response.data; // { accessToken, refreshToken, user }
        } catch (error: any) {
            const message = error.response?.data?.message;
            if (message) {
                return rejectWithValue(Array.isArray(message) ? message[0] : message);
            }
            return rejectWithValue('Une erreur est survenue lors de la connexion.');
        }
    }
);

// Register Thunk
export const registerThunk = createAsyncThunk(
    'auth/register',
    async (userData: object, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message;
            if (message) {
                return rejectWithValue(Array.isArray(message) ? message[0] : message);
            }
            return rejectWithValue("Une erreur est survenue lors de l'inscription.");
        }
    }
);

// Logout Thunk (Optional call to backend to invalidate refresh token)
export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, { dispatch }) => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            // Ignore errors if logout fails on server, still remove locally
        }
        dispatch(logout()); // execute synchronous Redux clear
    }
);

// Fetch current user details
export const checkAuthThunk = createAsyncThunk(
    'auth/check',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        } catch (error: any) {
            return rejectWithValue('Session is invalid or expired.');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Clear auth state (called by logoutThunk or manually)
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;

            if (typeof window !== 'undefined') {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
            }
        },
        // Useful for clearing errors manually before a new attempt
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // -- Login --
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.accessToken;

                // Store in localStorage
                if (typeof window !== 'undefined') {
                    localStorage.setItem('accessToken', action.payload.accessToken);
                    localStorage.setItem('refreshToken', action.payload.refreshToken);
                    localStorage.setItem('user', JSON.stringify(action.payload.user));
                }
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // -- Register --
            .addCase(registerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerThunk.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.accessToken;

                if (typeof window !== 'undefined') {
                    localStorage.setItem('accessToken', action.payload.accessToken);
                    localStorage.setItem('refreshToken', action.payload.refreshToken);
                    localStorage.setItem('user', JSON.stringify(action.payload.user));
                }
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // -- Check Auth --
            .addCase(checkAuthThunk.rejected, (state) => {
                // Only trigger logout if it failed because token is truly invalid
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
            })
            .addCase(checkAuthThunk.fulfilled, (state, action) => {
                state.user = action.payload; // Update user just in case
            });
    },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
