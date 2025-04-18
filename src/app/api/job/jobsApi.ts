import axios from "axios";

const jobsAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_JOBS_API_URL || "http://localhost:8080/jobs",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // if needed
});

export default jobsAPI;
