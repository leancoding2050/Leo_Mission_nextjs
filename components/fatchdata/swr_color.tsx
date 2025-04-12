"use client";

import useSWR from "swr";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

const SWR_Color = ({ field , fieldState}:any) => {
    const { data, error, isLoading } = useSWR("/api/Color_Lists", async (url) => {
        const res = await fetch(url);
        return res.json();
    });

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;

    console.log("color data:" , data,"-- End --")

    return (
        <>
            <Select
                defaultValue={field.value}
                onValueChange={(value) => field.onChange(value)}
            >

                <SelectTrigger>
                    <SelectValue placeholder={field.value || "Select a color"} />
                    <SelectContent>
                        {data.map((color:any) => (
                            <SelectItem key={color.id} value={color.color_name}>
                                      <div 
        className="w-6 h-6 rounded border border-gray-200 shadow-sm"
        style={{ backgroundColor: color.color_name }}
      />
        顏色碼: <span className="font-mono"><div 
        className="w-6 h-6 rounded border border-gray-200 shadow-sm"
        style={{ backgroundColor: color.color_name }}
      /></span>
       

                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectTrigger>
            </Select>
        </>
    )
}


export default SWR_Color