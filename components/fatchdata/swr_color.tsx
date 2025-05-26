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

interface Color {
  id: number;
  color_name: string;
}

interface FieldStateCustom {
  invalid: boolean;
  isTouched: boolean;
  isDirty: boolean;
  error?: FieldError;
}

interface SWR_ColorProps<T extends FieldValues, K extends Path<T>> {
  field: ControllerRenderProps<T, K>;
  fieldState: FieldStateCustom;
}

const fetcher = async (url: string): Promise<Color[]> => {
  const res = await fetch(url);
  return res.json();
};

export const SWR_Color = <T extends FieldValues, K extends Path<T>>({
  field,
  fieldState,
}: SWR_ColorProps<T, K>) => {
  const { data, error, isLoading } = useSWR<Color[]>(
    "http://127.0.0.1:8000/api/mission/colors/", // 統一 API 端點
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  );

  if (error) return <div>無法載入顏色列表</div>;
  if (isLoading) return <div>載入中...</div>;
  if (!data || !Array.isArray(data)) return <div>無可用顏色</div>;
  if (data.length === 0) return <div>目前無可用顏色</div>;

  // 驗證 color_name 是否為有效 CSS 顏色
  const isValidColor = (color: string) =>
    /^#[0-9A-F]{6}$/i.test(color) || // 十六進位色碼
    /^(rgb|rgba|hsl|hsla)\(.*\)$/.test(color) || // RGB/RGBA/HSL/HSLA
    /^[a-z]+$/i.test(color); // 顏色名稱（如 red, blue）

  return (
    <div>
      <Select
        value={field.value as string}
        onValueChange={field.onChange}
        disabled={field.disabled}
      >
        <SelectTrigger
          className={fieldState.invalid ? "border-red-500" : ""}
          aria-label="選擇顏色"
        >
          <SelectValue placeholder="選擇顏色" />
        </SelectTrigger>
        <SelectContent>
          {data.map((color) => (
            <SelectItem key={color.id} value={color.color_name}>
              <div className="flex items-center space-x-2">
                <div
                  className="w-6 h-6 rounded border border-gray-200 shadow-sm"
                  style={{
                    backgroundColor: isValidColor(color.color_name)
                      ? color.color_name
                      : "#000000", // 預設黑色
                  }}
                />
                <span>顏色碼: {color.color_name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
    </div>
  );
};

export default SWR_Color;

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

// interface Color {
//   id: number;
//   color_name: string;
// }

// interface FieldStateCustom {
//   invalid: boolean;
//   isTouched: boolean;
//   isDirty: boolean;
//   error?: FieldError;
// }

// interface SWR_ColorProps {
//   field: ControllerRenderProps<{ color: string }, "color">;
//   fieldState: FieldStateCustom;
// }

// const fetcher = async (url: string): Promise<Color[]> => {
//   const res = await fetch(url);
//   return res.json();
// };

// const SWR_Color = ({ field, fieldState }: SWR_ColorProps) => {
//   const { data, error, isLoading } = useSWR<Color[]>("/api/Color_Lists", fetcher);

//   if (error) return <div>無法載入顏色列表</div>;
//   if (isLoading) return <div>載入中...</div>;
//   if (!data || !Array.isArray(data)) return <div>無可用顏色</div>;

//   // 可選：驗證 color_name 是否為有效 CSS 顏色
//   const isValidColor = (color: string) =>
//     /^#[0-9A-F]{6}$/i.test(color) || // 十六進位色碼
//     /^(rgb|rgba|hsl|hsla)\(.*\)$/.test(color) || // RGB/RGBA/HSL/HSLA
//     /^[a-z]+$/i.test(color); // 顏色名稱（如 red, blue）

//   return (
//     <div>
//       <Select
//         value={field.value}
//         onValueChange={field.onChange}
//         disabled={field.disabled}
//       >
//         <SelectTrigger
//           className={fieldState.invalid ? "border-red-500" : ""}
//           aria-label="選擇顏色"
//         >
//           <SelectValue placeholder="選擇顏色" />
//         </SelectTrigger>
//         <SelectContent>
//           {data.map((color) => (
//             <SelectItem key={color.id} value={color.color_name}>
//               <div className="flex items-center space-x-2">
//                 <div
//                   className="w-6 h-6 rounded border border-gray-200 shadow-sm"
//                   style={{
//                     backgroundColor: isValidColor(color.color_name)
//                       ? color.color_name
//                       : "#000000", // 預設黑色
//                   }}
//                 />
//                 <span>顏色碼: {color.color_name}</span>
//               </div>
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//       {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
//     </div>
//   );
// };

// export default SWR_Color;