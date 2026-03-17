import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';

const router = Router();
const userController = new UserController();

router.post('/', userController.create);
router.delete('/:id', userController.delete);
router.put('/:id', userController.update);

export default router;
