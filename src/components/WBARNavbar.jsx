import React from 'react';
import Stream from './Stream';
import {Link} from 'react-router-dom';
import { useRef} from "react";

const WBARNavbar = () => {
    const navRef = useRef(null)
    const toggleNavExpansion = () => {
        navRef.current.classList.toggle('hidden');
    }

    return (
        <nav
            className="fixed w-full z-20 top-0 start-0 px-2">
            <div className=" bg-purple-900 bg-opacity-55 backdrop-blur-xl m-5 max-w-screen-xl flex flex-wrap items-center justify-between px-4 mx-auto rounded-2xl transition-all duration-700 ease-in-out">
                <Link to="/" >
                    <img src="wbar.png" className="w-28" alt="WBAR Logo"/>
                </Link>
                <Stream/>
                <div className="flex">
                    <button type="button"
                            onClick={toggleNavExpansion}
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-purple-900 dark:focus:ring-gray-600"
                            aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div ref={navRef} className="items-center hidden justify-between w-full motion-preset-slide-down"
                     id="navbar-sticky">
                    <ul className="flex flex-col p-2 mb-4 font-medium rounded-lg">
                        <li>
                            <Link to="/"
                                  className="text-2xl block py-2 px-3 font-black uppercase hover:underline"
                                  aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to={"/about"}
                                  className="text-2xl block py-2 px-3 font-black uppercase hover:underline">About</Link>
                        </li>
                        <li>
                            <Link to={"/events"}
                                  className="text-2xl block py-2 px-3 font-black uppercase hover:underline">Events</Link>
                        </li>
                        <li className={'border-t pt-3'}>
                            <Link className={'flex flex-col gap-2 items-baseline'} to={"/login"}>
                                <button className="ml-2 hover:bg-purple-100 bg-opacity-15 hover:text-purple-500 border rounded-xl text-2xl py-2 px-3 font-black uppercase">Login</button> <div className={' font-medium'}>^ DJs, STAFF, E-BOARD</div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    );
}


export default WBARNavbar;