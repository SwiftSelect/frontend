import { useState, useEffect } from 'react';
import jobsService from '@/app/api/job/jobsApi';
import applicationsService from '@/app/api/applications/applications';
import profileService from '@/app/api/profile/profile';
import { GetProfileResponse } from '@/app/api/profile/profile';
import { Application } from '@/app/api/applications/types';
import { useSession } from 'next-auth/react';

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
interface Candidate extends GetProfileResponse {
  firstName: string;
  lastName: string;
}
interface ApplicationData {
  application: Application | null;
  job: Job | null;
  candidate: Candidate | null;   
  loading: boolean;
  error: string | null;
  errorDetails?: {
    jobError?: string;
    applicationError?: string;
    candidateError?: string;
  };
}

export const useApplicationData = (jobId: string, applicationId: string) => {
  const { data: session } = useSession();
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
        const job = await jobsService.getJobDetails(jobId);
        const application = await applicationsService.getApplication(applicationId);

        if (!application) {
          throw new Error('Application not found');
        }

        const candidate =  { ...(await profileService.getProfileById(application.candidateId.toString())), firstName: application.firstName || '', lastName: session?.user?.lastName || ''  };
        console.log('Candidate data fetched successfully:', candidate);

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
  }, [jobId, applicationId, session]);

  return data;
}; 