"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const JobListsPage = () => {
    const param = useParams();

    const UserId = param?.id as string;
    const [ GetJobLists , setGetJobLists ] = useState([]) ;

    const [ searchQuery , setSearchQuery ] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [ searchField , setSearchField ] = useState("all");

    useEffect(() => {
        const fetchjoblistsdata = async () => {
            const res = await fetch(`/api/Job_Lists`) ;
            const data = await res.json() ;
            setGetJobLists(data) ;
        }
        fetchjoblistsdata();
    }, [])

    console.log(GetJobLists)

    const handleSearch =  async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
          const response = await fetch(`/api/Job_Lists_search_User?query=${searchQuery}&field=${searchField}`);
          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error("搜尋失敗:", error)
        }
      };

      console.log("searchResults : ",searchResults)
    return (
      <>
       <div>
            JobListsPage

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
                                  <option value="job_code">任務編號</option>
                                  <option value="job_school_name">學校名稱</option>
                                  <option value="job_subject">科目</option>
                                  <option value="job_area">地區</option>
                                  <option value="job_time">時間</option>
                                  <option value="job_day">日期</option>

                                </select>

                          <Button onClick={handleSearch} > 搜索 </Button>
                        </div>
                        {searchResults?.map((job:any)=>{
                      return(
                        <div  key={job.id} >
                        <p>結果</p>
                        <div key={job.id} >
                        <Link href={`/user/${UserId}/jobLists/${job.id}`}>
                            code : {job.job_code}, 
                           school_name : {job.job_school_name} , 
                           subject :  {job.job_subject} , 
                            area: {job.job_area} , 
                            job_time :  {job.job_time_h} , 
                           day:  {job.job_day.split('T')[0]} ,

                           </Link>

                        </div>
                        </div>

                      )
                    })}


            {GetJobLists.length === 0 ?(
              <p>沒有數據</p>
            ) :(
            
            GetJobLists?.map((data : any) => {
              if(data.job_in_task === false){
                return(
                    <div key={data.id}>
                        <Link href={`/user/${UserId}/jobLists/${data.id}`}>
                           {data.job_code} , 
                           {data.job_school_name} , 
                           {data.job_subject} , 
                           {data.job_area} , 
                           {data.job_time} , 
                           {data.job_day.split('T')[0]} ,

                        
                        </Link>
                    </div>
                )
            } 

            })
          
          )}

        

        </div>
      
      </>
       
    )
}

export default JobListsPage