import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { UserForm } from '../components/UserForm/UserForm';
import { UserList } from '../components/UserList/UserList';
import { Navbar } from '../components/Navbar/Navbar';
import { DeleteModal } from '../components/DeleteModal/DeleteModal';
import type { User } from '../types/user';

export const UsersPage = () => {
  const { users, addUser, updateUser, deleteUser, loading, apiError } = useUsers();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'form' | 'list'>('form');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Deletion Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAddUser = async (user: { name: string; email: string; age: number }) => {
    const success = await addUser(user);
    if (success) {
      triggerToast('User added successfully!');
      setCurrentView('list');
    }
    return success;
  };

  const handleUpdateUser = async (id: number | string, user: { name: string; email: string; age: number }) => {
    const success = await updateUser(id, user);
    if (success) {
      triggerToast('User updated successfully!');
      setEditingUser(null);
      setCurrentView('list');
    }
    return success;
  };

  const openDeleteModal = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      const success = await deleteUser(userToDelete.id);
      if (success) {
        triggerToast('User deleted successfully!');
      }
      closeDeleteModal();
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setCurrentView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setCurrentView('list');
  };

  const handleViewChange = (view: 'form' | 'list') => {
    setCurrentView(view);
    if (view === 'list') {
      setEditingUser(null);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>User Management</h1>
      
      <Navbar currentView={currentView} onViewChange={handleViewChange} />

      {currentView === 'form' && (
        <div className="view-transition">
          <UserForm 
            onAddUser={handleAddUser} 
            onUpdateUser={handleUpdateUser}
            onCancel={handleCancelEdit}
            initialData={editingUser}
            loading={loading} 
            apiError={apiError} 
          />
        </div>
      )}

      {currentView === 'list' && (
        <div className="view-transition">
          <UserList users={users} onEdit={handleEdit} onDelete={(id) => {
            const user = users.find(u => u.id === id);
            if (user) openDeleteModal(user);
            return Promise.resolve(true); 
          }} />
        </div>
      )}

      {showToast && (
        <div className="toast">
          <CheckCircle2 size={20} />
          {toastMessage}
        </div>
      )}

      <DeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        userName={userToDelete?.name || ''}
      />
    </div>
  );
};
