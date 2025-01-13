import supabase from "../../supabaseClient";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function GoogleButton() {
    const navigate = useNavigate();
    const handleGoogleSubmit = async (event) => {
        event.preventDefault();

        const {user, session, error} = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: 'http://localhost:3000/dashboard'
            }
        });

        console.log(session)
        if (session) {
            navigate("/dashboard");
            return null;
        }
    }
    return (
        <Button
            className="w-100 d-flex justify-content-center align-items-center gap-2"
            variant={"light"}
            onClick={handleGoogleSubmit}
        >
            <img
                src="/google-icon.svg"
                width="17"
                height="17"
                alt="google icon"
            />
            <span>Sign in with Google</span>
        </Button>
    )
}