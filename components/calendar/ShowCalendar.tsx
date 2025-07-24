// "use client";

// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import rrulePlugin from "@fullcalendar/rrule";
// import { useEffect, useState } from "react";
// import { EventInput, EventClickArg } from "@fullcalendar/core"; // 匯入 FullCalendar 類型

// // 定義輸入事件結構（來自 API 或資料庫）
// interface JobEvent {
//   job_day: string; // ISO 日期字串，例如 "2025-05-23T00:00:00.000Z"
//   job_time_start: string; // HHMM 格式，例如 "0900"
//   job_time_end: string; // HHMM 格式，例如 "1700"
//   job_title: string;
//   is_confirm: boolean;
// }

// // 定義 FullCalendar 事件結構
// interface CalendarEvent extends EventInput {
//   title: string;
//   start: string;
//   end: string;
//   extendedProps: {
//     is_confirm: boolean;
//   };
// }

// interface ShowCalendarAdminProps {
//   events: JobEvent[];
// }

// const ShowCalendar_Admin = ({ events }: ShowCalendarAdminProps) => {
//   const [Events, setEvents] = useState<CalendarEvent[]>([]);
//   const [CustomDates, setCustomDates] = useState<CalendarEvent[]>([]);

//   useEffect(() => {
//     if (events && Array.isArray(events)) {
//       const formatted = events.flatMap((d: JobEvent) => {
//         // 驗證輸入資料
//         if (!d.job_day || !d.job_time_start || !d.job_time_end || !d.job_title) {
//           console.warn("無效的事件資料：", d);
//           return [];
//         }

//         // 格式化日期和時間
//         const newDate = d.job_day.split("T")[0]; // 提取日期，例如 "2025-05-23"
//         const startTime = `${d.job_time_start.slice(0, 2)}:${d.job_time_start.slice(2)}:00`; // 轉為 HH:MM:SS
//         const endTime = `${d.job_time_end.slice(0, 2)}:${d.job_time_end.slice(2)}:00`; // 轉為 HH:MM:SS

//         // 驗證時間格式
//         const isValidTime = (time: string) => /^\d{2}:\d{2}:\d{2}$/.test(time);
//         if (!isValidTime(startTime) || !isValidTime(endTime)) {
//           console.warn("無效的時間格式：", { startTime, endTime });
//           return [];
//         }

//         return {
//           title: d.job_title,
//           start: `${newDate}T${startTime}`,
//           end: `${newDate}T${endTime}`,
//           extendedProps: {
//             is_confirm: d.is_confirm,
//           },
//         };
//       });

//       setCustomDates(formatted);
//     } else {
//       setCustomDates([]);
//     }
//   }, [events]);

//   useEffect(() => {
//     setEvents([...CustomDates]);
//   }, [CustomDates]);

//   const renderEventContent = (eventInfo: EventClickArg) => {
//     const isConfirmed = eventInfo.event.extendedProps.is_confirm;
//     return (
//       <div className="fc-event-title">
//         {eventInfo.event.title} - {isConfirmed ? "已確定" : "未確定"}
//       </div>
//     );
//   };

//   return (
//     <FullCalendar
//       plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]}
//       headerToolbar={{
//         left: "prev,next today",
//         center: "title",
//         right: "dayGridMonth,timeGridDay",
//       }}
//       initialView="dayGridMonth"
//       weekends={true}
//       events={Events}
//       eventContent={renderEventContent}
//       eventTimeFormat={{
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//         meridiem: false,
//       }}
//     />
//   );
// };

// export default ShowCalendar_Admin;

// 'use client';

// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import rrulePlugin from '@fullcalendar/rrule';
// import { useEffect, useState } from 'react';
// import { EventInput, EventClickArg } from '@fullcalendar/core';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// interface Job {
//   id: string;
//   job_code: string;
//   job_place: string;
//   job_time_h: string;
//   job_price: number;
//   showprice: boolean;
//   job_day: string;
//   job_school_name: string;
//   job_area: string;
//   job_task_id?: string;
//   job_task_code: string;
//   job_subject: string;
//   is_confirm: boolean;
//   teacher?: string;
//   job_time_start?: string;
//   job_time_end?: string;
//   job_title?: string;
// }

// interface JobEvent {
//   job_day: string;
//   job_time_start: string;
//   job_time_end: string;
//   job_title: string;
//   is_confirm: boolean;
// }

// interface CalendarEvent extends EventInput {
//   title: string;
//   start: string;
//   end: string;
//   extendedProps: {
//     is_confirm: boolean;
//   };
// }

// interface ShowCalendarAdminProps {
//   events: Job[] | JobEvent[];
// }

// const ShowCalendar = ({ events }: ShowCalendarAdminProps) => {
//   const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

//   useEffect(() => {
//     if (!events || !Array.isArray(events)) {
//       setCalendarEvents([]);
//       return;
//     }

//     const formattedEvents = events.flatMap((event: Job | JobEvent) => {
//       if ('job_time_start' in event && 'job_time_end' in event && 'job_title' in event) {
//         if (!event.job_day || !event.job_time_start || !event.job_time_end || !event.job_title) {
//           console.warn('無效的事件資料：', event);
//           return [];
//         }
//         const date = event.job_day.split('T')[0];
//         const startTime = /^\d{2}:\d{2}$/.test(event.job_time_start)
//           ? `${event.job_time_start}:00`
//           : `${event.job_time_start.slice(0, 2)}:${event.job_time_start.slice(2)}:00`;
//         const endTime = /^\d{2}:\d{2}$/.test(event.job_time_end)
//           ? `${event.job_time_end}:00`
//           : `${event.job_time_end.slice(0, 2)}:${event.job_time_end.slice(2)}:00`;
//         return [{
//           title: event.job_title,
//           start: `${date}T${startTime}`,
//           end: `${date}T${endTime}`,
//           extendedProps: { is_confirm: event.is_confirm },
//         }];
//       }
//       if ('job_time_h' in event) {
//         if (!event.job_day || !event.job_time_h || !event.job_subject || !event.job_school_name) {
//           console.warn('無效的 Job 資料：', event);
//           return [];
//         }
//         const [start, end] = event.job_time_h.split('-');
//         const startTime = start.length === 4 ? `${start.slice(0, 2)}:${start.slice(2)}:00` : `${start}:00`;
//         const endTime = end.length === 4 ? `${end.slice(0, 2)}:${end.slice(2)}:00` : `${end}:00`;
//         return [{
//           title: event.job_title || `${event.job_subject} at ${event.job_school_name}`,
//           start: `${event.job_day.split('T')[0]}T${startTime}`,
//           end: `${event.job_day.split('T')[0]}T${endTime}`,
//           extendedProps: { is_confirm: event.is_confirm },
//         }];
//       }
//       return [];
//     });

//     setCalendarEvents(formattedEvents);
//   }, [events]);

//   const renderEventContent = (eventInfo: EventClickArg) => {
//     const isConfirmed = eventInfo.event.extendedProps.is_confirm;
//     return (
//       <div className="p-2 text-primary-1 text-sm">
//         <div className="font-bold">{eventInfo.event.title}</div>
//         <div>{isConfirmed ? '已確定' : '未確定'}</div>
//       </div>
//     );
//   };

//   return (
//     <div className="container mx-auto mt-2 px-4 sm:px-6 lg:px-8">
//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]}
//         headerToolbar={{
//           left: 'prev,next today',
//           center: 'title',
//           right: 'dayGridMonth,timeGridDay',
//         }}
//         initialView="dayGridMonth"
//         weekends={true}
//         events={calendarEvents}
//         eventContent={renderEventContent}
//         eventTimeFormat={{
//           hour: '2-digit',
//           minute: '2-digit',
//           second: '2-digit',
//           meridiem: false,
//         }}
//         // 客製化日歷樣式
//         dayHeaderContent={({ date, text }) => {
//           const isSunday = date.getDay() === 0;
//           const isSaturday = date.getDay() === 6;
//           return (
//             <span
//               className={`block h-[30px] text-center font-bold text-base ${
//                 isSunday ? 'text-red' : isSaturday ? 'font-bold' : 'text-primary-1'
//               }`}
//             >
//               {text}
//             </span>
//           );
//         }}
//         dayCellContent={({ date, isToday }) => {
//           return (
//             <div
//               className={`h-[100px] flex items-start justify-start p-1 ${
//                 isToday ? 'bg-grey-5' : ''
//               }`}
//             >
//               <span>{date.getDate()}</span>
//             </div>
//           );
//         }}
//         dayCellClassNames={({ date }) => {
//           const isSunday = date.getDay() === 0;
//           const isSaturday = date.getDay() === 6;
//           return [
//             'border-grey-2',
//             isSunday ? 'font-bold text-red' : isSaturday ? 'font-bold' : '',
//           ];
//         }}
//       />
//     </div>
//   );
// };

// export default ShowCalendar;

'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import { useEffect, useState } from 'react';
import { EventInput, EventClickArg } from '@fullcalendar/core';

interface Job {
  id: string;
  job_code: string;
  job_place: string;
  job_time_h: string;
  job_price: number;
  showprice: boolean;
  job_day: string;
  job_school_name: string;
  job_area: string;
  job_task_id?: string;
  job_task_code: string;
  job_subject: string;
  is_confirm: boolean;
  teacher?: string;
  job_time_start?: string;
  job_time_end?: string;
  job_title?: string;
}

interface JobEvent {
  job_day: string;
  job_time_start: string;
  job_time_end: string;
  job_title: string;
  is_confirm: boolean;
}

interface CalendarEvent extends EventInput {
  title: string;
  start: string;
  end: string;
  extendedProps: {
    is_confirm: boolean;
  };
}

interface ShowCalendarAdminProps {
  events: Job[] | JobEvent[];
}

const ShowCalendar = ({ events }: ShowCalendarAdminProps) => {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    if (!events || !Array.isArray(events)) {
      setCalendarEvents([]);
      return;
    }

    const formattedEvents = events.flatMap((event: Job | JobEvent) => {
      if ('job_time_start' in event && 'job_time_end' in event && 'job_title' in event) {
        if (!event.job_day || !event.job_time_start || !event.job_time_end || !event.job_title) {
          console.warn('無效的事件資料：', event);
          return [];
        }
        const date = event.job_day.split('T')[0];
        const startTime = /^\d{2}:\d{2}$/.test(event.job_time_start)
          ? `${event.job_time_start}:00`
          : `${event.job_time_start.slice(0, 2)}:${event.job_time_start.slice(2)}:00`;
        const endTime = /^\d{2}:\d{2}$/.test(event.job_time_end)
          ? `${event.job_time_end}:00`
          : `${event.job_time_end.slice(0, 2)}:${event.job_time_end.slice(2)}:00`;
        return [{
          title: event.job_title,
          start: `${date}T${startTime}`,
          end: `${date}T${endTime}`,
          extendedProps: { is_confirm: event.is_confirm },
        }];
      }
      if ('job_time_h' in event) {
        if (!event.job_day || !event.job_time_h || !event.job_subject || !event.job_school_name) {
          console.warn('無效的 Job 資料：', event);
          return [];
        }
        const [start, end] = event.job_time_h.split('-');
        const startTime = start.length === 4 ? `${start.slice(0, 2)}:${start.slice(2)}:00` : `${start}:00`;
        const endTime = end.length === 4 ? `${end.slice(0, 2)}:${end.slice(2)}:00` : `${end}:00`;
        return [{
          title: event.job_title || `${event.job_subject} at ${event.job_school_name}`,
          start: `${event.job_day.split('T')[0]}T${startTime}`,
          end: `${event.job_day.split('T')[0]}T${endTime}`,
          extendedProps: { is_confirm: event.is_confirm },
        }];
      }
      return [];
    });

    setCalendarEvents(formattedEvents);
  }, [events]);

  const renderEventContent = (eventInfo: EventClickArg) => {
    const isConfirmed = eventInfo.event.extendedProps.is_confirm;
    return (
      <div className="p-2 text-primary-1 text-sm font-noto-sans-tc">
        <div className="font-bold">{eventInfo.event.title}</div>
        <div>{isConfirmed ? '已確定' : '未確定'}</div>
      </div>
    );
  };

  console.log("events : ", events)

  return (
    <div className="ml-[48px] sm:ml-12 md:ml-16 container mx-auto mt-2 px-4 sm:px-6 lg:px-8 bg-white z-40">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridDay',
        }}
        initialView="dayGridMonth"
        weekends={true}
        events={calendarEvents}
        eventContent={renderEventContent}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          meridiem: false,
        }}
        // 客製化日歷樣式
        dayHeaderContent={({ date, text }) => {
          const isSunday = date.getDay() === 0;
          const isSaturday = date.getDay() === 6;
          return (
            <span
              className={`block h-[30px] text-center font-bold text-base font-noto-sans-tc ${
                isSunday ? 'text-red' : isSaturday ? 'text-primary-1' : 'text-primary-1'
              }`}
            >
              {text}
            </span>
          );
        }}
        dayCellContent={({ date, isToday }) => {
          return (
            <div
              className={`h-[100px] flex items-start justify-start p-1 font-noto-sans-tc ${
                isToday ? 'bg-grey-2' : ''
              }`}
            >
              <span className="text-primary-1">{date.getDate()}</span>
            </div>
          );
        }}
        dayCellClassNames={({ date }) => {
          const isSunday = date.getDay() === 0;
          const isSaturday = date.getDay() === 6;
          return [
            'border-grey-2',
            isSunday ? 'font-bold text-red' : isSaturday ? 'font-bold text-primary-1' : 'text-primary-1',
          ];
        }}
      />
    </div>
  );
};

export default ShowCalendar;