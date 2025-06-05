"use client";

import CreateUserForm from "@/components/CreateForm/create-user-Form";
import Link from "next/link";
import { useParams } from "next/navigation";


const CreateUser = () => {
    const param = useParams();
    const userId = param.id as string;
    
    return (
        <div className="ml-[50px]">
            <Link href={`/user/${userId}/admin/userLists/`}>
            上一頁
            </Link>

            <CreateUserForm />
        </div>
    )
}

export default CreateUser