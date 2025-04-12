"use client";

import CreateJobForm from "@/components/CreateForm/create-job-Form";
import Link from "next/link";
import { useParams } from "next/navigation";

const CreateJobPage = () => {
  const param = useParams();
  console.log(param)
  const userId = param.id as string;

  return (
    <>
    <Link href={`/user/${userId}/admin/jobLists/`}>
      返回
    </Link>
      <CreateJobForm />
      
    </>
  )
}

export default CreateJobPage