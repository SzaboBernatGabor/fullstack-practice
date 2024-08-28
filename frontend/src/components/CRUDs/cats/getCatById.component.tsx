'use client';

import { useState } from 'react';
import Data from '@/models/dataModel.interface';
import apiCall from '@/app/fetch';
import * as styles from '@/css/templates';

const GetCatById: React.FC = () => {
  const [data, setData] = useState<Data | null>();
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState<string>(' ');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    setData(undefined);
  };

  const fetchCatById = async () => {
    try {
      const response = await apiCall(
        `http://localhost:3001/cats/${input}`,
        'GET'
      );
      setData(response);
      console.log(response.toString());
      if (response.toString() == 'Error: Not Found') {
        setError('Not found!');
      } else if (response?.breed) {
        setError(null);
      } else {
        setError('Empty input field!');
      }
    } catch (error: any) {
      setError(error.message);
      setData(null);
    }
  };
  return (
    <>
      <div className={styles.divStyle}>
        <h1 className="py-2">
          <b>Get cat by id</b>
        </h1>
        <input
          type="text"
          placeholder="Cat id"
          id="catId"
          className={styles.inputStyle}
          onChange={handleInputChange}
        ></input>
        <button onClick={() => fetchCatById()} className={styles.buttonStyle}>
          GET BY ID
        </button>
        <br></br>
        {error ? (
          <pre className="text-red-600">{error}</pre>
        ) : data ? (
          <pre>
            Name: {data?.name} <br></br>
            Breed: {data?.breed} <br></br>
            Age: {data?.age}
          </pre>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default GetCatById;
