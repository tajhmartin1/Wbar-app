import React, { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Get the session from local storage. If necessary then refresh access_token
        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setAuthenticated(!!session);
            setToken(session?.access_token || null);
            setLoading(false);
        };

        getSession();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    } else {
        if (authenticated) {
            return React.cloneElement(children, { token });
        }
        return <Navigate to="/login" />;
    }
}

export default RequireAuth;