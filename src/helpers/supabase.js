import {createClient} from "@supabase/supabase-js";

const supabaseUrl = "https://xhftgtthhrkntibtulbl.supabase.co";
// this is a public key, so it's safe to expose it
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoZnRndHRoaHJrbnRpYnR1bGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyODYyMTYsImV4cCI6MjA1MTg2MjIxNn0.J8tv0W3KHwdxJjx0YAtMjXWkDuVtHkVslfMpVPH4s0A";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getToken = async () => {
    const {
        data: {session},
    } = await supabase.auth.getSession();
    return session?.access_token || null;
};

export async function doAuthenticatedAPIRequest (path, method, options) {
    const token = await getToken();
    if (!token) {
        throw new Error("No token available");
    }
    const headers = {
        Authorization: `Bearer ${token}`, "Content-Type": "application/json",
    };
    const methodOption = {method: method}
    const allOptions = {
        ...methodOption, ...options,
    }
    // TODO: change for production
    return fetch(`http://localhost:8000${path}`, {
        ...allOptions, headers
    }).then((res) => res.json());
};

export default {supabase, getToken, doAuthenticatedAPIRequest};