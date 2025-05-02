import { Demographics, Links } from "@/app/profile/useProfile";

export interface Application {
  _id: string;
  applicationId: string;
  candidateId: string;
  jobId: string;
  resumeUrl: string;
  status: {
    currentStage: string;
    lastUpdated: string;
  };
  email: string;
  phone: string;
} 

export interface ApplicationRequest{ 
    jobId: string;
    candidateId: number;
    phone: string,
    resumeUrl: string,
    links: Links,
    email: string,
    location: string,
    coverLetter: string,
    skills: string[],
    demographics: Demographics,
}

export interface ApplicationResponse {
    applicationId: string;
}