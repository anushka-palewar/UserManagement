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
}
