"use client";
import ShowCalendar from "@/components/calendar/ShowCalendar";
import ShowCalendar_Admin from "@/components/calendar/ShowCalendar_Admin";
import WhatsappTwilio from "@/components/whatsapp_twilio/whatspp_twilio";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";


const AdminPage = () => {
    const session = useSession() ;
    const userId = session.data?.user?.id as string ;

    const [ GetUserdata , setGetUserdata ] = useState([])  ;

    useEffect(() => {
        const fetchUserdata = async (Id: string) => {
            const res = await fetch(`/api/User_Lists_by_ID/${Id}`);
            const data = await res.json();
            setGetUserdata(data);
        };
        fetchUserdata(userId);
    }, [userId])
    
    console.log("Session : ", session.data?.user , "-- End --") 
    console.log("UserId : ", userId,"-- End --")

    const Events = GetUserdata[0]?.job ;

    console.log("Events : ", Events , "-- End --")

    return(
        <>
        <Link href={`/user/${userId}/admin/userLists`}> UserLists </Link>
        <br />
        <Link href={`/user/${userId}/admin/taskLists`}> TaskLists </Link>
        <br />
        <Link href={`/user/${userId}/admin/jobLists`}> JobLists </Link>
        <br />
        <Link href={`/user/${userId}/admin/applyLists`}> ApplyLists </Link>
        <br />
        <Link href={`/user/${userId}/admin/colorLists`}> ColorLists </Link>
        <br />
        <Link href={`/user/${userId}/admin/AllJobLists`}> AllJobLists </Link>
        <br />
        <Link href={`/user/${userId}/admin/sendwhatsappLists`}> SendWhatsAppLists </Link>
        <br />
        <br />
            AdminPage


            <ShowCalendar_Admin events={Events}/>   





        </>
    )
}

export default AdminPage