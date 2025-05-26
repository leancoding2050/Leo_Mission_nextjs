"use client";

import { Checkbox } from "@/components/ui/checkbox";
import useSWR from "swr";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerRenderProps, FieldError, FieldValues, Path } from "react-hook-form";

interface MissionSubject {
  id: number; // 與其他組件一致，假設 API 返回 number
  mission_subject: string;
}

interface FieldStateCustom {
  invalid: boolean;
  isTouched: boolean;
  isDirty: boolean;
  error?: FieldError;
}

interface SWR_SubjectProps<T extends FieldValues, K extends Path<T>> {
  field: ControllerRenderProps<T, K>;
  fieldState: FieldStateCustom;
}

const fetcher = async (url: string): Promise<MissionSubject[]> => {
  const res = await fetch(url);
  return res.json();
};

export const SWR_Subject = <T extends FieldValues, K extends Path<T>>({
  field,
  fieldState,
}: SWR_SubjectProps<T, K>) => {
  const { data, error, isLoading } = useSWR<MissionSubject[]>(
    "http://127.0.0.1:8000/api/mission/missionsubject/",
    fetcher
  );

  if (error) return <div>錯誤：{error.message}</div>;
  if (isLoading) return <div>載入中...</div>;
  if (!data || !Array.isArray(data)) return <div>無可用科目</div>;
  if (data.length === 0) return <div>目前無可用科目</div>;

  const fieldValue = (field.value as string[]) || []; // 確保 field.value 是 string[]

  return (
    <FormItem>
      {data.map((datas) => (
        <div key={datas.id} className="flex items-center space-x-2">
          <FormControl>
            <Checkbox
              checked={fieldValue.includes(datas.mission_subject)}
              onCheckedChange={(checked) => {
                if (checked) {
                  field.onChange([...fieldValue, datas.mission_subject]);
                } else {
                  field.onChange(fieldValue.filter((value) => value !== datas.mission_subject));
                }
              }}
              aria-label={`選擇 ${datas.mission_subject}`}
            />
          </FormControl>
          <FormLabel className="font-normal">{datas.mission_subject}</FormLabel>
        </div>
      ))}
      {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
    </FormItem>
  );
};

// "use client";

// import { Checkbox } from "@/components/ui/checkbox";
// import useSWR from "swr";
// import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { ControllerRenderProps, FieldError } from "react-hook-form";

// interface MissionSubject {
//   id: number; // 假設 id 為 number，與其他組件一致
//   mission_subject: string;
// }

// interface FieldStateCustom {
//   invalid: boolean;
//   isTouched: boolean;
//   isDirty: boolean;
//   error?: FieldError;
// }

// interface SWR_SubjectProps {
//   field: ControllerRenderProps<{ mission_subject: string[] }, "mission_subject">;
//   fieldState: FieldStateCustom;
// }

// const fetcher = async (url: string): Promise<MissionSubject[]> => {
//   const res = await fetch(url);
//   return res.json();
// };

// export const SWR_Subject = ({ field, fieldState }: SWR_SubjectProps) => {
//   const { data, error, isLoading } = useSWR<MissionSubject[]>(
//     "http://127.0.0.1:8000/api/mission/missionsubject/",
//     fetcher
//   );

//   if (error) return <div>錯誤：{error.message}</div>;
//   if (isLoading) return <div>載入中...</div>;
//   if (!data || !Array.isArray(data)) return <div>無可用科目</div>;

//   const fieldValue = field.value || []; // field.value 是 string[]，提供預設值

//   return (
//     <FormItem>
//       {data.map((datas) => (
//         <div key={datas.id} className="flex items-center space-x-2">
//           <FormControl>
//             <Checkbox
//               checked={fieldValue.includes(datas.mission_subject)}
//               onCheckedChange={(checked) => {
//                 if (checked) {
//                   field.onChange([...fieldValue, datas.mission_subject]);
//                 } else {
//                   field.onChange(
//                     fieldValue.filter((value: string) => value !== datas.mission_subject)
//                   );
//                 }
//               }}
//               aria-label={`選擇 ${datas.mission_subject}`}
//             />
//           </FormControl>
//           <FormLabel className="font-normal">{datas.mission_subject}</FormLabel>
//         </div>
//       ))}
//       {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
//     </FormItem>
//   );
// };