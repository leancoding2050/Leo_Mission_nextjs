"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

  import useSWR from "swr";

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  export const SWR_SchoolName = ({ field , fieldState}) => {
    const { data , error , isLoading } =  useSWR('http://127.0.0.1:8000/api/mission/missionschool/' , fetcher);

    if(error) return <> error : {error} </>
    if(isLoading) return <> 載入中 .... </>

    // console.log("data : ", data)


    // console.log("Field State_areas:", fieldState.error); // 檢查錯誤訊息

    return(
        <>
            
            <Select
                defaultValue={String(field.value) || ""}
                onValueChange={(value) => field.onChange(value) }
            >
                <SelectTrigger>
                    <SelectValue placeholder={ field.value || "選擇學校名" }>{ field.value || "選擇學校名" }</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {
                        data?.map(datas => {
                            return(
                                <SelectItem value={String(datas.mission_schoolname)} key={datas.id}>
                                    {datas.mission_schoolname}
                                </SelectItem>
                            )
                        })
                    }

                </SelectContent>
            </Select>
        
        </>
    )
  }