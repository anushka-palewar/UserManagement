import pool from '../config/database.js';
import { User } from '../models/user.model.js';
import { ResultSetHeader } from 'mysql2';

export class UserRepository {
  async create(user: User): Promise<number | undefined> {
    const { name, email, age } = user;
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
      [name, email, age]
    );
    return result.insertId;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    const users = rows as User[];
    return users.length > 0 ? users[0] : null;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM users WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  async update(id: number, user: Partial<User>): Promise<boolean> {
    const { name, email, age } = user;
    const [result] = await pool.execute<ResultSetHeader>(
      'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
      [name, email, age, id]
    );
    return result.affectedRows > 0;
  }
}
