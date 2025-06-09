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
// import { Edit_Remake_Schema } from "@/actions/Edit-Remake/schema";
// // import { EditSalaryAction } from "@/actions/Edit-Remake";


// const EditRemakeForm = () => {
//     const param = useParams();
//     const UserId = param?.id as string;
//     const targetremakeId = "";
//     const [ isPending , startTransition ] = useTransition();
//     const [ GetRemakeData , setGetRemakeData ] = useState([]);

//     useEffect(() => {
//         const fetchRemakeData = async (id: string) => {
//             try {
//                 const response = await fetch(`/api/Remake_by_User/${id}`);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch data');
//                 }
//                 const data = await response.json();
//                 setGetRemakeData(data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         }
//         fetchRemakeData(targetremakeId)
//     }, [targetremakeId])

//     const remake_create_form = useForm<z.infer<typeof Edit_Remake_Schema>>({
//         resolver: zodResolver(Edit_Remake_Schema),
//         defaultValues: {
//                 content: "",
//                 authorname : "",
//         }
//     })

//     const remake_create_form_onSubmit = (values: z.infer<typeof Edit_Remake_Schema>) => {
//         console.log("-- remake_input_data -- :",values,"-- End --" );
//         // startTransition(() => {
//         //     CreateRemakeAction(values)
//         // })
//     };


//   return (
//     <>
//     <div>
//         <Form {...remake_create_form}>
//             <form onSubmit={remake_create_form.handleSubmit(remake_create_form_onSubmit)}>
//                 <FormField
//                     control={remake_create_form.control}
//                     name="content"
//                     render={({ field })=> (
//                         <FormItem>
//                   <FormLabel>content</FormLabel>
//                   <FormControl>
//                     <Input placeholder="content" {...field} disabled={isPending} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//                     )}
//                 />

// <FormField
//                     control={remake_create_form.control}
//                     name="authorname"
//                     render={({ field })=> (
//                         <FormItem>
//                   <FormLabel>authorname</FormLabel>
//                   <FormControl>
//                     <Input placeholder="authorname" {...field} disabled={isPending} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//                     )}
//                 />

//             <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                 Submit
//               </Button>

//             </form>
//         </Form>
//     </div>
//     </>
//   )

// }


// export default EditRemakeForm


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
import { Edit_Remake_Schema } from "@/actions/Edit-Remake/schema";
import { EditSalaryAction } from "@/actions/Edit-Remake";


interface RemakeData {
  id: string;
  content: string;
  authorname: string | null;
  Username_id: string | null;
  createAt: string;
}

const EditRemakeForm = () => {
  const param = useParams();
  const targetremakeId = param?.targetid as string;
  const [isPending, startTransition] = useTransition();
  const [GetRemakeData, setGetRemakeData] = useState<RemakeData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRemakeData = async (id: string) => {
      if (!id) {
        setError("無效的備註 ID");
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(`/api/Remake_by_User/${id}`);
        if (!response.ok) {
          throw new Error("無法獲取備註資料");
        }
        const data = await response.json();
        setGetRemakeData(Array.isArray(data) ? data : [data]);
        setError(null);
      } catch (error) {
        console.error("獲取備註資料失敗:", error);
        setError("無法載入備註資料，請稍後再試");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRemakeData(targetremakeId);
  }, [targetremakeId]);

  const edit_remake_form = useForm<z.infer<typeof Edit_Remake_Schema>>({
    resolver: zodResolver(Edit_Remake_Schema),
    defaultValues: {
      targetremakeId: targetremakeId,
      content: "",
      authorname: "",
    },
  });

  const { setValue } = edit_remake_form;

  useEffect(() => {
    const remake = GetRemakeData[0];
    if (remake) {
      setValue("content", remake.content);
      setValue("authorname", remake.authorname || "");
    }
  }, [GetRemakeData, setValue]);

  const edit_remake_form_onSubmit = (values: z.infer<typeof Edit_Remake_Schema>) => {
    console.log("-- remake_input_data -- :", values, "-- End --");
    startTransition(() => {
      EditSalaryAction(values).then((result) => {
        if (result.error) {
          setError(result.error);
        } else {
          console.log("備註更新成功:", result.data);
          setError(null);
        }
      });
    });
  };

  if (isLoading) return <div>載入中...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">編輯備註表單</h2>
      <Form {...edit_remake_form}>
        <form onSubmit={edit_remake_form.handleSubmit(edit_remake_form_onSubmit)} className="space-y-4">
          <FormField
            control={edit_remake_form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>內容</FormLabel>
                <FormControl>
                  <Input placeholder="請輸入備註內容" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={edit_remake_form.control}
            name="authorname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>作者名稱</FormLabel>
                <FormControl>
                  <Input placeholder="請輸入作者名稱" {...field} disabled={isPending} />
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
            {isPending ? "提交中..." : "提交"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditRemakeForm;