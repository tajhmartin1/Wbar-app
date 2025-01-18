import React, {useEffect} from 'react';
import './App.css';
import WBARNavbar from './components/WBARNavbar';
import Chat from './components/Chat';
import {BrowserRouter as Router, Routes, Route, Link, useLocation} from "react-router-dom";
import About from './pages/About';
import Events from './pages/Events';
import Schedule from './pages/Schedule';
import SparkleCursor from './components/SparkleCursor.jsx';
import {DndContext, useDroppable} from "@dnd-kit/core";
import FeedbackForm from "./pages/FeedbackForm";
import Login from "./pages/loginPages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/loginPages/Register";
import CreateAccount from "./pages/loginPages/CreateAccount";
import {QuestionCircleFill} from "react-bootstrap-icons";
import Protected from "./Protected.jsx";

function App() {
    const {setNodeRef} = useDroppable({
        id: 'everything-but-navbar',
    });

    const location = useLocation();

    // Toggle body class based on the current route
    useEffect(() => {
        if (location.pathname === '/') {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [location]);

    return (
        <DndContext>
            <div className="App" data-bs-theme={"dark"}>
                <WBARNavbar/>
                <div ref={setNodeRef}>
                    <Routes>
                        <Route path="/" element={<Schedule/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/events" element={<Events/>}/>
                        <Route path="/help" element={<FeedbackForm/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/account/register" element={<Register/>}/>

                        <Route element={<Protected/>}>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                            <Route path="/account/new" element={<CreateAccount/>}/>
                        </Route>

                    </Routes>
                    <Link to={"/help"}>
                        <div id={"link-to-form"} className={"d-flex flex-column justify-content-center align-items-center"}>
                            <QuestionCircleFill className="h1 text-white"/>
                            <div className={"h6"}>stream issues</div>
                        </div>
                    </Link>
                </div>
                <Chat/>
                <SparkleCursor/>
            </div>
        </DndContext>
    );
}

function WrappedApp() {
    return (
        <Router>
            <App/>
        </Router>
    );
}

export default WrappedApp;
