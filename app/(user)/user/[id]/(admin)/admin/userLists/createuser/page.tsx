"use client";

import CreateUserForm from "@/components/CreateForm/create-user-Form";
import Link from "next/link";
import { useParams } from "next/navigation";


const CreateUser = () => {
    const param = useParams();
    const userId = param.id as string;
    
    return (
        <div>
            <Link href={`/user/${userId}/admin/userLists/`}>
            上一頁
            </Link>
            CreateUser

            <CreateUserForm />
        </div>
    )
}

export default CreateUser