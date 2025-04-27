import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import authService from "@/app/api/auth/auth";
import { CompanyDetails, JobDetailsUI, jobStatusLabels } from "@/app/api/job/types";

const useCompanyDetails = () => {
  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const { data: session } = useSession();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const userData = await authService.getUserOrgDetails();
        if (!userData.role_id || userData.role_id !== 2) {
          throw new Error("Unauthorized access");
        }
        const companyDetails: CompanyDetails = {
          companyName: userData.org.name,
          companyDescription: userData.org.description,
          companySize: userData.org.size,
          companyIndustry: userData.org.industry,
        };
        setCompany(companyDetails);
      } catch (err) {
        setError("Failed to fetch company details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

 
    if (session) {
      fetchCompany();
    }
  }, [session]);

  return {
    company,
    loading,
    error,
  };
};

export default useCompanyDetails;
