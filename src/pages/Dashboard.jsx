import Container from "react-bootstrap/Container";
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import ShowManager from "../components/ShowManager.jsx";
import {doAuthenticatedAPIRequest, getToken} from "../helpers/supabase.js";

import "./Dashboard.css"

export default function Dashboard() {
    async function copyToken() {
        const token = await getToken()
        navigator.clipboard.writeText(token);
    }

    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const roles = doAuthenticatedAPIRequest("/user/me/roles", "GET")
        roles.then((response) => {
            setRoles(response.map((role) => role.role))
            setLoading(false)
        })
    }, [])

    return (
        <Container>
            <h1>Dashboard</h1>
            <Button onClick={copyToken}>DEBUG: Copy Token</Button>
            <div className={"d-flex gap-1"}>
                <span>Your authorization level:</span>
                {loading && <span>Loading roles...</span>}
                <span className="d-flex gap-1">
                    {roles.map((role, i) => (
                        <span key={i}>{role}</span>
                    ))}
                </span>
            </div>
            {roles.includes("executive_board") && <ShowManager/>}
        </Container>
    );
}