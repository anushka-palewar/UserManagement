import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { User, Mail, Calendar, UserPlus, Check, AlertCircle } from 'lucide-react';
import type { User as UserType, UserFormData } from '../../types/user';
import { validateEmail, validateAge } from '../../utils/validation';

interface UserFormProps {
  onAddUser: (user: { name: string; email: string; age: number }) => Promise<boolean>;
  onUpdateUser?: (id: number | string, user: { name: string; email: string; age: number }) => Promise<boolean>;
  onCancel?: () => void;
  initialData?: UserType | null;
  loading?: boolean;
  apiError?: string | null;
}

export const UserForm = ({ onAddUser, onUpdateUser, onCancel, initialData, loading, apiError }: UserFormProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    age: initialData?.age.toString() || '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        age: initialData.age.toString(),
      });
    } else {
      setFormData({ name: '', email: '', age: '' });
    }
  }, [initialData]);

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const { name, email, age } = formData;

    if (!name.trim()) {
      setValidationError('Full Name is required');
      return;
    }

    if (!validateEmail(email)) {
      setValidationError('Please enter a valid email address');
      return;
    }

    const ageNumber = parseInt(age, 10);
    if (isNaN(ageNumber) || !validateAge(ageNumber)) {
      setValidationError('Age must be between 1 and 149');
      return;
    }

    const preparedData = { name: name.trim(), email: email.trim(), age: ageNumber };
    
    let success = false;
    if (initialData && onUpdateUser) {
      success = await onUpdateUser(initialData.id, preparedData);
    } else {
      success = await onAddUser(preparedData);
    }

    if (success) {
      setFormData({ name: '', email: '', age: '' });
      if (onCancel) onCancel();
    }
  };

  return (
    <div className="card view-transition">
      <form onSubmit={handleSubmit} className="user-form">
        { (validationError || apiError) && (
          <div className="error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} />
            {validationError || apiError}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="name">
            <User size={16} /> Full Name
          </label>
          <div className="input-wrapper">
            <User size={18} className="input-icon" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">
            <Mail size={16} /> Email Address
          </label>
          <div className="input-wrapper">
            <Mail size={18} className="input-icon" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john@example.com"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="age">
            <Calendar size={16} /> Age
          </label>
          <div className="input-wrapper">
            <Calendar size={18} className="input-icon" />
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 25"
            />
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              'Processing...'
            ) : (
              <>
                {initialData ? <Check size={20} /> : <UserPlus size={20} />}
                {initialData ? 'Update User' : 'Add User'}
              </>
            )}
          </button>
          {initialData && (
            <button type="button" onClick={onCancel} className="btn-cancel" disabled={loading}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
