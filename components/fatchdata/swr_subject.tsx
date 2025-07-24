// SWR_Subject_Normal.tsx
"use client";

import useSWR from "swr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps, ControllerFieldState } from "react-hook-form";
import { FormMessage } from "@/components/ui/form";
import { Create_Job_schema } from "@/actions/Create-Job/schema";
import { z } from "zod";

interface MissionSubject {
  id: number;
  mission_subject: string;
}

type FormValues = z.infer<typeof Create_Job_schema>;

interface SWR_SubjectProps {
  field: ControllerRenderProps<FormValues, "job_subject">;
  fieldState: ControllerFieldState;
  disabled?: boolean;
  allowedSubjects?: string[]; // 新增 allowedSubjects 屬性，允許過濾科目
}

const fetcher = async (url: string): Promise<MissionSubject[]> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`無法載入科目：${res.status} ${res.statusText}`);
  }
  return res.json();
};

export const SWR_Subject_Normal = ({
  field,
  fieldState,
  disabled,
  allowedSubjects = [], // 預設為空陣列
}: SWR_SubjectProps) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  const { data, error, isLoading } = useSWR<MissionSubject[]>(
    `${apiBaseUrl}/api/mission/missionsubject/`,
    fetcher
  );

  if (error) return <div>無法載入科目，請稍後重試。</div>;
  if (isLoading) return <div>載入中...</div>;
  if (!data || !Array.isArray(data)) return <div>無可用科目</div>;
  if (data.length === 0) return <div>目前無可用科目</div>;

  // 過濾科目：如果 allowedSubjects 不為空，僅顯示包含在其中的科目
  const filteredSubjects = allowedSubjects.length > 0
    ? data.filter((subject) =>
        allowedSubjects.includes(subject.mission_subject)
      )
    : data;

  if (filteredSubjects.length === 0) return <div>無符合條件的科目</div>;

  console.log("科目資料: ", filteredSubjects);

  return (
    <div>
      <Select
        value={field.value}
        onValueChange={field.onChange}
        disabled={disabled || field.disabled}
      >
        <SelectTrigger
          className={fieldState.error ? "border-red-500" : ""}
          aria-label="選擇科目"
        >
          <SelectValue placeholder="選擇科目" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {filteredSubjects.map((subject) => (
            <SelectItem
              key={subject.id}
              value={subject.mission_subject}
              aria-label={`選擇 ${subject.mission_subject}`}
            >
              {subject.mission_subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
    </div>
  );
};