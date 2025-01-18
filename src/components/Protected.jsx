import {Outlet, Navigate} from "react-router-dom";
import {getToken} from "../helpers/supabase.js";
const Protected = () => {
    const token = getToken();
    return token ? <Outlet /> : <Navigate to="/signin" />;
}

export default Protected;
