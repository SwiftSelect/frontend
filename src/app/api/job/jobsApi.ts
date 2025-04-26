import createAPI from '..';
import { JobDetails } from './types';

const api = createAPI(process.env.NEXT_PUBLIC_JOBS_API_URL || "http://localhost:8080/jobs");

const jobsService = {
    getJobDetails: async (jobId: string) => {
        const { data } = await api.get<JobDetails>(`/${jobId}`);
        return data;
    },

    getJobs: async () => {
        const { data } = await api.get<JobDetails[]>('/');
        return data;
    },

    createJob: async (jobData: Omit<JobDetails, 'postedDate' | 'daysPostedAgo'>) => {
        const { data } = await api.post<JobDetails>('/', jobData);
        return data;
    },

    updateJob: async (jobId: string, jobData: Partial<JobDetails>) => {
        const { data } = await api.put<JobDetails>(`/${jobId}`, jobData);
        return data;
    },

    deleteJob: async (jobId: string) => {
        const { data } = await api.delete(`/${jobId}`);
        return data;
    }
};

export default jobsService;
