"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect , useState } from "react";

const jobDetail = () => {
    const params = useParams();
    const userId = params.id as string;
    const JobId = params.jobListsid as string ;
    console.log(params);
    const [ GetJobById , setGetJobById ] = useState([]);

    useEffect(() => {
        const fetchgetjobbyid = async (id: string) => {
            const res = await fetch(`/api/Job_Lists_by_ID/${id}`) ;
            const data = await res.json() ;
            setGetJobById(data) ;
        }
        fetchgetjobbyid(JobId);
    }, [JobId])
    // console.log(" GetJobById : ",GetJobById,"-- End --")

    return(
        <div>
            
            <Link href={`/user/${userId}/admin/jobLists`} > 上一頁 </Link>
                <br />
                <Link href={`/user/${userId}/admin/jobLists/${JobId}/edit`} >更改</Link>
            <div>
                


                { GetJobById.map((d:any) => {
                    return(
                        <div key={d.id}>
                            {d.job_code},
                            {d.job_school_name},
                            {d.job_area},
                            {d.job_time},
                            {d.job_subject},
                            {d.job_place},
                            {d.job_price},
                            {d.job_day.split('T')[0]},
                            {d.showprice ? "顯示價格" : "隱藏價格"}

                        </div>
                    )
                }) }
            </div>


        </div>
    )
}

export default jobDetail