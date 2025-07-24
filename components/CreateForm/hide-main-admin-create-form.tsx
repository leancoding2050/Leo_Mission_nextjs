// "use client"

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


// const Hide_Main_Admin_Create_Form = () => {
    
//     // ali-oss
//     // const [file, setFile] = useState(null);
//     // const [url, setUrl] = useState('');

//     const [ isPending, startTransition ] = useTransition();
//     const [ previewImage , setpreviewImage ] = useState<string | null>(null);

//     const main_admin_create_form = useForm<z.infer<typeof Create_User_Schema>>({
//         resolver: zodResolver(Create_User_Schema),
//         defaultValues:{
//             email:"",
//             username: "",
//             nickname: "",
//             password : "",
//             role: "ADMIN",
//             image:undefined,
//             area:[],
//             place:[],
//             subject:[],
//             phone:"",
//             SCRC:"",
//             isLogin:true,
//             isstaff:true,
//             isadmin:true,
//         }
//     })

//     //ali-oss

//     // const handleFileChange_oss = (e : any ) => {
//     //     setFile(e.target.files[0]);
//     //   };
    
//     //   const handleSubmit_oss = async (e : any) => {
//     //     e.preventDefault();
//     //     if (!file) return;
    
//     //     const formData = new FormData();
//     //     formData.append('file', file);
    
//     //     const res = await fetch('/api/OSS_upload', {
//     //       method: 'POST',
//     //       body: formData,
//     //     });
//     //     const data = await res.json();
    
//     //     if (res.ok) {
//     //       setUrl(data.url);
//     //       alert('上傳成功！');
//     //     } else {
//     //       alert('上傳失敗！');
//     //     }
//     //   };
//     const handleFileChange = (field: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files.length > 0) {
//             field.onChange(e.target.files[0]);
//             const file = e.target.files[0];

//             const reader = new FileReader();

//             reader.onloadend = () => {
//                 const base64String = reader.result as string;
//                 main_admin_create_form.setValue('image', base64String)
//                 setpreviewImage(base64String);
//             }

//             reader.readAsDataURL(file);

            

//             // main_admin_create_form.setValue('image', e.target.files); // 更新表單值

//             setpreviewImage(URL.createObjectURL(file)); // 生成圖片預覽 URL
//         }
//     };

//     const main_admin_create_form_onSubmit = (values:z.infer<typeof Create_User_Schema>) => {
//         console.log("-- admin_input_data -- :",values,"-- End --" );

//         startTransition(() => {
//             createUser(values)
//         })
//     }


//     return(
//         <>
//         Hide_Main_Admin_Create_Form
//             <Form {...main_admin_create_form} >
//                 <form onSubmit={main_admin_create_form.handleSubmit(main_admin_create_form_onSubmit)} className="space-y-6">
                
//                 <div className="space-y-4">
//                     <FormField
//                         control={main_admin_create_form.control}
//                         name="username"
//                         render={({ field }) => (
//                     <FormItem>
//                         <FormLabel> 用戶名稱 </FormLabel>
//                         <FormControl>
//                         <Input 
//                                 {...field}
//                                 disabled={isPending}
//                                 placeholder="輸入名稱"
//                                 type="text"
//                                 />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                         )}
//                     />
//                 </div>

//                 <div className="space-y-4">
//                     <FormField
//                         control={main_admin_create_form.control}
//                         name="nickname"
//                         render={({ field }) => (
//                     <FormItem>
//                         <FormLabel> 暱稱 </FormLabel>
//                         <FormControl>
//                             <Input 
//                                 {...field}
//                                 disabled={isPending}
//                                 placeholder="輸入暱稱"
//                                 type="text"
//                                 />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                         )}
//                     />
//                 </div>

//                 <div className="space-y-4">
//                     <FormField
//                         control={main_admin_create_form.control}
//                         name="email"
//                         render={({ field }) => (
//                     <FormItem>
//                         <FormLabel> 電郵 </FormLabel>
//                         <FormControl>
//                             <Input 
//                                 {...field}
//                                 disabled={isPending}
//                                 placeholder="輸入電郵"
//                                 type="text"
//                                 />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                         )}
//                     />
//                 </div>
//                 <div className="space-y-4">
//                     <FormField
//                         control={main_admin_create_form.control}
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
//                         control={main_admin_create_form.control}
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

                
//                 <div className="space-y-4">
//                     <FormField
//                         control={main_admin_create_form.control}
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

//                 <div className="space-y-4">
//                     <FormField
//                         control={main_admin_create_form.control}
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
                
//                 <div className="space-y-4">
//                     <FormField
//                         control={main_admin_create_form.control}
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

//                 <div className="space-y-4">
//                     <FormField
//                         control={main_admin_create_form.control}
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


//                 <div className="space-y-4">
//                     <FormField
//                         control={main_admin_create_form.control}
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

//                         <Button> 提交 </Button>
                
//                 </form>
//             </Form>
//         </>
//     )
// }

// export default Hide_Main_Admin_Create_Form

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
// import { SWR_Areas_Select } from "../fatchdata/swr_areas";
// import { SWR_Place_Select } from "../fatchdata/swr_place";
// import DatePicker from "react-multi-date-picker";
// import { createUser } from "@/actions/Create-User";

// const Hide_Main_Admin_Create_Form = () => {
//     const [isPending, startTransition] = useTransition();
//     const [previewImage, setPreviewImage] = useState<string | null>(null);

//     const main_admin_create_form = useForm<z.infer<typeof Create_User_Schema>>({
//         resolver: zodResolver(Create_User_Schema),
//         defaultValues: {
//             email: "",
//             username: "",
//             nickname: "",
//             password: "",
//             role: "ADMIN",
//             image: "",
//             area: [],
//             place: [],
//             subject: [],
//             phone: "",
//             SCRC: "",
//             isLogin: true,
//             isstaff: true,
//             isadmin: true,
//         },
//     });

//     const handleFileChange = (field: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files.length > 0) {
//             const file = e.target.files[0];
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 const base64String = reader.result as string;
//                 main_admin_create_form.setValue("image", base64String);
//                 setPreviewImage(base64String);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const main_admin_create_form_onSubmit = (values: z.infer<typeof Create_User_Schema>) => {
//         console.log("-- admin_input_data -- :", values, "-- End --");
//         startTransition(() => {
//             createUser(values);
//         });
//     };

//     return (
//         <Form {...main_admin_create_form}>
//             <form onSubmit={main_admin_create_form.handleSubmit(main_admin_create_form_onSubmit)} className="space-y-6">
//                 <div className="space-y-4">
//                     <FormField
//                         control={main_admin_create_form.control}
//                         name="username"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel> 用戶名稱 </FormLabel>
//                                 <FormControl>
//                                     <Input {...field} disabled={isPending} placeholder="輸入名稱" type="text" />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                 </div>
//                 <div className="space-y-4">
//                     <FormField
//                         control={main_admin_create_form.control}
//                         name="nickname"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel> 暱稱 </FormLabel>
//                                 <FormControl>
//                                     <Input {...field} disabled={isPending} placeholder="輸入暱稱" type="text" />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                 </div>
//                 <div className="space-y-4">
//                     <FormField
//                         control={main_admin_create_form.control}
//                         name="email"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel> 電郵 </FormLabel>
//                                 <FormControl>
//                                     <Input {...field} disabled={isPending} placeholder="輸入電郵" type="text" />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                 </div>
//                 <div className="space-y-4">
//                     <FormField
//                         control={main_admin_create_form.control}
//                         name="password"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel> 密碼 </FormLabel>
//                                 <FormControl>
//                                     <Input {...field} disabled={isPending} placeholder="輸入密碼" type="text" />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                     <FormField
//                         control={main_admin_create_form.control}
//                         name="image"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel> 圖片 </FormLabel>
//                                 <FormControl>
//                                     <Input disabled={isPending} placeholder="上傳圖片" type="file" onChange={handleFileChange(field)} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                 </div>
//                 {previewImage && (
//                     <div className="mt-4">
//                         <img src={previewImage} alt="預覽圖片" className="w-32 h-32 object-cover rounded" />
//                     </div>
//                 )}
//                 <div className="space-y-4">
//                     <FormField
//                         control={main_admin_create_form.control}
//                         name="area"
//                         render={({ field, fieldState }) => (
//                             <FormItem>
//                                 <FormLabel> 地區 </FormLabel>
//                                 <FormControl>
//                                     <SWR_Areas_Select field={field} fieldState={fieldState} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                 </div>
//                 <div className="space-y-4">
//                     <FormField
//                         control={main_admin_create_form.control}
//                         name="place"
//                         render={({ field, fieldState }) => (
//                             <FormItem>
//                                 <FormLabel> 地方 </FormLabel>
//                                 <FormControl>
//                                     <SWR_Place_Select field={field} fieldState={fieldState} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                 </div>
//                 <div className="space-y-4">
//                     <FormField
//                         control={main_admin_create_form.control}
//                         name="subject"
//                         render={({ field, fieldState }) => (
//                             <FormItem>
//                                 <FormLabel> 科目 </FormLabel>
//                                 <FormControl>
//                                     <SWR_Subject field={field} fieldState={fieldState} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                 </div>
//                 <div className="space-y-4">
//                     <FormField
//                         control={main_admin_create_form.control}
//                         name="phone"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel> 電話 </FormLabel>
//                                 <FormControl>
//                                     <Input {...field} disabled={isPending} placeholder="輸入電話" type="text" />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                 </div>
//                 <div className="space-y-4">
//                     <FormField
//                     control={main_admin_create_form.control}
//                     name="SCRC"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel> SCRC </FormLabel>
//                             <FormControl>
//                                 <DatePicker
//                                     // 使用 `value` 而非 `selected`，並轉換為字符串格式
//                                     value={field.value ? new Date(field.value) : null}
//                                     onChange={(date) => {
//                                         if (date) {
//                                             // 將日期轉換為 ISO 字符串並更新表單
//                                             const dateObj = new Date(date.toString());
//                                             field.onChange(dateObj.toISOString());
//                                         }
//                                     }}
//                                     format="YYYY-MM-DD"  // 修正拼寫錯誤：`dateFormmat` → `format`
//                                 />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 </div>
//                 <Button> 提交 </Button>
//             </form>
//         </Form>
//     );
// };

// export default Hide_Main_Admin_Create_Form;



// "use client";

// import * as z from "zod";
// import { useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation"; // 引入 useRouter 用於客戶端重定向
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Create_User_Schema } from "@/actions/Create-User/schema";
// import { SWR_Subject } from "../fatchdata/swr_subject";
// import { SWR_Areas_CheckBox } from "../fatchdata/swr_areas_checkbox";
// import { SWR_Place_CheckBox } from "../fatchdata/swr_place_checkbox";
// import DatePicker from "react-multi-date-picker";
// import { createUser } from "@/actions/Create-User";

// const Hide_Main_Admin_Create_Form = () => {
//   const [isPending, startTransition] = useTransition();
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const router = useRouter(); // 初始化 useRouter


//     const main_admin_create_form = useForm<z.infer<typeof Create_User_Schema>>({
//         resolver: zodResolver(Create_User_Schema),
//         defaultValues: {
//             email: "",
//             username: "",
//             nickname: "",
//             password: "",
//             role: "ADMIN",
//             image: "",
//             area: [],
//             place: [],
//             subject: [],
//             phone: "",
//             SCRC: "",
//             isLogin: true,
//             isstaff: true,
//             isadmin: true,
//         },
//     });

//   // 處理圖片選擇，僅存儲文件並生成預覽
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
//       setSelectedFile(file);

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // 執行 OSS 上傳
//   const uploadToOSS = async (file: File) => {
//     try {
//       const res = await fetch("/api/oss_signature");
//       console.log("Response Status:", res.status, res.statusText);
//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(`OSS 簽名請求失敗: ${res.status} ${errorText}`);
//       }

//       const data = await res.json();
//       console.log("OSS Signature Response:", data);

//       const { accessId, policy, signature, host, dir } = data;

//       if (!accessId || !policy || !signature || !host || !dir) {
//         console.error("Missing fields in OSS response:", data);
//         throw new Error("OSS 簽名數據不完整");
//       }

//       const username = main_admin_create_form.getValues("username") || "default-user";
//       const fileName = `${Date.now()}-${username}-${file.name}`;
//       const ossPath = `${dir}${fileName}`; // 確保 dir 是 "uploads/"

//       const formData = new FormData();
//       formData.append("key", ossPath);
//       formData.append("policy", policy);
//       formData.append("OSSAccessKeyId", accessId);
//       formData.append("signature", signature);
//       formData.append("file", file);

//       console.log("FormData:", {
//         key: ossPath,
//         policy,
//         OSSAccessKeyId: accessId,
//         signature,
//       });

//       const uploadRes = await fetch(host, {
//         method: "POST",
//         body: formData,
//         mode: "cors",
//         credentials: "omit",
//       });

//       if (uploadRes.ok) {
//         const imageUrl = `${host}/${ossPath}`;
//         console.log("上傳成功，OSS URL:", imageUrl);
//         return imageUrl; // 返回圖片 URL
//       } else {
//         const errorText = await uploadRes.text();
//         console.error("OSS 上傳失敗:", errorText);
//         throw new Error(`圖片上傳失敗: ${errorText}`);
//       }
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : "未知錯誤";
//       console.error("OSS 上傳錯誤:", errorMessage, error);
//       throw new Error(`圖片上傳失敗: ${errorMessage}`);
//     }
//   };

//   // 表單提交處理
//   const user_create_form_onSubmit = async (
//     values: z.infer<typeof Create_User_Schema>
//   ) => {
//     console.log("-- 用户输入数据 -- :", values, "-- 结束 --");

//     startTransition(async () => {
//       try {
//         let updatedValues = { ...values };

//         // 如果有選擇的文件，執行 OSS 上傳
//         if (selectedFile) {
//           const imageUrl = await uploadToOSS(selectedFile);
//           updatedValues = { ...values, image: imageUrl }; // 更新 image 字段
//         } else {
//           updatedValues = { ...values, image: "" }; // 未選擇圖片時設置為空字符串
//         }

//         // 提交表單數據
//         const result = await createUser(updatedValues);
//         if (result.success) {
//           console.log("表單提交成功:", result);
//           router.push("/"); // 客戶端重定向
//         } else {
//           throw new Error(result.error || "創建用戶失敗");
//         }
//       } catch (error) {
//         const errorMessage = error instanceof Error ? error.message : "未知錯誤";
//         console.error("表單提交錯誤:", errorMessage, error);
//         main_admin_create_form.setError("image", {
//           message: `表單提交失敗: ${errorMessage}`,
//         });
//       }
//     });
//   };

//   console.log("-- BUG -- :", main_admin_create_form.formState.errors, " -- END -- ");

//   return (
//     <div>
//       CreateUserForm
//       <Form {...main_admin_create_form}>
//         <form
//           onSubmit={main_admin_create_form.handleSubmit(user_create_form_onSubmit)}
//           className="space-y-6"
//         >
//           {/* 用户名称 */}
//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={main_admin_create_form.control}
//               name="username"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>用户名称</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       disabled={isPending}
//                       placeholder="输入名称"
//                       type="text"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* 昵称 */}
//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={main_admin_create_form.control}
//               name="nickname"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>昵称</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       disabled={isPending}
//                       placeholder="输入昵称"
//                       type="text"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* 电邮 */}
//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={main_admin_create_form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>电邮</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       disabled={isPending}
//                       placeholder="输入电邮"
//                       type="email"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* 密码 */}
//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={main_admin_create_form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>密码</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       disabled={isPending}
//                       placeholder="输入密码"
//                       type="password"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* 图片上传 */}
//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={main_admin_create_form.control}
//               name="image"
//               render={() => (
//                 <FormItem>
//                   <FormLabel>照片</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={isPending}
//                       type="file"
//                       accept="image/*"
//                       onChange={handleFileChange}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* 图片預覽 */}
//           {previewImage && (
//             <div className="mt-4">
//               <img
//                 src={previewImage}
//                 alt="預覽照片"
//                 className="w-32 h-32 object-cover rounded-lg"
//               />
//             </div>
//           )}

//           {/* 地区 */}
//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={main_admin_create_form.control}
//               name="area"
//               render={({ field, fieldState }) => (
//                 <FormItem>
//                   <FormLabel>地區</FormLabel>
//                   <FormControl>
//                     <SWR_Areas_CheckBox field={field} fieldState={fieldState} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* 地方 */}
//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={main_admin_create_form.control}
//               name="place"
//               render={({ field, fieldState }) => (
//                 <FormItem>
//                   <FormLabel>地方</FormLabel>
//                   <FormControl>
//                     <SWR_Place_CheckBox field={field} fieldState={fieldState} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* 科目 */}
//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={main_admin_create_form.control}
//               name="subject"
//               render={({ field}) => (
//                 <FormItem>
//                   <FormLabel>科目</FormLabel>
//                   <FormControl>
//                     <SWR_Subject field={field}  />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* 电话 */}
//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={main_admin_create_form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>電話</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       disabled={isPending}
//                       placeholder="輸入電話"
//                       type="text"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* SCRC 日期選擇 */}
//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={main_admin_create_form.control}
//               name="SCRC"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>SCRC</FormLabel>
//                   <FormControl>
//                     <DatePicker
//                       value={field.value ? new Date(field.value) : null}
//                       onChange={(date) => {
//                         if (date) {
//                           const dateObj = new Date(date.toString());
//                           field.onChange(dateObj.toISOString());
//                         }
//                       }}
//                       format="YYYY-MM-DD"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* 提交按鈕 */}
//           <Button type="submit" disabled={isPending}>
//             提交
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default Hide_Main_Admin_Create_Form;



"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
import { SWR_Subject } from "../fatchdata/swr_subject_checkbox";
import { SWR_Areas_CheckBox } from "../fatchdata/swr_areas_checkbox";
import { SWR_Place_CheckBox } from "../fatchdata/swr_place_checkbox";
import DatePicker from "react-multi-date-picker";
import { createUser } from "@/actions/Create-User";

const Hide_Main_Admin_Create_Form = () => {
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const router = useRouter();

  const main_admin_create_form = useForm<z.infer<typeof Create_User_Schema>>({
    resolver: zodResolver(Create_User_Schema),
    defaultValues: {
      email: "",
      username: "",
      nickname: "",
      password: "",
      role: "ADMIN",
      image: "",
      area: [],
      place: [],
      subject: [],
      phone: "",
      SCRC: "",
      isLogin: true,
      isstaff: true,
      isadmin: true,
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        main_admin_create_form.setError("image", { message: "圖片大小不能超過 5MB" });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      try {
        const imageUrl = await uploadToOSS(file);
        setUploadedImageUrl(imageUrl);
        main_admin_create_form.setValue("image", imageUrl);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "未知錯誤";
        main_admin_create_form.setError("image", { message: `圖片上傳失敗: ${errorMessage}` });
      }
    }
  };

  const uploadToOSS = async (file: File) => {
    try {
      const res = await fetch("/api/oss_signature");
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`OSS 簽名請求失敗: ${res.status} ${errorText}`);
      }

      const data = await res.json();
      const { accessId, policy, signature, host, dir } = data;

      if (!accessId || !policy || !signature || !host || !dir) {
        throw new Error("OSS 簽名數據不完整");
      }

      const username = main_admin_create_form.getValues("username") || "default-user";
      const fileName = `${Date.now()}-${username}-${file.name}`;
      const ossPath = `${dir}${fileName}`;

      const formData = new FormData();
      formData.append("key", ossPath);
      formData.append("policy", policy);
      formData.append("OSSAccessKeyId", accessId);
      formData.append("signature", signature);
      formData.append("file", file);

      const uploadRes = await fetch(host, {
        method: "POST",
        body: formData,
        mode: "cors",
        credentials: "omit",
      });

      if (uploadRes.ok) {
        const imageUrl = `${host}/${ossPath}`;
        return imageUrl;
      } else {
        const errorText = await uploadRes.text();
        throw new Error(`圖片上傳失敗: ${errorText}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "未知錯誤";
      throw new Error(`圖片上傳失敗: ${errorMessage}`);
    }
  };

  const user_create_form_onSubmit = async (
    values: z.infer<typeof Create_User_Schema>
  ) => {
    console.log("user_create_form_onSubmit", values,"-- End --");
    startTransition(async () => {
      try {
        const result = await createUser(values);
        if (result.success) {
          router.push("/");
        } else {
          throw new Error(result.error || "創建用戶失敗");
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "未知錯誤";
        main_admin_create_form.setError("root", {
          message: `表單提交失敗: ${errorMessage}`,
        });
      }
    });
  };

  return (
    <div>
      Hide_Main_Admin_Create_Form
      <Form {...main_admin_create_form}>
        <form
          onSubmit={main_admin_create_form.handleSubmit(user_create_form_onSubmit)}
          className="space-y-6"
        >
          {/* 用户名称 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={main_admin_create_form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>用户名称</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="输入名称"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 昵称 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={main_admin_create_form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>昵称</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="输入昵称"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 电邮 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={main_admin_create_form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>电邮</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="输入电邮"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 密码 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={main_admin_create_form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>密码</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="输入密码"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 图片上传 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={main_admin_create_form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>照片</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 圖片預覽 */}
          {uploadedImageUrl && (
            <div className="mt-4">
              <Image
                src={uploadedImageUrl}
                alt="預覽照片"
                width={128}
                height={128}
                className="object-cover rounded-lg"
              />
            </div>
          )}
          {previewImage && !uploadedImageUrl && (
            <div className="mt-4">
              <Image
                src={previewImage}
                alt="本地預覽照片"
                width={128}
                height={128}
                className="object-cover rounded-lg"
              />
            </div>
          )}

          {/* 地区 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={main_admin_create_form.control}
              name="area"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>地區</FormLabel>
                  <FormControl>
                    <SWR_Areas_CheckBox field={field} fieldState={fieldState} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 地方 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={main_admin_create_form.control}
              name="place"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>地方</FormLabel>
                  <FormControl>
                    <SWR_Place_CheckBox field={field} fieldState={fieldState} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 科目 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={main_admin_create_form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>科目</FormLabel>
                  <FormControl>
                    <SWR_Subject field={field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 电话 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={main_admin_create_form.control}
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
              control={main_admin_create_form.control}
              name="SCRC"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SCRC</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value ? new Date(field.value) : null}
                      onChange={(date) => {
                        if (date) {
                          const dateObj = new Date(date.toString());
                          field.onChange(dateObj.toISOString());
                        }
                      }}
                      format="YYYY-MM-DD"
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

export default Hide_Main_Admin_Create_Form;