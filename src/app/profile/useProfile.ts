import { useFormik } from "formik";
import * as z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import profileService from "../api/profile/profile";
import { useEffect } from "react";

export type CandidateProfile =  {
    currentPosition?: string,
    location?: string,
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
    authorization?: string,
    gender?: string,
    isHispanic?: string,
    ethnicity?: string,
    disability?: string,
    veteran?: string
}

export type onChange = (name: string, value: string) => void;

export type onAddOrRemove = (skill: string) => void;

const useProfile = () => {
    const { data: session } = useSession();
    const initialValues: CandidateProfile = {
        currentPosition: "",
        location: "",
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
                currentPosition: resp.current_position,
                location: resp.location,
                resume: resp.resume_url,
                skills: resp.skills,
                demographics: resp.demographics,
                links: resp.links,
            }
            profileFormik.setValues(mappedValues);
        } catch(error){
            toast.error(error instanceof Error ? error.message : 'Failed to fetch profile')
        }

    }
    const profileSchema = z.object({
        currentPosition: z.string().min(2, "Position is required"),
        location: z.string().min(2, "Location is required"),
    });

    const candidateSchema = z.object({
        resume: z.any(),
        skills: z.array(z.string()),
        demographics: z.object({}),
        links: z.object({})
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
                    current_position: values.currentPosition,
                    location: values.location,
                    resume_url: values.resume, 
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
