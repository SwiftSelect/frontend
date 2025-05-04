import { useState, useEffect } from 'react';
import { PostJobFormData, CreatedJobResponse } from '@/app/api/job/types';
import jobsService from "@/app/api/job/jobsApi";
import { useRouter } from 'next/navigation';
import authService from "@/app/api/auth/auth";

export const usePostJob = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [companyId, setCompanyId] = useState<number>();
    const router = useRouter();

    useEffect(() => {
        const fetchUserOrgDetails = async () => {
            try {
                const userDetails = await authService.getUserOrgDetails();
                if (userDetails?.org?.id) {
                    setCompanyId(userDetails.org.id);
                }
            } catch (error) {
                console.error('Error fetching user organization details:', error);
            }
        };

        fetchUserOrgDetails();
    }, []);

    const createJob = async (jobData: PostJobFormData): Promise<CreatedJobResponse> => {
        setLoading(true);
        setError(null);
        try {
            // Format arrays as comma-separated strings
            const formattedJobData = {
                ...jobData,
                companyId: companyId || jobData.companyId, // Use the fetched companyId if available
                salaryRange: `$${jobData.salaryFrom} - $${jobData.salaryTo}`,
                benefitsAndPerks: jobData.benefitsAndPerks?.length ? jobData.benefitsAndPerks.join(", ") : "",
                skills: jobData.skills?.length ? jobData.skills.join(", ") : "",
                status: 0,
                postedDate: new Date().toISOString().split('.')[0] + 'Z'
            };
            
            // Delete salaryFrom and salaryTo from formattedJobData
            delete formattedJobData.salaryFrom;
            delete formattedJobData.salaryTo;
            
            const response: CreatedJobResponse = await jobsService.createJob(formattedJobData);
            setSuccess(true);
            return response;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { createJob, loading, error, success, companyId };
};

export default usePostJob;