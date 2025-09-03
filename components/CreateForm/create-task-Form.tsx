

"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Create_Task_Schema } from "@/actions/Create-Task/schema";
import { Switch } from "@/components/ui/switch";
import { SWR_Areas_Select } from "../fatchdata/swr_areas_select";
import { useParams ,useRouter } from "next/navigation";
import { Create_Task_Action } from "@/actions/Create-Task";
import { SWR_Subject_Select_noUserSubject } from "../fatchdata/swr_subject_select_noUserSubject";

interface JobData {
  id: string;
  job_code: string;
  job_school_name: string;
  job_subject: string;
  job_area: string;
  job_time_h: string;
  job_day: string;
  showprice: boolean;
}

interface TeacherData {
  id: string;
  username: string;
  nickname: string;
  role: string;
}

const CreateTaskForm = () => {
  const param = useParams();
    const router = useRouter(); // 初始化 useRouter
  const UserId = param?.id as string;
  const [isPending, startTransition] = useTransition();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<JobData[]>([]);
  const [GetJobLists, setGetJobLists] = useState<JobData[]>([]);
  const [searchField, setSearchField] = useState("all");
  const [getTeacher, setGetTeacher] = useState<TeacherData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchJobListsData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/Job_Lists`);
        if (!res.ok) throw new Error("無法獲取任務列表");
        const data = await res.json();
        setGetJobLists(data);
        setError(null);
      } catch (error) {
        console.error("獲取任務列表失敗:", error);
        setError("無法載入任務列表，請稍後再試");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobListsData();
  }, []);

  useEffect(() => {
    const fetchTeacherData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/User_Lists`);
        if (!res.ok) throw new Error("無法獲取教師列表");
        const data = await res.json();
        setGetTeacher(data);
        setError(null);
      } catch (error) {
        console.error("獲取教師列表失敗:", error);
        setError("無法載入教師列表，請稍後再試");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeacherData();
  }, []);

  const handleInputFocus = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    startTransition(async () => {
      try {
        const response = await fetch(`/api/Job_Lists_search?query=${searchQuery}&field=${searchField}`);
        if (!response.ok) throw new Error("搜尋失敗");
        const data = await response.json();
        setSearchResults(data);
        setError(null);
      } catch (error) {
        console.error("搜尋失敗:", error);
        setError("搜尋失敗，請稍後再試");
      }
    });
  };

  const handleAddJob = (job: JobData) => {
    const currentJobs = task_create_form.getValues("job");
    const currentJobIds = task_create_form.getValues("jobidbyarray");
    const currentSchoolNames = task_create_form.getValues("school_name");

    const currentJobName = `${job.job_school_name}-${job.job_subject}-${job.job_day.split("T")[0]}`;
    const date = new Date(job.job_day.split("T")[0]);
    const dayOfWeek = date.toLocaleDateString("zh-TW", { weekday: "long" });
    const currentJobNameWithWeekday = `${currentJobName}-${dayOfWeek}`;

    if (!currentJobs.includes(job.id)) {
      const updatedValues = [...currentJobs, currentJobNameWithWeekday];
      const updatedValuesId = [...currentJobIds, job.id];
      const updatedSchoolNames = Array.from(new Set([...currentSchoolNames, job.job_school_name]));

      task_create_form.setValue("job", updatedValues);
      task_create_form.setValue("jobidbyarray", updatedValuesId);
      task_create_form.setValue("school_name", updatedSchoolNames);

      console.log("已加入任務:", job.job_code, " 已加入ID ", updatedValuesId);
    } else {
      console.log("任務已存在:", job.job_code);
    }
  };

  const task_create_form = useForm<z.infer<typeof Create_Task_Schema>>({
    resolver: zodResolver(Create_Task_Schema),
    defaultValues: {
      userId: UserId,
      task_title: "",
      task_subject: "",
      task_contect: "",
      task_code: "",
      task_address: "",
      task_area: "",
      task_price: 0,
      task_public: false,
      task_apply: false,
      showprice: false,
      school_name: [],
      completed: false,
      job: [],
      jobidbyarray: [],
      teacher: "",
    },
  });

  const task_create_form_onSubmit = (values: z.infer<typeof Create_Task_Schema>) => {
    console.log("-- task_input_data -- :", values, "-- End --");
    startTransition(() => {
      Create_Task_Action(values)
        .then((result) => {
          if(result.data){
            router.push(`/user/${UserId}/admin/jobLists`); // 例如跳轉到工作列表頁面
          }
          console.log("任務創建成功:", result);
          setError(null);
          
        })
        .catch((error) => {
          console.error("創建任務失敗:", error);
          setError("創建任務失敗，請稍後再試");
        });
    });
  };

  const selecteJobs = task_create_form.watch("job");

  if (isLoading) return <div>載入中...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4 ml-[50px]">
      <h2 className="text-2xl font-bold mb-4">創建任務表單</h2>
      <Form {...task_create_form}>
        <form onSubmit={task_create_form.handleSubmit(task_create_form_onSubmit)} className="space-y-4">
          <FormField
            control={task_create_form.control}
            name="task_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>任務標題</FormLabel>
                <FormControl>
                  <Input placeholder="任務標題" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={task_create_form.control}
            name="task_subject"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>科目</FormLabel>
                <FormControl>
                  <SWR_Subject_Select_noUserSubject field={field} fieldState={fieldState} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={task_create_form.control}
            name="task_contect"
            render={({ field }) => (
              <FormItem>
                <FormLabel>任務內容</FormLabel>
                <FormControl>
                  <Input placeholder="任務內容" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={task_create_form.control}
            name="task_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>任務代碼</FormLabel>
                <FormControl>
                  <Input placeholder="任務代碼" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={task_create_form.control}
            name="task_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>任務地址</FormLabel>
                <FormControl>
                  <Input placeholder="任務地址" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={task_create_form.control}
            name="task_area"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>任務區域</FormLabel>
                <FormControl>
                  <SWR_Areas_Select field={field} fieldState={fieldState} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={task_create_form.control}
            name="task_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>任務價格</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="任務價格"
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
            control={task_create_form.control}
            name="task_public"
            render={({ field }) => (
              <FormItem>
                <FormLabel>是否公開</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={task_create_form.control}
            name="task_apply"
            render={({ field }) => (
              <FormItem>
                <FormLabel>是否接受申請</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={task_create_form.control}
            name="showprice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>顯示價格</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={task_create_form.control}
            name="school_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>學校名稱</FormLabel>
                <FormControl>
                  <Input placeholder="學校名稱" value={field.value.join(", ")} readOnly disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={task_create_form.control}
            name="job"
            render={({ field }) => (
              <FormItem>
                <FormLabel>任務工作</FormLabel>
                <FormControl>
                  <Input
                    placeholder="任務工作"
                    {...field}
                    onFocus={handleInputFocus}
                    value={selecteJobs.join(", ")}
                    readOnly
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={task_create_form.control}
            name="teacher"
            render={({ field }) => (
              <FormItem>
                <FormLabel>教師</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
                    <SelectTrigger>
                      <SelectValue placeholder={field.value || "選擇教師"}>{field.value || "選擇教師"}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {getTeacher.map((datas) => (
                        <SelectItem value={datas.username} key={datas.id}>
                          {datas.nickname} : 角色 {datas.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isPopupVisible && (
            <div className="popup-overlay fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="popup-content bg-white p-6 rounded-lg shadow-lg max-w-[90%] max-h-[90%] overflow-auto">
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="輸入搜索內容..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 border rounded px-2 py-1"
                    />
                    <select
                      value={searchField}
                      onChange={(e) => setSearchField(e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="all">所有字段</option>
                      <option value="job_code">任務編號</option>
                      <option value="job_school_name">學校名稱</option>
                      <option value="job_subject">科目</option>
                      <option value="job_area">地區</option>
                      <option value="job_time_h">時間</option>
                      <option value="job_day">日期</option>
                      <option value="showprice">顯示價格</option>
                    </select>
                    <Button onClick={handleSearch} disabled={isPending} className="bg-black text-white hover:bg-gray-800 disabled:bg-gray-600 disabled:text-gray-300" >
                      {isPending ? "搜尋中..." : "搜尋"}
                    </Button>
                  </div>
                  {searchResults.length > 0 ? (
                    searchResults.map((job) => (
                      <div key={job.id} className="mt-2">
                        <p>
                          編號: {job.job_code}, 學校: {job.job_school_name}, 科目: {job.job_subject}, 地區: {job.job_area}, 時間: {job.job_time_h}, 日期: {job.job_day.split("T")[0]}, 顯示: {job.showprice ? "顯示價格" : "隱藏價格"}
                        </p>
                        <Button type="button" onClick={() => handleAddJob(job)} disabled={isPending} className="bg-black text-white hover:bg-gray-800 disabled:bg-gray-600 disabled:text-gray-300"  >
                          加入任務
                        </Button>
                      </div>
                    ))
                  ) : (
                    GetJobLists.map((job) => (
                      <div key={job.id} className="mt-2">
                        <p>
                          編號: {job.job_code}, 學校: {job.job_school_name}, 科目: {job.job_subject}, 地區: {job.job_area}, 時間: {job.job_time_h}, 日期: {job.job_day.split("T")[0]}, 顯示: {job.showprice ? "顯示價格" : "隱藏價格"}
                        </p>
                        <Button type="button" onClick={() => handleAddJob(job)} disabled={isPending} className="bg-black text-white hover:bg-gray-800 disabled:bg-gray-600 disabled:text-gray-300" >
                          加入任務
                        </Button>
                      </div>
                    ))
                  )}
                  <Button
                    onClick={handleClosePopup}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={isPending}
                  >
                    關閉
                  </Button>
                </div>
              </div>
            </div>
          )}
          <Button
            type="submit"
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isPending}
          >
            {isPending ? "提交中..." : "創建"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateTaskForm;