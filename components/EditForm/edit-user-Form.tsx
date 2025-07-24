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

// import { Switch } from "@/components/ui/switch";
// import { SWR_Subject } from "../fatchdata/swr_subject";
// import { SWR_Areas } from "../fatchdata/swr_areas";
// import { SWR_Place } from "../fatchdata/swr_place";
// import DatePicker from "react-multi-date-picker";
// import { Edit_User_Schema } from "@/actions/Edit-User/schema";
// import { Edit_User_Action } from "@/actions/Edit-User";
// import { useParams } from "next/navigation";
// import SWR_Color from "../fatchdata/swr_color";


// const EditUserForm = () => {
//     const param = useParams();
//     const targetUserId = param?.userListsid as string;
//     const AdminId = param?.id as string;


//     const [currentImagePath, setCurrentImagePath] = useState<string | null>(null); // 儲存當前圖片路徑
//     const [ isPending, startTransition ] = useTransition();
//     const [ GetUserdyId , setGetJobById ] = useState([]);

//     const [ email , setemail ] = useState('');
//     const [ usename , setusename ] = useState('');
//     const [ nickname , setnickname ] = useState('');
//     const [ image , setimage ] = useState([]);
//     const [ area , setarea  ] = useState([]);
//     const [ place , setplace ] = useState([]);
//     const [ subject , setsubject ] = useState([]);
//     const [ phone , setphone ] = useState('');
//     const [ SCRC , setSCRC ] = useState('');
//     const [ Color , setColor ] = useState("");

//     const [ isLogin , setisLogin ] = useState<boolean>();
//     const [ isstaff , setisstaff ] = useState<boolean>();




//     useEffect(() => {
//         const fetchuserdata = async (id : string) => {
//             const res = await fetch(`/api/User_Lists_by_ID/${id}`) ;
//             const data = await res.json() ;
//             setGetJobById(data) ;
//         }
//         fetchuserdata(targetUserId) ;
//     },[targetUserId])

//     console.log("GetUserdyId " , GetUserdyId)


//     const ImgPath = image[0]?.path;

    

//     const edit_user_form = useForm<z.infer<typeof Edit_User_Schema>>({
//         resolver: zodResolver(Edit_User_Schema),
//         defaultValues:{
//             adminId: AdminId,
//             targetuserId: targetUserId,
//             email:email,
//             username: usename,
//             nickname: nickname,
//             image: "",
//             area:area,
//             place:place,
//             subject:subject,
//             phone:phone,
//             SCRC:SCRC,
//             isLogin:isLogin,
//             isstaff:isstaff,
//             color: Color,


//         }
//     })

//     useEffect(() => {
//         const user = GetUserdyId[0] as any;

//         if (user) {
            
//             edit_user_form.setValue("adminId", AdminId);
//             edit_user_form.setValue("targetuserId", targetUserId);
//             setemail(user.email)
//             edit_user_form.setValue("email", user.email);
//             setusename(user.username)
//             edit_user_form.setValue("username", user.username);
//             setnickname(user.nickname)
//             edit_user_form.setValue("nickname", user.nickname);
//             setimage(user.image)
//             setCurrentImagePath(user.image[0]?.path || null); // 設置當前圖片路徑
//             setphone(user.phone)
//             edit_user_form.setValue("phone", user.phone);
//             setarea(user.area)
//             edit_user_form.setValue("area", user.area);
//             setplace(user.place)
//             edit_user_form.setValue("place", user.place);
//             setsubject(user.subject)
//             edit_user_form.setValue("subject", user.subject);
//             setSCRC(user.SCRC)
//             edit_user_form.setValue("SCRC", user.SCRC);
//             setColor(user.color)
//             edit_user_form.setValue("color", user.color);

//             edit_user_form.setValue("isLogin", user.isLogin);
            
//             edit_user_form.setValue("isstaff", user.isStaff);

//             setisLogin(user.isLogin)
//             setisstaff(user.isStaff)
            
//         }

//     },[GetUserdyId])


//     // console.log(edit_user_form.getValues())
//     const user_edit_form_onSubmit = async (
//         values: z.infer<typeof Edit_User_Schema>
//       ) => {
//         console.log("-- user_input_data -- :", values, "-- End --");
    
//         startTransition(async () => {
//           // 如果有新檔案，處理上傳邏輯
//           const fileInput = edit_user_form.getValues("image");
//           if (fileInput && fileInput instanceof File) {
//             const formData = new FormData();
//             formData.append("file", fileInput);
//             const uploadResponse = await fetch("/api/uploadimg", {
//               method: "POST",
//               body: formData,
//             });
//             const uploadResult = await uploadResponse.json();
//             values.image = uploadResult.path; // 更新表單中的 image 值為上傳後的路徑
//           } else {
//             values.image = currentImagePath || ""; // 如果沒有新檔案，保留現有路徑
//           }
    
//           await Edit_User_Action(values);
//         });
//       };

//     return(
//         <div>
//             EditUserForm
//             <Form {...edit_user_form}>
//                 <form onSubmit={edit_user_form.handleSubmit(user_edit_form_onSubmit)}>
                    
//                     <div className="grid grid-cols-2 gap-4">
//                         <FormField 
//                             control={edit_user_form.control}
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
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <FormField 
//                             control={edit_user_form.control}
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
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <FormField 
//                             control={edit_user_form.control}
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
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                     </div>




//                 <div className="grid grid-cols-2 gap-4">
//                     <FormField
//                         control={edit_user_form.control}
//                         name="image"
//                         render={({ field: { onChange, value, ...rest } }) => (
//                     <FormItem>
//                         <FormLabel> 圖片 </FormLabel>
//                         <FormControl>
//                         <Input
//                       {...rest}
//                       disabled={isPending}
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => {
//                         const file = e.target.files?.[0];
//                         if (file) {
//                           onChange(file); // 更新表單值為檔案物件
//                         }
//                       }}
//                     />
//                         </FormControl>
//                         {/* 如果有當前圖片，則顯示 */}
//         {ImgPath && (
//           <div className="mt-2">
//             <p>當前圖片：</p>
//             <img
//               src={ImgPath}
//               alt="當前用戶圖片"
//               className="w-32 h-32 object-cover"
//             />
//           </div>
//         )}
//                         <FormMessage />
//                     </FormItem>
//                         )}
//                     />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                     <FormField
//                         control={edit_user_form.control}
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
//                         control={edit_user_form.control}
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
//                         control={edit_user_form.control}
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
//                         control={edit_user_form.control}
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
//                     control={edit_user_form.control}
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

//                 <div className="grid grid-cols-2 gap-4">
//                     <FormField
//                         control={edit_user_form.control}
//                         name="color"
//                         render={({ field ,fieldState }) => (
//                     <FormItem>
//                         <FormLabel> Color </FormLabel>
//                         <FormControl>
//                             <SWR_Color field={field}  fieldState={fieldState} />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                         )}
//                     />
//                 </div>


//                 <div className="grid grid-cols-2 gap-4">
//                     <FormField
//                         control={edit_user_form.control}
//                         name="isLogin"
//                         render={({ field }) => (
//                     <FormItem>
//                         <FormLabel> isLogin </FormLabel>
//                         <FormControl>
//                         <Switch  checked={field.value}  onCheckedChange={
//                     (value)=>{
//                         field.onChange(value)
//                         setisLogin(value)
//                     }
                    
//                     } />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                         )}
//                     />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                     <FormField
//                         control={edit_user_form.control}
//                         name="isstaff"
//                         render={({ field }) => (
//                     <FormItem>
//                         <FormLabel> isstaff </FormLabel>
//                         <FormControl>
//                         <Switch  checked={field.value}  onCheckedChange={
//                     (value)=>{
//                         field.onChange(value)
//                         setisstaff(value)
//                     }
                    
//                     } />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                         )}
//                     />
//                 </div>



//                 <Button
//                 type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 > 提交 </Button>

//                 </form>
//             </Form>


//         </div>
//     )
// }

// export default EditUserForm

// "use client";

// import * as z from "zod";
// import { useEffect, useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Switch } from "@/components/ui/switch";
// import { SWR_Subject } from "../fatchdata/swr_subject";
// import { SWR_Areas_Select } from "../fatchdata/swr_areas";
// import { SWR_Place_Select } from "../fatchdata/swr_place";
// import DatePicker from "react-multi-date-picker";
// import { Edit_User_Schema } from "@/actions/Edit-User/schema";
// import { Edit_User_Action } from "@/actions/Edit-User";
// import { useParams } from "next/navigation";
// import SWR_Color from "../fatchdata/swr_color";

// interface ImageData {
//   path: string;
// }

// interface UserData {
//   email: string;
//   username: string;
//   nickname: string;
//   image: ImageData[];
//   area: string[];
//   place: string[];
//   subject: string[];
//   phone: string;
//   SCRC: string;
//   color: string;
//   isLogin: boolean;
//   isStaff: boolean;
// }

// const EditUserForm = () => {
//   const param = useParams();
//   const targetUserId = param?.userListsid as string;
//   const AdminId = param?.id as string;

//   const [currentImagePath, setCurrentImagePath] = useState<string | null>(null);
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null);
//   const [isPending, startTransition] = useTransition();
//   const [GetUserdyId, setGetJobById] = useState<UserData[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const edit_user_form = useForm<z.infer<typeof Edit_User_Schema>>({
//     resolver: zodResolver(Edit_User_Schema),
//     defaultValues: {
//       adminId: AdminId,
//       targetuserId: targetUserId,
//       email: "",
//       username: "",
//       nickname: "",
//       image: undefined,
//       area: [],
//       place: [],
//       subject: [],
//       phone: "",
//       SCRC: "",
//       color: "",
//       isLogin: false,
//       isstaff: false,
//     },
//   });

//   const ImgPath = currentImagePath || "";

//   useEffect(() => {
//     const fetchuserdata = async (id: string) => {
//       setIsLoading(true);
//       try {
//         const res = await fetch(`/api/User_Lists_by_ID/${id}`);
//         if (!res.ok) throw new Error("無法獲取用戶資料");
//         const data = await res.json();
//         setGetJobById(Array.isArray(data) ? data : [data]);
//         setError(null);
//       } catch (error) {
//         console.error("獲取用戶資料失敗：", error);
//         setError("無法載入用戶資料，請稍後再試");
//         setGetJobById([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchuserdata(targetUserId);
//   }, [targetUserId]);

//   useEffect(() => {
//     const user = GetUserdyId[0];
//     if (user) {
//       edit_user_form.setValue("adminId", AdminId);
//       edit_user_form.setValue("targetuserId", targetUserId);
//       edit_user_form.setValue("email", user.email);
//       edit_user_form.setValue("username", user.username);
//       edit_user_form.setValue("nickname", user.nickname);
//       edit_user_form.setValue("phone", user.phone);
//       edit_user_form.setValue("area", user.area || []);
//       edit_user_form.setValue("place", user.place || []);
//       edit_user_form.setValue("subject", user.subject || []);
//       edit_user_form.setValue("SCRC", user.SCRC);
//       edit_user_form.setValue("color", user.color);
//       edit_user_form.setValue("isLogin", user.isLogin);
//       edit_user_form.setValue("isstaff", user.isStaff);
//       setCurrentImagePath(user.image?.[0]?.path || null);
//     }
//   }, [GetUserdyId, edit_user_form, AdminId, targetUserId]);

//   const user_edit_form_onSubmit = async (values: z.infer<typeof Edit_User_Schema>) => {
//     console.log("-- user_input_data -- :", values, "-- End --");

//     startTransition(async () => {
//       let imagePath = currentImagePath || "";

//       if (uploadedFile) {
//         const formData = new FormData();
//         formData.append("file", uploadedFile);
//         try {
//           const uploadResponse = await fetch("/api/uploadimg", {
//             method: "POST",
//             body: formData,
//           });
//           if (!uploadResponse.ok) throw new Error("圖片上傳失敗");
//           const uploadResult = await uploadResponse.json();
//           imagePath = uploadResult.path;
//         } catch (error) {
//           console.error("圖片上傳失敗：", error);
//           return;
//         }
//       }

//       const updatedValues = { ...values, image: imagePath };
//       await Edit_User_Action(updatedValues);
//     });
//   };

//   if (isLoading) return <div>載入中...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <h2>編輯用戶表單</h2>
//       <Form {...edit_user_form}>
//         <form onSubmit={edit_user_form.handleSubmit(user_edit_form_onSubmit)} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={edit_user_form.control}
//               name="username"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>用戶名稱</FormLabel>
//                   <FormControl>
//                     <Input {...field} disabled={isPending} placeholder="輸入名稱" type="text" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={edit_user_form.control}
//               name="nickname"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>暱稱</FormLabel>
//                   <FormControl>
//                     <Input {...field} disabled={isPending} placeholder="輸入暱稱" type="text" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={edit_user_form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>電郵</FormLabel>
//                   <FormControl>
//                     <Input {...field} disabled={isPending} placeholder="輸入電郵" type="email" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={edit_user_form.control}
//               name="image"
//               render={({ field: { value, onChange, ...rest } }) => (
//                 <FormItem>
//                   <FormLabel>圖片</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...rest}
//                       disabled={isPending}
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => {
//                         const file = e.target.files?.[0];
//                         if (file) {
//                           setUploadedFile(file);
//                           onChange(currentImagePath);
//                         } else {
//                           setUploadedFile(null);
//                         }
//                       }}
//                     />
//                   </FormControl>
//                   {uploadedFile ? (
//                     <div className="mt-2">
//                       <p>新選擇的圖片：</p>
//                       <img
//                         src={URL.createObjectURL(uploadedFile)}
//                         alt="新圖片預覽"
//                         className="w-32 h-32 object-cover"
//                       />
//                     </div>
//                   ) : ImgPath ? (
//                     <div className="mt-2">
//                       <p>當前圖片：</p>
//                       <img src={ImgPath} alt="當前用戶圖片" className="w-32 h-32 object-cover" />
//                     </div>
//                   ) : null}
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={edit_user_form.control}
//               name="area"
//               render={({ field, fieldState }) => (
//                 <FormItem>
//                   <FormLabel>地區</FormLabel>
//                   <FormControl>
//                     <SWR_Areas_Select field={field} fieldState={fieldState} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={edit_user_form.control}
//               name="place"
//               render={({ field, fieldState }) => (
//                 <FormItem>
//                   <FormLabel>地方</FormLabel>
//                   <FormControl>
//                     <SWR_Place_Select field={field} fieldState={fieldState} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={edit_user_form.control}
//               name="subject"
//               render={({ field, fieldState }) => (
//                 <FormItem>
//                   <FormLabel>科目</FormLabel>
//                   <FormControl>
//                     <SWR_Subject field={field} fieldState={fieldState} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={edit_user_form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>電話</FormLabel>
//                   <FormControl>
//                     <Input {...field} disabled={isPending} placeholder="輸入電話" type="text" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={edit_user_form.control}
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

//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={edit_user_form.control}
//               name="color"
//               render={({ field, fieldState }) => (
//                 <FormItem>
//                   <FormLabel>顏色</FormLabel>
//                   <FormControl>
//                     <SWR_Color field={field} fieldState={fieldState} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={edit_user_form.control}
//               name="isLogin"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>是否登入</FormLabel>
//                   <FormControl>
//                     <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={edit_user_form.control}
//               name="isstaff"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>是否為員工</FormLabel>
//                   <FormControl>
//                     <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <Button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             disabled={isPending}
//           >
//             提交
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default EditUserForm;


// "use client";

// import * as z from "zod";
// import { useEffect, useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Switch } from "@/components/ui/switch";
// import { SWR_Subject } from "../fatchdata/swr_subject";
// import { SWR_Areas_Select } from "../fatchdata/swr_areas";
// import { SWR_Place_Select } from "../fatchdata/swr_place";
// import DatePicker from "react-multi-date-picker";
// import { Edit_User_Schema } from "@/actions/Edit-User/schema";
// import { Edit_User_Action } from "@/actions/Edit-User";
// import { useParams } from "next/navigation";
// import SWR_Color from "../fatchdata/swr_color";

// interface ImageData {
//   path: string;
// }

// interface UserData {
//   email: string;
//   username: string;
//   nickname: string;
//   image: ImageData[];
//   area: string[];
//   place: string[];
//   subject: string[];
//   phone: string;
//   SCRC: string;
//   color: string;
//   isLogin: boolean;
//   isStaff: boolean;
// }

// const EditUserForm = () => {
//   const param = useParams();
//   const targetUserId = param?.userListsid as string;
//   const [currentImagePath, setCurrentImagePath] = useState<string | null>(null);
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null);
//   const [isPending, startTransition] = useTransition();
//   const [GetUserById, setGetUserById] = useState<UserData[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const user_edit_form = useForm<z.infer<typeof Edit_User_Schema>>({
//     resolver: zodResolver(Edit_User_Schema),
//     defaultValues: {
//       adminId: "",
//       targetuserId: targetUserId,
//       email: "",
//       username: "",
//       nickname: "",
//       image: undefined,
//       area: [],
//       place: [],
//       subject: [],
//       phone: "",
//       SCRC: "",
//       color: "",
//       isLogin: false,
//       isstaff: false,
//     },
//   });

//   const ImgPath = currentImagePath || "";

//   useEffect(() => {
//     const fetchuserdata = async (id: string) => {
//       if (!id) {
//         setError("無效的用戶 ID");
//         return;
//       }
//       setIsLoading(true);
//       try {
//         const res = await fetch(`/api/User_Lists_by_ID/${id}`);
//         if (!res.ok) throw new Error("無法獲取用戶資料");
//         const data = await res.json();
//         setGetUserById(Array.isArray(data) ? data : [data]);
//         setError(null);
//       } catch (error) {
//         console.error("獲取用戶資料失敗：", error);
//         setError("無法載入用戶資料，請稍後再試");
//         setGetUserById([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchuserdata(targetUserId);
//   }, [targetUserId]);

//   useEffect(() => {
//     const user = GetUserById[0];
//     if (user) {
//       user_edit_form.setValue("targetuserId", targetUserId);
//       user_edit_form.setValue("email", user.email);
//       user_edit_form.setValue("username", user.username);
//       user_edit_form.setValue("nickname", user.nickname);
//       user_edit_form.setValue("phone", user.phone);
//       user_edit_form.setValue("area", user.area || []);
//       user_edit_form.setValue("place", user.place || []);
//       user_edit_form.setValue("subject", user.subject || []);
//       user_edit_form.setValue("SCRC", user.SCRC);
//       user_edit_form.setValue("color", user.color);
//       user_edit_form.setValue("isLogin", user.isLogin);
//       user_edit_form.setValue("isstaff", user.isStaff);
//       setCurrentImagePath(user.image?.[0]?.path || null);
//     }
//   }, [GetUserById, user_edit_form, targetUserId]);

//   const user_edit_form_onSubmit = async (values: z.infer<typeof Edit_User_Schema>) => {
//     console.log("-- user_input_data -- :", values, "-- End --");

//     startTransition(async () => {
//       let imagePath = currentImagePath || "";

//       if (uploadedFile) {
//         const formData = new FormData();
//         formData.append("file", uploadedFile);
//         try {
//           const uploadResponse = await fetch("/api/uploadimg", {
//             method: "POST",
//             body: formData,
//           });
//           if (!uploadResponse.ok) throw new Error("圖片上傳失敗");
//           const uploadResult = await uploadResponse.json();
//           if (!uploadResult.path) throw new Error("圖片路徑無效");
//           imagePath = uploadResult.path;
//         } catch (error) {
//           console.error("圖片上傳失敗：", error);
//           setError("圖片上傳失敗，請稍後再試");
//           return;
//         }
//       }

//       const updatedValues = { ...values, image: imagePath };
//       try {
//         const result = await Edit_User_Action(updatedValues);
//         console.log("用戶更新成功:", result);
//         setError(null);
//       } catch (error) {
//         console.error("更新用戶失敗:", error);
//         setError("更新用戶失敗，請稍後再試");
//       }
//     });
//   };

//   if (isLoading) return <div>載入中...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">編輯用戶表單</h2>
//       <Form {...user_edit_form}>
//         <form onSubmit={user_edit_form.handleSubmit(user_edit_form_onSubmit)} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={user_edit_form.control}
//               name="username"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>用戶名稱</FormLabel>
//                   <FormControl>
//                     <Input {...field} disabled={isPending} placeholder="輸入名稱" type="text" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={user_edit_form.control}
//               name="nickname"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>暱稱</FormLabel>
//                   <FormControl>
//                     <Input {...field} disabled={isPending} placeholder="輸入暱稱" type="text" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={user_edit_form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>電郵</FormLabel>
//                   <FormControl>
//                     <Input {...field} disabled={isPending} placeholder="輸入電郵" type="email" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={user_edit_form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>電話</FormLabel>
//                   <FormControl>
//                     <Input {...field} disabled={isPending} placeholder="輸入電話" type="text" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={user_edit_form.control}
//               name="image"
//               render={({ field: { onChange, ...rest } }) => (
//                 <FormItem>
//                   <FormLabel>圖片</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...rest}
//                       disabled={isPending}
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => {
//                         const file = e.target.files?.[0];
//                         if (file) {
//                           setUploadedFile(file);
//                           onChange(currentImagePath);
//                         } else {
//                           setUploadedFile(null);
//                         }
//                       }}
//                     />
//                   </FormControl>
//                   {uploadedFile ? (
//                     <div className="mt-2">
//                       <p>新選擇的圖片：</p>
//                       <img
//                         src={URL.createObjectURL(uploadedFile)}
//                         alt="新圖片預覽"
//                         className="w-32 h-32 object-cover"
//                       />
//                     </div>
//                   ) : ImgPath ? (
//                     <div className="mt-2">
//                       <p>當前圖片：</p>
//                       <img src={ImgPath} alt="當前用戶圖片" className="w-32 h-32 object-cover" />
//                     </div>
//                   ) : null}
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={user_edit_form.control}
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
//                         } else {
//                           field.onChange("");
//                         }
//                       }}
//                       format="YYYY-MM-DD"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={user_edit_form.control}
//               name="area"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>地區</FormLabel>
//                   <FormControl>
//                     <SWR_Areas_Select field={field} disabled={isPending} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={user_edit_form.control}
//               name="place"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>地點</FormLabel>
//                   <FormControl>
//                     <SWR_Place_Select field={field} disabled={isPending} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={user_edit_form.control}
//               name="subject"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>科目</FormLabel>
//                   <FormControl>
//                     <SWR_Subject field={field} disabled={isPending} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={user_edit_form.control}
//               name="color"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>顏色</FormLabel>
//                   <FormControl>
//                     <SWR_Color field={field} disabled={isPending} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={user_edit_form.control}
//               name="isLogin"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>是否登入</FormLabel>
//                   <FormControl>
//                     <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={user_edit_form.control}
//               name="isstaff"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>是否為員工</FormLabel>
//                   <FormControl>
//                     <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <Button
//             type="submit"
//             className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
//             disabled={isPending}
//           >
//             {isPending ? "提交中..." : "提交"}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default EditUserForm;


"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SWR_Subject } from "../fatchdata/swr_subject_checkbox";
import { SWR_Areas_Select } from "../fatchdata/swr_areas";
import { SWR_Place } from "../fatchdata/swr_place";
import DatePicker from "react-multi-date-picker";
import { Edit_User_Schema } from "@/actions/Edit-User/schema";
import { Edit_User_Action } from "@/actions/Edit-User";
import { useParams } from "next/navigation";
import SWR_Color from "../fatchdata/swr_color";

interface UserData {
  id: string;
  email: string;
  username: string;
  nickname: string;
  image: string | null;
  area: string[];
  place: string[];
  subject: string[];
  phone: string;
  SCRC: string;
  color: string;
  isLogin: boolean;
  isStaff: boolean;
}

const EditUserForm = () => {
  const router = useRouter();
  const params = useParams();
  const targetuserId = params?.userListsid as string;
  const [currentImagePath, setCurrentImagePath] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [GetUserById, setGetUserById] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const user_edit_form = useForm<z.infer<typeof Edit_User_Schema>>({
    resolver: zodResolver(Edit_User_Schema),
    defaultValues: {
      adminId: "",
      targetuserId: targetuserId,
      email: "",
      username: "",
      nickname: "",
      image: "",
      area: [],
      place: [],
      subject: [],
      phone: "",
      SCRC: "",
      isLogin: false,
      isStaff: false,
      color: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async (id: string) => {
      if (!id) {
        setError("無效的用戶 ID");
        return;
      }
      setIsLoading(true);
      try {
        const res = await fetch(`/api/User_Lists_by_ID/${id}`);
        if (!res.ok) {
          throw new Error("無法獲取用戶資料");
        }
        const data = await res.json();
        setGetUserById(Array.isArray(data) ? data : [data]);
        setError(null);
      } catch (error) {
        console.error("獲取用戶資料失敗：", error);
        setError("無法載入用戶資料，請稍後再試");
        setGetUserById([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData(targetuserId);
  }, [targetuserId]);

  useEffect(() => {
    const user = GetUserById[0];
    if (user) {
      user_edit_form.setValue("targetuserId", targetuserId);
      user_edit_form.setValue("email", user.email);
      user_edit_form.setValue("username", user.username);
      user_edit_form.setValue("nickname", user.nickname);
      user_edit_form.setValue("phone", user.phone);
      user_edit_form.setValue("area", user.area || []);
      user_edit_form.setValue("place", user.place || []);
      user_edit_form.setValue("subject", user.subject || []);
      user_edit_form.setValue("SCRC", user.SCRC || "");
      user_edit_form.setValue("color", user.color);
      user_edit_form.setValue("isLogin", user.isLogin);
      user_edit_form.setValue("isStaff", user.isStaff);
      user_edit_form.setValue("image", user.image || "");
      setCurrentImagePath(user.image);
    }
  }, [GetUserById, user_edit_form, targetuserId]);

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        user_edit_form.setError("image", { message: "圖片大小不能超過 5MB" });
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      try {
        const formData = new FormData();
        formData.append("file", file);
        const uploadResponse = await fetch("/api/uploadimg", {
          method: "POST",
          body: formData,
        });
        if (!uploadResponse.ok) {
          throw new Error("圖片上傳失敗");
        }
        const uploadResult = await uploadResponse.json();
        if (!uploadResult.path) {
          throw new Error("圖片路徑無效");
        }
        setUploadedImageUrl(uploadResult.path);
        user_edit_form.setValue("image", uploadResult.path);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "未知錯誤";
        user_edit_form.setError("image", {
          message: `圖片上傳失敗: ${errorMessage}`,
        });
      }
    } else {
      setPreviewImage(null);
      setUploadedImageUrl(null);
      user_edit_form.setValue("image", currentImagePath || "");
    }
  };

  const user_edit_form_onSubmit = async (values: z.infer<typeof Edit_User_Schema>) => {
    startTransition(async () => {
      try {
        const result = await Edit_User_Action(values);
        if (result.data) {
          setError(null);
          router.push(`/user/${values.adminId}/admin/userLists`);
        } else if (result.error) {
          throw new Error(result.error);
        } else if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([key, errors]) => {
            user_edit_form.setError(key as keyof typeof values, {
              message: errors?.join(", ") || "字段錯誤",
            });
          });
          throw new Error("表單驗證失敗");
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "未知錯誤";
        setError(`更新用戶失敗: ${errorMessage}`);
      }
    });
  };

  if (isLoading) {
    return <div>載入中...</div>;
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">編輯用戶表單</h2>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Form {...user_edit_form}>
        <form onSubmit={user_edit_form.handleSubmit(user_edit_form_onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={user_edit_form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>用戶名稱</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="輸入名稱" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={user_edit_form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>暱稱</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="輸入暱稱" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={user_edit_form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>電郵</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="輸入電郵" type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={user_edit_form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>電話</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="輸入電話 (例如 12345678)"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={user_edit_form.control}
              name="image"
              render={({ field: { ...rest } }) => (
                <FormItem>
                  <FormLabel>圖片</FormLabel>
                  <FormControl>
                    <Input
                      {...rest}
                      disabled={isPending}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </FormControl>
                  {uploadedImageUrl ? (
                    <div className="mt-2">
                      <p>新選擇的圖片：</p>
                      <Image
                        src={uploadedImageUrl}
                        alt="新圖片預覽"
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                  ) : previewImage ? (
                    <div className="mt-2">
                      <p>本地預覽圖片：</p>
                      <Image
                        src={previewImage}
                        alt="本地圖片預覽"
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                  ) : currentImagePath ? (
                    <div className="mt-2">
                      <p>當前圖片：</p>
                      <Image
                        src={currentImagePath}
                        alt="當前用戶圖片"
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={user_edit_form.control}
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
                        } else {
                          field.onChange("");
                        }
                      }}
                      format="YYYY-MM-DD"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={user_edit_form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>地區</FormLabel>
                  <FormControl>
                    <SWR_Areas_Select field={field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={user_edit_form.control}
              name="place"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>地點</FormLabel>
                  <FormControl>
                    <SWR_Place field={field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={user_edit_form.control}
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
          <FormField
            control={user_edit_form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>顏色</FormLabel>
                <FormControl>
                  <SWR_Color field={field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={user_edit_form.control}
              name="isLogin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>是否登入</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={user_edit_form.control}
              name="isStaff"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>是否為員工</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            variant="default"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "提交中..." : "提交"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditUserForm;