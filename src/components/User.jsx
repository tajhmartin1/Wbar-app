import "./User.css"
import {Image, Placeholder} from "react-bootstrap";
import {useEffect, useState} from "react";
import {doAuthenticatedAPIRequest} from "../helpers/supabase.js";

function Pill({kind}) {
    return <span className={`role ${kind}`}>{kind}</span>
}

export default function User({roles}) {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        doAuthenticatedAPIRequest("/user/me", "GET").then((response) => {
            setUser(response.data[0])
            setLoading(false)
        })
    }, []);
    return (
        <div id="user-box">
            <div className={"d-flex justify-content-start align-items-center gap-3"}>
                <Image height={"80em"} width={"80em"} roundedCircle src={"maeve.jpg"}/>
                <div>
                    <div className={"d-flex fs-5 gap-1"}>
                        {loading ?
                            <Placeholder xs={4}/> :
                            <span>{user.first_name}</span>
                        }
                        {loading ? <Placeholder xs={6}/> : <span>{user.last_name}</span>}
                    </div>
                    <div>alias</div>
                    <div>
                        {roles.map((role, i) => (
                            <Pill key={i} kind={role}/>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <p>{loading ? "Loading..." : user.joined_at}</p>
            </div>
        </div>
    )
        ;
}