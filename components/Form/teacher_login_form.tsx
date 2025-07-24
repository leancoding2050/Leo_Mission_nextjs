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
import { Teacher_login_action } from "@/actions/Login-Teacher";
import { Teacher_Login_Schema } from "@/actions/Login-Teacher/schema";

const Teacher_Login_Form = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const teacher_login_form = useForm<z.infer<typeof Teacher_Login_Schema>>({
    resolver: zodResolver(Teacher_Login_Schema),
    defaultValues: {
      username: "",
      password: "",
      isstaff: true,
      isadmin: false,
    },
  });

  const teacher_login_form_onSubmit = (
    values: z.infer<typeof Teacher_Login_Schema>
  ) => {
    console.log("-- teacher_input_data -- :", values, "-- End --");
    startTransition(async () => {
      const result = await Teacher_login_action(values);
      if (result.success && result.redirect) {
        router.push(result.redirect);
      } else if (result.error) {
        teacher_login_form.setError("root", { message: result.error });
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white font-noto-sans-tc p-4">
      <h1 className="text-2xl sm:text-3xl text-primary-1 mb-8">教師登錄</h1>
      <Form {...teacher_login_form}>
        <form
          onSubmit={teacher_login_form.handleSubmit(teacher_login_form_onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={teacher_login_form.control}
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
              control={teacher_login_form.control}
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
          </div>
          {teacher_login_form.formState.errors.root && (
            <p className="text-red-500 text-sm text-center">
              {teacher_login_form.formState.errors.root.message}
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

export default Teacher_Login_Form;