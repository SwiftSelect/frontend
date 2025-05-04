import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CompanyDetails, JobDetailsUI, jobStatusLabels } from "@/app/api/job/types";
import { useParams } from "next/navigation";
import jobsService from "@/app/api/job/jobsApi";
import authService from "@/app/api/auth/auth";

const useCompanyDetails = () => {
  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { jobId } = useParams();

  useEffect(() => {
    const fetchCompany = async () => {
      if (!jobId) return;
      
      try {
        // First get the job details to get the companyId
        const jobDetails = await jobsService.getJobDetails(jobId as string);
        
        // Then use the companyId to get org details from auth service
        const orgDetails = await authService.getOrgDetails(jobDetails.companyId);
        console.log(orgDetails);
        
        // Convert org details to company details format
        setCompany({
          companyName: orgDetails.name,
          companyDomain: orgDetails.domain,
          companyId: orgDetails.id,
          companyDescription: orgDetails.description || '',
          companySize: orgDetails.size || '',
          companyIndustry: orgDetails.industry || ''
        });
      } catch (error) {
        console.error('Error fetching company details:', error);
        setError('Failed to fetch company details');
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [jobId]);

  return {
    company,
    loading,
    error,
  };
};

export default useCompanyDetails;
