import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import jobsService from "../api/job/jobsApi";
import similarityService from "../api/similarity/similarity";
import { JobDetails } from "../api/job/types";
import { JobMatchesResponse } from "../api/similarity/similarity";

interface ApiJobResponse extends Omit<JobDetails, 'id'> {
    ID: number;
}

export const useRecruiter = () => {
    const { data: session } = useSession();
    const [postedJobs, setPostedJobs] = useState<JobDetails[]>([]);
    const [jobMatches, setJobMatches] = useState<Record<number, JobMatchesResponse>>({});

    // get jobs posted by signed in recruiter (job.recruiterId === session.user.id)
    useEffect(() => {
        const getPostedJobs = async () => {
            if (!session?.user?.id) return;
            
            try {
                const data = await jobsService.getJobsByRecruiterId(Number(session.user.id)); // TODO: for demo, add jobs for demo-recruiter profile
                // const data = await jobsService.getJobsByRecruiterId(Number(session.user.id)-1); // -1 for now because data available for recruiter id 0 
                
                const mappedJobs = (data as unknown as ApiJobResponse[]).map(job => ({
                    ...job,
                    id: job.ID
                }));
                setPostedJobs(mappedJobs);
            } catch (error) {
                console.error('Error fetching posted jobs:', error);
                setPostedJobs([]);
            }
        }
        getPostedJobs();
    }, [session?.user?.id]);

    // get matches for each job
    useEffect(() => {
        const getJobMatches = async () => {
            if (!postedJobs.length) return;

            // console.log('Posted jobs for matches:', postedJobs);
            const matchesPromises = postedJobs
                .filter(job => job?.id != null) // Filter out jobs without IDs
                .map(async (job) => {
                    try {
                        if (!job.id) {
                            console.warn('Job missing ID:', job);
                            return { jobId: null, matches: null };
                        }
                        // console.log('Fetching matches for job ID:', job.id);
                        const matches = await similarityService.getJobMatches(job.id.toString());
                        return { jobId: job.id, matches };
                    } catch (error) {
                        console.error(`Error fetching matches for job ${job.id}:`, error);
                        return { jobId: job.id, matches: null };
                    }
                });

            try {
                const matchesResults = await Promise.all(matchesPromises);
                const matchesMap = matchesResults.reduce((acc, { jobId, matches }) => {
                    if (jobId && matches) {
                        acc[jobId] = matches;
                    }
                    return acc;
                }, {} as Record<number, JobMatchesResponse>);

                setJobMatches(matchesMap);
            } catch (error) {
                console.error('Error processing job matches:', error);
                setJobMatches({});
            }
        };

        getJobMatches();
    }, [postedJobs]);

    return { postedJobs, jobMatches };
}
    