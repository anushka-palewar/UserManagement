import { useState, useEffect } from 'react';
import type { User } from '../types/user';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (userData: Omit<User, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to add user');
      }

      const newUser = await response.json();
      setUsers((prev) => [...prev, newUser]);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number | string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete user');
      }

      setUsers((prev) => prev.filter((user) => user.id.toString() !== id.toString()));
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    addUser,
    updateUser: async (id: number | string, userData: Partial<User>) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/users/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to update user');
        }

        const updatedUser = await response.json();
        setUsers((prev) => prev.map((user) => user.id.toString() === id.toString() ? updatedUser : user));
        return true;
      } catch (err: any) {
        setError(err.message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    deleteUser,
    loading,
    apiError: error,
  };
};
