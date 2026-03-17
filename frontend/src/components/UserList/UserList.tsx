import { User as UserIcon, Inbox } from 'lucide-react';
import type { User } from '../../types/user';
import { UserItem } from '../UserItem/UserItem';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number | string) => void;
}

export const UserList = ({ users, onEdit, onDelete }: UserListProps) => {
  if (users.length === 0) {
    return (
      <div className="card view-transition">
        <div className="empty-state">
          <Inbox size={64} />
          <h3>No users found</h3>
          <p>Start by adding some users to your database.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card view-transition" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th><UserIcon size={14} style={{ marginRight: '8px' }} /> Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserItem key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
