import React, {useEffect} from 'react';
import WBARNavbar from './components/WBARNavbar';
import Chat from './components/Chat';
import {Routes, Route, BrowserRouter} from "react-router-dom";
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
import Protected from "./Protected.jsx";
import NowPlaying from "./pages/NowPlaying.jsx";
import {AuthProvider} from "./Auth.jsx";

function App() {
    const {setNodeRef} = useDroppable({
        id: 'everything-but-navbar',
    });


    return (
        <BrowserRouter>
            <AuthProvider>
                <DndContext>
                    <div className="App text-white bg-black">
                        <WBARNavbar/>
                        <div ref={setNodeRef}>
                            <Routes>
                                <Route path="/" element={
                                    <>
                                        <div className={"bg-[url('background_tester.jpg')] bg-cover"}>
                                            <NowPlaying/>
                                        </div>
                                        <div>
                                            <Schedule/>
                                        </div>
                                    </>

                                }/>
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
                        </div>
                        <Chat/>
                        <SparkleCursor/>
                    </div>
                </DndContext>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
