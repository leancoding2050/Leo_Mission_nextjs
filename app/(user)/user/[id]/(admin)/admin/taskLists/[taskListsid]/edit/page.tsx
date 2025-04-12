"use client";

import EditTaskForm from "@/components/EditForm/edit-task-Form";
import Link from "next/link";
import { useParams } from "next/navigation";

const edittaskpage = () => {
        const param = useParams();
        
        const UserId = param?.id as string;
        const TaskId = param?.taskListsid as string;
        
         return (<>
        <Link href={`/user/${UserId}/admin/taskLists/${TaskId}`} >
            返回
            </Link>
         <EditTaskForm />
         </>)


         
        
            
        
    
}
export default edittaskpage