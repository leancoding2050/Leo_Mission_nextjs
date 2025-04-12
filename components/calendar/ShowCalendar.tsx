// "use client";

// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import rrulePlugin from "@fullcalendar/rrule";
// import { useEffect, useState } from "react";

// const ShowCalendar = ({events}:any) => {

    

//     const [ Events, setEvents ] = useState([]);
//     const [CustomDates, setCustomDates] = useState([]);

//     useEffect(()=>{
//         if(events){
    
//             const formatted = events.flatMap((d:any)=>{
//                 const newDate = d.job_day.split('T')[0]+'T';
//                 return{
//                     title: d.job_title,
//                     start: newDate+d.job_time.split('T')[1],
//                     end: newDate+d.job_time.split('T')[1],
//                 }
                
                
//             })
            
//             setCustomDates(formatted);
//                          // console.log("formatted : ",formatted) 
    
//         }
    
//     },[events])

//     useEffect(()=>{
//         const mergedevent = [...CustomDates , ];
//         setEvents(mergedevent)
//     },[CustomDates])

//     console.log(" Events : ",Events)

//     return(
//         <FullCalendar
//             plugins={[
//                 dayGridPlugin,
//                 timeGridPlugin,
//                 interactionPlugin,
//                 rrulePlugin,
//             ]}
//             headerToolbar={{
//                 left: "prev,next today",
//                 center: "title",
//                 right: "dayGridMonth,timeGridWeek,timeGridDay",
//             }}
//             initialView="dayGridMonth"
//             weekends={true}
//             events={Events}
//         />
//     )


// };

// export default ShowCalendar;

"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { useEffect, useState } from "react";

const ShowCalendar = ({ events })=> {
    const [Events, setEvents] = useState([]);
    const [CustomDates, setCustomDates] = useState([]);

    useEffect(() => {
        if (events) {
            const formatted = events.flatMap((d:any) => {
                const newDate = d.job_day.split("T")[0] + "T";
                const startTime = d.job_time_start.slice(0, 2) + ":" + d.job_time_start.slice(2) + ":00";
                const endTime = d.job_time_end.slice(0, 2) + ":" + d.job_time_end.slice(2) + ":00";
                
                return {
                    title: d.job_title,
                    start: newDate + startTime,
                    end: newDate + endTime,
                };
            });

            setCustomDates(formatted);
        }
    }, [events]);

    useEffect(() => {
        setEvents([...CustomDates]);
    }, [CustomDates]);

    const renderEventContent = (eventInfo:any) => {
        return (
            <div className="fc-event-title">
                {eventInfo.event.title}
            </div>
        );
    }

    return (
        <FullCalendar
            plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                rrulePlugin,
            ]}
            headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth",
            }}
            initialView="dayGridMonth"
            weekends={true}
            events={Events}
            eventContent={renderEventContent}
            eventTimeFormat={{
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                meridiem: false,
            }}
        />
    );
};

export default ShowCalendar;
