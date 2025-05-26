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

"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { useEffect, useState } from "react";
import { EventInput, EventClickArg } from "@fullcalendar/core";

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
  events: JobEvent[];
}

const ShowCalendar_Admin = ({ events }: ShowCalendarAdminProps) => {
  const [Events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    if (events && Array.isArray(events)) {
      const formatted = events.flatMap((d: JobEvent) => {
        if (!d.job_day || !d.job_time_start || !d.job_time_end || !d.job_title) {
          console.warn("無效的事件資料：", d);
          return [];
        }

        const isValidDate = (date: string) => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(date);
        if (!isValidDate(d.job_day)) {
          console.warn("無效的日期格式：", d.job_day);
          return [];
        }

        const newDate = d.job_day.split("T")[0];
        const startTime = `${d.job_time_start.slice(0, 2)}:${d.job_time_start.slice(2)}:00`;
        const endTime = `${d.job_time_end.slice(0, 2)}:${d.job_time_end.slice(2)}:00`;

        const isValidTime = (time: string) => /^\d{2}:\d{2}:\d{2}$/.test(time);
        if (!isValidTime(startTime) || !isValidTime(endTime)) {
          console.warn("無效的時間格式：", { startTime, endTime });
          return [];
        }

        return {
          title: d.job_title,
          start: `${newDate}T${startTime}`,
          end: `${newDate}T${endTime}`,
          extendedProps: {
            is_confirm: d.is_confirm,
          },
        };
      });

      setEvents(formatted);
    } else {
      setEvents([]);
    }
  }, [events]);

  const renderEventContent = (eventInfo: EventClickArg) => {
    const isConfirmed = eventInfo.event.extendedProps.is_confirm;
    return (
      <div className="fc-event-title">
        {eventInfo.event.title} - {isConfirmed ? "已確定" : "未確定"}
      </div>
    );
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]}
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