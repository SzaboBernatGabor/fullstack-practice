'use client';

import { UserModel } from '@/models/dataModel.interface';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiCall from '../../app/fetch';
import { getCookie, setCookie } from './cookieManager';

const AuthForm: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<string>();
  const [inputData, setInputData] = useState<UserModel>({
    email: '',
    password: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((pre) => ({
      ...pre,
      [event.target.id]: event.target.value,
    }));
  };

  const fetchAuth = async (mode: string) => {
    const response = await apiCall(
      `http://localhost:3001/users/${mode}`,
      'POST',
      'include',
      inputData
      // {
      //   email: 'editor@editor.editor',
      //   password: 'editoreditor',
      //   permission: 1,
      // }
      // {
      //   email: 'admin@admin.admin',
      //   password: 'adminadmin',
      //   permission: 2,
      // }
    );
    setData(response);
    console.log(response.token);
    if (
      response.toString() != 'Error: Internal Server Error' &&
      response.toString() != 'Error: Unauthorized' &&
      response.toString() != 'Error: Bad Request'
    ) {
      if (mode === 'login') {
        await setCookie('token', response.token);
        console.log(await getCookie('token'));
        router.push('/cats');
      } else {
        setData('Account Created');
      }
      return;
    }
  };

  const responseFunc = () => {
    switch (data?.toString()) {
      case 'Error: Internal Server Error': {
        return <p className="text-red-500">Email already in use</p>;
      }
      case 'Error: Unauthorized': {
        return <p className="text-red-500">Incorrect email or password</p>;
      }
      case 'Error: Bad Request': {
        return <p className="text-red-500">Invalid input field(s)</p>;
      }
      case 'Account Created': {
        return <p className="text-green-500">Account Created</p>;
      }
    }
  };

  return (
    <>
      <div className="px-6 bg-zinc-800 py-2 rounded-xl my-4">
        <form>
          <p className="my-2">
            <label htmlFor="email" className="mx-2">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleInputChange}
              className="bg-slate-100 text-stone-950 float-right"
            ></input>
          </p>
          <p>
            <label htmlFor="password" className="mx-2">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              minLength={8}
              onChange={handleInputChange}
              className="bg-slate-100 text-stone-950 float-right"
            ></input>
          </p>
          <p className="my-3">
            <button
              type="button"
              className="px-10 py-2 bg-zinc-700 hover:bg-zinc-500 transition"
              onClick={() => fetchAuth('register')}
            >
              Signup
            </button>
            <button
              type="button"
              className="px-11 py-2 bg-zinc-700 hover:bg-zinc-500 transition float-right"
              onClick={() => fetchAuth('login')}
            >
              Signin
            </button>
          </p>
        </form>
      </div>
      {responseFunc()}
    </>
  );
};

export default AuthForm;
