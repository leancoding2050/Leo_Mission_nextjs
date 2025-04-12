
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

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const SWR_Areas = ({ field , fieldState}) => {
    const { data, error, isLoading } = useSWR('http://127.0.0.1:8000/api/mission/missionarea/', fetcher);

    if (error) return <> error : {error} </>;
    if (isLoading) return <> 載入中 .... </>;

    // console.log("data : ", data);


    const fieldValue =Array.isArray(field.value)? field.value : [];
    // console.log("Field State_areas:", fieldState.error); // 檢查錯誤訊息
    return (
        <>
            {data.map((datas) => (
                <div key={datas.id}> {/* 添加 key 屬性 */}
                    <Checkbox
                        checked={fieldValue.includes(datas.mission_area)}
                        onCheckedChange={(checked) => {
                            return checked
                                ? field.onChange([...fieldValue,datas.mission_area])
                                : field.onChange(
                                    fieldValue.filter(
                                        (value) => value !== datas.mission_area
                                    )
                                );
                        }}
                    />
                    <FormLabel className="font-normal">
                        {datas.mission_area}
                    </FormLabel>
                </div>
            ))}
        </>
    );
};