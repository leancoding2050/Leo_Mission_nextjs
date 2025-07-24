// "use client";

// import * as z from "zod";
// import {  useTransition } from "react";
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

// import { Admin_Login_Schema } from "@/actions/Login-Admin/schema"; 
// import { Admin_login_action } from "@/actions/Login-Admin";

// const Admin_Login_Form = () => {
//     const [ isPending, startTransition ] = useTransition(); 

//     const admin_login_form = useForm<z.infer<typeof Admin_Login_Schema>>({
//         resolver: zodResolver(Admin_Login_Schema),
//         defaultValues:{
//             username: "",
//             password : "",
//             isstaff: true,
//             isadmin: true,
//         }
//     })

//     const admin_login_form_onSubmit = (values:z.infer<typeof Admin_Login_Schema>) => {
//         console.log("-- admin_input_data -- :",values,"-- End --" );
//         startTransition(() => {
//             Admin_login_action(values)
//         })
//     }
//     return(
//         <>
//         Admin login page
//         <Form {...admin_login_form} >
//             <form 
//                 onSubmit={admin_login_form.handleSubmit(admin_login_form_onSubmit)}
//                 className="space-y-6"
//             >
//                 <div className="space-y-6" >
//                     <FormField 
//                         control={admin_login_form.control}
//                         name="username"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel> UserName </FormLabel>
//                                 <FormControl>
//                                     <Input
//                                         {...field}
//                                         disabled={isPending}
//                                         placeholder="Enter username"
//                                         type="text"
//                                     />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                 </div>

//                 <div className="space-y-6" >
//                     <FormField 
//                         control={admin_login_form.control}
//                         name="password"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel> Password </FormLabel>
//                                 <FormControl>
//                                     <Input
//                                         {...field}
//                                         disabled={isPending}
//                                         placeholder="Enter password"
//                                         type="text"
//                                     />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                 </div>

//                 <Button disabled={isPending} type="submit" >
//                     login
//                 </Button>

//             </form>
//         </Form>
//         </>
//     )
// }
// export default Admin_Login_Form


"use client";

import * as z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { Admin_Login_Schema } from "@/actions/Login-Admin/schema";
import { Admin_login_action } from "@/actions/Login-Admin";

const Admin_Login_Form = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const admin_login_form = useForm<z.infer<typeof Admin_Login_Schema>>({
    resolver: zodResolver(Admin_Login_Schema),
    defaultValues: {
      username: "",
      password: "",
      isstaff: true,
      isadmin: true,
    },
  });

  const admin_login_form_onSubmit = (values: z.infer<typeof Admin_Login_Schema>) => {
    console.log("-- admin_input_data -- :", values, "-- End --");
    startTransition(() => {
      Admin_login_action(values).then((result) => {
        if (result?.success && result?.redirect) {
          router.push(result.redirect);
        } else if (result?.error) {
          admin_login_form.setError("root", { message: result.error });
        }
      });
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white font-noto-sans-tc p-4">
      <h1 className="text-2xl sm:text-3xl text-primary-1 mb-8">管理員登錄</h1>
      <Form {...admin_login_form}>
        <form
          onSubmit={admin_login_form.handleSubmit(admin_login_form_onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={admin_login_form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-1 text-base">用戶名</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="輸入用戶名"
                      type="text"
                      className="border-grey-2 rounded-md text-primary-1 focus:ring-primary-1"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={admin_login_form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-1 text-base">密碼</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="輸入密碼"
                      type="password"
                      className="border-grey-2 rounded-md text-primary-1 focus:ring-primary-1"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={admin_login_form.control}
              name="isadmin"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      disabled={isPending}
                      className="text-primary-1 focus:ring-primary-1"
                    />
                  </FormControl>
                  <FormLabel className="text-primary-1 text-base">管理員</FormLabel>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={admin_login_form.control}
              name="isstaff"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      disabled={isPending}
                      className="text-primary-1 focus:ring-primary-1"
                    />
                  </FormControl>
                  <FormLabel className="text-primary-1 text-base">員工</FormLabel>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
          </div>
          {admin_login_form.formState.errors.root && (
            <p className="text-red-500 text-sm text-center">
              {admin_login_form.formState.errors.root.message}
            </p>
          )}
          <Button
            disabled={isPending}
            type="submit"
            className="w-full h-12 bg-primary-1 text-white hover:bg-grey-2 rounded-md transition-colors duration-300"
          >
            登錄
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Admin_Login_Form;