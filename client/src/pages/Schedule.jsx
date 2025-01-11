import React, {useState, useEffect} from 'react';
import './Schedule.css';
const schedule = {
    Monday: {
        '12AM-2AM': 'Bootgaze',
        '2AM-4AM': 'Audio Aliens',
        '6AM-8AM': 'Doesn\'t Drink, Smoke, Laugh',
        '8AM-10AM': 'Wordlist',
        '10AM-12PM': 'Heartbroken the Old Fashioned Way!',
        '12PM-2PM': 'The Dyke Den',
        '2PM-4PM': 'Holiday at Columbia',
        '4PM-6PM': 'Slut! Pop!',
        '6PM-8PM': 'I just know it smells crazy in there',
        '8PM-10PM': 'Sway\'s Salon',
        '10PM-12AM': 'Moving in Silence'
    },
    Tuesday: {
        '12AM-2AM': 'a(drena)lina',
        '2AM-4AM': 'Die Reisen',
        '6AM-8AM': 'sonidos sin fronteras',
        '8AM-10AM': 'kick the can',
        '10AM-12PM': 'Chai Fidelity',
        '12PM-2PM': 'Pull up to the bumper',
        '2PM-4PM': 'Meg\'s show',
        '4PM-6PM': 'YUJA',
        '6PM-8PM': 'Kuch Kuch',
        '8PM-10PM': 'Pierogi Pop',
        '10PM-12AM': 'New Wave Worldwide'
    },
    Wednesday: {
        '12AM-2AM': 'saintsteph4nie\'s chapel',
        '2AM-4AM': 'From the Nest',
        '6AM-8AM': 'Jazz chronicles',
        '8AM-10AM': 'We Fit Together Walking',
        '10AM-12PM': 'limbo',
        '12PM-2PM': 'turn my swag on',
        '2PM-4PM': 'Talk Theatery to Me',
        '4PM-6PM': 'beans and a horse',
        '6PM-8PM': 'OFFICE HOURS',
        '8PM-10PM': 'Sydney',
        '10PM-12AM': 'Only Women DJ With Degree'
    },
    Thursday: {
        '12AM-2AM': 'Regicide Radio',
        '2AM-4AM': 'Techno City',
        '6AM-8AM': 'Cosmos & Convos',
        '8AM-10AM': 'jujuonthatbeat',
        '10AM-12PM': 'You Know You\'re Black When',
        '12PM-2PM': 'Pink Triangles',
        '2PM-4PM': 'Adventures in Black Sonic Imaginaries',
        '4PM-6PM': 'dog songs',
        '6PM-8PM': 'Maural support',
        '8PM-10PM': 'Shabash Bualadh Bos',
        '10PM-12AM': 'gatita'
    },
    Friday: {
        '12AM-2AM': 'Rhythm of the Ages',
        '2AM-4AM': 'girls! girls! girls!',
        '6AM-8AM': 'yv:3sdropping',
        '8AM-10AM': 'Cowgirl Daydreams',
        '10AM-12PM': 'ZINGO FM',
        '12PM-2PM': 'Zoe',
        '2PM-4PM': 'River Rock (and also folk)',
        '4PM-6PM': 'inter/desire',
        '6PM-8PM': 'flama/echo',
        '8PM-10PM': 'I Said What I Said!',
        '10PM-12AM': 'Afrohouse sessions'
    },
    Saturday: {
        '12AM-2AM': 'Bookends',
        '2AM-4AM': 'Interstellar',
        '6AM-8AM': 'Grrrl Germs',
        '8AM-10AM': 'Trust.',
        '10AM-12PM': 'your favorite artist\'s favorite artists',
        '12PM-2PM': 'low library sinkhole',
        '2PM-4PM': 'clay play club',
        '4PM-6PM': 'Ellie and Friends Have Spoken',
        '6PM-8PM': 'breadfruit',
        '8PM-10PM': 'Sanctuaries of Rhythm',
        '10PM-12AM': 'OPEN HOURS'
    },
    Sunday: {
        '12AM-2AM': 'Send Noods',
        '2AM-4AM': 'TotNite',
        '6AM-8AM': 'That\'s Bible',
        '8AM-10AM': 'WBARCH Madness',
        '10AM-12PM': 'Book Club!',
        '12PM-2PM': 'Sangai',
        '2PM-4PM': 'The Garden of Earthly Delights',
        '4PM-6PM': 'AstroGroove',
        '6PM-8PM': 'Beans from the Can',
        '8PM-10PM': 'Songbird',
        '10PM-12AM': 'str4wb3rry c0mput3r'
    }
};

function ShowWithTime({time, show}) {
    return (
        <div className="show">
            <div className="show-name">{show}</div>
            <div className="time">{time}</div>
        </div>
    );
}

function Schedule() {
    const [currentShow, setCurrentShow] = useState(null);
    const [currentTimeSlot, setCurrentTimeSlot] = useState('');
    const [currentDay, setCurrentDay] = useState('');
    useEffect(() => {
        const updateCurrentShow = () => {
            const now = new Date();
            const day = now.toLocaleString('en-US', {weekday: 'long', timeZone: 'America/New_York'});
            const hours = now.toLocaleString('en-US', {hour: 'numeric', hour12: false, timeZone: 'America/New_York'});
            const minutes = now.toLocaleString('en-US', {minute: 'numeric', timeZone: 'America/New_York'});
            const time = `${(hours % 12) || 12}${minutes >= 30 ? 'PM' : 'AM'}`;
            let timeSlot = '';
            if (hours >= 0 && hours < 2) timeSlot = '12AM-2AM';
            else if (hours >= 2 && hours < 4) timeSlot = '2AM-4AM';
            else if (hours >= 4 && hours < 6) timeSlot = '4AM-6AM';
            else if (hours >= 6 && hours < 8) timeSlot = '6AM-8AM';
            else if (hours >= 8 && hours < 10) timeSlot = '8AM-10AM';
            else if (hours >= 10 && hours < 12) timeSlot = '10AM-12PM';
            else if (hours >= 12 && hours < 14) timeSlot = '12PM-2PM';
            else if (hours >= 14 && hours < 16) timeSlot = '2PM-4PM';
            else if (hours >= 16 && hours < 18) timeSlot = '4PM-6PM';
            else if (hours >= 18 && hours < 20) timeSlot = '6PM-8PM';
            else if (hours >= 20 && hours < 22) timeSlot = '8PM-10PM';
            else timeSlot = '10PM-12AM';
            const show = schedule[day] && schedule[day][timeSlot];
            setCurrentShow(show);
            setCurrentTimeSlot(timeSlot);
            setCurrentDay(day);
        };
        updateCurrentShow();
        const intervalId = setInterval(updateCurrentShow, 60000);
        return () => clearInterval(intervalId);
    }, []);
    return (
        <div className="outer-container">
            <div className="schedule-container">
                <h1 className="text-center mt-5">DJ Schedule</h1>
                <div className="current-show">
                    <h2>Currently Playing:</h2>
                    <div>{currentDay ? <h3>{currentDay}</h3> : null}</div>
                    {currentShow ? (
                        <div className="show">
                            <div className="show-name">{currentShow}</div>
                            <div className="time">{currentTimeSlot}</div>
                        </div>
                    ) : (
                        <p>No show currently playing</p>
                    )}
                </div>
                <div className="row justify-content-center">
                    {Object.keys(schedule).map((day) => (
                        <div key={day} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <div className="day-name text-center">{day}</div>
                            <div className="schedule text-center">
                                {Object.entries(schedule[day]).map(([time, show]) => (
                                    <ShowWithTime key={time} time={time} show={show}/>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Schedule;