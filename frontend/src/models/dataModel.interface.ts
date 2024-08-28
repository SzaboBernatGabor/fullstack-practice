export interface Data {
  _id: string;
  name: string;
  breed: string;
  age: number;
}

export interface CatModel {
  name?: string;
  breed?: string;
  age?: number;
  id?: string;
}

export interface UserModel {
  email: string;
  password: string;
}

export default Data;
