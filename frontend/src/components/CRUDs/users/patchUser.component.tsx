'use client';

import React, { useState } from 'react';
import User from '@/models/userModel.interface';
import apiCall from '@/app/fetch';
import * as styles from '@/css/templates';

const PatchUser: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [inputData, setInputData] = useState<User>({
    _id: '',
    permission: 0,
    active: true,
    email: '',
  });
  const [data, setData] = useState<User | null>();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      if (event.target.id === 'permission') {
        setInputData((pre) => ({
          ...pre,
          permission: parseInt(event.target.value),
        }));
      } else {
        setInputData((pre) => ({
          ...pre,
          [event.target.id]: event.target.value,
        }));
      }
    }
  };

  const fetchPostCat = async () => {
    try {
      const response = await apiCall(
        `http://localhost:3001/users/${inputData._id}`,
        'PATCH',
        undefined,
        inputData
      );
      setData(response);
      switch (response.toString()) {
        case 'Error: Not Found': {
          setError('Not found!');
          break;
        }
        case 'Error: Bad Request': {
          setError('Invalid permission level!');
          break;
        }
        case 'Error: Internal Server Error': {
          setError('Invalid status!');
          break;
        }
        default:
          setError(null);
      }
    } catch (error: any) {
      setError(error.message);
      setData(null);
    }
  };

  return (
    <>
      <div className={styles.divStyle + 'max-w-80 w-80'}>
        <h1 className="py-2">
          <b>Patch User</b>
        </h1>
        <div className="grid gap-3 grid-cols-1">
          <input
            id="_id"
            className={styles.inputStyle}
            placeholder="User id"
            type="text"
            onChange={handleInputChange}
          ></input>
          <input
            id="active"
            className={styles.inputStyle}
            placeholder="Activation status (true or false)"
            type="text"
            onChange={handleInputChange}
          ></input>
          <input
            id="permission"
            className={styles.inputStyle}
            placeholder="Permission level (0-2)"
            type="number"
            min={0}
            max={2}
            onChange={handleInputChange}
          ></input>
          <button onClick={() => fetchPostCat()} className={styles.buttonStyle}>
            PATCH
          </button>
        </div>
        {error ? (
          <pre className="text-red-600">{error}</pre>
        ) : data ? (
          <pre>
            User modified with id:
            <br />
            {data._id}
          </pre>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default PatchUser;
