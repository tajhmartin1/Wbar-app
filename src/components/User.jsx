import "./User.css"
import {Image, Placeholder} from "react-bootstrap";
import {useEffect, useState} from "react";
import {doAuthenticatedAPIRequest} from "../helpers/supabase.js";

export default function User() {
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
            <div className={"d-flex justify-content-center"}>
                <Image height={"50%"} width={"50%"} roundedCircle src={"maeve.jpg"}/>
            </div>
            <div>
                <h4 className={"d-flex gap-1"}>
                    {loading ?
                        <Placeholder xs={6}/> :
                        <span>{user.first_name}</span>
                    }
                    {loading ? <Placeholder xs={6}/> : <span>{user.last_name}</span>}
                </h4>
                <p>{loading ? "Loading..." : user.email}</p>
            </div>
        </div>
    );
}