import Container from "react-bootstrap/Container";
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import ShowManager from "./ShowManager.jsx";

export default function Dashboard({token}) {
    function copyToken() {
        navigator.clipboard.writeText(token);
    }

    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getUserRoles = async () => {
            const roles = await fetch(
                "http://localhost:8000/user/me/roles",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).then((res) => res.json());
            setRoles(roles.map(role => role.role));
            setLoading(false)
        };
        getUserRoles();
    }, [token])

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
            {roles.includes("executive_board") && <ShowManager token={token} />}
        </Container>
    );
}