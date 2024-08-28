'use client';

import { User } from '@/models/userModel.interface';
import { useState } from 'react';
import apiCall from '@/app/fetch';
import * as styles from '@/css/templates';

const GetUsers: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [hidden, setHide] = useState<boolean>(true);

  const fetchAllCats = async () => {
    const response = await apiCall('http://localhost:3001/users', 'GET');
    setData(response);
    setHide(!hidden);
    console.log(data);
  };

  return (
    <>
      <div className={styles.divStyle}>
        <h1 className="py-2">
          <b>Get all users</b>
        </h1>
        <button onClick={fetchAllCats} className={styles.buttonStyle}>
          GET ALL / HIDE
        </button>
        <br></br>
        {!hidden ? (
          data.map((item: any) => (
            <div key={item.email} style={{ marginBottom: '1rem' }}>
              <div>Id: {item._id}</div>
              <div>Email: {item.email}</div>
              <div>Active: {item.active.toString()}</div>
              <div>Permission: {item.permission}</div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default GetUsers;
