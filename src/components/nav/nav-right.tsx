import Link from "next/link"
import { useSession } from "next-auth/react"
import { IconButton, PrimaryButton } from "../buttons";

const NavRight = () => {
    const session = useSession();
    return (
        <>
            {
                session.data?.user?.id ? (
                    <Link href="/candidate">
                        <div className="flex items-center space-x-4">
                            <IconButton> Dashboard </IconButton>
                        </div>
                    </Link>
                ) : (
                    <Link href="/login">
                        <div className="flex items-center space-x-4">
                            <PrimaryButton> Login </PrimaryButton>
                        </div>
                    </Link>
                )
            }
        </>
            
    )
}
export default NavRight;