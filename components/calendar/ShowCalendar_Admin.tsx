"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { useEffect, useState } from "react";

const ShowCalendar_Admin = ({ events }) => {
    const [Events, setEvents] = useState([]);
    const [CustomDates, setCustomDates] = useState([]);

    useEffect(() => {
        if (events) {
            const formatted = events.flatMap((d: any) => {
                const newDate = d.job_day.split("T")[0] + "T";
                const startTime = d.job_time_start.slice(0, 2) + ":" + d.job_time_start.slice(2) + ":00";
                const endTime = d.job_time_end.slice(0, 2) + ":" + d.job_time_end.slice(2) + ":00";

                return {
                    title: d.job_title,
                    start: newDate + startTime,
                    end: newDate + endTime,
                    extendedProps: {
                        is_confirm: d.is_confirm, // 添加 is_confirm 到 extendedProps
                    },
                };
            });

            setCustomDates(formatted);
        }
    }, [events]);

    useEffect(() => {
        setEvents([...CustomDates]);
    }, [CustomDates]);

    const renderEventContent = (eventInfo: any) => {
        console.log("eventInfo : ", eventInfo);
        const isConfirmed = eventInfo.event.extendedProps.is_confirm;
        return (
            <div className="fc-event-title">
                {eventInfo.event.title} - {isConfirmed ? "已確定" : "未確定"}
            </div>
        );
    };

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
                right: "dayGridMonth,timeGridDay",
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

export default ShowCalendar_Admin;
// "use client";

// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import rrulePlugin from "@fullcalendar/rrule";
// import { useEffect, useState } from "react";

// const ShowCalendar_Admin = ({ events }) => {
//     const [Events, setEvents] = useState([]);
//     const [CustomDates, setCustomDates] = useState([]);

//     useEffect(() => {
//         if (events) {
//             const formatted = events.flatMap((d:any) => {
//                 const newDate = d.job_day.split("T")[0] + "T";
//                 const startTime = d.job_time_start.slice(0, 2) + ":" + d.job_time_start.slice(2) + ":00";
//                 const endTime = d.job_time_end.slice(0, 2) + ":" + d.job_time_end.slice(2) + ":00";
                
//                 return {
//                     title: d.job_title,
//                     start: newDate + startTime,
//                     end: newDate + endTime,
//                 };
//             });

//             setCustomDates(formatted);
//         }
//     }, [events]);

//     useEffect(() => {
//         setEvents([...CustomDates]);
//     }, [CustomDates]);

//     const renderEventContent = (eventInfo:any) => {
//         console.log("eventInfo : ",eventInfo);
//         return (
//             <div className="fc-event-title">
//                 {eventInfo.event.title}
//             </div>
//         );
//     }

//     return (
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
//                 right: "dayGridMonth,timeGridDay",
//             }}
//             initialView="dayGridMonth"
//             weekends={true}
//             events={Events}
//             eventContent={renderEventContent}
//             eventTimeFormat={{
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 second: "2-digit",
//                 meridiem: false,
//             }}
//         />
//     );
// };

// export default ShowCalendar_Admin;
