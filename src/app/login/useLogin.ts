import { useState } from "react";
import { useFormik } from "formik";
import * as z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import authService from "@/app/api/auth/auth";
import { AxiosError } from "axios";

const useLogin = () => {
    const [view, setView] = useState("signin");
    const router = useRouter();

    const signInSchema = z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        rememberMe: z.boolean().optional(),
    });
      
    const signUpSchema = z.object({
        firstName: z.string().min(2, "First name is too short"),
        lastName: z.string().min(2, "Last name is too short"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
        isRecruiter: z.boolean().optional(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

    const signinFormik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validationSchema: toFormikValidationSchema(signInSchema),
        onSubmit: async (values, actions) => {
            try
            {
                const result = await signIn("credentials", {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                });

                if (result?.error) {
                    toast.error(result.error);
                } else {
                    router.push('/candidate');
                    toast.success('Successfully logged in!');
                }
            } catch (error) {
                toast.error(error instanceof Error ? error.message : 'Login failed');
            } finally {
                actions.setSubmitting(false);
            }
        },
    });
    
    const signupFormik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            isRecruiter: false,
        },
        validationSchema: toFormikValidationSchema(signUpSchema),
        onSubmit: async (values, actions) => {
            try {
                await authService.signup({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                    role: values.isRecruiter ? 2 : 3,
                });

                const result = await signIn("credentials", {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                });

                if (result?.error) {
                    toast.error(result.error);
                } else {
                    router.push('/candidate');
                    toast.success('Account created successfully!');
                }
            } catch (error) {
                toast.error(error instanceof AxiosError ? error.response?.data?.detail : 'Signup failed');
            } finally {
                actions.setSubmitting(false);
            }
        },
    });

    return {
        view,
        setView,
        signinFormik,
        signupFormik,
    };
};

export default useLogin;