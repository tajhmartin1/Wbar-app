import React, { useEffect } from 'react';
import './App.css';
import WBARNavbar from './Components/WBARNavbar';
import Chat from './Components/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css.map';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import About from './Components/About';
import Events from './Components/Events';
import DjSched from './Components/DjSched';
import SparkleCursor from './Components/SparkleCursor';
import { DndContext, useDroppable } from "@dnd-kit/core";
import FeedbackForm from "./Components/FeedbackForm";

function App() {
    const { setNodeRef } = useDroppable({
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
            <div className="App">
                <WBARNavbar />
                <div ref={setNodeRef}>
                    <Routes>
                        <Route path="/about" element={<About />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/help" element={<FeedbackForm />} />
                        <Route path="/" element={<DjSched />} />
                    </Routes>
                    <Link to={"/help"}>
                        <div id={"link-to-form"} className={"d-flex flex-column justify-content-center"}>
                            <i className="h1 text-white bi bi-question-circle-fill" />
                            <div className={"h6"}>stream issues</div>
                        </div>
                    </Link>
                </div>
                <Chat />
                <SparkleCursor />
            </div>
        </DndContext>
    );
}

function WrappedApp() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default WrappedApp;
