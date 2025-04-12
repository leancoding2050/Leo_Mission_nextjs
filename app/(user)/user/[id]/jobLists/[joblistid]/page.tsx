"use client";


import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState ,useTransition} from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Create_Apply_Schema } from "@/actions/Create-Apply/schema";
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage 
} from "@/components/ui/form";
import { Create_Apply_Action } from "@/actions/Create-Apply";

const JobBoardById = () => {

    const [isPending, startTransition] = useTransition();

    const param = useParams();
    const UserId = param?.id as string;;
    const JobId = param?.joblistid as string;

    const [ GetJobById , setGetJobById ] = useState([]);
    const [  GetUserListsById , setGetUserListsById ] = useState([]);

   
       useEffect(() => {
           const fetchgetjobbyid = async (id: string) => {
               const res = await fetch(`/api/Job_Lists_by_ID/${id}`) ;
               if (!res) {
                throw new Error("斷線!");
            }
               const data = await res.json() ;
               setGetJobById(data) ;
           }
           fetchgetjobbyid(JobId);
       }, [JobId])


    useEffect(() => {
        const getUserListsDataById = async (id : string) => {
            const res = await fetch(`/api/User_Lists_by_ID/${id}`);
            if (!res) {
                throw new Error("斷線!");
            }
            const result = await res.json();
            setGetUserListsById(result);
        }
        getUserListsDataById(UserId);

    }, [UserId]);

    console.log( "GetUserListsById : ", GetUserListsById);
    console.log( "UserId : ", UserId);


    const username = GetUserListsById[0]?.username;
    const contect = "內容自定" ;
    const title = "標題自定"    ;
    const job_code = GetJobById[0]?.job_code;


 

    const apply_create_form = useForm<z.infer<typeof Create_Apply_Schema>>({
        resolver: zodResolver(Create_Apply_Schema),
        defaultValues:{
            job_id: JobId,
            user_id: UserId,
            apply_title:title,
            apply_job_code:job_code,
            apply_contect:contect,
            applicant_name:username,
            apply_type: "JOB",
        }
    })


   useEffect(()=>{
        if(GetJobById || GetUserListsById){
            apply_create_form.setValue("apply_title",title);
            apply_create_form.setValue("apply_contect",contect);
            apply_create_form.setValue("apply_job_code", job_code);
            apply_create_form.setValue("applicant_name",username);
        }
    },[GetJobById , GetUserListsById])
    const apply_create_form_onSubmit = (values: z.infer<typeof Create_Apply_Schema>) => {
        console.log("-- apply_input_data -- :",values,"-- End --" );
        startTransition(() => {
            Create_Apply_Action(values)
        })
    };

    return (
        <div>
            <div>
            
            <Link href={`/user/${UserId}/jobLists`} > 上一頁 </Link>

            <div>
                
            <Form {...apply_create_form}>
                <form onSubmit={apply_create_form.handleSubmit(apply_create_form_onSubmit)}>
                       { GetJobById.map((d:any) => {

                    return(
                        <div key={d.id}>
                            {d.job_code},
                            {d.job_school_name},
                            {d.job_area},
                            {d.job_time},
                            {d.job_subject},
                            {d.job_place},
                            {d.job_price},
                            {d.job_day.split('T')[0]},

                            

                        </div>
                    )

                        

                }) }

                <Button> 申請 </Button>
                </form>
            </Form>

             
            </div>


        </div>
        </div>
    );
};

export default JobBoardById;