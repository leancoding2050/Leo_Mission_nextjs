"use client";

import Edit_SalaryRemake_Form from "@/components/EditForm/edit-SalaryRemake-Form";
import Link from "next/link";
import { useParams } from "next/navigation";


const EditSalaryRemakePage = () => {
  const params = useParams();
  const username = params.username;

  return (
    <div>
      <h1>editSalaryRemakePage</h1>
      <Link href={`/LeoSalaryPath/${username}`}>
        返回
      </Link>
<Edit_SalaryRemake_Form/>
    </div>
  );
};

export default EditSalaryRemakePage;