// "use client";

// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import rrulePlugin from "@fullcalendar/rrule";
// import { useEffect, useState } from "react";
// import { EventInput, EventClickArg } from "@fullcalendar/core";

// // 定義輸入事件結構
// export interface JobEvent {
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
//   const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

//   useEffect(() => {
//     if (events && Array.isArray(events)) {
//       const formatted = events.flatMap((d: JobEvent) => {
//         if (!d.job_day || !d.job_time_start || !d.job_time_end || !d.job_title) {
//           console.warn("無效的事件資料：", d);
//           return [];
//         }

//         const newDate = d.job_day.split("T")[0];
//         const startTime = `${d.job_time_start.slice(0, 2)}:${d.job_time_start.slice(2)}00`;
//         const endTime = `${d.job_time_end.slice(0, 2)}${d.job_time_end.slice(2)}`;

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

//       setCalendarEvents(formatted);
//     } else {
//       setCalendarEvents([]);
//     }
//   }, [events]);

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
//       events={calendarEvents}
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

interface Job {
  id: string;
  job_code: string;
  job_place: string;
  job_time_h: string;
  job_time_start: string;
  job_time_end: string;
  job_price: number;
  job_day: string;
  job_complete: boolean;
  job_school_name: string;
  job_area: string;
  task_code: string;
  is_confirm: boolean;
  job_title: string;
  job_subject: string;
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

const ShowCalendar_Admin = ({ events }: ShowCalendarAdminProps) => {
  const [Events, setEvents] = useState<CalendarEvent[]>([]);
  const [CustomDates, setCustomDates] = useState<CalendarEvent[]>([]);

  const isValidHHMM = (time: string): boolean => {
    if (!time || typeof time !== "string") return false;
    if (time.length === 4 && /^\d{4}$/.test(time)) {
      const hours = parseInt(time.slice(0, 2), 10);
      const minutes = parseInt(time.slice(2, 4), 10);
      return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
    }
    if (/^\d{2}:\d{2}$/.test(time)) {
      const [hours, minutes] = time.split(":").map(Number);
      return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
    }
    return false;
  };

  const isValidDate = (date: string): boolean => {
    return /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}.*Z)?$/.test(date) && !isNaN(new Date(date).getTime());
  };

  useEffect(() => {
    if (events && Array.isArray(events)) {
      const formatted = events.flatMap((d: Job | JobEvent) => {
        if ("job_time_start" in d && "job_time_end" in d && "job_title" in d) {
          const jobEvent = d as JobEvent;
          if (!jobEvent.job_day || !isValidDate(jobEvent.job_day) || !jobEvent.job_time_start || !jobEvent.job_time_end || !jobEvent.job_title) {
            console.warn("無效的 JobEvent 資料：", jobEvent);
            return [];
          }
          const newDate = jobEvent.job_day.split("T")[0];
          const startTime = isValidHHMM(jobEvent.job_time_start)
            ? jobEvent.job_time_start.length === 4
              ? `${jobEvent.job_time_start.slice(0, 2)}:${jobEvent.job_time_start.slice(2)}:00`
              : `${jobEvent.job_time_start}:00`
            : "09:00:00";
          const endTime = isValidHHMM(jobEvent.job_time_end)
            ? jobEvent.job_time_end.length === 4
              ? `${jobEvent.job_time_end.slice(0, 2)}:${jobEvent.job_time_end.slice(2)}:00`
              : `${jobEvent.job_time_end}:00`
            : "17:00:00";
          return {
            title: jobEvent.job_title,
            start: `${newDate}T${startTime}`,
            end: `${newDate}T${endTime}`,
            extendedProps: {
              is_confirm: jobEvent.is_confirm,
            },
          };
        }
        const job = d as Job;
        if (!job.job_day || !isValidDate(job.job_day) || !job.job_time_h || !job.job_code || !job.job_title) {
          console.warn("無效的 Job 資料：", job);
          return [];
        }
        let startTime = "09:00:00";
        let endTime = "17:00:00";
        if (job.job_time_start && job.job_time_end && isValidHHMM(job.job_time_start) && isValidHHMM(job.job_time_end)) {
          startTime = job.job_time_start.length === 4
            ? `${job.job_time_start.slice(0, 2)}:${job.job_time_start.slice(2)}:00`
            : `${job.job_time_start}:00`;
          endTime = job.job_time_end.length === 4
            ? `${job.job_time_end.slice(0, 2)}:${job.job_time_end.slice(2)}:00`
            : `${job.job_time_end}:00`;
        } else if (job.job_time_h) {
          const [start, end] = job.job_time_h.split("-");
          startTime = isValidHHMM(start)
            ? start.length === 4
              ? `${start.slice(0, 2)}:${start.slice(2)}:00`
              : `${start}:00`
            : "09:00:00";
          endTime = isValidHHMM(end)
            ? end.length === 4
              ? `${end.slice(0, 2)}:${end.slice(2)}:00`
              : `${end}:00`
            : "17:00:00";
        }
        return {
          title: job.job_title || job.job_code || `${job.job_subject} at ${job.job_school_name}`,
          start: `${job.job_day.split("T")[0]}T${startTime}`,
          end: `${job.job_day.split("T")[0]}T${endTime}`,
          extendedProps: {
            is_confirm: job.is_confirm ?? false,
          },
        };
      });
      setCustomDates(formatted);
    } else {
      setCustomDates([]);
    }
  }, [events]);

  useEffect(() => {
    setEvents([...CustomDates]);
  }, [CustomDates]);

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