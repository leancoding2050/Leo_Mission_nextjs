"use client";

import useSWR from "swr";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerRenderProps} from "react-hook-form";
import { z } from "zod";
import { Edit_User_Schema } from "@/actions/Edit-User/schema";

type FormValues = z.infer<typeof Edit_User_Schema>;

interface MissionArea {
  id: number;
  mission_area: string;
}

interface SWR_Areas_SelectProps {
  field: ControllerRenderProps<FormValues, "area">;
  disabled?: boolean;
}

const fetcher = (url: string): Promise<MissionArea[]> =>
  fetch(url).then((res) => res.json());

export const SWR_Areas_Select = ({ field, disabled }: SWR_Areas_SelectProps) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  const { data, error, isLoading } = useSWR<MissionArea[]>(
    `${apiBaseUrl}/api/mission/missionarea/`,
    fetcher
  );

  if (error) return <div>錯誤：{error.message}</div>;
  if (isLoading) return <div>載入中...</div>;
  if (!data || !Array.isArray(data)) return <div>無可用區域</div>;
  if (data.length === 0) return <div>目前無可用區域</div>;

  const fieldValue = (field.value as string[]) || [];

  return (
    <FormItem>
      {data.map((datas) => (
        <div key={datas.id} className="flex items-center space-x-2">
          <FormControl>
            <Checkbox
              checked={fieldValue.includes(datas.mission_area)}
              onCheckedChange={(checked) => {
                if (checked) {
                  field.onChange([...fieldValue, datas.mission_area]);
                } else {
                  field.onChange(fieldValue.filter((value) => value !== datas.mission_area));
                }
              }}
              disabled={disabled}
              aria-label={`選擇 ${datas.mission_area}`}
            />
          </FormControl>
          <FormLabel className="font-normal">{datas.mission_area}</FormLabel>
        </div>
      ))}
      <FormMessage />
    </FormItem>
  );
};