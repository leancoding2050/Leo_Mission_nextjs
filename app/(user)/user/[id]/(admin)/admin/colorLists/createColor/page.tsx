"use client";

import CreateColorForm from "@/components/CreateForm/create-color-Form";
import Link from "next/link";
import { useParams } from "next/navigation";


const CreateColorPage = () => {

const params = useParams();
console.log(params)

const UserId = params.id as string;

  return (
    <div>
<Link href={`/user/${UserId}/admin/colorLists`} className="text-blue-500 hover:underline">
返回顏色列表
</Link>


      <CreateColorForm/>
    </div>
  );
};

export default CreateColorPage;