import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { UserForm } from '../components/UserForm/UserForm';
import { UserList } from '../components/UserList/UserList';
import type { User } from '../types/user';

export const UsersPage = () => {
  const { users, addUser, updateUser, deleteUser, loading, apiError } = useUsers();
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <main>
      <h1>User Management</h1>
      <section>
        <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
        <UserForm 
          onAddUser={addUser} 
          onUpdateUser={updateUser}
          onCancel={handleCancelEdit}
          initialData={editingUser}
          loading={loading} 
          apiError={apiError} 
        />
      </section>
      <section>
        <h2>User List</h2>
        <UserList users={users} onEdit={handleEdit} onDelete={deleteUser} />
      </section>
    </main>
  );
};
