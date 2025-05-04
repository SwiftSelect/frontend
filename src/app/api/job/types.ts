export interface JobStatusInfo {
    label: string;
    colorClass: string;
}

export interface JobDetails {
    title: string;
    overview: string;
    description: string,
    company: string,
    companyId: string,
    skills: string;
    experience: string;
    location: string;
    status: number;
    postedDate: string;
    salaryRange: string;
    daysPostedAgo: number;
    benefitsAndPerks: string;
}

export interface PostJobFormData {
    title: string;
    overview: string;
    description: string,
    company: string,
    companyId: string,
    skills: string[];
    experience: string;
    location: string;
    salaryFrom?: number;
    salaryTo?: number;
    benefitsAndPerks: string[];
}

export interface CreatedJobResponse {
    ID: string;
    title: string;
    overview: string;
    description: string,
    company: string,
    companyId: string,
    skills: string;
    experience: string;
    location: string;
    status: number;
    postedDate: string;
    salaryRange: string;
    daysPostedAgo: number;
    benefitsAndPerks: string;
}

export interface CompanyDetails {
    companyName: string;
    companyDomain: string;
    companyId: string;
    companyDescription: string;
    companySize: string;
    companyIndustry: string;
}

export interface JobDetailsUI extends Omit<JobDetails, 'skills' | 'experience' | 'benefitsAndPerks'> {
    skills: string[];
    experience: string[];
    benefitsAndPerks: string[];
    statusInfo: JobStatusInfo;
}

export const jobStatusLabels: Record<number, JobStatusInfo> = {
    0: { label: "Active", colorClass: "bg-purple-500/20 text-purple-400" },
    1: { label: "Closed", colorClass: "bg-red-500/20 text-red-400" },
}; 

export interface Skill {
    id: string;
    name: string;
}
  
export interface ExperienceRequirement {
    id: string;
    description: string;
}
