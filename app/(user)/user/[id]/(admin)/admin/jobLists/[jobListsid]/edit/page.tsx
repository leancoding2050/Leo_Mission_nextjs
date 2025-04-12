"use client";

import EditJobForm from "@/components/EditForm/edit-job-Form";
import Link from "next/link";
import { useParams } from "next/navigation";

const edit_job_page = () => {
        const params = useParams();
        const userId = params.id as string;
        const JobId = params.jobListsid as string ;
        console.log(params);
    return(
        <>
<Link href={`/user/${userId}/admin/jobLists/${JobId}`} >返回</Link>
        <EditJobForm/>
        </>
    )
}

export default edit_job_page