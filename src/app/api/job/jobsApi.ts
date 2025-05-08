import createAPI from '..';
import { JobDetails, CreatedJobResponse, JobSummary } from './types';

const api = createAPI(process.env.NEXT_PUBLIC_JOBS_API_URL || "http://localhost:8080");

const jobsService = {
    getJobDetails: async (jobId: string) => {
        try {
            if (!jobId) {
                throw new Error('Job ID is required');
            }
            const { data } = await api.get<JobDetails>(`/jobs/${jobId}`);
            if (!data) {
                throw new Error('Job not found');
            }
            return data;
        } catch (error: any) {
            if (error?.response?.status === 404) {
                throw new Error('Job not found');
            }
            console.error('Error in getJobDetails:', error);
            throw error;
        }
    },

    getJobs: async () => {
        try {
            const { data } = await api.get<JobDetails[]>('/jobs');
            return data || [];
        } catch (error) {
            console.error('Error in getJobs:', error);
            throw error;
        }
    },

    getJobsByRecruiterId: async (recruiterId: number) => {
        try {
            if (!recruiterId) {
                return [];
            }
            const { data } = await api.get<JobDetails[]>(`/jobs/recruiter/${recruiterId}`);
            return data || [];
        } catch (error: any) {
            if (error?.response?.status === 400 || error?.response?.status === 404) {
                return [];
            }
            console.error('Error in getJobsByRecruiterId:', error);
            throw error;
        }
    },

    createJob: async (jobData: Omit<JobDetails, 'postedDate' | 'daysPostedAgo'>) => {
        try {
            console.log('Creating job with data:', jobData);
            const { data } = await api.post<CreatedJobResponse>('/jobs', jobData);
            return data;
        } catch (error) {
            console.error('Error in createJob:', error);
            throw error;
        }
    },

    updateJob: async (jobId: string, jobData: Partial<JobDetails>) => {
        try {
            if (!jobId) {
                throw new Error('Job ID is required');
            }
            const { data } = await api.put<JobDetails>(`/jobs/${jobId}`, jobData);
            return data;
        } catch (error: any) {
            if (error?.response?.status === 404) {
                throw new Error('Job not found');
            }
            console.error('Error in updateJob:', error);
            throw error;
        }
    },

    deleteJob: async (jobId: string) => {
        try {
            if (!jobId) {
                throw new Error('Job ID is required');
            }
            await api.delete(`/jobs/${jobId}`);
            return true;
        } catch (error: any) {
            if (error?.response?.status === 404) {
                throw new Error('Job not found');
            }
            console.error('Error in deleteJob:', error);
            throw error;
        }
    },

    getJobSummaries: async (jobIds: string[]) => {
        try {
            if (!jobIds || jobIds.length === 0) {
                return [];
            }
            const { data } = await api.post<JobSummary[]>('/jobs/summary', jobIds);
            return data || [];
        } catch (error: any) {
            if (error?.response?.status === 400) {
                return [];
            }
            console.error('Error in getJobSummaries:', error);
            throw error;
        }
    }
};

export default jobsService;
