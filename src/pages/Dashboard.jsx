import Container from "react-bootstrap/Container";
import {Button, Row, Col} from "react-bootstrap";
import {useEffect, useState, useContext} from "react";
import ScheduleManager from "../components/ScheduleManager.jsx";
import {doAuthenticatedAPIRequest} from "../helpers/supabase.js";
import {useAuth} from "../Auth.jsx";

import "./Dashboard.css"
import User from "../components/User.jsx";
import {useNavigate} from "react-router-dom";

export default function Dashboard() {
    const {session, user, signOut} = useAuth()

    const navigate = useNavigate()
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
        }
    }, [])

    return token && (<Container>
            <Row>
                <h1>Dashboard</h1>
                <Button onClick={copyToken}>DEBUG: Copy Token</Button>
                <div className={"flex gap-1"}>
                    <span>Your authorization level:</span>
                    {loading && <span>Loading roles...</span>}
                    <span className="d-flex gap-1">
                    {roles.map((role, i) => (<span key={i}>{role}</span>))}
                </span>
                </div>
            </Row>
            <Row>
                <Col sm={4}>
                    <User roles={roles}/>
                </Col>
            </Row>
            {roles.includes("executive_board") && <ScheduleManager/>}
        </Container>);
}