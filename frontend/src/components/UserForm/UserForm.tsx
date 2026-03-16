import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { UserFormData } from '../../types/user';
import { validateEmail, validateAge } from '../../utils/validation';

  interface UserFormProps {
  onAddUser: (user: { name: string; email: string; age: number }) => Promise<boolean>;
  loading?: boolean;
  apiError?: string | null;
}

export const UserForm = ({ onAddUser, loading, apiError }: UserFormProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    age: '',
  });
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

    const success = await onAddUser({ name: name.trim(), email: email.trim(), age: ageNumber });
    if (success) {
      setFormData({ name: '', email: '', age: '' });
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
      <button type="submit" disabled={loading}>
        {loading ? 'Adding User...' : 'Add User'}
      </button>
    </form>
  );
};
