import { Edit2, Trash2 } from 'lucide-react';
import type { User } from '../../types/user';

interface UserItemProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number | string) => void;
}

export const UserItem = ({ user, onEdit, onDelete }: UserItemProps) => {
  return (
    <tr>
      <td>
        <span style={{ fontWeight: 600 }}>{user.name}</span>
      </td>
      <td style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
      <td>
        <span className="counter" style={{ background: 'var(--bg)', padding: '4px 10px', borderRadius: '8px', fontSize: '0.85rem' }}>
          {user.age}
        </span>
      </td>
      <td className="actions-cell">
        <button 
          onClick={() => onEdit(user)}
          className="btn-action-edit"
          title="Edit User"
        >
          <Edit2 size={16} />
          Edit
        </button>
        <button 
          onClick={() => onDelete(user.id)} 
          className="btn-action-delete"
          title="Delete User"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </td>
    </tr>
  );
};
