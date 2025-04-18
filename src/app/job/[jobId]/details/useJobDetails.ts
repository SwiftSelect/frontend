import { useEffect, useState } from "react";
import jobsAPI from "@/app/api/job/jobsApi"; 

type JobStatusInfo = {
  label: string;
  colorClass: string;
};

type JobDetails = {
  title: string;
  description: string;
  company: string;
  requirements: string[];
  location: string;
  status: number;
  postedDate: string;
  salaryRange: string;
  statusInfo: JobStatusInfo;
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

        const requirements: string[] = typeof data.requirements === "string"
          ? data.requirements.split(",").map((req: string) => req.trim()).filter(Boolean)
          : [];

        const statusInfo = jobstatusLabels[data.status] || {
          label: "Unknown",
          colorClass: "bg-gray-500/20 text-gray-400",
        };

        const jobDetails: JobDetails = {
          title: data.title,
          description: data.description,
          company: "Engineering", // TODO: update this
          requirements,
          location: data.location,
          status: data.status,
          postedDate: data.postedDate,
          salaryRange: "$120,000 - $160,000", // TODO: update this 
          statusInfo,
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
