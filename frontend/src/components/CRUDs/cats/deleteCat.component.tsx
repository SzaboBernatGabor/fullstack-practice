'use client';

import { useState } from 'react';
import { Data } from '@/models/dataModel.interface';
import apiCall from '@/app/fetch';
import * as styles from '@/css/templates';

const DeleteCat: React.FC = () => {
  const [data, setData] = useState<Data | null>();
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState<string>('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    setData(undefined);
  };
  const fetchDelete = async () => {
    try {
      const response = await apiCall(
        `http://localhost:3001/cats/${input}`,
        'DELETE'
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
      <div className={styles.divStyle}>
        <h1 className="py-2">
          <b>Delete Cat</b>
        </h1>
        <input
          id="catId"
          className={styles.inputStyle}
          onChange={handleInputChange}
          placeholder="Cat id"
        ></input>
        <button onClick={fetchDelete} className={styles.buttonStyle}>
          DELETE
        </button>
        <br></br>
        {error ? (
          <pre className="text-red-600">{error}</pre>
        ) : data ? (
          <pre>
            Cat deleted by id: {data?._id} <br></br>
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

export default DeleteCat;
