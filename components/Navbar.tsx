'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUserCircle,
  faTasks,
  faListCheck,
  faUser,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Session } from 'next-auth';
import { Logout_Button } from './logout_button';
import { useState } from 'react';

type Props = {
  session: Session | null;
};

export default function Navbar({ session }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const userId = session?.user?.id;
  const UserRole = session?.user?.role;

  if (!session || !UserRole) {
    return null;
  }

  const navItems = [
    {
      href: `/user/${userId}/admin`,
      icon: faUser,
      label: 'Admin',
      roles: ['ADMIN'],
    },
    {
      href: `/user/${userId}/`,
      icon: faHome,
      label: '首頁',
      roles: ['ADMIN', 'TEACHER'],
    },
    {
      href: `/user/${userId}/profiles`,
      icon: faUserCircle,
      label: '用戶資料',
      roles: ['ADMIN', 'TEACHER'],
    },
    {
      href: `/user/${userId}/jobLists`,
      icon: faTasks,
      label: '工作版',
      roles: ['ADMIN', 'TEACHER'],
    },
       {
      href: `/user/${userId}/taskLists`,
      icon: faTasks,
      label: '任務版',
      roles: ['ADMIN', 'TEACHER'],
    },
    {
      href: `/user/${userId}/applyLists`,
      icon: faListCheck,
      label: '申請列表',
      roles: ['ADMIN', 'TEACHER'],
    },
  ];

  return (
    <>
      {/* 漢堡包按鈕（僅在小螢幕顯示） */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 text-primary-1 text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>

      {/* 導航欄 */}
      <div
        className={`fixed left-0 top-0 h-full bg-white text-center font-noto-sans-tc z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0 w-48' : '-translate-x-full sm:translate-x-0 sm:w-12 md:w-16'
        }`}
      >
        <div className="mt-16 sm:mt-12">
          {navItems
            .filter((item) => item.roles.includes(UserRole))
            .map((item, index) => (
              <Link key={index} href={item.href}>
                <div className="w-full h-12 sm:h-14 hover:bg-grey-2 flex items-center justify-center sm:justify-center sm:flex-col px-2 sm:px-0">
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="text-base sm:text-lg text-primary-1"
                  />
                  <span className="ml-2 sm:ml-0 sm:text-xs md:text-sm text-primary-1 hidden sm:block sm:mt-1">
                    {item.label}
                  </span>
                </div>
              </Link>
            ))}
          <div className="w-full h-12 sm:h-14 hover:bg-grey-2 flex items-center justify-center sm:justify-center sm:flex-col px-2 sm:px-0">
            <Logout_Button />
          </div>
        </div>
      </div>

      {/* 遮罩層（行動設備菜單展開時顯示） */}
      {isOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}