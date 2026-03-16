import { useState } from 'react';
import type { User } from '../types/user';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: crypto.randomUUID(),
    };
    setUsers((prev) => [...prev, newUser]);
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return {
    users,
    addUser,
    deleteUser,
  };
};
