import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { UserFormData } from '../../types/user';
import { validateEmail, validateAge } from '../../utils/validation';

interface UserFormProps {
  onAddUser: (user: { name: string; email: string; age: number }) => void;
}

export const UserForm = ({ onAddUser }: UserFormProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    age: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const { name, email, age } = formData;

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }

    const ageNumber = parseInt(age, 10);
    if (isNaN(ageNumber) || !validateAge(ageNumber)) {
      setError('Age must be a valid number between 1 and 149');
      return;
    }

    onAddUser({ name: name.trim(), email: email.trim(), age: ageNumber });
    setFormData({ name: '', email: '', age: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add User</button>
    </form>
  );
};
