"use client"

import Link from "next/link"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
const ColorLists = () => {
    const session = useSession() ;
    const UserId = session.data?.user?.id ;

    const [GetColor,setGetColor] = useState([])

    useEffect(() => {
        const getColorLists = async () => {
          const res = await fetch(`/api/Color_Lists`);
          if (!res) {
            throw new Error("斷線!");
          }
          const result = await res.json();
          setGetColor(result);
        };
    
        getColorLists();
      },[]);

      console.log('GetColor : ',GetColor)

  return (

    <>
    <div>
        <Link href={`/user/${UserId}/admin/colorLists/createColor`}>
          createColor
        </Link>
        <br />

        {GetColor?.map((d: any) => {
  return (
    <div key={d.id} className="flex items-center gap-2 my-2">
      <div 
        className="w-6 h-6 rounded border border-gray-200 shadow-sm"
        style={{ backgroundColor: d.color_name }}
      />
      <div>
        顏色碼: <span className="font-mono">{d.color_name}</span>
      </div>
    </div>
  )
})}


     
    </div>
    
    </>


  )
}

export default ColorLists