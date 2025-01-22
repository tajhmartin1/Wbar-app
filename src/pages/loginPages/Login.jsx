import {useContext, useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import GoogleButton from "./GoogleButton";
import {supabase} from "../../helpers/supabase.js";
import {useAuth} from "../../Auth.jsx";

function Login() {
    const initialMessage = useLocation().state?.initialMessage;
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(initialMessage);
    const {session, user, signOut} = useAuth();

    useEffect(() => {
        if (session) {
            console.log(session)
            navigate("/dashboard");
        }
    }, []);


    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        const {data: {user}, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setMessage(error.message);
            return;
        }

        if (user) {
            navigate("/account/new");
            return null;
        }
        setMessage("An error occurred. Please try again.");
        return null;
    };

    return (
        <div className={"container flex flex-col justify-center items-center mx-auto h-screen w-screen bg-black pt-nav"}>
            <div className={"flex flex-col max-w-96"}>
                <h1 className={"font-black uppercase text-5xl"}>
                    <div>Log in to</div>
                    <div>WBAR Radio</div>
                </h1>
                {message &&
                    <div className={'flex items-center gap-1 text-red-600 motion-preset-slide-down'}>
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <div>{message}</div>
                    </div>}
                <form onSubmit={handlePasswordSubmit}>
                    <div className={"flex flex-col"}>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Email"
                            required
                            className={"p-2 my-2 rounded-lg text-black"}
                        />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Password"
                            required
                            className={"p-2 my-2 rounded-lg text-black"}
                        />
                        <button type="submit" className={"p-2 my-2 bg-purple-900 text-white rounded-lg"}>
                            Log in
                        </button>
                    </div>
                </form>
                <h4 className="relative pt-2 pb-4 flex items-center justify-center">
                    <span className="flex-1 border-b-2 border-white"></span>
                    <span className="mx-2 font-medium uppercase">or</span>
                    <span className="flex-1 border-b-2 border-white"></span>
                </h4>
                <GoogleButton/>
                <div className={'mt-3 w-full text-center text-sm'}>Don't have an account? <Link className={'text-blue-500 hover:underline'} to={'/account/register'}>Register</Link>.</div>
            </div>
        </div>
    );
}

export default Login;