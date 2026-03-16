import { useState } from 'react';
import type { User } from '../../types/user';

interface UserItemProps {
  user: User;
  onDelete: (id: number | string) => Promise<boolean>;
}

export const UserItem = ({ user, onDelete }: UserItemProps) => {
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
      <td>
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
