

// "use client";

// import * as z from "zod";
// import { useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
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
// import { SWR_Subject } from "../fatchdata/swr_subject_checkbox";
// import { SWR_Areas_CheckBox } from "../fatchdata/swr_areas_checkbox";
// import { SWR_Place_CheckBox } from "../fatchdata/swr_place_checkbox";
// import DatePicker from "react-multi-date-picker";
// import { createUser } from "@/actions/Create-User";

// const CreateUserForm = () => {
//   const [isPending, startTransition] = useTransition();
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
//   const router = useRouter();

//   const user_create_form = useForm<z.infer<typeof Create_User_Schema>>({
//     resolver: zodResolver(Create_User_Schema),
//     defaultValues: {
//       email: "",
//       username: "",
//       nickname: "",
//       password: "",
//       role: "TEACHER",
//       image: "",
//       area: [],
//       place: [],
//       subject: [],
//       phone: "",
//       SCRC: "",
//       isLogin: true,
//       isstaff: false,
//       isadmin: false,
//     },
//   });

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];

//       // 生成本地預覽
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);

//       // 立即上傳到 OSS
//       try {
//         const imageUrl = await uploadToOSS(file);
//         setUploadedImageUrl(imageUrl);
//         user_create_form.setValue("image", imageUrl);
//       } catch (error) {
//         const errorMessage = error instanceof Error ? error.message : "未知錯誤";
//         user_create_form.setError("image", { message: `圖片上傳失敗: ${errorMessage}` });
//       }
//     }
//   };

//   const uploadToOSS = async (file: File) => {
//     try {
//       const res = await fetch("/api/oss_signature");
//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(`OSS 簽名請求失敗: ${res.status} ${errorText}`);
//       }

//       const data = await res.json();
//       const { accessId, policy, signature, host, dir } = data;

//       if (!accessId || !policy || !signature || !host || !dir) {
//         throw new Error("OSS 簽名數據不完整");
//       }

//       const username = user_create_form.getValues("username") || "default-user";
//       const fileName = `${Date.now()}-${username}-${file.name}`;
//       const ossPath = `${dir}${fileName}`;

//       const formData = new FormData();
//       formData.append("key", ossPath);
//       formData.append("policy", policy);
//       formData.append("OSSAccessKeyId", accessId);
//       formData.append("signature", signature);
//       formData.append("file", file);

//       const uploadRes = await fetch(host, {
//         method: "POST",
//         body: formData,
//         mode: "cors",
//         credentials: "omit",
//       });

//       if (uploadRes.ok) {
//         const imageUrl = `${host}/${ossPath}`;
//         return imageUrl;
//       } else {
//         const errorText = await uploadRes.text();
//         throw new Error(`圖片上傳失敗: ${errorText}`);
//       }
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : "未知錯誤";
//       throw new Error(`圖片上傳失敗: ${errorMessage}`);
//     }
//   };

//   const user_create_form_onSubmit = async (
//     values: z.infer<typeof Create_User_Schema>
//   ) => {
//     startTransition(async () => {
//       try {
//         const result = await createUser(values);
//         if (result.success) {
//           router.push("/");
//         } else {
//           throw new Error(result.error || "創建用戶失敗");
//         }
//       } catch (error) {
//         const errorMessage = error instanceof Error ? error.message : "未知錯誤";
//         user_create_form.setError("root", {
//           message: `表單提交失敗: ${errorMessage}`,
//         });
//       }
//     });
//   };

//   return (
//     <div>
//       CreateUserForm
//       <Form {...user_create_form}>
//         <form
//           onSubmit={user_create_form.handleSubmit(user_create_form_onSubmit)}
//           className="space-y-6"
//         >
//           {/* 用户名称 */}
//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={user_create_form.control}
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
//               control={user_create_form.control}
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
//               control={user_create_form.control}
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
//               control={user_create_form.control}
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
//               control={user_create_form.control}
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
//           {uploadedImageUrl && (
//             <div className="mt-4">
//               <Image
//                 src={uploadedImageUrl}
//                 alt="預覽照片"
//                 width={128}
//                 height={128}
//                 className="object-cover rounded-lg"
//               />
//             </div>
//           )}
//           {previewImage && !uploadedImageUrl && (
//             <div className="mt-4">
//               <Image
//                 src={previewImage}
//                 alt="本地預覽照片"
//                 width={128}
//                 height={128}
//                 className="object-cover rounded-lg"
//               />
//             </div>
//           )}

//           {/* 地区 */}
//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={user_create_form.control}
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
//               control={user_create_form.control}
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
// <div className="grid grid-cols-2 gap-4">
//   <FormField
//     control={user_create_form.control}
//     name="subject"
//     render={({ field }) => (
//       <FormItem>
//         <FormLabel>科目</FormLabel>
//         <FormControl>
//           <SWR_Subject field={field} disabled={isPending} />
//         </FormControl>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
// </div>

//           {/* 电话 */}
//           <div className="grid grid-cols-2 gap-4">
//             <FormField
//               control={user_create_form.control}
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
//               control={user_create_form.control}
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

// export default CreateUserForm;

'use client';

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

const CreateUserForm = () => {
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const router = useRouter();

  const user_create_form = useForm<z.infer<typeof Create_User_Schema>>({
    resolver: zodResolver(Create_User_Schema),
    defaultValues: {
      email: "",
      username: "",
      nickname: "",
      password: "",
      role: "TEACHER",
      image: "",
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // 生成本地預覽
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // 立即上傳到 OSS
      try {
        const imageUrl = await uploadToOSS(file);
        setUploadedImageUrl(imageUrl);
        user_create_form.setValue("image", imageUrl);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "未知錯誤";
        user_create_form.setError("image", { message: `圖片上傳失敗: ${errorMessage}` });
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

      const username = user_create_form.getValues("username") || "default-user";
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
        user_create_form.setError("root", {
          message: `表單提交失敗: ${errorMessage}`,
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-grey-1 bg-opacity-60 font-noto-sans-tc p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-light rounded-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-primary-1 mb-4 sm:mb-6">
          創建用戶
        </h2>
        <Form {...user_create_form}>
          <form
            onSubmit={user_create_form.handleSubmit(user_create_form_onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            {/* 用戶名稱 */}
            <FormField
              control={user_create_form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base text-grey-9 font-medium">
                    用戶名稱
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="輸入名稱"
                      type="text"
                      className="w-full p-2 sm:p-3 border border-grey-2 rounded-lg bg-white text-sm sm:text-base text-grey-9 focus:outline-none focus:ring-2 focus:ring-primary-2"
                    />
                  </FormControl>
                  <FormMessage className="text-red text-sm" />
                </FormItem>
              )}
            />

            {/* 暱稱 */}
            <FormField
              control={user_create_form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base text-grey-9 font-medium">
                    暱稱
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="輸入暱稱"
                      type="text"
                      className="w-full p-2 sm:p-3 border border-grey-2 rounded-lg bg-white text-sm sm:text-base text-grey-9 focus:outline-none focus:ring-2 focus:ring-primary-2"
                    />
                  </FormControl>
                  <FormMessage className="text-red text-sm" />
                </FormItem>
              )}
            />

            {/* 電郵 */}
            <FormField
              control={user_create_form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base text-grey-9 font-medium">
                    電郵
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="輸入電郵"
                      type="email"
                      className="w-full p-2 sm:p-3 border border-grey-2 rounded-lg bg-white text-sm sm:text-base text-grey-9 focus:outline-none focus:ring-2 focus:ring-primary-2"
                    />
                  </FormControl>
                  <FormMessage className="text-red text-sm" />
                </FormItem>
              )}
            />

            {/* 密碼 */}
            <FormField
              control={user_create_form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base text-grey-9 font-medium">
                    密碼
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="輸入密碼"
                      type="password"
                      className="w-full p-2 sm:p-3 border border-grey-2 rounded-lg bg-white text-sm sm:text-base text-grey-9 focus:outline-none focus:ring-2 focus:ring-primary-2"
                    />
                  </FormControl>
                  <FormMessage className="text-red text-sm" />
                </FormItem>
              )}
            />

            {/* 圖片上傳 */}
            <FormField
              control={user_create_form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base text-grey-9 font-medium">
                    照片
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full p-2 sm:p-3 border border-grey-2 rounded-lg bg-white text-sm sm:text-base text-grey-9 focus:outline-none focus:ring-2 focus:ring-primary-2"
                    />
                  </FormControl>
                  <FormMessage className="text-red text-sm" />
                </FormItem>
              )}
            />

            {/* 圖片預覽 */}
            {uploadedImageUrl && (
              <div className="mt-4">
                <Image
                  src={uploadedImageUrl}
                  alt="預覽照片"
                  width={128}
                  height={128}
                  className="object-cover rounded-lg border border-grey-2"
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
                  className="object-cover rounded-lg border border-grey-2"
                />
              </div>
            )}

            {/* 地區 */}
            <FormField
              control={user_create_form.control}
              name="area"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base text-grey-9 font-medium">
                    地區
                  </FormLabel>
                  <FormControl>
                    <SWR_Areas_CheckBox field={field} fieldState={fieldState} />
                  </FormControl>
                  <FormMessage className="text-red text-sm" />
                </FormItem>
              )}
            />

            {/* 地方 */}
            <FormField
              control={user_create_form.control}
              name="place"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base text-grey-9 font-medium">
                    地方
                  </FormLabel>
                  <FormControl>
                    <SWR_Place_CheckBox field={field} fieldState={fieldState} />
                  </FormControl>
                  <FormMessage className="text-red text-sm" />
                </FormItem>
              )}
            />

            {/* 科目 */}
            <FormField
              control={user_create_form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base text-grey-9 font-medium">
                    科目
                  </FormLabel>
                  <FormControl>
                    <SWR_Subject field={field} disabled={isPending} />
                  </FormControl>
                  <FormMessage className="text-red text-sm" />
                </FormItem>
              )}
            />

            {/* 電話 */}
            <FormField
              control={user_create_form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base text-grey-9 font-medium">
                    電話
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="輸入電話"
                      type="text"
                      className="w-full p-2 sm:p-3 border border-grey-2 rounded-lg bg-white text-sm sm:text-base text-grey-9 focus:outline-none focus:ring-2 focus:ring-primary-2"
                    />
                  </FormControl>
                  <FormMessage className="text-red text-sm" />
                </FormItem>
              )}
            />

            {/* SCRC 日期選擇 */}
            <FormField
              control={user_create_form.control}
              name="SCRC"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base text-grey-9 font-medium">
                    SCRC
                  </FormLabel>
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
                      inputClass="w-full p-2 sm:p-3 border border-grey-2 rounded-lg bg-white text-sm sm:text-base text-grey-9 focus:outline-none focus:ring-2 focus:ring-primary-2"
                    />
                  </FormControl>
                  <FormMessage className="text-red text-sm" />
                </FormItem>
              )}
            />

            {/* 提交按鈕 */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto h-12 sm:h-14 bg-primary-1 text-white hover:bg-primary-2 rounded-lg text-sm sm:text-base font-medium transition-colors"
            >
              提交
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateUserForm;

