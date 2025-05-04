'use client'
import { SessionProvider } from "next-auth/react";
import NavRight from "./nav-right";
const Nav = () => {

    return (
        <header
        id="header"
        className="fixed w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50"
        >
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
                <a href="/" className="text-2xl font-bold text-purple-500">
                <i className="fa-solid fa-brain mr-2"></i>
                SwiftSelect
                </a>
            </div>
            <SessionProvider>
                <NavRight />
            </SessionProvider>
            </div>
        </div>
        </header>
    );
};
export default Nav;
