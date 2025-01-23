import {useAuth} from "../Auth.jsx";
import {useState} from "react";
import {Link} from "react-router-dom"

export default function Avatar({className}) {
    const {session, user, signOut} = useAuth();
    const [expanded, setExpanded] = useState(false);

    if (!user) return null;
    function toggleExpanded () {
        setExpanded(!expanded);
    }

    return (
        <div className={className}>
            <button id="dropdownDefaultButton"
                    className="text-white focus:ring-2 focus:outline-none focus:ring-purple-300 ring-opacity-5 font-medium rounded text-sm px-2 py-1 text-center inline-flex items-center relative"
                    type="button"
                    onClick={toggleExpanded}
            >
                <img src={"./maeve.jpg"} alt={'your profile'} className={'w-10 h-10 object-cover rounded-full mr-2'}/>

                <div className={'flex flex-col items-start'}>
                    <div>
                        {user.first_name} {user.last_name}
                    </div>
                    <div className={'text-xs text-gray-400'}>{user.dj_name}</div>
                </div>
                <svg className={`w-2.5 h-2.5 ms-3 ${expanded && 'rotate-180'}`} aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            {expanded &&
                <div id="dropdown"
                     className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute sm:top-[5.5rem]">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton">
                        <li>
                            <Link to="/dashboard"
                               className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                        </li>
                        <li>
                            <button className={"block bg-purple-400 hover:bg-purple-200 mt-1 hover:text-purple-600 text-left ml-2 rounded-lg text-white font-bold px-4 py-2"}
                            onClick={signOut}>
                                Log out
                            </button>
                        </li>

                    </ul>
                </div>}
        </div>
    )
        ;
}