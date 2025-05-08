import { Demographics, Links } from "@/app/profile/useProfile";

export interface Application {
  _id: string;
  applicationId: string;
  firstName: string;
  lastName: string;
  candidateId: number;
  jobId: number;
  resumeUrl: string;
  status: {
    currentStage: string;
    lastUpdated: string;
  };
  links: Links;
  email: string;
  phone: string;
  location: string;
  coverLetter: string;
  skills: string[];
  demographics: Demographics;
} 

export interface ApplicationRequest{ 
    firstName: string;
    lastName: string;
    jobId: number;
    candidateId: number;
    phone: string,
    resumeUrl: string,
    links: Links,
    email: string,
    location: string,
    coverLetter: string,
    skills: string[],
    demographics: Demographics
}

export interface ApplicationResponse {
    applicationId: string;
}