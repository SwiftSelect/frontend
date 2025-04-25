'use client'

import Nav from "@/components/nav/nav";
import Image from "next/image";
import ProfileForm from "./form";
import { SessionProvider } from "next-auth/react";

export default function ProfilePage() {
    return (
        <div className="bg-gray-900 text-gray-100">
            <Nav />
            <main className="pt-24 min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <div id="profile-card" className="bg-gray-800 rounded-xl p-6 mb-6">
                                <div className="flex flex-col items-center text-center mb-6">
                                <Image src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" width={30} height={30} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
                                <h2 className="text-2xl font-bold mb-2">John Doe</h2>
                                </div>
                                <div className="flex justify-center space-x-4 mb-6">
                                {/* <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center">
                                    <i className="fa-solid fa-pen-to-square mr-2"></i>
                                    Edit Profile
                                </button>
                                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center">
                                    <i className="fa-solid fa-share-nodes mr-2"></i>
                                    Share
                                </button> */}
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2 h-full">
                            <SessionProvider>
                                <ProfileForm />
                            </SessionProvider>
                        </div>
                    </div>
                </div>
            </main>
        </div>    
    );
};
