"use client";

import Create_SalaryRemake_Form from "@/components/CreateForm/create-SalaryRemake-Form";
import Link from "next/link";
import { useParams } from "next/navigation";


const CreateSalaryRemakePage = () => {
  const params = useParams();
  const username = params.username;

  return (
    <div>
      <h1>createSalaryRemakePage</h1>
      <Link href={`/LeomonthlyrecordsPath/${username}`}>
        返回
      </Link>
            <Create_SalaryRemake_Form/>
    </div>
  );
};

export default CreateSalaryRemakePage;