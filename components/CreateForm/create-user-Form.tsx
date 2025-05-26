"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
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
import { Create_User_Schema } from "@/actions/Create-User/schema";
import { SWR_Subject } from "../fatchdata/swr_subject";
import { SWR_Areas_Select } from "../fatchdata/swr_areas";
import { SWR_Place_Select } from "../fatchdata/swr_place";
import DatePicker from "react-multi-date-picker";
import { createUser } from "@/actions/Create-User";

const CreateUserForm = () => {
  const [isPending, startTransition] = useTransition(); // 用於控制表單提交時的等待狀態
  const [previewImage, setPreviewImage] = useState<string | null>(null); // 圖片預覽的 base64 字串

  const user_create_form = useForm<z.infer<typeof Create_User_Schema>>({
    resolver: zodResolver(Create_User_Schema),
    defaultValues: {
      email: "",
      username: "",
      nickname: "",
      password: "",
      role: "TEACHER",
      image: undefined, // 預期是 base64 字串或 undefined
      area: [],
      place: [],
      subject: [],
      phone: "",
      SCRC: "",
      isLogin: true,
      isstaff: false,
      isadmin: false,
    },
  });

  // 處理檔案上傳並生成 base64 字串
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        user_create_form.setValue("image", base64String); // 將 base64 字串設到表單
        setPreviewImage(base64String); // 將 base64 字串用於預覽
      };

      reader.readAsDataURL(file);
    }
  };

  // 提交表單的處理函數
  const user_create_form_onSubmit = (values: z.infer<typeof Create_User_Schema>) => {
    console.log("-- 用戶輸入資料 -- :", values, "-- 結束 --");
    startTransition(() => {
      createUser(values);
    });
  };

  return (
    <div>
      CreateUserForm
      <Form {...user_create_form}>
        <form onSubmit={user_create_form.handleSubmit(user_create_form_onSubmit)} className="space-y-6">
          {/* 用戶名稱 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={user_create_form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>用戶名稱</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="輸入名稱"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 暱稱 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={user_create_form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>暱稱</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="輸入暱稱"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 電郵 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={user_create_form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>電郵</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="輸入電郵"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 密碼 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={user_create_form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>密碼</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="輸入密碼"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 圖片上傳 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={user_create_form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>圖片</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="file"
                      accept="image/*" // 限制只接受圖片檔案
                      onChange={handleFileChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 圖片預覽 */}
          {previewImage && (
            <div className="mt-4">
              <img
                src={previewImage}
                alt="預覽圖片"
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          )}

          {/* 地區 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={user_create_form.control}
              name="area"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>地區</FormLabel>
                  <FormControl>
                    <SWR_Areas_Select field={field} fieldState={fieldState} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 地方 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={user_create_form.control}
              name="place"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>地方</FormLabel>
                  <FormControl>
                    <SWR_Place_Select field={field} fieldState={fieldState} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 科目 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={user_create_form.control}
              name="subject"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>科目</FormLabel>
                  <FormControl>
                    <SWR_Subject field={field} fieldState={fieldState} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 電話 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={user_create_form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>電話</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="輸入電話"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* SCRC 日期選擇 */}
          <div className="grid grid-cols-2 gap-4">
                                <FormField
                    control={user_create_form.control}
                    name="SCRC"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> SCRC </FormLabel>
                            <FormControl>
                                <DatePicker
                                    // 使用 `value` 而非 `selected`，並轉換為字符串格式
                                    value={field.value ? new Date(field.value) : null}
                                    onChange={(date) => {
                                        if (date) {
                                            // 將日期轉換為 ISO 字符串並更新表單
                                            const dateObj = new Date(date.toString());
                                            field.onChange(dateObj.toISOString());
                                        }
                                    }}
                                    format="YYYY-MM-DD"  // 修正拼寫錯誤：`dateFormmat` → `format`
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
          </div>

          {/* 提交按鈕 */}
          <Button type="submit" disabled={isPending}>
            提交
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateUserForm;


// "use client";

// import * as z from "zod";
// import { useState, useTransition } from "react";
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
// import { Create_User_Schema } from "@/actions/Create-User/schema";
// import { SWR_Subject } from "../fatchdata/swr_subject";
// import { SWR_Areas } from "../fatchdata/swr_areas";
// import { SWR_Place } from "../fatchdata/swr_place";
// import DatePicker from "react-multi-date-picker";
// import { createUser } from "@/actions/Create-User";


// const CreateUserForm = () => {

//     const [ isPending, startTransition ] = useTransition();
//     const [ previewImage , setpreviewImage ] = useState<string | null>(null);

//     const user_create_form = useForm<z.infer<typeof Create_User_Schema>>({
//         resolver: zodResolver(Create_User_Schema),
//         defaultValues:{
//             email:"",
//             username: "",
//             nickname: "",
//             password : "",
//             role: "TEACHER",
//             image: undefined,
//             area:[],
//             place:[],
//             subject:[],
//             phone:"",
//             SCRC:"",
//             isLogin:true,
//             isstaff:false,
//             isadmin:false,
//         }
//     })

//       const handleFileChange = (field: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files.length > 0) {
//             field.onChange(e.target.files[0]);
//             const file = e.target.files[0];

//             const reader = new FileReader();

//             reader.onloadend = () => {
//                 const base64String = reader.result as string;
//                 user_create_form.setValue('image', base64String)
//                 setpreviewImage(base64String);
//             }

//             reader.readAsDataURL(file);

            

//             // main_admin_create_form.setValue('image', e.target.files); // 更新表單值

//             setpreviewImage(URL.createObjectURL(file)); // 生成圖片預覽 URL
//         }
//     };


//     const user_create_form_onSubmit = (values:z.infer<typeof Create_User_Schema>) => {
//         console.log("-- user_input_data -- :",values,"-- End --" );

//         startTransition(() => {
//             createUser(values)
//         })
//     }

//     return(
//         <div>
//             CreateUserForm
//             <Form {...user_create_form}>
//                 <form onSubmit={user_create_form.handleSubmit(user_create_form_onSubmit)}>
                    
//                     <div className="grid grid-cols-2 gap-4">
//                         <FormField 
//                             control={user_create_form.control}
//                             name="username"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel> 用戶名稱 </FormLabel>
//                                     <FormControl>
//                                         <Input 
//                                             {...field}
//                                             disabled={isPending}
//                                             placeholder="輸入名稱"
//                                             type="text"
//                                         />
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <FormField 
//                             control={user_create_form.control}
//                             name="nickname"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel> 暱稱 </FormLabel>
//                                     <FormControl>
//                                         <Input 
//                                             {...field}
//                                             disabled={isPending}
//                                             placeholder="輸入暱稱"
//                                             type="text"
//                                         />
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <FormField 
//                             control={user_create_form.control}
//                             name="email"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel> 電郵 </FormLabel>
//                                     <FormControl>
//                                         <Input 
//                                             {...field}
//                                             disabled={isPending}
//                                             placeholder="輸入電郵"
//                                             type="text"
//                                         />
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                     <FormField
//                         control={user_create_form.control}
//                         name="password"
//                         render={({ field }) => (
//                     <FormItem>
//                         <FormLabel> 密碼 </FormLabel>
//                         <FormControl>
//                             <Input 
//                                 {...field}
//                                 disabled={isPending}
//                                 placeholder="輸入密碼"
//                                 type="text"
//                                 />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                         )}
//                     />
//                 </div>


//                 <div className="grid grid-cols-2 gap-4">
//                     <FormField
//                         control={user_create_form.control}
//                         name="image"
//                         render={({ field }) => (
//                     <FormItem>
//                         <FormLabel> 圖片 </FormLabel>
//                         <FormControl>
//                         <Input 
                        
//                         disabled={isPending}
//                         placeholder="上傳圖片"
//                         type="file"
//                         onChange={handleFileChange(field)}
//                     />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                         )}
//                     />
//                 </div>
//                 {previewImage && (
//         <div className="mt-4">
//           <img src={previewImage} alt="預覽圖片" className="w-32 h-32 object-cover rounded" />
//         </div>
//       )}

//                 <div className="grid grid-cols-2 gap-4">
//                     <FormField
//                         control={user_create_form.control}
//                         name="area"
//                         render={({ field, fieldState }) => (

//                     <FormItem>
//                         <FormLabel> 地區 </FormLabel>
//                         <FormControl>
//                             <SWR_Areas field={field}  fieldState={fieldState}/>
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                         )}
//                     />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                     <FormField
//                         control={user_create_form.control}
//                         name="place"
//                         render={({ field, fieldState}) => (
//                     <FormItem>
//                         <FormLabel> 地方 </FormLabel>
//                         <FormControl>
//                             <SWR_Place  field={field} fieldState={fieldState}/>
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                         )}
//                     />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                     <FormField
//                         control={user_create_form.control}
//                         name="subject"
//                         render={({ field, fieldState }) => (
//                     <FormItem>
//                         <FormLabel> 科目 </FormLabel>
//                         <FormControl>
//                             <SWR_Subject field={field} fieldState={fieldState}/>
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                         )}
//                     />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                     <FormField
//                         control={user_create_form.control}
//                         name="phone"
//                         render={({ field }) => (
//                     <FormItem>
//                         <FormLabel> 電話 </FormLabel>
//                         <FormControl>
//                             <Input 
//                                 {...field}
//                                 disabled={isPending}
//                                 placeholder="輸入電話"
//                                 type="text"
//                                 />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                         )}
//                     />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                     <FormField
//                         control={user_create_form.control}
//                         name="SCRC"
//                         render={({ field }) => (
//                     <FormItem>
//                         <FormLabel> SCRC </FormLabel>
//                         <FormControl>
//                             <DatePicker
//                                 {...field}
//                                 selected={field.value ? new Date(field.value) : null}
//                                 onChange={(date) => {
//                                     const formattedDate = date instanceof Date ? date.toISOString() : new Date(date).toISOString();
//                                     field.onChange(formattedDate)
                                
//                                 }}
//                                 dateFormmat="yyyy-MM-dd"
//                             />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                         )}
//                     />
//                 </div>


//                 <Button> 提交 </Button>

//                 </form>
//             </Form>


//         </div>
//     )
// }

// export default CreateUserForm