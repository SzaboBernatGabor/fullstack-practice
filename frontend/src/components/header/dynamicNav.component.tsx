'use client';

import apiCall from '../../app/fetch';
import { deleteCookie } from '../auth/cookieManager';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FC } from 'react';

const DynamicNav: FC<{ permission: number }> = ({ permission }) => {
  const router = useRouter();
  return (
    <>
      {permission !== undefined ? (
        <>
          <li>
            <button
              type="button"
              onClick={async () => {
                await apiCall(
                  'http://localhost:3001/users/logout',
                  'POST',
                  'include'
                );
                await deleteCookie('token');
                router.push('/');
                router.refresh();
              }}
            >
              Logout
            </button>
          </li>
          <li>
            <Link href="cats">Cats</Link>
          </li>
          {permission === 2 ? (
            <>
              <li>
                <Link href="admin">Users</Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <li>
          <Link href="auth">Signin/Signup</Link>
        </li>
      )}
    </>
  );
};

export default DynamicNav;
