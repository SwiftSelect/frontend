import createAPI from '..';
import { Application, ApplicationResponse, ApplicationRequest } from './types';

const api = createAPI(process.env.NEXT_PUBLIC_JOBS_API_URL || "http://localhost:8080");

const applicationsService = {
    getApplicationsByJobId: async (jobId: string) => {
        try {
            if (!jobId) {
                return [];
            }
            console.log('Fetching applications for jobId:', jobId);
            const { data } = await api.get<Application[]>(`/applications/job/${jobId}`);
            console.log('Applications fetched:', data);
            return data || [];
        } catch (error: any) {
            if (error?.response?.status === 400 || error?.response?.status === 404) {
                return [];
            }
            console.error('Error in getApplicationsByJobId:', error);
            throw new Error(`Failed to fetch applications: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    },

    getApplicationByCandidateId: async (candidateId: string) => {
        try {
            if (!candidateId) {
                return [];
            }
            console.log('Getting application by candidate ID:', { candidateId });
            const { data } = await api.get<Application[]>(`/applications/candidate/${candidateId}`);
            return data || [];
        } catch (error: any) {
            if (error?.response?.status === 400 || error?.response?.status === 404) {
                return [];
            }
            console.error('Error in getApplicationByCandidateId:', error);
            throw error;
        }
    },

    getApplication: async (applicationId: string) => {
        try {
            if (!applicationId) {
                throw new Error('Application ID is required');
            }
            const { data } = await api.get<Application>(`/applications/${applicationId}`);
            if (!data) {
                throw new Error('Application not found');
            }
            return data;
        } catch (error: any) {
            if (error?.response?.status === 404) {
                throw new Error('Application not found');
            }
            console.error('Error in getApplication:', error);
            throw error;
        }
    },

    createApplication: async (application: ApplicationRequest) => {
        try {
            if (!application.jobId || !application.candidateId) {
                throw new Error('Job ID and Candidate ID are required');
            }
            const { data } = await api.post<ApplicationResponse>('/applications', application);
            return data;
        } catch (error: any) {
            console.error('Error in createApplication:', error);
            if (error?.response?.status === 409) {
                throw new Error('You have already applied for this job');
            }
            throw error;
        }
    },
};

export default applicationsService; 