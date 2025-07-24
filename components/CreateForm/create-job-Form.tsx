
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
import { Create_Job_schema } from "@/actions/Create-Job/schema";
import { Switch } from "@/components/ui/switch";
import DatePicker from "react-multi-date-picker";
import { SWR_Place_Select } from "../fatchdata/swr_place_select";
import { SWR_Areas_Select } from "../fatchdata/swr_areas_select";
import { Create_Job_Action } from "@/actions/Create-Job";
import { useParams, useRouter } from "next/navigation";
import { SWR_Subject_Normal } from "../fatchdata/swr_subject";
import { SWR_SchoolName_Select } from "../fatchdata/swr_schoolname_select";

interface UserData {
  id: string;
  subject: string[];
}

const CreateJobForm = () => {
  const param = useParams();
  const router = useRouter();
  const UserId = param?.id as string;
  const [getUserdata, setGetUserdata] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchUserdata = async (userId: string) => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/User_Lists_by_ID/${userId}`);
        if (!res.ok) throw new Error("無法獲取用戶資料");
        const data = await res.json();
        setGetUserdata(Array.isArray(data) ? data : [data]);
        setError(null);
      } catch (error) {
        console.error("獲取用戶資料失敗：", error);
        setError("無法載入用戶資料，請稍後再試");
        setGetUserdata([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserdata(UserId);
  }, [UserId]);

  const UserSubject = getUserdata[0]?.subject || [];

  const job_create_form = useForm<z.infer<typeof Create_Job_schema>>({
    resolver: zodResolver(Create_Job_schema),
    defaultValues: {
      userId: UserId,
      job_code: "",
      job_subject: UserSubject.length > 0 ? UserSubject[0] : "", // 預設第一個科目
      job_place: "",
      job_area: "",
      job_school_name: "",
      job_price: 0,
      job_day: "",
      job_public: false,
      showprice: false,
      job_time_start: "",
      job_time_end: "",
      job_time_h: 0,
      job_contect: "",
    },
  });

  const { watch, setValue } = job_create_form;
  const startTimeValue = watch("job_time_start");
  const endTimeValue = watch("job_time_end");

  useEffect(() => {
    const isValidTimeFormat = (time: string) =>
      /^\d{4}$/.test(time) &&
      parseInt(time.slice(0, 2)) < 24 &&
      parseInt(time.slice(2)) < 60;

    if (
      startTimeValue &&
      endTimeValue &&
      isValidTimeFormat(startTimeValue) &&
      isValidTimeFormat(endTimeValue)
    ) {
      const startTime = new Date(
        `1970-01-01T${startTimeValue.slice(0, 2)}:${startTimeValue.slice(2)}`
      );
      const endTime = new Date(
        `1970-01-01T${endTimeValue.slice(0, 2)}:${endTimeValue.slice(2)}`
      );

      if (!isNaN(startTime.getTime()) && !isNaN(endTime.getTime())) {
        const timeDiffInHours =
          (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        const formattedTimeDiff = parseFloat(timeDiffInHours.toFixed(2));
        setValue("job_time_h", formattedTimeDiff);
      } else {
        setValue("job_time_h", 0);
      }
    } else {
      setValue("job_time_h", 0);
    }
  }, [startTimeValue, endTimeValue, setValue]);

  const job_create_form_onSubmit = (values: z.infer<typeof Create_Job_schema>) => {
    console.log("-- 表單輸入資料 -- :", values, "-- 結束 --");
    startTransition(() => {
      Create_Job_Action(values)
        .then((result) => {
          console.log("工作創建成功:", result);
          if (result.data) {
            router.push(`/user/${UserId}/admin/jobLists`);
          } else {
            setError("創建工作失敗，未返回數據");
          }
        })
        .catch((error) => {
          console.error("創建工作失敗:", error);
          setError("創建工作失敗，請稍後再試");
        });
    });
  };

  if (isLoading) return <div>載入中...</div>;
  if (error) return <div>{error}</div>;
  if (!getUserdata.length) return <div>無用戶資料</div>;

  return (
    <div className="p-4 ml-[50px]">
      <h2 className="text-2xl font-bold mb-4">創建工作表單</h2>
      <Form {...job_create_form}>
        <form
          onSubmit={job_create_form.handleSubmit(job_create_form_onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={job_create_form.control}
            name="job_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>工作代碼</FormLabel>
                <FormControl>
                  <Input
                    placeholder="工作代碼"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_create_form.control}
            name="job_subject"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>科目</FormLabel>
                <FormControl>
                  <SWR_Subject_Normal
                    field={field}
                    fieldState={fieldState}
                    allowedSubjects={UserSubject}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_create_form.control}
            name="job_contect"
            render={({ field }) => (
              <FormItem>
                <FormLabel>工作內容</FormLabel>
                <FormControl>
                  <Input
                    placeholder="工作內容"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_create_form.control}
            name="job_place"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>地點</FormLabel>
                <FormControl>
                  <SWR_Place_Select field={field} fieldState={fieldState} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_create_form.control}
            name="job_area"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>區域</FormLabel>
                <FormControl>
                  <SWR_Areas_Select field={field} fieldState={fieldState} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_create_form.control}
            name="job_school_name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>學校名稱</FormLabel>
                <FormControl>
                  <SWR_SchoolName_Select field={field} fieldState={fieldState} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_create_form.control}
            name="job_time_start"
            render={({ field }) => (
              <FormItem>
                <FormLabel>開始時間 (HHMM)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="例如 0900"
                    {...field}
                    pattern="\d{4}"
                    maxLength={4}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_create_form.control}
            name="job_time_end"
            render={({ field }) => (
              <FormItem>
                <FormLabel>結束時間 (HHMM)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="例如 1700"
                    {...field}
                    pattern="\d{4}"
                    maxLength={4}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_create_form.control}
            name="job_time_h"
            render={({ field }) => (
              <FormItem>
                <FormLabel>工作時數</FormLabel>
                <FormControl>
                  <Input
                    placeholder="工作時數"
                    value={field.value}
                    readOnly
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_create_form.control}
            name="job_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>價格</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="價格"
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      field.onChange(isNaN(newValue) ? 0 : newValue);
                    }}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_create_form.control}
            name="job_day"
            render={({ field }) => (
              <FormItem>
                <FormLabel>工作日期</FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value ? new Date(field.value) : null}
                    onChange={(date) => {
                      const formattedDate =
                        date && !Array.isArray(date)
                          ? date.toDate().toISOString()
                          : "";
                      field.onChange(formattedDate);
                    }}
                    format="YYYY-MM-DD"
                    placeholder="工作日期"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_create_form.control}
            name="showprice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>顯示價格</FormLabel>
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
            control={job_create_form.control}
            name="job_public"
            render={({ field }) => (
              <FormItem>
                <FormLabel>是否公開</FormLabel>
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
          <Button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isPending}
          >
            {isPending ? "提交中..." : "提交"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateJobForm;