'use server';

import GetAllCats from '@/components/CRUDs/cats/getCats.component';
import DeleteCat from './cats/deleteCat.component';
import GetCatById from './cats/getCatById.component';
import PostCat from './cats/postCat.component';
import PatchCat from './cats/patchCat.component';
import jwt from 'jsonwebtoken';
import { getCookie } from '../auth/cookieManager';

export default async function CatCruds() {
  const token = (await getCookie('token')) as any;
  const decoded = jwt.decode(token?.value) as any;

  const switchOnPermission = (permission: number) => {
    switch (permission) {
      case 0: {
        return (
          <>
            <GetAllCats></GetAllCats>
            <GetCatById></GetCatById>
          </>
        );
      }
      case 1: {
        return (
          <>
            <GetAllCats />
            <GetCatById />
            <PatchCat />
          </>
        );
      }
      case 2: {
        return (
          <>
            <GetAllCats />
            <GetCatById />
            <PostCat />
            <PatchCat />
            <DeleteCat />
          </>
        );
      }
    }
  };

  return <>{token ? switchOnPermission(decoded?.permission) : <></>}</>;
}
