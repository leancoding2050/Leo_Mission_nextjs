"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect , useState } from "react";

const userLists = () => {

        const session = useSession() ;
        const userId = session.data?.user?.id ;
        const [ GetUserLists , setGetUserLists ] = useState([]) ;   
        
        const [ searchQuery , setSearchQuery ] = useState("");
        const [searchResults, setSearchResults] = useState([]);
        const [ searchField , setSearchField ] = useState("all");

        useEffect(()=>{
            const getUserListsData = async () => {
                const res = await fetch('/api/User_Lists');
                if(!res){
                    throw new Error("斷線!")
                }
                const result = await res.json() ;
                setGetUserLists(result) ;
            }
            getUserListsData()
        },[userId])

        console.log("GetUserLists:",GetUserLists) ;

        const handleSearch =  async (event: React.ChangeEvent<HTMLInputElement>) => {
            try {
              const response = await fetch(`/api/User_Lists_search?query=${searchQuery}&field=${searchField}`);
              const data = await response.json();
              setSearchResults(data);
            } catch (error) {
              console.error("搜尋失敗:", error)
            }
          } ;

          console.log("searchResults : ",searchResults)
                return (
                <div>
                    <Link href={`/user/${userId}/admin`}> Admin主頁 </Link>

                    <Link href={`/user/${userId}/admin/userLists/createuser`}> CreateUser </Link>
                    
                    <br />
                    userLists
                    <br />


                    <div className="flex items-center space-x-2">
                          <input 
                            type="text" 
                            placeholder="輸入搜索內容..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1"
                          />
                                <select
                                  value={searchField}
                                  onChange={(e) => setSearchField(e.target.value)}
                                >
                                  <option value="all">所有字段</option>
                                  <option value="username">用戶名稱</option>
                                  <option value="nickname">暱稱</option>
                                  <option value="email">電子郵件</option>
                                  <option value="role">權限</option>
                                  <option value="phone">電話</option>
                                  <option value="area">地區</option>
                                  <option value="place">地方</option>
                                  <option value="subject">科目</option>
                                  <option value="SCRC">SCRC</option>
                                  <option value="isLogin">是否登入</option>
                                  <option value="isStaff">是否職員</option>
                                </select>

                          <Button onClick={handleSearch} > 搜索 </Button>
                        </div>
                        {searchResults?.map((job:any)=>{
                      return(
                        <div  key={job.id} >
                        <p>結果</p>
                        <div key={job.id} >
                            用戶名稱 : {job.username} , 
                            暱稱 :  {job.nickname} , 
                            電子郵件: {job.email} , 
                            權限 :  {job.role} , 
                            電話:  {job.phone} ,
                            地區:   {job.area}
                            地方 : {job.place} , 
                            科目 :  {job.subject} , 
                            SCRC: {job.area} , 
                            是否登入 :  {job.isLogin} , 
                            是否職員:  {job.isStaff} ,


                        </div>
                        </div>

                      )
                    })}


                    {
                    
                    GetUserLists?.map((d:any)=>{
                        if(d.isAdmin === false || d.isStaff === false ){
                            return(
                                <div key={d.id}>
                                    <Link href={`/user/${userId}/admin/userLists/${d.id}`}> 用戶名稱 : {d.username}  | nickname : {d.nickname} </Link>
                                </div>
                            ) 
                        }

                    })
                    
                    }

                    

                </div>
            )
        
    

}

export default userLists