"use client";

import CreateTaskForm from "@/components/CreateForm/create-task-Form";
import Link from "next/link";

import { useParams } from "next/navigation";

const CreateTaskLists = () => {
    const param = useParams();
    console.log(param)
    const userId = param.id as string;
    return(
        <>
            <Link href={`/user/${userId}/admin/taskLists/`} >
            返回
            </Link>

            <CreateTaskForm />
        </>
    )
}

export default CreateTaskLists