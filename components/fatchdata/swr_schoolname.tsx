"use client";

import useSWR from "swr";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerRenderProps, FieldError, FieldValues, Path } from "react-hook-form";

interface MissionSchoolName {
  id: number;
  mission_schoolname: string;
}

interface FieldStateCustom {
  invalid: boolean;
  isTouched: boolean;
  isDirty: boolean;
  error?: FieldError;
}

interface SWR_SchoolName_MultiProps<T extends FieldValues, K extends Path<T>> {
  field: ControllerRenderProps<T, K>;
  fieldState: FieldStateCustom;
}

const fetcher = async (url: string): Promise<MissionSchoolName[]> => {
  const res = await fetch(url);
  return res.json();
};

export const SWR_SchoolName_Multi = <T extends FieldValues, K extends Path<T>>({
  field,
  fieldState,
}: SWR_SchoolName_MultiProps<T, K>) => {
  const { data, error, isLoading } = useSWR<MissionSchoolName[]>(
    "http://127.0.0.1:8000/api/mission/missionschool/",
    fetcher
  );

  if (error) return <div>錯誤：{error.message}</div>;
  if (isLoading) return <div>載入中...</div>;
  if (!data || !Array.isArray(data)) return <div>無可用學校</div>;
  if (data.length === 0) return <div>目前無可用學校</div>;

  const fieldValue = (field.value as string[]) || [];

  return (
    <FormItem>
      {data.map((datas) => (
        <div key={datas.id} className="flex items-center space-x-2">
          <FormControl>
            <Checkbox
              checked={fieldValue.includes(datas.mission_schoolname)}
              onCheckedChange={(checked) => {
                if (checked) {
                  field.onChange([...fieldValue, datas.mission_schoolname]);
                } else {
                  field.onChange(fieldValue.filter((value) => value !== datas.mission_schoolname));
                }
              }}
              aria-label={`選擇 ${datas.mission_schoolname}`}
            />
          </FormControl>
          <FormLabel className="font-normal">{datas.mission_schoolname}</FormLabel>
        </div>
      ))}
      {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
    </FormItem>
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
// import { ControllerRenderProps, FieldError } from "react-hook-form";
// import { FormMessage } from "@/components/ui/form";

// interface MissionSchoolName {
//   id: number; // 假設 id 為 number，與其他組件一致
//   mission_schoolname: string;
// }

// interface FieldStateCustom {
//   invalid: boolean;
//   isTouched: boolean;
//   isDirty: boolean;
//   error?: FieldError;
// }

// interface SWR_SchoolNameProps {
//   field: ControllerRenderProps<{ school_name: string }, "school_name">;
//   fieldState: FieldStateCustom;
// }

// const fetcher = async (url: string): Promise<MissionSchoolName[]> => {
//   const res = await fetch(url);
//   return res.json();
// };

// export const SWR_SchoolName = ({ field, fieldState }: SWR_SchoolNameProps) => {
//   const { data, error, isLoading } = useSWR<MissionSchoolName[]>(
//     "http://127.0.0.1:8000/api/mission/missionschool/",
//     fetcher
//   );

//   if (error) return <div>錯誤：{error.message}</div>;
//   if (isLoading) return <div>載入中...</div>;
//   if (!data || !Array.isArray(data)) return <div>無可用學校</div>;

//   return (
//     <div>
//       <Select
//         value={field.value}
//         onValueChange={field.onChange}
//         disabled={field.disabled}
//       >
//         <SelectTrigger
//           className={fieldState.invalid ? "border-red-500" : ""}
//           aria-label="選擇學校名稱"
//         >
//           <SelectValue placeholder="選擇學校名稱" />
//         </SelectTrigger>
//         <SelectContent>
//           {data.map((datas) => (
//             <SelectItem
//               key={datas.id}
//               value={datas.mission_schoolname}
//               aria-label={`選擇 ${datas.mission_schoolname}`}
//             >
//               {datas.mission_schoolname}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//       {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
//     </div>
//   );
// };