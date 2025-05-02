'use client'

import Nav from "@/components/nav/nav";
import Image from "next/image";
import ProfileForm from "./form";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function ProfileContent() {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <div className="bg-gray-900 text-gray-100"> 
            <Nav />
            <main className="pt-24 min-h-screen">
                <div className="container mx-auto px-4">
                    <button onClick={() => router.back()}  className="text-purple-500 hover:text-gray-300 mb-4">
                        <i className="fa-solid fa-arrow-left mr-2"></i> 
                        {'Back'}
                    </button>
                    <div id="profile-card" className="bg-gray-800 rounded-xl p-6 mb-6">
                        <div className="flex flex-col items-center text-center mb-6">
                        <Image src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" width={30} height={30} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
                        <h2 className="text-2xl font-bold mb-2">{session?.user?.firstName} {session?.user?.lastName}</h2>
                        </div>
                    </div>
                    <ProfileForm />
                </div>
            </main>
        </div>    
    );
}

// Main component that provides the session
export default function ProfilePage() {
    return (
        <SessionProvider>
            <ProfileContent />
        </SessionProvider>
    );
}
