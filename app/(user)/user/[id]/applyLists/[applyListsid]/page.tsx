"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const ApplyListsByIdUser = () => {
    const param = useParams();
    
    const UserId = param?.id as string ;
    const ApplyId = param?.applyListsid as string ;

    console.log(UserId , ApplyId)


    const [ GetApplyDatabyId , setGetApplyDatabyId ] = useState([]);

    useEffect(() => {
        const getApplyListsDatabyId = async (id: string) => {
            const res = await fetch(`/api/Apply_Lists_by_ID/${id}`);
            if (!res.ok) {
                throw new Error("斷線!");
            }
            const result = await res.json();
            setGetApplyDatabyId(result);

        }
        getApplyListsDatabyId(ApplyId)
    },[ApplyId])

    console.log(GetApplyDatabyId)

    return(
        <>
        ApplyListsByIdUser

        <div>
                {GetApplyDatabyId?.map((d:any)=>(
                    <div key={d.id}>
                       申請人 :  {d.applicant_name}
                       <br />
                       申請編號： {d.apply_code}
                       申請工作編號: {d.apply_job_code}
                       申請標題: {d.apply_title}
                       申請內容:  {d.apply_contect}
                       申請狀態: {d.apply_status ? "已審核" : "未審核"}
                        <br />

                       
                    </div>
                ))}
            </div>

        </>
    )
}

export default ApplyListsByIdUser