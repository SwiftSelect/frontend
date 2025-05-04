import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import jobsService from '@/app/api/job/jobsApi';
import similarityService from '@/app/api/similarity/similarity';


interface CandidateMatch {
    id: string;
    name: string;
    title: string;
    company: string;
    matchPercentage: number;
    skills: string[];
    experience: string;
    location: string;
    avatar: string;
}

interface MatchesData {
    jobTitle: string;
    jobLocation: string;
    jobType: string;
    salaryRange: string;
    totalMatches: number;
    matches: CandidateMatch[];
    loading: boolean;
    error: string | null;
}

export const useMatches = () => {
    const { jobId } = useParams();
    const [data, setData] = useState<MatchesData>({
        jobTitle: '',
        jobLocation: '',
        jobType: '',
        salaryRange: '',
        totalMatches: 0,
        matches: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch job details
                const jobDetails = await jobsService.getJobDetails(jobId as string);
                
                // Fetch job matches
                const matchesResponse = await similarityService.getJobMatches(jobId as string);
                
                setData({
                    jobTitle: jobDetails?.title || '',
                    jobLocation: jobDetails?.location || '',
                    jobType: '', // Not available in JobDetails
                    salaryRange: jobDetails?.salaryRange || '',
                    totalMatches: matchesResponse?.total_matches || 0,
                    matches: matchesResponse?.matches?.map(match => ({
                        id: match.application_id,
                        name: match.candidate_name,
                        title: '',
                        company: '',
                        matchPercentage: match.similarity_score,
                        skills: [],
                        experience: '',
                        location: '',
                        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'
                    })) || [],
                    loading: false,
                    error: null
                });
            } catch (error) {
                console.error('Error fetching matches data:', error);
                setData(prev => ({
                    ...prev,
                    loading: false,
                    error: error instanceof Error ? error.message : 'Failed to fetch matches data'
                }));
            }
        };

        if (jobId) {
            fetchData();
        }
    }, [jobId]);

    return data;
};
