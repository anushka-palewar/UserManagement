import { User } from '../models/user.model.js';
import { UserRepository } from '../repositories/user.repository.js';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(userData: User): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const userId = await this.userRepository.create(userData);
    
    return {
      ...userData,
      id: userId
    };
  }

  async deleteUser(id: number): Promise<void> {
    const success = await this.userRepository.delete(id);
    if (!success) {
      throw new Error('User not found');
    }
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    // Check if user exists
    const existingUser = await this.userRepository.findByEmail(userData.email || '');
    if (existingUser && existingUser.id !== id) {
      throw new Error('User with this email already exists');
    }

    const success = await this.userRepository.update(id, userData);
    if (!success) {
      throw new Error('User not found or no changes made');
    }

    return {
      ...userData,
      id
    } as User;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
