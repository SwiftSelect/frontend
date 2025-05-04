import createAPI from '..';

export interface JobRecommendationsResponse {
    totalRecommendations: number;
    recommendations: Array<{
        job_id: number;
        similarity_score: number;
    }>;
}

export interface JobMatchesResponse {
    jobId: number;
    total_matches: number;
    matches: Array<{
        similarity_score: number;
        candidate_name: string;
        application_id: string;
    }>;
}
const api = createAPI(process.env.NEXT_PUBLIC_SIMILARITY_URL || "");

const similarityService = {

    getRecommendedJobs: async (candidateId: string) => {
        const { data } = await api.get<JobRecommendationsResponse>(`/job-recommendations/${candidateId}`);
        return data;
    },

    getJobMatches: async (jobId: string) => {
        const { data } = await api.get<JobMatchesResponse>(`/candidate-matching/${jobId}`);
        return data;
    }
};

export default similarityService;