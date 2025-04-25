import { CandidateProfile, Demographics, Links } from '@/app/profile/useProfile';
import createAPI from '..';


interface GetProfileResponse { 
    current_position?: string,
    location?: string,
    resume_url?: string,
    skills?: string[],
    demographics?: Demographics,
    links?: Links;
}
interface AuthResponse {
    access_token: string;
    refresh_token: string;
}
interface SignedURLResponse {
    signed_url: string,
    file_path: string
}

const api = createAPI(process.env.NEXT_PUBLIC_PROFILE_URL || "");

const profileService = {
    getProfile: async () => {
        const { data } = await api.get<GetProfileResponse>(`/profile/`);
        return data;
    },

    updateProfile: async (profile: CandidateProfile) => {
        const { data } = await api.put<AuthResponse>('/profile/', profile);
        return data;
    },

    getSignedUploadUrl: async (fileName: string) => {
        const { data } = await api.get<SignedURLResponse>(`/profile/resume-upload-url/${fileName}`);
        return data;
    },

    getSignedViewUrl: async (filePath: string) => {
        const { data } = await api.get<SignedURLResponse>(`/profile/resume-view-url?filePath=${filePath}`);
        return data;
    }
};

export default profileService;