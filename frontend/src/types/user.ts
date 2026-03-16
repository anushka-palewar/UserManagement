export interface User {
  id: number | string;
  name: string;
  email: string;
  age: number;
}

export interface UserFormData {
  name: string;
  email: string;
  age: string;
}
