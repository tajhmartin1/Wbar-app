import Table from 'react-bootstrap/Table';
import {Button} from "react-bootstrap";
import {Plus, Eye, Trash3, PencilSquare} from "react-bootstrap-icons";
import {useState, useEffect, useRef} from "react";
import {Form, Container} from "react-bootstrap";
// import "./ShowManager.css"
import {doAuthenticatedAPIRequest, getToken} from "../helpers/supabase.js";

function deleteShow(id) {
    console.log("deleting show", id)
}

function addShow({token, show: {name, dj_emails, show_slot: {day, time_slot}, description}}) {
    console.log("adding show")
}

function Actions({
                     id, isInactive = false
                 }) {
    return (<div className={"flex gap-2"}>
        <PencilSquare></PencilSquare>
        <Trash3 onClick={() => !isInactive && deleteShow(id)}/>
    </div>)
}

export default function ScheduleManager() {
    const tableFields = ["#", "Show Name", "DJ Email", "Time Slot", "Actions"];
    const [shows, setShows] = useState([{
        name: "The Morning Show", dj_emails: "test@barnard.edu", show_slot: {day: "Mon", time_slot: "8AM-10AM"},
    }]);
    const [isEditing, setIsEditing] = useState(true);
    const [showToAdd, setShowToAdd] = useState({
        name: "", dj_emails: [], show_slot: {day: "", time_slot: ""},
    });

    const nameInputRef = useRef(null);

    return (
        <div className={'container px-4 mt-4'}>
            <div>
                <h2 className={'text-4xl font-black uppercase'}>Manage schedule</h2>
            </div>
            <table className={'table-auto mt-4 w-full'}>
                <thead>
                <tr className={'uppercase border-b'}>
                    {tableFields.map((field, i) => <th key={i} className={'font-black text-2xl'}>{field}</th>)}
                </tr>
                </thead>
                <tbody>
                {shows.map((show, i) => (<tr key={i} className={'border-b'}>
                    <td className={"py-2"}>{i + 1}</td>
                    <td>{show.name}</td>
                    <td>{show.dj_emails}</td>
                    <td>{show.show_slot.day} {show.show_slot.time_slot}</td>
                    <td><Actions id={show.id} isInactive/></td>
                </tr>))}

                {isEditing && <tr>
                    <td>{shows.length + 1}</td>
                    <td>
                        <input value={showToAdd.name} className={'border text-md px-1 rounded w-[90%] pe-1 my-2'}
                               onChange={(e) => setShowToAdd({...showToAdd, name: e.target.value})}/>
                    </td>
                    <td>
                        <input type={"email"} value={showToAdd.dj_emails}  className={'border text-md px-1 rounded w-[90%] pe-1 my-2'}
                                      onChange={(e) => setShowToAdd({...showToAdd, dj_emails: e.target.value})}/>
                    </td>
                    <td>
                        <div className={'d-flex'}>
                            <Form.Select size={"sm"}>
                                <option>Mon</option>
                                <option>Tue</option>
                                <option>Wed</option>
                                <option>Thu</option>
                                <option>Fri</option>
                                <option>Sat</option>
                                <option>Sun</option>
                            </Form.Select>
                            <Form.Select size={"sm"}>
                                <option>12AM-2AM</option>
                                <option>2AM-4AM</option>
                                <option>4AM-6AM</option>
                                <option>6AM-8AM</option>
                                <option>8AM-10AM</option>
                                <option>10AM-12AM</option>
                                <option>12PM-2PM</option>
                                <option>2PM-4PM</option>
                                <option>4PM-6PM</option>
                                <option>6PM-8PM</option>
                                <option>8PM-10PM</option>
                                <option>10PM-12AM</option>
                            </Form.Select>
                        </div>
                    </td>

                    <td>
                        <Actions id={shows.length + 1}/>
                    </td>
                </tr>}

                </tbody>
            </table>
        </div>)
}