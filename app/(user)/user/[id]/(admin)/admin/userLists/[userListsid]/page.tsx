"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect , useState } from "react";

const userListsbyId = () => {

    const params = useParams();
    console.log(params);
    const adminId = params?.id as string ;
    const targetuserId = params?.userListsid as string ;
    const [  GetUserListsById , setGetUserListsById ] = useState([]);
    const [ GetRemake , setGetRemake ] = useState([]);

    useEffect(() => {
        const getUserListsDataById = async () => {
            const res = await fetch(`/api/User_Lists_by_ID/${targetuserId}`);
            if (!res) {
                throw new Error("斷線!");
            }
            const result = await res.json();
            setGetUserListsById(result);
        }
        getUserListsDataById();

    }, [targetuserId]);

    console.log( "GetUserListsById : ", GetUserListsById);


    return (
        <div>
        <Link href={`/user/${adminId}/admin/userLists`}>
        上一頁
        </Link>
        
            userListsbyId
            { GetUserListsById.map((d:any) => {
                return(
                    <div key={d.id}>
                        <p>email : {d.email}</p>
                        <p>username : {d.username}</p>
                        <p>nickname : {d.nickname}</p>
                        <p>Role : {d.role}</p>

                        <img src={d.image[0]?.path} alt="" />
                        <p>Area : {d.area} </p>
                        <p>place : {d.place}</p>
                        <p>phone : {d.phone}</p>
                        <p>subject : {d.subject}</p>
                        <p>SCRC : {d.SCRC}</p>
                        <div>
            <span>Color: </span>
            <div 
              className="w-6 h-6 rounded border border-gray-200 shadow-sm inline-block"
              style={{ backgroundColor: d.color }}
            />
            <span> {d.color}</span>
          </div>
        </div> 
                )
            }) }
            <br />

            <Link href={`/user/${adminId}/admin/userLists/${targetuserId}/edit`} > Edit </Link>
            <br />

            <Link href={`/user/${adminId}/admin/userLists/${targetuserId}/taskprogressLists `}> 任務進度列表 </Link>
            <br />
            <Link href={`/user/${adminId}/admin/userLists/${targetuserId}/jobprogressLists `}> 工作進度列表 </Link>
            <br />
            <Link href={`/user/${adminId}/admin/userLists/${targetuserId}/createRemake `}> 建立評論/備注 </Link>


{GetUserListsById.map((d:any) => (
  <div key={d.id || d.nickname}> {/* Use a unique identifier like id */}
    {d.remakes.map((ds:any) => (
      <div key={ds.id || ds.createAt}> {/* Use a unique identifier like id or timestamp */}
        <p>{ds.content}</p>
        <p>作者：{ds.authorname}</p>
        <p>時間：{ds.createAt}</p>
      </div>
    ))}
  </div>
))}

        </div>
    )
}

export default userListsbyId