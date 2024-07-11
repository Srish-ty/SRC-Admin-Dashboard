"use client";
import { Button } from "flowbite-react";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";

export default function Page() {
    const { userInfo, handleGoogleSignIn } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

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

    return (
        <div className="flex justify-center items-center h-screen">
            <Button
                color="gray"
                className="w-2/5 mb-3"
                onClick={handleLoginWithGoogle}
                disabled={loading}
            >
                {loading ? "Loading..." : "Sign in with Google"}
            </Button>
        </div>
    );
}
