import createAPI from '..';
import { Application, ApplicationResponse, ApplicationRequest } from './types';

const api = createAPI(process.env.NEXT_PUBLIC_JOBS_API_URL || "http://localhost:8080");

const applicationsService = {
     getApplicationsByJobId: async (jobId: string) => {
            try {
                console.log('Fetching applications for jobId:', jobId);
                const { data } = await api.get<Application[]>(`/applications/job/${jobId}`);
                console.log('Applications fetched:', data);
                if (!data) {
                throw new Error('No applications data received');
                }
                return data;
            } catch (error) {
                console.error('Error in getApplicationsByJobId:', error);
                throw new Error(`Failed to fetch applications: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        },

     getApplicationByApplicationId: async (applicationId: string) => {
        try {
          console.log('Getting application by application ID:', applicationId);
          const { data } = await api.get<Application>(`/applications/${applicationId}`);
          if (!data) {
            throw new Error(`Application with ID ${applicationId} not found`);
          }

          // Verify the application belongs to the specified job
        //   if (data.jobId !== jobId) {
        //     console.log('Application job ID:', data.jobId);
        //     console.log('Specified job ID:', jobId);
        //     throw new Error(`Application for candidate ${data.candidateId} does not belong to job ${jobId}`);
        //   }

          return data;
        } catch (error) {
          console.error('Error in getApplicationByApplicationId:', error);
          throw error;
        }
      },


     getApplicationByCandidateId: async (jobId: string, candidateId: string) => {
        try {
            console.log('Getting application by candidate ID:', { jobId, candidateId });
            const { data } = await api.get<Application>(`/applications/candidate/${candidateId}`);
            
            if (!data) {
            throw new Error(`Application with candidate ID ${candidateId} not found`);
            }

            // Verify the application belongs to the specified job
            if (data.jobId !== jobId) {
            console.log('Application job ID:', data.jobId);
            console.log('Specified job ID:', jobId);
            throw new Error(`Application for candidate ${candidateId} does not belong to job ${jobId}`);
            }
            
            console.log('Found application:', data);
            return data;
        } catch (error) {
            console.error('Error in getApplicationByCandidateId:', error);
            throw error;
        }
    },
    getApplication: async (applicationId: string) => {
        const { data } = await api.get<Application>(`/application/${applicationId}`);
        return data;
    },

    createApplication: async (application: ApplicationRequest) => {
        const { data } = await api.post<ApplicationResponse>('/application/', application);
        return data;
    },
};

export default applicationsService; 