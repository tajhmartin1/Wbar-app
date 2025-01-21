import {useNavigate} from "react-router-dom";
import {supabase} from "../../helpers/supabase.js";
import {useEffect} from "react";

export default function GoogleButton() {
    const navigate = useNavigate();

    const handleGoogleSubmit = async (event) => {
        event.preventDefault();
        const {user, error} = await supabase.auth.signInWithOAuth({
            provider: "google", options: {
                redirectTo: window.location.origin + "/account/new"
            }
        });

        if (user) {
            navigate("/dashboard");
            return null;
        }
    }
    return (<button
            className="w-full flex bg-gray-50 hover:bg-gray-200 justify-center items-center gap-2 py-2 text-gray-800 rounded-xl"
            onClick={handleGoogleSubmit}
        >
            <img
                src="/google-icon.svg"
                width="17"
                height="17"
                alt="google icon"
            />
            <span>Sign in with Google</span>
        </button>)
}