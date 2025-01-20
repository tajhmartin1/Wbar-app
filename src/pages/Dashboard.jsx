import Container from "react-bootstrap/Container";
import {Button, Row, Col} from "react-bootstrap";
import {useEffect, useState} from "react";
import ScheduleManager from "../components/ScheduleManager.jsx";
import {doAuthenticatedAPIRequest, getToken} from "../helpers/supabase.js";
import {useNavigate} from "react-router-dom";

import "./Dashboard.css"
import User from "../components/User.jsx";

export default function Dashboard() {
    const navigate = useNavigate()

    async function copyToken() {
        const token = await getToken()
        navigator.clipboard.writeText(token);
    }

    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(true)
    const [userToken, setUserToken] = useState(null)


    useEffect( () => {
        async function  fetchToken() {
            const token = await getToken()
            setUserToken(token)

            if (!token) {
                navigate("/login")
            }
        }
        const token = fetchToken()

        setUserToken(token)
    }, [])

    useEffect(() => {
        const roles = doAuthenticatedAPIRequest("/user/me/roles", "GET")
        roles.then((response) => {
            setRoles(response.map((role) => role.role))
            setLoading(false)
        })
    }, [])

    return userToken && (
        <Container>
            <Row>
                <h1>Dashboard</h1>
                <Button onClick={copyToken}>DEBUG: Copy Token</Button>
                <div className={"flex gap-1"}>
                    <span>Your authorization level:</span>
                    {loading && <span>Loading roles...</span>}
                    <span className="d-flex gap-1">
                    {roles.map((role, i) => (
                        <span key={i}>{role}</span>
                    ))}
                </span>
                </div>
            </Row>
            <Row>
                <Col sm={4}>
                    <User roles={roles}/>
                </Col>
            </Row>
            {roles.includes("executive_board") && <ScheduleManager/>}
        </Container>
    )
        ;
}