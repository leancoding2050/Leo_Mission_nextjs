// ShowCalendar_Admin.tsx
"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { useEffect, useState, useRef } from "react";
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
  teacher?: string;
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
    job_code?: string;
    teacher?: string;
    job_time_start: string;
    job_time_end: string;
  };
}

interface ShowCalendarAdminProps {
  events: Job[] | JobEvent[];
}

const ShowCalendar_Admin = ({ events }: ShowCalendarAdminProps) => {
  const [Events, setEvents] = useState<CalendarEvent[]>([]);
  const [CustomDates, setCustomDates] = useState<CalendarEvent[]>([]);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState<CalendarEvent["extendedProps"] | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
              job_time_start: jobEvent.job_time_start,
              job_time_end: jobEvent.job_time_end,
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
            job_code: job.job_code,
            teacher: job.teacher,
            job_time_start: job.job_time_start,
            job_time_end: job.job_time_end,
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

  const handleMouseEnter = (eventInfo: EventClickArg, event: React.MouseEvent<HTMLDivElement>) => {
    const props = eventInfo.event.extendedProps;
    // 驗證必要屬性
    if (
      typeof props === "object" &&
      props !== null &&
      "is_confirm" in props &&
      typeof props.is_confirm === "boolean" &&
      "job_time_start" in props &&
      typeof props.job_time_start === "string" &&
      "job_time_end" in props &&
      typeof props.job_time_end === "string"
    ) {
      setTooltipContent({
        is_confirm: props.is_confirm,
        job_code: "job_code" in props && typeof props.job_code === "string" ? props.job_code : undefined,
        teacher: "teacher" in props && typeof props.teacher === "string" ? props.teacher : undefined,
        job_time_start: props.job_time_start,
        job_time_end: props.job_time_end,
      });
    } else {
      console.warn("無效的 extendedProps：", props);
      setTooltipContent(null);
    }
    setTooltipPosition({ x: event.clientX + 10, y: event.clientY + 10 });
    setIsTooltipVisible(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsTooltipVisible(false);
      setTooltipContent(null);
    }, 5000);
  };

  const handleClick = (eventInfo: EventClickArg, event: React.MouseEvent<HTMLDivElement>) => {
    handleMouseEnter(eventInfo, event);
  };

  const renderEventContent = (eventInfo: EventClickArg) => {
    const isConfirmed = eventInfo.event.extendedProps.is_confirm;
    return (
      <div
        className="fc-event-title cursor-pointer"
        onMouseEnter={(e) => handleMouseEnter(eventInfo, e)}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => handleClick(eventInfo, e)}
      >
        {eventInfo.event.title} - {isConfirmed ? "已確定" : "未確定"}
      </div>
    );
  };

  return (
    <div className="relative">
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
      {isTooltipVisible && tooltipContent && (
        <div
          className="absolute z-50 bg-white border border-gray-300 shadow-lg p-4 rounded-md"
          style={{ top: `${tooltipPosition.y}px`, left: `${tooltipPosition.x}px` }}
        >
          <p><strong>工作編碼:</strong> {tooltipContent.job_code || "無"}</p>
          <p><strong>開始時間:</strong> {tooltipContent.job_time_start || "無"}</p>
          <p><strong>結束時間:</strong> {tooltipContent.job_time_end || "無"}</p>
          <p><strong>教師:</strong> {tooltipContent.teacher || "無"}</p>
        </div>
      )}
    </div>
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
// import { EventInput, EventClickArg } from "@fullcalendar/core";

// interface Job {
//   id: string;
//   job_code: string;
//   job_place: string;
//   job_time_h: string;
//   job_time_start: string;
//   job_time_end: string;
//   job_price: number;
//   job_day: string;
//   job_complete: boolean;
//   job_school_name: string;
//   job_area: string;
//   task_code: string;
//   is_confirm: boolean;
//   job_title: string;
//   job_subject: string;
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

// const ShowCalendar_Admin = ({ events }: ShowCalendarAdminProps) => {
//   const [Events, setEvents] = useState<CalendarEvent[]>([]);
//   const [CustomDates, setCustomDates] = useState<CalendarEvent[]>([]);

//   const isValidHHMM = (time: string): boolean => {
//     if (!time || typeof time !== "string") return false;
//     if (time.length === 4 && /^\d{4}$/.test(time)) {
//       const hours = parseInt(time.slice(0, 2), 10);
//       const minutes = parseInt(time.slice(2, 4), 10);
//       return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
//     }
//     if (/^\d{2}:\d{2}$/.test(time)) {
//       const [hours, minutes] = time.split(":").map(Number);
//       return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
//     }
//     return false;
//   };

//   const isValidDate = (date: string): boolean => {
//     return /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}.*Z)?$/.test(date) && !isNaN(new Date(date).getTime());
//   };

//   useEffect(() => {
//     if (events && Array.isArray(events)) {
//       const formatted = events.flatMap((d: Job | JobEvent) => {
//         if ("job_time_start" in d && "job_time_end" in d && "job_title" in d) {
//           const jobEvent = d as JobEvent;
//           if (!jobEvent.job_day || !isValidDate(jobEvent.job_day) || !jobEvent.job_time_start || !jobEvent.job_time_end || !jobEvent.job_title) {
//             console.warn("無效的 JobEvent 資料：", jobEvent);
//             return [];
//           }
//           const newDate = jobEvent.job_day.split("T")[0];
//           const startTime = isValidHHMM(jobEvent.job_time_start)
//             ? jobEvent.job_time_start.length === 4
//               ? `${jobEvent.job_time_start.slice(0, 2)}:${jobEvent.job_time_start.slice(2)}:00`
//               : `${jobEvent.job_time_start}:00`
//             : "09:00:00";
//           const endTime = isValidHHMM(jobEvent.job_time_end)
//             ? jobEvent.job_time_end.length === 4
//               ? `${jobEvent.job_time_end.slice(0, 2)}:${jobEvent.job_time_end.slice(2)}:00`
//               : `${jobEvent.job_time_end}:00`
//             : "17:00:00";
//           return {
//             title: jobEvent.job_title,
//             start: `${newDate}T${startTime}`,
//             end: `${newDate}T${endTime}`,
//             extendedProps: {
//               is_confirm: jobEvent.is_confirm,
//             },
//           };
//         }
//         const job = d as Job;
//         if (!job.job_day || !isValidDate(job.job_day) || !job.job_time_h || !job.job_code || !job.job_title) {
//           console.warn("無效的 Job 資料：", job);
//           return [];
//         }
//         let startTime = "09:00:00";
//         let endTime = "17:00:00";
//         if (job.job_time_start && job.job_time_end && isValidHHMM(job.job_time_start) && isValidHHMM(job.job_time_end)) {
//           startTime = job.job_time_start.length === 4
//             ? `${job.job_time_start.slice(0, 2)}:${job.job_time_start.slice(2)}:00`
//             : `${job.job_time_start}:00`;
//           endTime = job.job_time_end.length === 4
//             ? `${job.job_time_end.slice(0, 2)}:${job.job_time_end.slice(2)}:00`
//             : `${job.job_time_end}:00`;
//         } else if (job.job_time_h) {
//           const [start, end] = job.job_time_h.split("-");
//           startTime = isValidHHMM(start)
//             ? start.length === 4
//               ? `${start.slice(0, 2)}:${start.slice(2)}:00`
//               : `${start}:00`
//             : "09:00:00";
//           endTime = isValidHHMM(end)
//             ? end.length === 4
//               ? `${end.slice(0, 2)}:${end.slice(2)}:00`
//               : `${end}:00`
//             : "17:00:00";
//         }
//         return {
//           title: job.job_title || job.job_code || `${job.job_subject} at ${job.job_school_name}`,
//           start: `${job.job_day.split("T")[0]}T${startTime}`,
//           end: `${job.job_day.split("T")[0]}T${endTime}`,
//           extendedProps: {
//             is_confirm: job.is_confirm ?? false,
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

//     console.log("renderEventContent:", eventInfo.event);

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