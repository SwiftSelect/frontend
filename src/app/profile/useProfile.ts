import { useFormik } from "formik";
import * as z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import profileService from "../api/profile/profile";
import { useEffect } from "react";
import { AxiosError } from "axios";

export type CandidateProfile =  {
    currentPosition?: string,
    location?: string,
    phone?: string,
    resume?: string,
    skills?: string[],
    demographics? : Demographics,
    links?: Links,
};

export type Links = {
    linkedin?: string,
    github?: string,
    website?: string
}

export type Demographics = {
    authorization?: string;
    gender?: string;
    isHispanic?: string;
    ethnicity?: string;
    disability?: string;
    veteran?: string;
}

export type ProfileFormErrors = {
    currentPosition?: string;
    location?: string;
    phone?: string;
    resume?: string;
    skills?: string;
    demographics?: {
        authorization?: string;
        gender?: string;
        isHispanic?: string;
        ethnicity?: string;
        disability?: string;
        veteran?: string;
    };
    links?: {
        linkedin?: string;
        github?: string;
        website?: string;
    };
}

export type onChange = (name: string, value: string) => void;

export type onAddOrRemove = (skill: string) => void;

const useProfile = () => {
    const { data: session } = useSession();
    const initialValues: CandidateProfile = {
        currentPosition: "",
        location: "",
        phone: "",
        ...((!session?.user?.isRecruiter) && {
            resume: "",
            skills: [],
            demographics: {
                authorization: "",
                gender: "",
                isHispanic: "",
                ethnicity: "", 
                disability: "", 
                veteran: "",
            },
            links: {
                linkedin: "",
                github: "",
                website: "",
            }
        }),
    };


    useEffect(() => {
        fetchProfile();
    }, [])

    const fetchProfile = async () => {
        try{
            const resp = await profileService.getProfile();
            const mappedValues = {
                currentPosition: resp.currentPosition,
                location: resp.location,
                resume: resp.resumeUrl,
                skills: resp.skills,
                demographics: resp.demographics,
                links: resp.links,
                phone: resp.phone,
            }
            profileFormik.setValues(mappedValues);
        } catch(error){
            toast.error(error instanceof AxiosError ? error.response?.data?.detail : 'Failed to fetch profile')
        }

    }
    const profileSchema = z.object({
        currentPosition: z.string().min(2, "Position is required"),
        location: z.string().min(2, "Location is required"),
        phone: z.string().refine((val) => /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(val), { message: 'Invalid phone number'})
    });

    const candidateSchema = z.object({
        resume: z.string().min(2, "Resume is required"),
        skills: z.string().array().min(5, "Minimum of 5 skills are required"),
        demographics: z.object({
            authorization: z.string().min(1, "Work authorization is required"),
            gender: z.string().min(1, "Gender is required"),
            isHispanic: z.string().min(1, "Hispanic status is required"),
            ethnicity: z.string().min(1, "Ethnicity is required"),
            disability: z.string().min(1, "Disability status is required"),
            veteran: z.string().min(1, "Veteran status is required"),
        }),
        links: z.object({
            linkedin: z.string().min(1, "LinkedIn URL is required").refine(
                (val) => /(https?:\/\/(www.)|(www.))?linkedin.com\/(mwlite\/|m\/)?in\/[a-zA-Z0-9_.-]+\/?/.test(val),
                { message: 'Invalid LinkedIn URL' }
            ),
            github: z.string().optional(),
            website: z.string().optional(),
        })
    });

    const handleResumeUploadComplete = async (filePath: string) => {
        await profileFormik.setFieldValue('resume', filePath);
    };

    const profileFormik = useFormik({
        initialValues,
        validationSchema: toFormikValidationSchema(
            session?.user?.isRecruiter 
                ? profileSchema 
                : profileSchema.merge(candidateSchema)
        ),
        onSubmit: async (values, actions) => {
            try {
                const mappedValues = {
                    currentPosition: values.currentPosition,
                    location: values.location,
                    phone: values.phone,
                    resumeUrl: values.resume, 
                    skills: values.skills,
                    demographics: values.demographics,
                    links: values.links,
                };

                await profileService.updateProfile(mappedValues);
                
                toast.success('Profile updated successfully!');
            } catch (error) {
                toast.error(error instanceof Error ? error.message : 'Failed to update profile');
            } finally {
                actions.setSubmitting(false);
            }
        },
    });

    const handleResumeUpload = (file: File) => {
        profileFormik.setFieldValue('resume', file);
    };

    const addSkill = (skill: string) => {
        const currentSkills = profileFormik.values?.skills;
        if (currentSkills && !currentSkills.includes(skill)) {
            profileFormik.setFieldValue('skills', [...currentSkills, skill]);
        }
    };

    const removeSkill = (skill: string) => {
        const currentSkills = profileFormik.values?.skills;
        profileFormik.setFieldValue(
            'skills', 
            currentSkills ? currentSkills.filter(s => s !== skill): []
        );
    };

    return {
        profileFormik,
        handleResumeUpload,
        addSkill,
        removeSkill,
        isRecruiter: session?.user?.isRecruiter,
        handleResumeUploadComplete,
    };
};

export default useProfile;
