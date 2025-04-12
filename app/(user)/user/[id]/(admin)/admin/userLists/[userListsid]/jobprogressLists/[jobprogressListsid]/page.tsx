"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const  JobListById = () => {

  const param = useParams();
  const userId = param.id as string;
  console.log(userId)

  const [ GetUserListsDatabyId , setGetUserListsDatabyId ] = useState([]) ;  
  
  useEffect(()=>{
    const getUserListsDatabyId = async (id : string) => { 
      const res = await fetch(`/api/User_Lists_by_ID/${id}`) ;
      if(!res){
        throw new Error("斷線!")
      }
      const result = await res.json();
      setGetUserListsDatabyId(result);
    }

    getUserListsDatabyId(userId)
  },[userId])

  console.log(GetUserListsDatabyId)

  const JobData = GetUserListsDatabyId[0]?.job ;


  return (
    <>
    
    
    
    
    <div>JobListById</div>

    
    

  {JobData?.map((d:any)=>{
    return(
      <div key={d.id}>
        <Link href={`/user/${userId}/profiles/jobprogressLists/${d.id}`}>
          <p>{d.job_code}</p>
          <p>
          {d.job_place}
          </p>
          <p>
          {d.job_time}
          </p>
          <p>
          {d.job_price}
          </p>
          <p>
          {d.job_day}
          </p>
          <p>
          {d.job_school_name}
          </p>
          <p>
          {d.job_area}
          </p>
        
        </Link>
      </div>
    )
})}
  </>
  )
}

export default JobListById