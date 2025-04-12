"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ApplyListsPage = () => {
    const param = useParams();
    console.log(param);
    const UserId = param?.id as string;

    const [GetApplyList, setGetJobLists] = useState([]);

    const [ searchQuery , setSearchQuery ] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [ searchField , setSearchField ] = useState("all");

    useEffect(() => {
        const fetchapplylistsdata = async () => {
            const res = await fetch(`/api/Apply_Lists`);
            const data = await res.json();
            setGetJobLists(data);
        };
        fetchapplylistsdata();
    }, []);

    console.log(GetApplyList);

    const handleSearch =  async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const response = await fetch(`/api/Apply_Lists_search?query=${searchQuery}&field=${searchField}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("搜尋失敗:", error)
      }
    };
      console.log("searchResults : ",searchResults)
    return (
        <>
            applylist

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
                                  <option value="apply_title">申請標題</option>
                                  <option value="apply_task_code">申請Task_code</option>
                                  <option value="apply_job_code">申請job_code</option>
                                  <option value="apply_contect">申請內容</option>
                                  <option value="apply_code">申請code</option>
                                  <option value="applicant_name">申請人名稱</option>
                                  <option value="apply_status">申請人狀態</option>
                                </select>

                          <Button onClick={handleSearch} > 搜索 </Button>
                        </div>
                        {searchResults.map((apply:any)=>{
                      return(
                        <div  key={apply.id} >
                        <p>結果</p>
                        <div key={apply.id} >
                        <Link href={`/user/${userId}/admin/applyLists/${apply.id}`}> 
                        申請標題 : {apply.apply_title}, 
                        申請Task_code : {apply.apply_task_code} , 
                        申請job_code :  {apply.apply_job_code} , 
                        申請內容: {apply.apply_contect} , 
                        申請code :  {apply.apply_code} , 
                        申請人名稱:  {apply.applicant_name} ,
                        申請人狀態:   {apply.apply_status ? "已審" : "未審"}
                        </Link>

                        </div>
                        </div>

                      )
                    })}


            {GetApplyList?.map((d: any) => {
                if (d.apply_user_id === UserId) {
                    return (
                        <Link href={`/user/${UserId}/applyLists/${d.id}`} key={d.id}>
                            <div>
                                {d.apply_code}
                                <br />
                                {d.apply_title}
                                <br />
                                {d.apply_contect}
                                <br />
                                {d.apply_task}
                            </div>
                        </Link>
                    );
                }
                return null; // 如果條件不滿足，返回 null
            })}
        </>
    );
};

export default ApplyListsPage;