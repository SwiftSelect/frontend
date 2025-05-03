import { Demographics, Links } from "@/app/profile/useProfile";

export interface Application {
  _id: string;
  applicationId: string;
  candidateId: number;
  jobId: string;
  resumeUrl: string;
  status: {
    current_stage: string;
    last_updated: string;
  };
  email: string;
  phone: string;
  coverLetter?: string;
  demographics?: any;
  links?: any;
  location?: string;
  skills?: string[];
} 

export interface ApplicationRequest{ 
    firstName: string;
    lastName: string;
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