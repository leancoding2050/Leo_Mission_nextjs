'use client';

import { logout_action } from '@/actions/logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export const Logout_Button = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onClick = async () => {
    try {
      const result = await logout_action();
      if (result.success) {
        startTransition(() => {
          router.push(result.redirectTo || '/');
          router.refresh(); // 刷新客戶端狀態
        });
      } else {
        setError(result.error || '登出失敗');
      }
    } catch (err) {
      console.error('客戶端登出錯誤:', err);
      setError('登出時發生錯誤');
    }
  };

  return (
    <div className="w-full h-12 sm:h-14 flex items-center justify-center sm:flex-col px-2 sm:px-0 hover:bg-grey-2 font-noto-sans-tc">
      <button
        onClick={onClick}
        disabled={isPending}
        className="flex items-center sm:flex-col justify-center w-full h-full focus:outline-none"
      >
        <FontAwesomeIcon
          icon={faSignOutAlt}
          className={`text-base sm:text-lg text-primary-1 ${isPending ? 'opacity-50' : ''}`}
        />
        <span
          className={`ml-2 sm:ml-0 sm:mt-1 text-xs sm:text-sm text-primary-1 hidden sm:block ${
            isPending ? 'opacity-50' : ''
          }`}
        >
          {isPending ? '登出中...' : '登出'}
        </span>
      </button>
      {error && (
        <div className="absolute top-full mt-2 text-red text-xs sm:text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
};