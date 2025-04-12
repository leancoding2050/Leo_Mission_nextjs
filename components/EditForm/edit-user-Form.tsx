"use client";

import * as z from "zod";
import { use, useEffect, useState, useTransition } from "react";
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
    FormMessage 
} from "@/components/ui/form";

import { Switch } from "@/components/ui/switch";
import { SWR_Subject } from "../fatchdata/swr_subject";
import { SWR_Areas } from "../fatchdata/swr_areas";
import { SWR_Place } from "../fatchdata/swr_place";
import DatePicker from "react-multi-date-picker";
import { Edit_User_Schema } from "@/actions/Edit-User/schema";
import { Edit_User_Action } from "@/actions/Edit-User";
import { useParams } from "next/navigation";
import SWR_Color from "../fatchdata/swr_color";


const EditUserForm = () => {
    const param = useParams();
    const targetUserId = param?.userListsid as string;
    const AdminId = param?.id as string;


    const [currentImagePath, setCurrentImagePath] = useState<string | null>(null); // 儲存當前圖片路徑
    const [ isPending, startTransition ] = useTransition();
    const [ GetUserdyId , setGetJobById ] = useState([]);

    const [ email , setemail ] = useState('');
    const [ usename , setusename ] = useState('');
    const [ nickname , setnickname ] = useState('');
    const [ image , setimage ] = useState([]);
    const [ area , setarea  ] = useState([]);
    const [ place , setplace ] = useState([]);
    const [ subject , setsubject ] = useState([]);
    const [ phone , setphone ] = useState('');
    const [ SCRC , setSCRC ] = useState('');
    const [ Color , setColor ] = useState("");

    const [ isLogin , setisLogin ] = useState<boolean>();
    const [ isstaff , setisstaff ] = useState<boolean>();




    useEffect(() => {
        const fetchuserdata = async (id : string) => {
            const res = await fetch(`/api/User_Lists_by_ID/${id}`) ;
            const data = await res.json() ;
            setGetJobById(data) ;
        }
        fetchuserdata(targetUserId) ;
    },[targetUserId])

    console.log("GetUserdyId " , GetUserdyId)


    const ImgPath = image[0]?.path;

    

    const edit_user_form = useForm<z.infer<typeof Edit_User_Schema>>({
        resolver: zodResolver(Edit_User_Schema),
        defaultValues:{
            adminId: AdminId,
            targetuserId: targetUserId,
            email:email,
            username: usename,
            nickname: nickname,
            image: "",
            area:area,
            place:place,
            subject:subject,
            phone:phone,
            SCRC:SCRC,
            isLogin:isLogin,
            isstaff:isstaff,
            color: Color,


        }
    })

    useEffect(() => {
        const user = GetUserdyId[0] as any;

        if (user) {
            
            edit_user_form.setValue("adminId", AdminId);
            edit_user_form.setValue("targetuserId", targetUserId);
            setemail(user.email)
            edit_user_form.setValue("email", user.email);
            setusename(user.username)
            edit_user_form.setValue("username", user.username);
            setnickname(user.nickname)
            edit_user_form.setValue("nickname", user.nickname);
            setimage(user.image)
            setCurrentImagePath(user.image[0]?.path || null); // 設置當前圖片路徑
            setphone(user.phone)
            edit_user_form.setValue("phone", user.phone);
            setarea(user.area)
            edit_user_form.setValue("area", user.area);
            setplace(user.place)
            edit_user_form.setValue("place", user.place);
            setsubject(user.subject)
            edit_user_form.setValue("subject", user.subject);
            setSCRC(user.SCRC)
            edit_user_form.setValue("SCRC", user.SCRC);
            setColor(user.color)
            edit_user_form.setValue("color", user.color);

            edit_user_form.setValue("isLogin", user.isLogin);
            
            edit_user_form.setValue("isstaff", user.isStaff);

            setisLogin(user.isLogin)
            setisstaff(user.isStaff)
            
        }

    },[GetUserdyId])


    // console.log(edit_user_form.getValues())
    const user_edit_form_onSubmit = async (
        values: z.infer<typeof Edit_User_Schema>
      ) => {
        console.log("-- user_input_data -- :", values, "-- End --");
    
        startTransition(async () => {
          // 如果有新檔案，處理上傳邏輯
          const fileInput = edit_user_form.getValues("image");
          if (fileInput && fileInput instanceof File) {
            const formData = new FormData();
            formData.append("file", fileInput);
            const uploadResponse = await fetch("/api/uploadimg", {
              method: "POST",
              body: formData,
            });
            const uploadResult = await uploadResponse.json();
            values.image = uploadResult.path; // 更新表單中的 image 值為上傳後的路徑
          } else {
            values.image = currentImagePath || ""; // 如果沒有新檔案，保留現有路徑
          }
    
          await Edit_User_Action(values);
        });
      };

    return(
        <div>
            EditUserForm
            <Form {...edit_user_form}>
                <form onSubmit={edit_user_form.handleSubmit(user_edit_form_onSubmit)}>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <FormField 
                            control={edit_user_form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> 用戶名稱 </FormLabel>
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

                    <div className="grid grid-cols-2 gap-4">
                        <FormField 
                            control={edit_user_form.control}
                            name="nickname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> 暱稱 </FormLabel>
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

                    <div className="grid grid-cols-2 gap-4">
                        <FormField 
                            control={edit_user_form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> 電郵 </FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled={isPending}
                                            placeholder="輸入電郵"
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
                        control={edit_user_form.control}
                        name="image"
                        render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                        <FormLabel> 圖片 </FormLabel>
                        <FormControl>
                        <Input
                      {...rest}
                      disabled={isPending}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          onChange(file); // 更新表單值為檔案物件
                        }
                      }}
                    />
                        </FormControl>
                        {/* 如果有當前圖片，則顯示 */}
        {ImgPath && (
          <div className="mt-2">
            <p>當前圖片：</p>
            <img
              src={ImgPath}
              alt="當前用戶圖片"
              className="w-32 h-32 object-cover"
            />
          </div>
        )}
                        <FormMessage />
                    </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={edit_user_form.control}
                        name="area"
                        render={({ field, fieldState }) => (

                    <FormItem>
                        <FormLabel> 地區 </FormLabel>
                        <FormControl>
                            <SWR_Areas field={field}  fieldState={fieldState}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={edit_user_form.control}
                        name="place"
                        render={({ field, fieldState}) => (
                    <FormItem>
                        <FormLabel> 地方 </FormLabel>
                        <FormControl>
                            <SWR_Place  field={field} fieldState={fieldState}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={edit_user_form.control}
                        name="subject"
                        render={({ field, fieldState }) => (
                    <FormItem>
                        <FormLabel> 科目 </FormLabel>
                        <FormControl>
                            <SWR_Subject field={field} fieldState={fieldState}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={edit_user_form.control}
                        name="phone"
                        render={({ field }) => (
                    <FormItem>
                        <FormLabel> 電話 </FormLabel>
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

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={edit_user_form.control}
                        name="SCRC"
                        render={({ field }) => (
                    <FormItem>
                        <FormLabel> SCRC </FormLabel>
                        <FormControl>
                            <DatePicker
                                {...field}
                                selected={field.value ? new Date(field.value) : null}
                                onChange={(date) => {
                                    const formattedDate = date instanceof Date ? date.toISOString() : new Date(date).toISOString();
                                    field.onChange(formattedDate)
                                
                                }}
                                dateFormmat="yyyy-MM-dd"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={edit_user_form.control}
                        name="color"
                        render={({ field ,fieldState }) => (
                    <FormItem>
                        <FormLabel> Color </FormLabel>
                        <FormControl>
                            <SWR_Color field={field}  fieldState={fieldState} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                        )}
                    />
                </div>


                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={edit_user_form.control}
                        name="isLogin"
                        render={({ field }) => (
                    <FormItem>
                        <FormLabel> isLogin </FormLabel>
                        <FormControl>
                        <Switch  checked={field.value}  onCheckedChange={
                    (value)=>{
                        field.onChange(value)
                        setisLogin(value)
                    }
                    
                    } />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={edit_user_form.control}
                        name="isstaff"
                        render={({ field }) => (
                    <FormItem>
                        <FormLabel> isstaff </FormLabel>
                        <FormControl>
                        <Switch  checked={field.value}  onCheckedChange={
                    (value)=>{
                        field.onChange(value)
                        setisstaff(value)
                    }
                    
                    } />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                        )}
                    />
                </div>



                <Button
                type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                > 提交 </Button>

                </form>
            </Form>


        </div>
    )
}

export default EditUserForm