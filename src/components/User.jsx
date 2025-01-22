import {useEffect, useState} from "react";
import {doAuthenticatedAPIRequest} from "../helpers/supabase.js";
import {useAuth} from "../Auth.jsx";

function Pill({kind}) {
    const styles = {
        dj: "bg-blue-500 border-blue-600",
        executive_board: "bg-red-500 border-red-600",
        dev: "bg-green-500 border-green-600",
    }

    return <span
        className={`rounded-xl min-w-8 text-center text-xs px-3 font-medium border bg-opacity-40  ${styles[kind]}`}>{kind}</span>
}

export default function User({roles}) {
    const {session, user, signOut} = useAuth();
    const token = session?.access_token;
    const [loading, setLoading] = useState(true)
    return (
        <div className={"w-72 mt-4"}>
            <div className={"flex bg-gray-900 rounded justify-between w-100 px-4 py-7 gap-3"}>
                    <div className={'flex gap-3'}>
                        <img src={"./maeve.jpg"} alt={'your profile'}
                             className={"object-contain rounded-full h-20 w-20 min-w-20 min-h-20 border"}/>
                        <div className={'flex flex-col gap-1'}>
                            <h2 className={"text-center text-xl"}>{user?.first_name} {user?.last_name}</h2>
                            <div className={"flex gap-1"}>
                                {roles.map((role, i) => (<Pill key={i} kind={role}/>))}
                            </div>
                            <div className={'text-gray-400'}>{user.dj_name}</div>
                        </div>
                    </div>
                    <button className={'border bg-gray-950 h-fit rounded text-sm px-2 py-1'}>Edit</button>

            </div>
        </div>
    )
        ;
}