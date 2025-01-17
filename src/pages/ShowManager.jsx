import Table from 'react-bootstrap/Table';
import {Button} from "react-bootstrap";
import {Plus, Eye, Trash3, PencilSquare} from "react-bootstrap-icons";
import {useState, useEffect, useRef} from "react";
import {Form} from "react-bootstrap";

function deleteShow(id) {
    console.log("deleting show", id)
}

function addShow({token, show: {name, djEmail, showSlot: {day, timeSlot}, description}}) {
    console.log("adding show")
}

function AutoFocusFormControl() {
    useEffect(() => {

    })
        return (<Form.Control size="sm" type={"text"} value={showToAdd.name}
                  onChange={(e) => setShowToAdd({...showToAdd, name: e.target.value})}/>)
}

function Actions({
                     id, isInactive = false
                 }) {
    return (
        <div className={"d-flex gap-2"}>
            <PencilSquare></PencilSquare>
            <Trash3 onClick={() => !isInactive && deleteShow(id)}/>
        </div>
    )
}

export default function ShowManager({token}) {

    const [shows, setShows] = useState([{
        name: "The Morning Show",
        djEmail: "test@barnard.edu",
        showSlot: {day: "Mon", timeSlot: "8AM-10AM"},
        description: "Wake up with us!"
    }]);
    const [isEditing, setIsEditing] = useState(false);
    const [showToAdd, setShowToAdd] = useState({
        name: "",
        djEmail: "",
        showSlot: {day: "", timeSlot: ""},
        description: ""
    });

    const nameInputRef = useRef(null);

    useEffect(() => {
        // Fetch shows or other side effects here
    }, [token]);


    return (
        <div>
            <div className='mt-4 mb-2 d-flex justify-content-between'>
                <h2>Shows</h2>
                <Button onClick={() => {
                    setIsEditing(true);

                    console.log(isEditing,"focusing on name input")
                    nameInputRef.current.focus();
                }} variant={"success"}><Plus/> Add a show</Button>
            </div>
            <Table striped hover variant={"dark"}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Show Name</th>
                    <th>DJ Email</th>
                    <th>Time slot</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {shows.map((show, i) => (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{show.name}</td>
                        <td>{show.djEmail}</td>
                        <td>{show.showSlot.day} {show.showSlot.timeSlot}</td>
                        <td>{show.description}</td>
                        <td><Actions id={show.id} isInactive/></td>
                    </tr>
                ))}

                {isEditing && <tr>
                    <td>{shows.length + 1}</td>
                    <td>
                        <Form.Control _ref={nameInputRef} size="sm" type={"text"} value={showToAdd.name}
                                      onChange={(e) => setShowToAdd({...showToAdd, name: e.target.value})}/>
                    </td>
                    <td>
                        <Form.Control size={"sm"} type={"email"} value={showToAdd.djEmail}
                                      onChange={(e) => setShowToAdd({...showToAdd, djEmail: e.target.value})}/>
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
                        <Form.Control as={"textarea"} size={"sm"} type={"text"} value={showToAdd.description}
                                      onChange={(e) => setShowToAdd({...showToAdd, description: e.target.value})}/>
                    </td>
                    <td>
                        <Actions id={shows.length + 1}/>
                    </td>
                </tr>}


                </tbody>
            </Table>
        </div>
    )
}