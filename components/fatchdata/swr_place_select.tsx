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
// import { z } from "zod";
// import { Edit_Job_schema } from "@/actions/Edit-Job/schema"; // 導入 Edit_Job_schema

// interface MissionPlace {
//   id: number; // 假設 id 為 number，與其他組件一致
//   mission_place: string;
// }

// interface FieldStateCustom {
//   invalid: boolean;
//   isTouched: boolean;
//   isDirty: boolean;
//   error?: FieldError;
// }

// interface SWR_Place_SelectProps {
//   field: ControllerRenderProps<z.infer<typeof Edit_Job_schema>, "job_place">;
//   fieldState: FieldStateCustom;
// }

// const fetcher = async (url: string): Promise<MissionPlace[]> => {
//   const res = await fetch(url);
//   return res.json();
// };

// export const SWR_Place_Select = ({ field, fieldState }: SWR_Place_SelectProps) => {
//   const { data, error, isLoading } = useSWR<MissionPlace[]>(
//     "http://127.0.0.1:8000/api/mission/missionplace/",
//     fetcher
//   );

//   if (error) return <div>錯誤：{error.message}</div>;
//   if (isLoading) return <div>載入中...</div>;
//   if (!data || !Array.isArray(data)) return <div>無可用地點</div>;

//   return (
//     <div>
//       <Select
//         value={field.value}
//         onValueChange={field.onChange}
//         disabled={field.disabled}
//       >
//         <SelectTrigger
//           className={fieldState.invalid ? "border-red-500" : ""}
//           aria-label="選擇地點"
//         >
//           <SelectValue placeholder="選擇地點" />
//         </SelectTrigger>
//         <SelectContent>
//           {data.map((datas) => (
//             <SelectItem
//               key={datas.id}
//               value={datas.mission_place}
//               aria-label={`選擇 ${datas.mission_place}`}
//             >
//               {datas.mission_place}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//       {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
//     </div>
//   );
// };

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

interface MissionPlace {
  id: number; // 與其他組件一致，假設 API 返回 number
  mission_place: string;
}

interface FieldStateCustom {
  invalid: boolean;
  isTouched: boolean;
  isDirty: boolean;
  error?: FieldError;
}

interface SWR_Place_SelectProps<T extends FieldValues, K extends Path<T>> {
  field: ControllerRenderProps<T, K>;
  fieldState: FieldStateCustom;
}

const fetcher = async (url: string): Promise<MissionPlace[]> => {
  const res = await fetch(url);
  return res.json();
};

export const SWR_Place_Select = <T extends FieldValues, K extends Path<T>>({
  field,
  fieldState,
}: SWR_Place_SelectProps<T, K>) => {
  const { data, error, isLoading } = useSWR<MissionPlace[]>(
    "http://127.0.0.1:8000/api/mission/missionplace/",
    fetcher
  );

  if (error) return <div>錯誤：{error.message}</div>;
  if (isLoading) return <div>載入中...</div>;
  if (!data || !Array.isArray(data)) return <div>無可用地點</div>;
  if (data.length === 0) return <div>目前無可用地點</div>;

  return (
    <div>
      <Select
        value={field.value as string}
        onValueChange={field.onChange}
        disabled={field.disabled}
      >
        <SelectTrigger
          className={fieldState.invalid ? "border-red-500" : ""}
          aria-label="選擇地點"
        >
          <SelectValue placeholder="選擇地點" />
        </SelectTrigger>
        <SelectContent>
          {data.map((datas) => (
            <SelectItem
              key={datas.id}
              value={datas.mission_place}
              aria-label={`選擇 ${datas.mission_place}`}
            >
              {datas.mission_place}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
    </div>
  );
};