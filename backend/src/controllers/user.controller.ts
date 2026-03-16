import { Request, Response } from 'express';
import { UserService } from '../services/user.service.js';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  create = async (req: Request, res: Response) => {
    try {
      const { name, email, age } = req.body;

      if (!name || !email || age === undefined) {
        return res.status(400).json({ message: 'Name, email, and age are required' });
      }

      const newUser = await this.userService.createUser({ name, email, age: Number(age) });
      res.status(201).json(newUser);
    } catch (error: any) {
      if (error.message === 'User with this email already exists') {
        return res.status(409).json({ message: error.message });
      }
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}
