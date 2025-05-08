import { useState, useEffect } from 'react';
import applicationsService from '../api/applications/applications';
import { Application } from '../api/applications/types';
import { useSession } from 'next-auth/react';
import jobsService from '../api/job/jobsApi';
import { JobDetails, JobSummary } from '../api/job/types';
import similarityService, { JobRecommendationsResponse } from '../api/similarity/similarity';

export const useCandidate = () => {
    const { data: session } = useSession();
    const [jobs, setJobs] = useState<Record<string, JobDetails>>({});
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);    
    const [jobRecommendations, setJobRecommendations] = useState<JobRecommendationsResponse>({
        totalRecommendations: 0,
        recommendations: []
    });
    const [jobSummaries, setJobSummaries] = useState<Map<string, JobSummary>>(new Map());

    useEffect(() => {
        const getJobRecommendations = async () => {
            try {
                setLoading(true);
                const data = await similarityService.getRecommendedJobs(session?.user.id || '');
                setJobRecommendations(data);
                const jobSummaries = await jobsService.getJobSummaries(data.recommendations.map(r => r.job_id.toString()));
                setJobSummaries(new Map(jobSummaries.map(j => [j.id.toString(), j])));
            } catch (err) {
                console.error('Error fetching job recommendations:', err);
            }
        }

        const fetchApplications = async () => {
            try {
                if (!session?.user.id) return;
                const data = await applicationsService.getApplicationByCandidateId(session.user.id);
                setApplications(Array.isArray(data) ? data : [data]);
            } catch (err) {
                console.error('Error fetching applications:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch applications');
            } finally {
                setLoading(false);
            }
        };

        if (session?.user.id) {
            fetchApplications();
            getJobRecommendations();
        } else {
            setLoading(false);
        }
    }, [session?.user.id]);

    useEffect(() => {
        const fetchJobs = async () => {
            if (applications.length > 0) {
                try {
                    const jobPromises = applications.map(app => 
                        jobsService.getJobDetails(app.jobId.toString())
                    );  
                    const jobResults = await Promise.all(jobPromises);
                    const jobsMap = jobResults.reduce((acc, job, index) => {
                        acc[applications[index].jobId] = job;
                        return acc;
                    }, {} as Record<string, JobDetails>);
                    setJobs(jobsMap);
                } catch (err) {
                    console.error('Error fetching job details:', err);
                }
            }
        };

        fetchJobs();
    }, [applications]);

    return { applications, loading, error, jobs, user: session?.user, jobRecommendations, jobSummaries };
};
