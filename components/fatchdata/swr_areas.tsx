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

interface MissionArea {
  id: number;
  mission_area: string;
}

interface FieldStateCustom {
  invalid: boolean;
  isTouched: boolean;
  isDirty: boolean;
  error?: FieldError;
}

interface SWR_Areas_SelectProps<T extends FieldValues, K extends Path<T>> {
  field: ControllerRenderProps<T, K>;
  fieldState: FieldStateCustom;
}

const fetcher = (url: string): Promise<MissionArea[]> =>
  fetch(url).then((res) => res.json());

export const SWR_Areas_Select = <T extends FieldValues, K extends Path<T>>({
  field,
  fieldState,
}: SWR_Areas_SelectProps<T, K>) => {
  const { data, error, isLoading } = useSWR<MissionArea[]>(
    "http://127.0.0.1:8000/api/mission/missionarea/",
    fetcher
  );

  if (error) return <div>錯誤：{error.message}</div>;
  if (isLoading) return <div>載入中...</div>;
  if (!data || !Array.isArray(data)) return <div>無可用區域</div>;
  if (data.length === 0) return <div>目前無可用區域</div>;

  return (
    <div>
      <Select
        value={field.value as string}
        onValueChange={field.onChange}
        disabled={field.disabled}
      >
        <SelectTrigger
          className={fieldState.invalid ? "border-red-500" : ""}
          aria-label="選擇地區"
        >
          <SelectValue placeholder="選擇地區" />
        </SelectTrigger>
        <SelectContent>
          {data.map((datas) => (
            <SelectItem
              key={datas.id}
              value={datas.mission_area}
              aria-label={`選擇 ${datas.mission_area}`}
            >
              {datas.mission_area}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
    </div>
  );
};
// "use client";

// import { Checkbox } from "@/components/ui/checkbox";
// import useSWR from "swr";
// import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { ControllerRenderProps, FieldError } from "react-hook-form";

// interface MissionArea {
//   id: number;
//   mission_area: string;
// }

// interface FieldStateCustom {
//   invalid: boolean;
//   isTouched: boolean;
//   isDirty: boolean;
//   error?: FieldError;
// }

// interface SWR_AreasProps {
//   field: ControllerRenderProps<{ job_area: string[] }, "job_area">;
//   fieldState: FieldStateCustom;
// }

// const fetcher = (url: string): Promise<MissionArea[]> =>
//   fetch(url).then((res) => res.json());

// export const SWR_Areas = ({ field, fieldState }: SWR_AreasProps) => {
//   const { data, error, isLoading } = useSWR<MissionArea[]>(
//     "http://127.0.0.1:8000/api/mission/missionarea/",
//     fetcher
//   );

//   if (error) return <div>錯誤：{error.message}</div>;
//   if (isLoading) return <div>載入中...</div>;
//   if (!data || !Array.isArray(data)) return <div>無可用區域</div>;

//   const fieldValue = field.value || []; // field.value 應為 string[]，提供預設值

//   return (
//     <FormItem>
//       {data.map((datas) => (
//         <div key={datas.id} className="flex items-center space-x-2">
//           <FormControl>
//             <Checkbox
//               checked={fieldValue.includes(datas.mission_area)}
//               onCheckedChange={(checked) => {
//                 if (checked) {
//                   field.onChange([...fieldValue, datas.mission_area]);
//                 } else {
//                   field.onChange(
//                     fieldValue.filter((value: string) => value !== datas.mission_area)
//                   );
//                 }
//               }}
//             />
//           </FormControl>
//           <FormLabel className="font-normal">{datas.mission_area}</FormLabel>
//         </div>
//       ))}
//       {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
//     </FormItem>
//   );
// };