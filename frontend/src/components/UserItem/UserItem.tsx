import { useState } from 'react';
import type { User } from '../../types/user';

interface UserItemProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number | string) => Promise<boolean>;
}

export const UserItem = ({ user, onEdit, onDelete }: UserItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      setIsDeleting(true);
      await onDelete(user.id);
      setIsDeleting(false);
    }
  };

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.age}</td>
      <td className="actions-cell">
        <button 
          onClick={() => onEdit(user)}
          className="edit-button"
        >
          Edit
        </button>
        <button 
          onClick={handleDelete} 
          disabled={isDeleting}
          className="delete-button"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </td>
    </tr>
  );
};
