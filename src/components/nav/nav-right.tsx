import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { IconButton, PrimaryButton } from "../buttons";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NavRight = () => {
    const session = useSession();
    const pathname = usePathname();

    const renderNav = () => {
        if (session.data?.user?.id) {
            if (pathname === '/')
                return (
                    <Link href="/candidate">
                        <div className="flex items-center space-x-4">
                            <IconButton> Dashboard </IconButton>
                        </div>
                    </Link>
                )
            return (
                <div className="flex items-center space-x-4">
                    <IconButton onClick={() => {signOut()}}> Logout </IconButton>
                    {/* <div className="relative">
                        <IconButton>
                            <i className="fa-regular fa-bell text-xl"></i>
                            <span className="absolute -top-1 -right-1 bg-purple-500 text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
                        </IconButton>
                    </div> */}
                    <Link href={"/profile"}>
                        <Image src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" width={40} height={40} className="w-8 h-8 rounded-full border-2 border-purple-500" alt="Profile" />
                    </Link>
                </div>
            )
        }
        return (<Link href="/login">
            <div className="flex items-center space-x-4">
                <PrimaryButton> Login </PrimaryButton>
            </div>
        </Link>)
    }
    return renderNav();
}
export default NavRight;