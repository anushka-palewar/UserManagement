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
}
