import {createClient} from "@supabase/supabase-js";

const supabaseUrl = "https://xhftgtthhrkntibtulbl.supabase.co";
// this is a public key, so it's safe to expose it
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoZnRndHRoaHJrbnRpYnR1bGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyODYyMTYsImV4cCI6MjA1MTg2MjIxNn0.J8tv0W3KHwdxJjx0YAtMjXWkDuVtHkVslfMpVPH4s0A";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function doAuthenticatedAPIRequest(path, method, token, options) {
    if (!token) {
        throw new Error("No token available");
    }
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...(method === "POST" && {"Accept": "application/json"})
    };
    const methodOption = {method: method}
    const allOptions = {
        ...methodOption,
        ...options,
        ...( method === "POST" && {body: options?.body || {}})
    }
    // TODO: change for production
    return fetch(`http://localhost:8000${path}`, {
        ...allOptions, headers
    }).then((res) => res.json());
};

export default {supabase, doAuthenticatedAPIRequest};