import React, {useState, useEffect} from 'react';

const schedule = {
    Sunday: {
        '12AM-2AM': 'TotNite w/Ashley and Grace',
        '2AM-4AM': 'Sound and Meaning',
        '6AM-8AM': 'Hyperfolkxation',
        '8AM-10AM': 'Songbird',
        '10AM-12PM': 'Atonal Salad for Lunch',
        '12PM-2PM': 'lo library sinkhole',
        '2PM-4PM': 'no hoes radio',
        '4PM-6PM': 'flick the beat',
        '6PM-8PM': 'unstructured noise',
        '8PM-10PM': 'Adventures in (Black) Sonic Imaginaries',
        '10PM-12AM': 'Shabash, Bualadh Bos'
    },
    Monday: {
        '12AM-2AM': 'pompia',
        '2AM-4AM': 'Indo-western with Ri',
        '6AM-8AM': 'Shouldv\'ve Been a 70s Baby',
        '8AM-10AM': ' Wombspace',
        '10AM-12PM': 'Sound Diaries',
        '12PM-2PM': 'Normal Music',
        '2PM-4PM': 'Garden Club of Babylon',
        '4PM-6PM': 'timepool',
        '6PM-8PM': 'Tajh\'s show',
        '8PM-10PM': 'Nefika Adena',
        '10PM-12AM': 'Breast and Eggs'
    },
    Tuesday: {
        '12AM-2AM': 'Flo-Rida Man: Florida\'s Wackiest People and Best Music',
        '2AM-4AM': 'Euphoric Summer',
        '6AM-8AM': 'Janky Jukebox',
        '8AM-10AM': 'We Fit Together Walking',
        '10AM-12PM': 'Well, yes!',
        '12PM-2PM': 'High society',
        '2PM-4PM': 's^2 speaks',
        '4PM-6PM': 'Olio: A Miscellaneous Collection',
        '6PM-8PM': 'Meg\'s show',
        '8PM-10PM': 'Techno, Buddhism, Counterculture',
        '10PM-12AM': 'Hypergravity'
    },
    Wednesday: {
        '12AM-2AM': 'saintsteph4nie\'s Chapel',
        '2AM-4AM': 'Structure Antonym',
        '6AM-8AM': 'Alphabet Soup',
        '8AM-10AM': 'Book Club',
        '10AM-12PM': 'The Dyke Den',
        '12PM-2PM': 'Banger? I hardly know her!',
        '2PM-4PM': 'The Worker Drones',
        '4PM-6PM': 'Isis\'s show',
        '6PM-8PM': 'OFFICE HOURS',
        '8PM-10PM': 'cafecito',
        '10PM-12AM': 'H!ICO (Help! I\'m Chronically Online)'
    },
    Thursday: {
        '12AM-2AM': 'Electronika',
        '2AM-4AM': 'On Rhythms',
        '6AM-8AM': 'Bicoastal Baddie',
        '8AM-10AM': 'West Coast Cowboy',
        '10AM-12PM': 'HALO HALO',
        '12PM-2PM': 'punk as folk',
        '2PM-4PM': 'Graybles with and for Friends',
        '4PM-6PM': 'Geolocationism',
        '6PM-8PM': 'Zoe\'s show',
        '8PM-10PM': 'F**k Money Get B*****s',
        '10PM-12AM': 'Rhythm in Flux'
    },
    Friday: {
        '12AM-2AM': 'DJ CHINA HEAVEN',
        '2AM-4AM': 'Winter fever dream',
        '6AM-8AM': 'worldlist',
        '8AM-10AM': 'Are You Still Watching?',
        '10AM-12PM': 'Beans from the can',
        '12PM-2PM': 'gulf',
        '2PM-4PM': 'Steel spiel',
        '4PM-6PM': 'Manifest-Station',
        '6PM-8PM': 'De Profundis: Music is the Journey',
        '8PM-10PM': 'The Slavgaze Special',
        '10PM-12AM': 'girls only domino club'
    },
    Saturday: {
        '12AM-2AM': 'Edging on the air',
        '2AM-4AM': 'Regicide Radio',
        '6AM-8AM': 'Jojo flows',
        '8AM-10AM': 'she sleeps with you and she prays for me',
        '10AM-12PM': 'POST PUNK DIASPORA',
        '12PM-2PM': 'Ellie and Piper have spoken',
        '2PM-4PM': 'AFRIXA',
        '4PM-6PM': 'yur mum\'s house',
        '6PM-8PM': 'WBARCH Madness',
        '8PM-10PM': 'Blood&Bubblegum',
        '10PM-12AM': 'Holiday at Columbia'
    }
};

function Shows() {
    const [currentShow, setCurrentShow] = useState('');

    useEffect(() => {
        const updateCurrentShow = () => {
            const now = new Date();
            const dayOfWeek = now.toLocaleDateString('en-US', {weekday: 'long'});
            const currentTime = now.getHours() * 100 + now.getMinutes();

            console.log('Current Day:', dayOfWeek);
            console.log('Current Time:', currentTime);

            let showFound = false;

            if (schedule[dayOfWeek]) {
                for (const timeSlot in schedule[dayOfWeek]) {
                    const [start, end] = timeSlot.split('-');
                    const [startHour, startMinute, startPeriod] = parseTimeString(start);
                    const [endHour, endMinute, endPeriod] = parseTimeString(end);

                    if (isNaN(startHour) || isNaN(startMinute) || isNaN(endHour) || isNaN(endMinute)) {
                        console.error('Invalid time format:', start, end);
                        continue; // Skip this iteration and move to the next time slot
                    }
                    if (endHour === 14) {
                        continue
                    }

                    const startTime = convertTo24HourFormat(startHour, startPeriod) * 100 + startMinute;
                    let endTime = convertTo24HourFormat(endHour, endPeriod) * 100 + endMinute;
                    console.log('Start hour:', startHour);
                    console.log('end hour:', endHour);

                    if (currentTime >= startTime && currentTime < endTime) {
                        // Use functional update to ensure the most up-to-date state value
                        setCurrentShow(prevShow => schedule[dayOfWeek][timeSlot]);
                        showFound = true;
                        break;
                    } else if (endTime === 0) {
                        endTime = 2400
                        console.log("time slot", timeSlot)

                        setCurrentShow(prevShow => schedule[dayOfWeek][timeSlot]);
                        showFound = true;
                    }
                }
            }

            if (!showFound) {
                setCurrentShow('');
            }

            console.log('Current Show:', currentShow);
        };


        const parseTimeString = (timeString) => {
            const match = timeString.match(/(\d+)(?::(\d+))?\s*([APMapm]{2})?/i);
            if (!match) {
                console.error('Invalid time format:', timeString);
                return [NaN, NaN, ''];
            }
            const [, hour, minute, period] = match;
            return [parseInt(hour, 10) % 12 + (period && period.toLowerCase() === 'pm' ? 12 : 0), minute ? parseInt(minute, 10) : 0, period];
        };
        const convertTo24HourFormat = (hour, period) => {


            if (period === 'PM' && hour !== 12) {

                return hour + 12;
            } else if (period === 'AM' && hour === 12) {

                return 0;
            } else if (period === 'AM' && hour !== 12) {
                return hour;
            } else {

                return 12; // For 'pm' and hour === 12
            }
        };
        updateCurrentShow(); // Initial call to set the value

        const interval = setInterval(() => {
            updateCurrentShow();
            console.log('Current Show:', currentShow);
        }, 60000);

        return () => clearInterval(interval);
    }, []); // Empty dependency array, no need to include 'schedule'

    return (
        <div>
            {currentShow ? (
                <h2>Now Playing: {currentShow}</h2>
            ) : (
                <p>No show is currently scheduled</p>
            )}
        </div>
    );
}

export default Shows;
  