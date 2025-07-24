// "use client";
// import * as z from "zod";
// import { useEffect, useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Input } from "@/components/ui/input";

// import { Button } from "@/components/ui/button";

// import { 
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage 
// } from "@/components/ui/form";
// import { useParams } from "next/navigation";

// import { Edit_SalaryRemake_Schema } from "@/actions/Edit-SalaryRemake/schema";
// import { Edit_SalaryRemake_Action } from "@/actions/Edit-SalaryRemake";
// const Edit_SalaryRemake_Form = () => {

//   const param = useParams();
//   const username = param.username as string;
//   const SalaryJobid = param.id as string;
//   const SalaryRemakeid = param.targetid as string;
// //   console.log(param)
//   const [ isPending , startTransition ] = useTransition();


//     const [GetSalaryRemakeData , setGetSalaryRemakeData] = useState<any>([]);
//     const [ RemakeValue , setRemakeValue ] = useState("");

//     useEffect(() => {
//         if(SalaryRemakeid && username){
//             const fetchSalaryRemakeData = async (username: string , SalaryRemakeid: string) => {
//                 const res = await fetch(`/api/Salary_Lists_by_username_salaryremake/${username}/${SalaryRemakeid}`);
//                 const data = await res.json();
//                 setGetSalaryRemakeData(data);
//             };
//             fetchSalaryRemakeData(username , SalaryRemakeid)
//         }
//     }, [SalaryRemakeid , username]);

//     console.log("GetSalaryRemakeData : ",GetSalaryRemakeData)
//     useEffect(()=>{
//         edit_SalaryRemake_Form.setValue("remake", GetSalaryRemakeData[0]?.remake)
//         let remake = GetSalaryRemakeData[0]?.remake ;
//         setRemakeValue(remake)


//     },[GetSalaryRemakeData])



//       const edit_SalaryRemake_Form = useForm<z.infer<typeof Edit_SalaryRemake_Schema>>({
//         resolver: zodResolver(Edit_SalaryRemake_Schema),
//         defaultValues: {
//         targetId:SalaryRemakeid,
//           username: username,
//           remake: "",
//           SalaryRemakeId : SalaryJobid
//         }
//     })


//       const SalaryRemake_edit_form_onSubmit = (values:z.infer<typeof Edit_SalaryRemake_Schema>) => {
//         console.log("-- edit_SalaryRemake -- :",values,"-- End --" );
//         startTransition(() => {
//             Edit_SalaryRemake_Action(values)
//         })
    
//       }

//     return(
//         <div>
//             Edit_SalaryRemake_Form
//             <Form {...edit_SalaryRemake_Form}>
//                 <form onSubmit={edit_SalaryRemake_Form.handleSubmit(SalaryRemake_edit_form_onSubmit)}>
//                 <div className="mb-4">
//             <FormField
//               control={edit_SalaryRemake_Form.control}
//               name="remake"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>remake</FormLabel>
//                   <FormControl>
//                     <Input placeholder={RemakeValue} {...field} disabled={isPending} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>
               

//             <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                Edit
//               </Button>



//                 </form>
//             </Form>

//         </div>
//     )
// }

// export default Edit_SalaryRemake_Form

"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useParams } from "next/navigation";
import { Edit_SalaryRemake_Schema } from "@/actions/Edit-SalaryRemake/schema";
import { Edit_SalaryRemake_Action } from "@/actions/Edit-SalaryRemake";

interface SalaryRemakeData {
  id: string;
  remake: string;
  SalaryRemakeId: string;
}

const EditSalaryRemakeForm = () => {
  const param = useParams();
  const username = param.username as string;
  const SalaryJobid = param.id as string;
  const SalaryRemakeid = param.targetid as string;
  const [isPending, startTransition] = useTransition();
  const [GetSalaryRemakeData, setGetSalaryRemakeData] = useState<SalaryRemakeData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (SalaryRemakeid && username) {
      const fetchSalaryRemakeData = async (username: string, SalaryRemakeid: string) => {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/Salary_Lists_by_username_salaryremake/${username}/${SalaryRemakeid}`);
          if (!res.ok) throw new Error("無法獲取薪資備註資料");
          const data = await res.json();
          setGetSalaryRemakeData(Array.isArray(data) ? data : [data]);
          setError(null);
        } catch (error) {
          console.error("獲取薪資備註資料失敗:", error);
          setError("無法載入薪資備註資料，請稍後再試");
        } finally {
          setIsLoading(false);
        }
      };
      fetchSalaryRemakeData(username, SalaryRemakeid);
    }
  }, [SalaryRemakeid, username]);

  const edit_SalaryRemake_Form = useForm<z.infer<typeof Edit_SalaryRemake_Schema>>({
    resolver: zodResolver(Edit_SalaryRemake_Schema),
    defaultValues: {
      targetId: SalaryRemakeid,
      username: username,
      remake: "",
      SalaryRemakeId: SalaryJobid,
    },
  });

  const { setValue } = edit_SalaryRemake_Form;

  useEffect(() => {
    const remake = GetSalaryRemakeData[0]?.remake || "";
    setValue("remake", remake);
  }, [GetSalaryRemakeData, setValue]);

  const SalaryRemake_edit_form_onSubmit = (values: z.infer<typeof Edit_SalaryRemake_Schema>) => {
    console.log("-- edit_SalaryRemake -- :", values, "-- End --");
    startTransition(() => {
      Edit_SalaryRemake_Action(values)
        .then((result) => {
          console.log("薪資備註更新成功:", result);
          setError(null);
        })
        .catch((error) => {
          console.error("更新薪資備註失敗:", error);
          setError("更新薪資備註失敗，請稍後再試");
        });
    });
  };

  if (isLoading) return <div>載入中...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">編輯薪資備註表單</h2>
      <Form {...edit_SalaryRemake_Form}>
        <form onSubmit={edit_SalaryRemake_Form.handleSubmit(SalaryRemake_edit_form_onSubmit)} className="space-y-4">
          <FormField
            control={edit_SalaryRemake_Form.control}
            name="remake"
            render={({ field }) => (
              <FormItem>
                <FormLabel>備註</FormLabel>
                <FormControl>
                  <Input placeholder="請輸入備註內容" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isPending}
          >
            {isPending ? "提交中..." : "編輯"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditSalaryRemakeForm;