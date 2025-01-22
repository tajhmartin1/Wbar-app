import {useOutlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useAuth} from "./Auth.jsx";

const Protected = () => {
    const navigate = useNavigate();
    const outlet = useOutlet();
    const {session, user, signOut} = useAuth()

    useEffect(() => {
        const token = session?.access_token;
        // console.log(session)
        if (!token) {
            console.log("back to login because no token")
            navigate("/login", {state: {initialMessage: "You must log in to view that page."}});
        }
        else if (!user){
            console.log("to create account because no public user created")
            navigate("/account/new")
        }
    }, []);

    return outlet;
}

export default Protected;
