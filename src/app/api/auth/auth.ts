import createAPI from '..';

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

interface UserResponse {
    id: number,
    email: string,
    firstname: string,
    lastname: string,
    role_id: number,
    org: {
        id: number,
        name: string,
        domain: string,
        description: string,
        size: string,
        industry: string,
    }
}

const api = createAPI(process.env.NEXT_PUBLIC_AUTH_URL || "");

const authService = {
    login: async (credentials: LoginRequest) => {
        const { data } = await api.post<AuthResponse>('/auth/login', credentials);
        return data;
    },

    signup: async (userData: SignupRequest) => {
        const { data } = await api.post<AuthResponse>('/auth/signup', userData);
        return data;
    },

    getUserOrgDetails: async (access_token: string) => {
        const { data } = await api.get<UserResponse>('/auth/get_user', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return data;
    },
};

export default authService;