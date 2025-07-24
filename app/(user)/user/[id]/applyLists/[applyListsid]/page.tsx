"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ApplyListsData {
  id: string;
  applicant_name: string;
  apply_code: string;
  apply_job_code: string;
  apply_title: string;
  apply_contect: string;
  apply_status: boolean;
}

const ApplyListsByIdUser = () => {
  const params = useParams();
  const userId = params?.id as string | undefined;
  const applyId = params?.applyListsid as string | undefined;

  const [applyData, setApplyData] = useState<ApplyListsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!applyId) {
      setError("缺少申請 ID");
      setIsLoading(false);
      return;
    }

    const getApplyListsDataById = async (id: string) => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/Apply_Lists_by_ID/${id}`);
        if (!res.ok) {
          throw new Error("無法獲取數據");
        }
        const result = await res.json();
        setApplyData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "未知錯誤");
      } finally {
        setIsLoading(false);
      }
    };

    getApplyListsDataById(applyId);
  }, [applyId]);

  if (isLoading) return <div>加載中...</div>;
  if (error) return <div>錯誤：{error}</div>;
  if (!applyData) return <div>未找到申請數據</div>;

  return (
    <>
      <h1>申請詳情</h1>
      <Link href={`/user/${userId}/applyLists/`}>返回申請列表</Link>
      <div>
        <div key={applyData.id}>
          申請人: {applyData.applicant_name}
          <br />
          申請編號: {applyData.apply_code}
          <br />
          申請工作編號: {applyData.apply_job_code}
          <br />
          申請標題: {applyData.apply_title}
          <br />
          申請內容: {applyData.apply_contect}
          <br />
          申請狀態: {applyData.apply_status ? "已審核" : "未審核"}
        </div>
      </div>
    </>
  );
};

export default ApplyListsByIdUser;