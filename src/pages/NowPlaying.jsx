import {useEffect, useState} from "react";

export default function NowPlaying() {
    const [currentShow, setCurrentShow] = useState(null);
    const [currentTimeSlot, setCurrentTimeSlot] = useState(null);
    const [currentDay, setCurrentDay] = useState(null);

    useEffect(() => {
        const updateCurrentShow = () => {
            const now = new Date();
            const day = now.toLocaleString('en-US', {weekday: 'long', timeZone: 'America/New_York'});
            const hours = now.toLocaleString('en-US', {hour: 'numeric', hour12: false, timeZone: 'America/New_York'});
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

            setCurrentTimeSlot(timeSlot);
            setCurrentDay(day);
        };
        updateCurrentShow();
        const intervalId = setInterval(updateCurrentShow, 60000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={'container h-[88vh] flex flex-col justify-end'}>
            <div className={'font-black text-3xl sm:text-4xl md:text-6xl mb-4 md:mb-10 uppercase'}>
                <div>Barnard college's</div>
                <div>freeform radio station</div>
            </div>
            <div className={'xs:flex-col sm:flex sm: lg:mb-20'}>
                <div className={"mr-5 w-full uppercase"} >
                    <div className={'font-black text-7xl md:text-8xl'}>On Air</div>
                    <div className={'font-black text-3xl md:text-4xl'}>Sun 2-4</div>
                </div>
                <div className={'bg-gray-800 p-4 rounded bg-opacity-50'}>
                    <div className={"font-black uppercase text-3xl"}>Show name</div>
                    <p className={"max-h-40 overflow-scroll"}>Lorem ipsum odor amet, consectetuer adipiscing elit. Ut sollicitudin curae curae netus
                        scelerisque ipsum sit interdum. Sociosqu potenti congue urna porta vestibulum egestas suscipit
                        elit. Integer nisl netus congue aliquam laoreet. Porttitor ligula consequat consequat senectus,
                        euismod dapibus tellus. Sed amet felis molestie gravida urna sem, nam sollicitudin. Dapibus
                        vestibulum inceptos suscipit inceptos blandit augue.</p>
                </div>
            </div>
        </div>
    )
}