import api from '..';

interface LoginRequest {
    email: string;
    password: string;
}

interface SignupRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: number;
}

interface AuthResponse {
    access_token: string;
    refresh_token: string;
}

const authService = {
    login: async (credentials: LoginRequest) => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    return data;
    },

    signup: async (userData: SignupRequest) => {
    const { data } = await api.post<AuthResponse>('/auth/signup', userData);
    return data;
    }
};

export default authService;