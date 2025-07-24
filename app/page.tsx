'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white font-noto-sans-tc">
      <div className="space-y-4">
        <Link href="/adminlogin">
          <div className="w-48 h-12 flex items-center justify-center text-primary-1 text-base sm:text-lg hover:bg-grey-2 rounded-md transition-colors duration-300">
            管理員
          </div>
        </Link>
        <Link href="/teacherlogin">
          <div className="w-48 h-12 flex items-center justify-center text-primary-1 text-base sm:text-lg hover:bg-grey-2 rounded-md transition-colors duration-300">
            教師
          </div>
        </Link>
      </div>
    </div>
  );
}