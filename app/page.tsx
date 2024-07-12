"use client";
import { Button } from "flowbite-react";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const { userInfo, handleGoogleSignIn } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleLoginWithGoogle = async () => {
        try {
            setLoading(true);
            await handleGoogleSignIn();
        } catch (error) {
            console.error("Error signing in with Google:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userInfo.uid) {
            router.push("/dashboard");
        }
    }, [userInfo.uid,router]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-2 items-center">
            <div className="text-xl font-bold text-black">Hey Welcome!</div>
            <Button
                color="dark"
                className="flex justify-center items-center w-full mb-3 h-12"
                onClick={handleLoginWithGoogle}
                disabled={loading}
            >
                {loading ? "Loading..." : "Sign in with Google"}
            </Button>
            </div>
        </div>
    );
}
