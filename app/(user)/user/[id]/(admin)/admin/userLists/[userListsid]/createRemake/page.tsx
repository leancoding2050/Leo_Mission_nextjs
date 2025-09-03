"use client";

import CreateRemakeForm from "@/components/CreateForm/create-remake-Form";
import Link from "next/link";

import { useParams } from "next/navigation";

const CreateRemake = () => {
    const params = useParams();
    console.log(params)
    const adminId = params?.id as string ;
    const targetuserId = params?.userListsid as string ;
    return(
        <div>
            <Link href={`/user/${adminId}/admin/userLists/${targetuserId}`}>
            上一頁
            </Link>
           

            <CreateRemakeForm/>
        </div>
    )
}

export default CreateRemake;