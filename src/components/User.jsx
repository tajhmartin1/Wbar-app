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
    const joined = new Date(user?.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
    const token = session?.access_token;
    const [loading, setLoading] = useState(true)
    return (
        <div className={"w-72 mt-4 flex flex-col px-4 py-7 rounded bg-gray-900"}>
            <div className={"flex justify-between w-100 pb-5 gap-3 border-b border-opacity-15 border-gray-100"}>
                <div className={'flex gap-3 '}>
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
            <div className={"mt-4 ml-2 flex flex-col gap-2"}>
                <div className={'flex gap-2 text-gray-400'}>
                    <svg className="h-6 w-6 text-gray-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                         stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <rect x="3" y="5" width="18" height="14" rx="2"/>
                        <polyline points="3 7 12 13 21 7"/>
                    </svg>
                    <div>{user.email}</div>
                </div>
                <div className={'flex gap-2 text-gray-400'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                         stroke="currentColor" className="size-6 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                    </svg>


                    <div>Since {joined}</div>
                </div>
            </div>
        </div>
    )
        ;
}