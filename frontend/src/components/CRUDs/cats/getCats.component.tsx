'use client';

import { useState } from 'react';
import Data from '@/models/dataModel.interface';
import apiCall from '@/app/fetch';
import * as styles from '@/css/templates';

const GetAllCats: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [hidden, setHide] = useState<boolean>(true);

  const fetchAllCats = async () => {
    const response = await apiCall('http://localhost:3001/cats', 'GET');
    setData(response);
    setHide(!hidden);
  };

  return (
    <>
      <div className={styles.divStyle}>
        <h1 className="py-2">
          <b>Get all cats</b>
        </h1>
        <button onClick={fetchAllCats} className={styles.buttonStyle}>
          GET ALL / HIDE
        </button>
        <br></br>
        {!hidden ? (
          data.map((item) => (
            <div key={item._id} style={{ marginBottom: '1rem' }}>
              <div>ID: {item._id}</div>
              <div>Name: {item.name}</div>
              <div>Breed: {item.breed}</div>
              <div>Age: {item.age}</div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default GetAllCats;
