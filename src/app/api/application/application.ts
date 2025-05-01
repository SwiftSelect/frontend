import { Demographics, Links } from '@/app/profile/useProfile';
import createAPI from '..';
import { Application } from '@/app/job/[jobId]/application/useApplication';


export interface ApplicationRequest{ 
    jobId: string;
    candidateId: string;
    phone: string,
    resumeUrl: string,
    links: Links,
    email: string,
    location: string,
    coverLetter: string,
    skills: string[],
    demographics: Demographics,
}

interface ApplicationResponse {
    applicationId: string;
}

const api = createAPI(process.env.NEXT_PUBLIC_APPLICATION_URL || "");

const applicationService = {
    getApplication: async (applicationId: string) => {
        const { data } = await api.get<Application>(`/application/${applicationId}`);
        return data;
    },

    createApplication: async (application: ApplicationRequest) => {
        const { data } = await api.post<ApplicationResponse>('/application/', application);
        return data;
    },
};

export default applicationService;