import { UserPlus, Users } from 'lucide-react';

interface NavbarProps {
  currentView: 'form' | 'list';
  onViewChange: (view: 'form' | 'list') => void;
}

export const Navbar = ({ currentView, onViewChange }: NavbarProps) => {
  return (
    <nav className="navbar">
      <button 
        className={`nav-link ${currentView === 'form' ? 'active' : ''}`}
        onClick={() => onViewChange('form')}
      >
        <UserPlus size={20} />
        Add User
      </button>
      <button 
        className={`nav-link ${currentView === 'list' ? 'active' : ''}`}
        onClick={() => onViewChange('list')}
      >
        <Users size={20} />
        User List
      </button>
    </nav>
  );
};
