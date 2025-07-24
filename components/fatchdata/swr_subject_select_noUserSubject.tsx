"use client";

import useSWR from "swr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps, FieldError, FieldValues, Path } from "react-hook-form";
import { FormMessage } from "@/components/ui/form";

interface MissionSubject {
  id: number;
  mission_subject: string;
}

interface FieldStateCustom {
  invalid: boolean;
  isTouched: boolean;
  isDirty: boolean;
  error?: FieldError;
}

interface SWR_Subject_SelectProps<T extends FieldValues, K extends Path<T>> {
  field: ControllerRenderProps<T, K>;
  fieldState: FieldStateCustom;
}

const fetcher = async (url: string): Promise<MissionSubject[]> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("無法獲取科目數據");
  return res.json();
};

export const SWR_Subject_Select_noUserSubject = <T extends FieldValues, K extends Path<T>>({
  field,
  fieldState,
}: SWR_Subject_SelectProps<T, K>) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  const { data, error, isLoading } = useSWR<MissionSubject[]>(
    `${apiBaseUrl}/api/mission/missionsubject/`,
    fetcher
  );

  if (error) return <div>錯誤：{error.message}</div>;
  if (isLoading) return <div>載入中...</div>;
  if (!data || !Array.isArray(data)) return <div>無可用科目</div>;
  if (data.length === 0) return <div>目前無可用科目</div>;

  // 確保 field.value 存在於選項中
  const selectedValue = data.find(d => d.mission_subject.toLowerCase() === (field.value as string)?.toLowerCase())?.mission_subject || field.value;

  return (
    <div>
      <Select
        value={selectedValue as string}
        onValueChange={field.onChange}
        disabled={field.disabled}
      >
        <SelectTrigger
          className={fieldState.invalid ? "border-red-500" : ""}
          aria-label="選擇科目"
        >
          <SelectValue placeholder="選擇科目" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {data.map((datas) => (
            <SelectItem
              key={datas.id}
              value={datas.mission_subject}
              aria-label={`選擇 ${datas.mission_subject}`}
            >
              {datas.mission_subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
    </div>
  );
};

// "use client";

// import useSWR from "swr";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ControllerRenderProps, FieldError, FieldValues, Path } from "react-hook-form";
// import { FormMessage } from "@/components/ui/form";

// interface MissionSubject {
//   id: number; // 假設 API 返回 number，與其他組件一致
//   mission_subject: string;
// }

// interface FieldStateCustom {
//   invalid: boolean;
//   isTouched: boolean;
//   isDirty: boolean;
//   error?: FieldError;
// }

// interface SWR_Subject_SelectProps<T extends FieldValues, K extends Path<T>> {
//   field: ControllerRenderProps<T, K>;
//   fieldState: FieldStateCustom;
// }

// const fetcher = async (url: string): Promise<MissionSubject[]> => {
//   const res = await fetch(url);
//   return res.json();
// };

// export const SWR_Subject_Select_noUserSubject = <T extends FieldValues, K extends Path<T>>({
//   field,
//   fieldState,
// }: SWR_Subject_SelectProps<T, K>) => {
//   const { data, error, isLoading } = useSWR<MissionSubject[]>(
//     "http://127.0.0.1:8000/api/mission/missionsubject/",
//     fetcher
//   );

//   if (error) return <div>錯誤：{error.message}</div>;
//   if (isLoading) return <div>載入中...</div>;
//   if (!data || !Array.isArray(data)) return <div>無可用科目</div>;
//   if (data.length === 0) return <div>目前無可用科目</div>;

//   return (
//     <div>
//       <Select
//         value={field.value as string}
//         onValueChange={field.onChange}
//         disabled={field.disabled}
//       >
//         <SelectTrigger
//           className={fieldState.invalid ? "border-red-500" : ""}
//           aria-label="選擇科目"
//         >
//           <SelectValue placeholder="選擇科目" />
//         </SelectTrigger>
//         <SelectContent>
//           {data.map((datas) => (
//             <SelectItem
//               key={datas.id}
//               value={datas.mission_subject}
//               aria-label={`選擇 ${datas.mission_subject}`}
//             >
//               {datas.mission_subject}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//       {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
//     </div>
//   );
// };