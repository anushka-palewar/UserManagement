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

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      await this.userService.deleteUser(id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: any) {
      if (error.message === 'User not found') {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string, 10);
      const { name, email, age } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      const updatedUser = await this.userService.updateUser(id, { name, email, age: Number(age) });
      res.status(200).json(updatedUser);
    } catch (error: any) {
      if (error.message === 'User with this email already exists') {
        return res.status(409).json({ message: error.message });
      }
      if (error.message === 'User not found or no changes made') {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}
