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
// import { CreateRemakeAction } from "@/actions/Create-Remake";
// import { Create_Remake_Schema } from "@/actions/Create-Remake/schema";


// const CreateRemakeForm = () => {
//     const param = useParams();
//     const UserId = param?.id as string;
//     const targetuserId = param?.userListsid as string ;
//     const [ isPending , startTransition ] = useTransition();
// console.log(param)
//     const [  GetUserListsById , setGetUserListsById ] = useState<any>([]);


//     useEffect(() => {
//       const getUserListsDataById = async () => {
//           const res = await fetch(`/api/User_Lists_by_ID/${UserId}`);
//           if (!res) {
//               throw new Error("斷線!");
//           }
//           const result = await res.json();
//           setGetUserListsById(result);
//       }
//       getUserListsDataById();

//   }, [UserId]);

//   console.log( "GetUserListsById : ", GetUserListsById);

//   const nickname = GetUserListsById[0]?.nickname;



//     const remake_create_form = useForm<z.infer<typeof Create_Remake_Schema>>({
//         resolver: zodResolver(Create_Remake_Schema),
//         defaultValues: {
//           targetuserId: targetuserId,
//           UserId : UserId,
//                 content: "",
//                 authorname : nickname || "",
//         }
//     })

//     useEffect(() => {
//        remake_create_form.setValue("authorname" , nickname)
//     },[GetUserListsById])
   
//     const remake_create_form_onSubmit = (values: z.infer<typeof Create_Remake_Schema>) => {
//         console.log("-- remake_input_data -- :",values,"-- End --" );
//         startTransition(() => {
//             CreateRemakeAction(values)
//         })
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
//                     <Input placeholder="content" {...field} />
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
//                     <Input placeholder={nickname}
//                     {...field}
//                     disabled={isPending}
//                     type="text"
//                     />
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


// export default CreateRemakeForm


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
import { CreateRemakeAction } from "@/actions/Create-Remake";
import { Create_Remake_Schema } from "@/actions/Create-Remake/schema";

interface UserData {
  id: string;
  nickname: string;
}

const CreateRemakeForm = () => {
  const param = useParams();
  const UserId = param?.id as string;
  const targetuserId = param?.userListsid as string;
  const [isPending, startTransition] = useTransition();
  const [GetUserListsById, setGetUserListsById] = useState<UserData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserListsDataById = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/User_Lists_by_ID/${UserId}`);
        if (!res.ok) {
          throw new Error("無法獲取用戶資料");
        }
        const result = await res.json();
        setGetUserListsById(Array.isArray(result) ? result : [result]);
        setError(null);
      } catch (error) {
        console.error("獲取用戶資料失敗:", error);
        setError("無法載入用戶資料，請稍後再試");
        setGetUserListsById([]);
      } finally {
        setIsLoading(false);
      }
    };
    getUserListsDataById();
  }, [UserId]);

  const nickname = GetUserListsById[0]?.nickname || "";

  const remake_create_form = useForm<z.infer<typeof Create_Remake_Schema>>({
    resolver: zodResolver(Create_Remake_Schema),
    defaultValues: {
      targetuserId: targetuserId,
      UserId: UserId,
      content: "",
      authorname: nickname,
    },
  });

  const { setValue } = remake_create_form;

  useEffect(() => {
    setValue("authorname", nickname);
  }, [nickname, setValue]);

  const remake_create_form_onSubmit = (values: z.infer<typeof Create_Remake_Schema>) => {
    console.log("-- remake_input_data -- :", values, "-- End --");
    startTransition(() => {
      CreateRemakeAction(values)
        .then((result) => {
          console.log("備註創建成功:", result);
          setError(null);
        })
        .catch((error) => {
          console.error("創建備註失敗:", error);
          setError("創建備註失敗，請稍後再試");
        });
    });
  };

  if (isLoading) return <div>載入中...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">創建備註表單</h2>
      <Form {...remake_create_form}>
        <form onSubmit={remake_create_form.handleSubmit(remake_create_form_onSubmit)} className="space-y-4">
          <FormField
            control={remake_create_form.control}
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
            control={remake_create_form.control}
            name="authorname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>作者名稱</FormLabel>
                <FormControl>
                  <Input placeholder={nickname || "作者名稱"} {...field} disabled={isPending} />
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

export default CreateRemakeForm;