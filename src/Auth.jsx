import {supabase, doAuthenticatedAPIRequest} from "./helpers/supabase.js";
import {createContext, useContext, useEffect, useState} from "react";
// create a context for authentication
const AuthContext = createContext({
    session: null, user: null, signOut: () => {
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
            const {data: {user}, error} = await doAuthenticatedAPIRequest("/user/me", "GET", token)
            if (error) throw error;
            return user
        }
        return null;
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
        user,
        sessionEmail,
        signOut: () => supabase.auth.signOut(),
    };

    // use a provider to pass down the value
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// export the useAuth hook
export const useAuth = () => {
    return useContext(AuthContext);
};