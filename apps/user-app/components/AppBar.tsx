'use client'
import { Appbar } from "@repo/ui/Appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AppBar(){

    const session = useSession();
    const router = useRouter();
    return(
        <Appbar user={session.data?.user} onSignin={signIn} onSignout={async () => {
            await signOut()
            router.push('/api/auth/signin')
        }} />
    )
}