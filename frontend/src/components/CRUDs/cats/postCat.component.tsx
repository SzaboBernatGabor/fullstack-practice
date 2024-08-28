'use client';

import { useState } from 'react';
import Data, { CatModel } from '@/models/dataModel.interface';
import apiCall from '@/app/fetch';

const PostCat: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [inputData, setInputData] = useState<CatModel>({
    name: '',
    breed: '',
  });

  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [data, setData] = useState<Data | null>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case 'age':
        setInputData((pre) => ({
          ...pre,
          [event.target.id]: parseInt(event.target.value),
        }));
        break;
      default:
        setInputData((pre) => ({
          ...pre,
          [event.target.id]: event.target.value,
        }));
    }
    setData(undefined);
  };

  const fetchPostCat = async () => {
    const response = await apiCall(
      'http://localhost:3001/cats',
      'POST',
      undefined,
      inputData
    );
    setData(response);
    if (response.toString() == 'Error: Bad Request') {
      setError('Invalid input field(s)!');
    } else {
      setError(null);
    }
  };
  return (
    <>
      <div className="px-5 bg-zinc-800 py-2 rounded-xl my-4">
        <h1 className="py-2">
          <b>Post Cat</b>
        </h1>
        <div className="grid gap-3 grid-cols-1">
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
            className="px-10 py-2 bg-zinc-700 hover:bg-zinc-500 transition justify-self-center"
          >
            POST
          </button>
        </div>
        {error ? (
          <pre className="text-red-600">{error}</pre>
        ) : data ? (
          <pre>Cat posted with id: {data._id}</pre>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default PostCat;
