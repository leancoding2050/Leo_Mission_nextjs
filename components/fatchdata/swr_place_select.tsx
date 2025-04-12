
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import useSWR from "swr";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const SWR_Place_Select = ({ field , fieldState }) => {
    const { data, error, isLoading } = useSWR('http://127.0.0.1:8000/api/mission/missionplace/', fetcher);

    if (error) return <> error : {error} </>;
    if (isLoading) return <> 載入中 .... </>;

    // console.log("data : ", data);

    const fieldValue =Array.isArray(field.value)? field.value : [];
    // console.log("Field State_place:", fieldState.error); // 檢查錯誤訊息

    return (
        <>

            <Select
                defaultValue={String(field.value) || ""}
                onValueChange={(value) => field.onChange(value) }
            >
                <SelectTrigger>
                    <SelectValue placeholder={ field.value || "選擇地方" }>{ field.value || "選擇地方" }</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {
                        data?.map(datas => {
                            return(
                                <SelectItem value={String(datas.mission_place)} key={datas.id}>
                                    {datas.mission_place}
                                </SelectItem>
                            )
                        })
                    }

                </SelectContent>
            </Select>

        </>
    );
};