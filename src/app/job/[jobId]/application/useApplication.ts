import profileService from "@/app/api/profile/profile";
import { Links, Demographics } from "@/app/profile/useProfile";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import applicationService from "@/app/api/applications/applications";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ApplicationRequest } from "@/app/api/applications/types";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const applicationSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().refine((val) => /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(val), { message: 'Invalid phone number'}),
    resume: z.string().min(1, "Resume is required"),
    links: z.object({
        linkedin: z.string().optional(),
        github: z.string().optional(),
        website: z.string().optional(),
    }).optional(),
    coverLetter: z.string().optional(),
    currentLocation: z.string().min(1, "Location is required"),
    skills: z.array(z.string()).optional(),
    demographics: z.object({}).optional(),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;

export type Application = {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    resume?: string;
    links?: Links;
    coverLetter?: string;
    currentLocation?: string;
    skills?: string[];
    demographics?: Demographics;
}

const useApplication = () => {
    const [application, setApplication] = useState<Application>({
        phone: '',
        resume: '',
        links: {},
        firstName: '',
        lastName: '',
        email: '',
        currentLocation: '',
        coverLetter: '',
        skills: [],
        demographics: {},
    });
    const { data: session } = useSession();
    const params = useParams();
    const jobId = params.jobId as string;
    const router = useRouter();
    const fetchProfile = async () => {
    try {
        const resp = await profileService.getProfile();
        setApplication({
            ...application,
            phone: resp?.phone || '',
            resume: resp.resume_url || '',
            links: resp.links || {},
            firstName: session?.user?.firstName || '',
            lastName: session?.user?.lastName || '',
            email: session?.user?.email || '',
            currentLocation: resp.location || '',
            skills: resp.skills || [],
            demographics: resp.demographics || {},
        });
    } catch (error) {
        console.error(error);
    }
    };

    useEffect(() => {
        fetchProfile();
    }, [session]);

    // Formik form handling
    const formik = useFormik<ApplicationFormValues>({
        initialValues: {
            firstName: application.firstName,
            lastName: application.lastName,
            email: application.email,
            phone: application.phone || '',
            resume: application.resume || '',
            links: application.links || {},
            coverLetter: application.coverLetter || '',
            currentLocation: application.currentLocation || '',
            skills: application.skills || [],
            demographics: application.demographics || {},
        },
        enableReinitialize: true,
        validationSchema: toFormikValidationSchema(applicationSchema),
        onSubmit: async (values) => {
            try {
                const application: ApplicationRequest = {
                    jobId: jobId,
                    candidateId: Number(session?.user?.id),
                    location: values.currentLocation,
                    resumeUrl: values.resume,
                    skills: values.skills || [],
                    links: values.links || {},
                    phone: values.phone,
                    email: values.email,
                    coverLetter: values.coverLetter || '',  
                    demographics: values.demographics || {},
                };
                const res = await applicationService.createApplication(application);
                if(res.applicationId) {
                    toast.success('Application submitted successfully');
                    router.replace(`/candidate`);
                }
            } catch (error) {
                console.error('Error submitting application:', error);
            }
        },
    });

    const handleResumeUpload = async (file: File) => {
    try {
        const response = await profileService.getSignedUploadUrl(file.name);
        const { signed_url, file_path } = response;
        
        await fetch(signed_url, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type,
            },
        });
        
        formik.setFieldValue('resume', file_path);
        
        setApplication({
            ...application,
            resume: file_path,
        });
    } catch (error) {
        console.error('Error uploading resume:', error);
    }
    };

    return { 
        application, 
        setApplication,
        formik,
        handleResumeUpload,
        jobId,
    };
}

export default useApplication;