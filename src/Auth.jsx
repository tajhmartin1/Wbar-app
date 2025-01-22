import {supabase, doAuthenticatedAPIRequest} from "./helpers/supabase.js";
import {createContext, useContext, useEffect, useState} from "react";
// create a context for authentication
const AuthContext = createContext({
    session: null, sessionEmail: null, user: null, updateUser: () => {
    }, signOut: () => {
    }
});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null);
    const [sessionEmail, setSessionEmail] = useState(null);

    const [loading, setLoading] = useState(true);

    async function getUserFromSession(session) {
        const token = session?.access_token
        if (token) {
            const response = await doAuthenticatedAPIRequest("/user/me", "GET", token)
            return response.data[0]
        }
        return null;
    }

    async function updateUser() {
        console.log("updating user in context")
        const newUser = await getUserFromSession(session)
        console.log("got user:", newUser)
        setUser(newUser)
    }

    useEffect(() => {
        const setData = async () => {
            const {data: {session}, error} = await supabase.auth.getSession();
            if (error) throw error;
            setSession(session)
            setSessionEmail(session?.user?.email)
            const user = await getUserFromSession(session)
            setUser(user)
            setLoading(false);
        };

        const {data: listener} = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            setSessionEmail(session?.user?.email);
            const user = await getUserFromSession(session)
            setUser(user);
            setLoading(false)
        });

        setData();

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    const value = {
        session,
        user,           // reflects the user in the public.user (null before CreateAccount submit)
        sessionEmail,   // reflects the user in auth.users
        updateUser,     // CreateAccount uses this to update the user after the form is submitted
        signOut: () => supabase.auth.signOut(),
    };

    // use a provider to pass down the value
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    return useContext(AuthContext);
};