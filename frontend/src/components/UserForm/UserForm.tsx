import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import type { User, UserFormData } from '../../types/user';
import { validateEmail, validateAge } from '../../utils/validation';

  interface UserFormProps {
  onAddUser: (user: { name: string; email: string; age: number }) => Promise<boolean>;
  onUpdateUser?: (id: number | string, user: { name: string; email: string; age: number }) => Promise<boolean>;
  onCancel?: () => void;
  initialData?: User | null;
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
      setValidationError('Name is required');
      return;
    }

    if (!validateEmail(email)) {
      setValidationError('Invalid email address');
      return;
    }

    const ageNumber = parseInt(age, 10);
    if (isNaN(ageNumber) || !validateAge(ageNumber)) {
      setValidationError('Age must be a valid number between 1 and 149');
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
    <form onSubmit={handleSubmit} className="user-form">
      {validationError && <p className="error validation-error">{validationError}</p>}
      {apiError && <p className="error api-error">{apiError}</p>}
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter full name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          placeholder="example@email.com"
        />
      </div>
      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter age"
        />
      </div>
      <div className="button-group">
        <button type="submit" disabled={loading}>
          {loading ? (initialData ? 'Updating...' : 'Adding...') : (initialData ? 'Update User' : 'Add User')}
        </button>
        {initialData && (
          <button type="button" onClick={onCancel} className="cancel-button" disabled={loading}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
