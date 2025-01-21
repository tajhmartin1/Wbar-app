import {useOutlet, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {useAuth} from "./Auth.jsx";

const Protected = () => {
    const navigate = useNavigate();
    const outlet = useOutlet();
    const {session, user, signOut} = useAuth()

    useEffect(() => {
        const token = session?.access_token;
        // console.log(session)
        if (!token) {
            navigate("/login", {state: {initialMessage: "You must log in to view that page."}});
        }
    }, []);

    return outlet;
}

export default Protected;
