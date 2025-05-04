import { useEffect, useState } from "react";
import jobsService from "@/app/api/job/jobsApi";
import { JobDetailsUI, jobStatusLabels } from "@/app/api/job/types";

const useJobDetails = (jobId: string) => {
  const [job, setJob] = useState<JobDetailsUI | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    const fetchJob = async () => {
      try {
        const data = await jobsService.getJobDetails(jobId);

        const skills: string[] = typeof data.skills === "string"
          ? data.skills.split(",").map((req: string) => req.trim()).filter(Boolean)
          : [];
        
        const experience: string[] = typeof data.experience === "string"
          ? data.experience.split(",").map((req: string) => req.trim()).filter(Boolean)
          : [];

        const benefitsAndPerks: string[] = typeof data.benefitsAndPerks === "string"
          ? data.benefitsAndPerks.split(",").map((req: string) => req.trim()).filter(Boolean)
          : [];
        const statusInfo = jobStatusLabels[data.status] || {
          label: "Unknown",
          colorClass: "bg-gray-500/20 text-gray-400",
        };

        const jobDetails: JobDetailsUI = {
          title: data.title,
          overview: data.overview,
          description: data.description,
          company: data.company,
          companyId: data.companyId,
          // companyDescription: data.companyDescription,
          // size: data.size,
          // industry: data.industry,
          skills,
          experience,
          location: data.location,
          status: data.status,
          postedDate: data.postedDate,
          salaryRange: data.salaryRange,
          statusInfo,
          daysPostedAgo: data.daysPostedAgo,
          benefitsAndPerks,
        };

        setJob(jobDetails);
      } catch (err) {
        setError("Failed to fetch job details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) fetchJob();
  }, [jobId]);

  return {
    job,
    loading,
    error,
  };
};

export default useJobDetails;
