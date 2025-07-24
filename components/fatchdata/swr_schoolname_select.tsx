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

interface SWR_SchoolName_SelectProps<T extends FieldValues, K extends Path<T>> {
  field: ControllerRenderProps<T, K>;
  fieldState: FieldStateCustom;
}

const fetcher = async (url: string): Promise<MissionSchoolName[]> => {
  const res = await fetch(url);
  return res.json();
};

export const SWR_SchoolName_Select = <T extends FieldValues, K extends Path<T>>({
  field,
  fieldState,
}: SWR_SchoolName_SelectProps<T, K>) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  const { data, error, isLoading } = useSWR<MissionSchoolName[]>(
    `${apiBaseUrl}/api/mission/missionschool/`,
    fetcher
  );

  if (error) return <div>錯誤：{error.message}</div>;
  if (isLoading) return <div>載入中...</div>;
  if (!data || !Array.isArray(data)) return <div>無可用學校</div>;
  if (data.length === 0) return <div>目前無可用學校</div>;

  const selectedValue = data.find(d => d.mission_schoolname.toLowerCase() === (field.value as string)?.toLowerCase())?.mission_schoolname || field.value;


  return (
    <div>
      <Select
        value={selectedValue as string}
        onValueChange={field.onChange}
        disabled={field.disabled}
      >
        <SelectTrigger
          className={fieldState.invalid ? "border-red-500" : ""}
          aria-label="選擇地區"
        >
          <SelectValue placeholder="選擇地區" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {data.map((datas) => (
            <SelectItem
              key={datas.id}
              value={datas.mission_schoolname}
              aria-label={`選擇 ${datas.mission_schoolname}`}
            >
              {datas.mission_schoolname}
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