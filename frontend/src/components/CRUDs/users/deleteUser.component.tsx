'use client';

import { useState } from 'react';
import { User } from '@/models/userModel.interface';
import apiCall from '@/app/fetch';

const DeleteUser: React.FC = () => {
  const [data, setData] = useState<User | null>();
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState<string>('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    setData(undefined);
  };
  const fetchDelete = async () => {
    try {
      const response = await apiCall(
        `http://localhost:3001/users/${input}`,
        'DELETE'
        // undefined,
        // { email: input }
      );
      setData(response);
      if (response.toString() == 'Error: Not Found') {
        setError('Empty input field!');
      } else if (response.toString() == 'Error: Internal Server Error') {
        setError('Not found!');
      }
    } catch (error: any) {
      setError(error.message);
      setData(null);
    }
  };
  return (
    <>
      <div className="px-5 bg-zinc-800 py-2 rounded-xl my-3">
        <h1 className="py-2">
          <b>Delete User</b>
        </h1>
        <input
          id="catId"
          className="mx-3 bg-slate-100 text-stone-950"
          onChange={handleInputChange}
          placeholder="User email"
        ></input>
        <button
          onClick={fetchDelete}
          className="px-10 py-2 bg-zinc-700 hover:bg-zinc-500 transition"
        >
          DELETE
        </button>
        <br></br>
        {error ? (
          <pre className="text-red-600">{error}</pre>
        ) : data ? (
          <pre>
            User deleted by email: {data?.email} <br></br>
          </pre>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default DeleteUser;
