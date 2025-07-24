

"use client";

import useSWR from "swr";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerRenderProps} from "react-hook-form";
import { z } from "zod";
import { Edit_User_Schema } from "@/actions/Edit-User/schema";

type FormValues = z.infer<typeof Edit_User_Schema>;

interface MissionPlace {
  id: number;
  mission_place: string;
}

interface SWR_Place_Props {
  field: ControllerRenderProps<FormValues, "place">;
  disabled?: boolean;
}

const fetcher = (url: string): Promise<MissionPlace[]> =>
  fetch(url).then((res) => res.json());

export const SWR_Place = ({ field, disabled }: SWR_Place_Props) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  const { data, error, isLoading } = useSWR<MissionPlace[]>(
    `${apiBaseUrl}/api/mission/missionplace/`,
    fetcher
  );

  if (error) return <div>錯誤：{error.message}</div>;
  if (isLoading) return <div>載入中...</div>;
  if (!data || !Array.isArray(data)) return <div>無可用地點</div>;
  if (data.length === 0) return <div>目前無可用地點</div>;

  const fieldValue = (field.value as string[]) || [];

  return (
    <FormItem>
      {data.map((datas) => (
        <div key={datas.id} className="flex items-center space-x-2">
          <FormControl>
            <Checkbox
              checked={fieldValue.includes(datas.mission_place)}
              onCheckedChange={(checked) => {
                if (checked) {
                  field.onChange([...fieldValue, datas.mission_place]);
                } else {
                  field.onChange(fieldValue.filter((value) => value !== datas.mission_place));
                }
              }}
              disabled={disabled}
              aria-label={`選擇 ${datas.mission_place}`}
            />
          </FormControl>
          <FormLabel className="font-normal">{datas.mission_place}</FormLabel>
        </div>
      ))}
      <FormMessage />
    </FormItem>
  );
};