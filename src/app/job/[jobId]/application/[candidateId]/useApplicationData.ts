import { useState, useEffect } from 'react';
import jobsService from '@/app/api/job/jobsApi';
import applicationsService from '@/app/api/applications/applications';
import profileService from '@/app/api/profile/profile';
import { GetProfileResponse } from '@/app/api/profile/profile';
import { Application } from '@/app/api/applications/types';

interface Job {
  title: string;
  overview: string;
  description: string;
  company: string;
  skills: string;
  experience: string;
  location: string;
  postedDate: string;
  salaryRange: string;
  benefitsAndPerks: string;
}

interface ApplicationData {
  application: Application | null;
  job: Job | null;
  candidate: GetProfileResponse | null;
  loading: boolean;
  error: string | null;
  errorDetails?: {
    jobError?: string;
    applicationError?: string;
    candidateError?: string;
  };
}

export const useApplicationData = (jobId: string, candidateId: string) => {
  const [data, setData] = useState<ApplicationData>({
    application: null,
    job: null,
    candidate: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log('Fetching job data for jobId:', jobId);
        const job = await jobsService.getJobDetails(jobId);
        // console.log('Job data fetched successfully:', job);

        // console.log('Fetching application data for jobId:', jobId, 'candidateId:', candidateId);
        const application = await applicationsService.getApplicationByCandidateId(jobId, candidateId);
        // console.log('Application data fetched successfully:', application);

        // console.log('Fetching candidate data for candidateId:', application.candidateId);
        const candidate = await profileService.getProfileById(application.candidateId);
        // console.log('Candidate data fetched successfully:', candidate);

        setData({
          application,
          job,
          candidate,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error in useApplicationData:', error);
        const errorDetails = {
          jobError: error instanceof Error && error.message.includes('job') ? error.message : undefined,
          applicationError: error instanceof Error && error.message.includes('application') ? error.message : undefined,
          candidateError: error instanceof Error && error.message.includes('candidate') ? error.message : undefined,
        };

        setData({
          application: null,
          job: null,
          candidate: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch application data',
          errorDetails,
        });
      }
    };

    fetchData();
  }, [jobId, candidateId]);

  return data;
}; 