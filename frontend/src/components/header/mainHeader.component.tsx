'use server';

import Link from 'next/link';
import DynamicNav from './dynamicNav.component';
import { getCookie } from '../auth/cookieManager';
import jwt from 'jsonwebtoken';

export default async function MainHeader() {
  const token = (await getCookie('token')) as any;
  const decoded = jwt.decode(token?.value) as any;
  return (
    <>
      <header className="flex items-center justify-between">
        <nav className="bg-neutral-800 p-5 w-full" dir="rtl">
          <ul className="flex text-xl gap-6">
            <li>
              <Link href="/">Home</Link>
            </li>
            <DynamicNav permission={decoded?.permission} />
          </ul>
        </nav>
      </header>
    </>
  );
}
