"use client";

import EditUserForm from "@/components/EditForm/edit-user-Form";
import Link from "next/link";

import { useParams } from "next/navigation";
const userListsbyIdedit = () => {
    const params = useParams();
    console.log(params)
    const adminId = params?.id as string ;
    const targetuserId = params?.userListsid as string ;
    return (
        <div>
            <Link href={`/user/${adminId}/admin/userLists/${targetuserId}`}>
            上一頁
            </Link>
            userListsbyIdedit
            <EditUserForm />
        </div>
    )
}

export default userListsbyIdedit