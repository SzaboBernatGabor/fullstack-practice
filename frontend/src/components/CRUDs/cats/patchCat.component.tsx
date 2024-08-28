'use client';

import React, { useState } from 'react';
import { CatModel } from '@/models/dataModel.interface';
import Data from '@/models/dataModel.interface';
import apiCall from '@/app/fetch';

const PatchCat: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [inputData, setInputData] = useState<CatModel>({});
  const [data, setData] = useState<Data | null>();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      if (
        event.target.id === 'age' &&
        parseInt(event.target.value) < 35 &&
        parseInt(event.target.value) > 0
      ) {
        setInputData((pre) => ({
          ...pre,
          age: parseInt(event.target.value),
        }));
        setData(undefined);
      } else {
        setInputData((pre) => ({
          ...pre,
          [event.target.id]: event.target.value,
        }));
        setData(undefined);
      }
    } else {
      setInputData((pre) => ({
        ...pre,
        [event.target.id]: undefined,
      }));
    }
  };

  const fetchPostCat = async () => {
    try {
      const response = await apiCall(
        `http://localhost:3001/cats/${inputData.id}`,
        'PATCH',
        undefined,
        inputData
      );
      setData(response);
      if (response.toString() == 'Error: Not Found') {
        setError('Not found!');
      } else if (response.toString() == 'Error: Bad Request') {
        setError('Invalid input(s)!');
      } else {
        setError(null);
      }
    } catch (error: any) {
      setError(error.message);
      setData(null);
    }
  };

  return (
    <>
      <div className="px-5 bg-zinc-800 py-2 rounded-xl my-4">
        <h1 className="py-2">
          <b>Patch Cat</b>
        </h1>
        <div className="grid gap-3 grid-cols-1">
          <input
            id="id"
            className="bg-slate-100 text-stone-950"
            placeholder="Cat id"
            type="text"
            onChange={handleInputChange}
          ></input>
          <input
            id="name"
            className="bg-slate-100 text-stone-950"
            placeholder="Cat name"
            type="text"
            onChange={handleInputChange}
          ></input>
          <input
            id="breed"
            className="bg-slate-100 text-stone-950"
            placeholder="Cat breed"
            type="text"
            onChange={handleInputChange}
          ></input>
          <input
            id="age"
            className="bg-slate-100 text-stone-950"
            placeholder="Cat age"
            type="number"
            onChange={handleInputChange}
            min={0}
            max={35}
          ></input>
          <button
            onClick={() => fetchPostCat()}
            className="px-10 py-2 bg-zinc-700 hover:bg-zinc-500 transition"
          >
            PATCH
          </button>
        </div>
        {error ? (
          <pre className="text-red-600">{error}</pre>
        ) : data ? (
          <pre>Cat modified with id: {data._id}</pre>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default PatchCat;
