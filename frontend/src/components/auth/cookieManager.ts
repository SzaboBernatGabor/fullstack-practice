'use server';

import { cookies } from 'next/headers';

export const getAllCookies = async () => {
  return cookies().getAll();
};

export const setCookie = async (key: string, value: string) => {
  cookies().set(key, value, { secure: true });
};

export const getCookie = async <T = unknown>(name: string): Promise<T> => {
  return cookies().get(name) as T;
};

export const deleteCookie = async (name: string) => {
  return cookies().delete(name);
};

export const hasCookie = async (name: string) => {
  return cookies().has(name);
};
