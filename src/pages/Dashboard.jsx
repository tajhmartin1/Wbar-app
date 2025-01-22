import Container from "react-bootstrap/Container";
import {Button, Row, Col} from "react-bootstrap";
import {useEffect, useState, useContext} from "react";
import ScheduleManager from "../components/ScheduleManager.jsx";
import {doAuthenticatedAPIRequest} from "../helpers/supabase.js";
import {useAuth} from "../Auth.jsx";

import "./Dashboard.css"
import User from "../components/User.jsx";

export default function Dashboard() {
    const {session, user, signOut} = useAuth()

    const token = session?.access_token;

    async function copyToken() {
        navigator.clipboard.writeText(token);
    }

    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        console.log("token:", token)

        if (token) {
            const roles = doAuthenticatedAPIRequest("/user/me/roles", "GET", token)
            roles.then((response) => {
                setRoles(response.map((role) => role.role))
                setLoading(false)
            })
                .catch((error) => {
                    console.error(error)
                    setLoading(false)
                })
        }
    }, [])

    return token && (<div className={'container w-full pt-nav bg-black mx-auto min-h-screen'}>
        <div>
            <h1 className={"text-5xl font-black uppercase mt-4"}>Dashboard</h1>
            <button className={'bg-purple-600 py-1 px-2 rounded'} onClick={copyToken}>DEBUG: Copy Token</button>
        </div>
        <div>
            <div>
                <User roles={roles}/>
            </div>
        </div>
        {roles.includes("executive_board") && <ScheduleManager/>}
    </div>);
}