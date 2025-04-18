import { useEffect, useState } from "react";
import jobsAPI from "@/app/api/job/jobsApi"; 

type JobStatusInfo = {
  label: string;
  colorClass: string;
};

type JobDetails = {
  title: string;
  overview: string;
  description: string;
  company: string;
  skills: string[];
  experience: string[];
  location: string;
  status: number;
  postedDate: string;
  salaryRange: string;
  statusInfo: JobStatusInfo;
  daysPostedAgo: number;
  benefitsAndPerks: string[];
};

const jobstatusLabels: Record<number, JobStatusInfo> = {
  0: { label: "Active", colorClass: "bg-purple-500/20 text-purple-400" },
  1: { label: "Closed", colorClass: "bg-red-500/20 text-red-400" },
};

const useJobDetails = (jobId: string) => {
  const [job, setJob] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await jobsAPI.get(`/${jobId}`);
        const data = res.data;

        console.log("data", data);
        const skills: string[] = typeof data.skills === "string"
          ? data.skills.split(",").map((req: string) => req.trim()).filter(Boolean)
          : [];
        
        console.log("skills", skills);

        const experience: string[] = typeof data.experience === "string"
          ? data.experience.split(",").map((req: string) => req.trim()).filter(Boolean)
          : [];

        const benefitsAndPerks: string[] = typeof data.benefitsAndPerks === "string"
          ? data.benefitsAndPerks.split(",").map((req: string) => req.trim()).filter(Boolean)
          : [];
        const statusInfo = jobstatusLabels[data.status] || {
          label: "Unknown",
          colorClass: "bg-gray-500/20 text-gray-400",
        };

        const jobDetails: JobDetails = {
          title: data.title,
          overview: data.overview,
          description: data.description,
          company: data.company,
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
