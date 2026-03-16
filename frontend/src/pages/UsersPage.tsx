import { useUsers } from '../hooks/useUsers';
import { UserForm } from '../components/UserForm/UserForm';
import { UserList } from '../components/UserList/UserList';

export const UsersPage = () => {
  const { users, addUser, deleteUser, loading, apiError } = useUsers();

  return (
    <main>
      <h1>User Management</h1>
      <section>
        <h2>Add User</h2>
        <UserForm onAddUser={addUser} loading={loading} apiError={apiError} />
      </section>
      <section>
        <h2>User List</h2>
        <UserList users={users} onDelete={deleteUser} />
      </section>
    </main>
  );
};
