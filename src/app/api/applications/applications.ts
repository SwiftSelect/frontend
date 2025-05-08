import createAPI from '..';
import { Application, ApplicationResponse, ApplicationRequest } from './types';

const api = createAPI(process.env.NEXT_PUBLIC_JOBS_API_URL || "http://localhost:8080");

const applicationsService = {
     getApplicationsByJobId: async (jobId: string) => {
            try {
                console.log('Fetching applications for jobId:', jobId);
                const { data } = await api.get<Application[]>(`/applications/job/${jobId}`);
                console.log('Applications fetched:', data);
                if (!data) {
                throw new Error('No applications data received');
                }
                return data;
            } catch (error) {
                console.error('Error in getApplicationsByJobId:', error);
                throw new Error(`Failed to fetch applications: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        },
     getApplicationByCandidateId: async (candidateId: string) => {
        try {
            console.log('Getting application by candidate ID:', { candidateId });
            const { data } = await api.get<Application[]>(`/applications/candidate/${candidateId}`);
            
            // if (!data) {
            //     throw new Error(`Application with candidate ID ${candidateId} not found`);
            // }
            if(data === null) {
                return [];
            }
            
            console.log('Found application:', data);
            return data;
        } catch (error) {
            console.error('Error in getApplicationByCandidateId:', error);
            throw error;
        }
    },
    getApplication: async (applicationId: string) => {
        const { data } = await api.get<Application>(`/applications/${applicationId}`);
        return data;
    },

    createApplication: async (application: ApplicationRequest) => {
        const { data } = await api.post<ApplicationResponse>('/applications', application);
        return data;
    },
};

export default applicationsService; 