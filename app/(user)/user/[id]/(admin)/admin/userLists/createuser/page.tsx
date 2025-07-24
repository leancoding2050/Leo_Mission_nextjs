'use client';

import CreateUserForm from '@/components/CreateForm/create-user-Form';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CreateUser = () => {
  const param = useParams();
  const userId = param.id as string;

  return (
    <div className="min-h-screen bg-grey-1 bg-opacity-60 font-noto-sans-tc p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <Link
            href={`/user/${userId}/admin/userLists/`}
            className="text-primary-2 hover:text-primary-1 text-sm sm:text-base hover:underline flex items-center"
            aria-label="返回用戶列表"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2 text-primary-2 hover:text-primary-1" />
            上一頁
          </Link>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-1 mt-2 sm:mt-4">
            創建用戶
          </h1>
        </div>
        <div className="bg-white shadow-light rounded-lg p-4 sm:p-6">
          <CreateUserForm />
        </div>
      </div>
    </div>
  );
};

export default CreateUser;