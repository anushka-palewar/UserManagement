import { Trash2, AlertTriangle, X } from 'lucide-react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export const DeleteModal = ({ isOpen, onClose, onConfirm, userName }: DeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content view-transition">
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        
        <div className="modal-icon">
          <AlertTriangle size={48} color="var(--danger)" />
        </div>
        
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete <strong>{userName}</strong>? This action cannot be undone.</p>
        
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-action-delete" onClick={onConfirm} style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
            <Trash2 size={18} />
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};
