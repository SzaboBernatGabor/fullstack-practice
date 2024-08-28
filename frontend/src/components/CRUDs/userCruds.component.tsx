'use server';

import DeleteUser from './users/deleteUser.component';
import GetUsers from './users/getUsers.component';
import PatchUser from './users/patchUser.component';

export default async function UserCruds() {
  return (
    <>
      <GetUsers></GetUsers>
      <DeleteUser></DeleteUser>
      <PatchUser></PatchUser>
    </>
  );
}
