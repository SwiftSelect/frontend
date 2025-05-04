import createAPI from '..';
import { JobDetails, CreatedJobResponse, JobSummary } from './types';

const api = createAPI(process.env.NEXT_PUBLIC_JOBS_API_URL || "http://localhost:8080");

const jobsService = {
    getJobDetails: async (jobId: string) => {
        const { data } = await api.get<JobDetails>(`/jobs/${jobId}`);
        return data;
    },

    getJobs: async () => {
        const { data } = await api.get<JobDetails[]>('/jobs');
        return data;
    },

    getJobsByRecruiterId: async (recruiterId: number) => {
        const { data } = await api.get<JobDetails[]>(`/jobs/recruiter/${recruiterId}`);
        return data;
    },

    createJob: async (jobData: Omit<JobDetails, 'postedDate' | 'daysPostedAgo'>) => {
        console.log('Creating job with data:', jobData);
        const { data } = await api.post<CreatedJobResponse>('/jobs', jobData);
        return data;
    },

    updateJob: async (jobId: string, jobData: Partial<JobDetails>) => {
        const { data } = await api.put<JobDetails>(`/jobs/${jobId}`, jobData);
        return data;
    },

    deleteJob: async (jobId: string) => {
        const { data } = await api.delete(`/jobs/${jobId}`);
        return data;
    },

    getJobSummaries: async (jobIds: string[]) => {
        const { data } = await api.post<JobSummary[]>('/jobs/summary', jobIds);
        return data;
    }
};

export default jobsService;
