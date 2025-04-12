"use client";

import ShowCalendar from "@/components/calendar/ShowCalendar";
import { Logout_Button } from "@/components/logout_button";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const UserTeacherPage = () =>{
        const session = useSession() ;
        const userId = session.data?.user?.id as string ;
        const UserRole = session.data?.user?.role ;

        const [GetUserdata , setGetUserdata] = useState([]);

        useEffect(()=>{
                const fetchUserdata = async (Id: string) => {
                  const res = await fetch(`/api/User_Lists_by_ID/${Id}`);
                  const data = await res.json();
                  setGetUserdata(data);
                };
                fetchUserdata(userId);

        },[userId])


        const Events = GetUserdata[0]?.job ;

 

return(
        <>
        <h1> Teacher Page </h1>
        <ShowCalendar events={Events}/>        
        </>

)


}

export default UserTeacherPage