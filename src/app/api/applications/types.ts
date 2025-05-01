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