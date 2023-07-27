import { Router } from "express";
import { CreateUserController } from "../Controllers/users/CreateUserController";
import { FindAllUsersController } from "../Controllers/users/FindAllUsersController";
import { FindUserByIdController } from '../Controllers/users/FindUserByIdController';
import { FindUserAnyColumnController } from "../Controllers/users/FindUserAnyColumnController";
import { DeleteUserController } from "../Controllers/users/DeleteUserController";
import { UpadateUserController } from "../Controllers/users/UpdateUserController";
import multer from 'multer';


const router = Router();
const upload = multer();

const createUser = new CreateUserController();
const findAllUsers = new FindAllUsersController();
const findUserById = new FindUserByIdController();
const findUserBYColumn = new FindUserAnyColumnController();
const deleteUser = new DeleteUserController();
const updateUser = new UpadateUserController();


router.post('/files', upload.single('file'), createUser.handle);
router.get('/users', findAllUsers.handle);
router.get('/users/:id', findUserById.handle);
router.get('/userByCol/col', findUserBYColumn.handle);
router.delete('/users/:id', deleteUser.handle);
router.patch('/users/:id',updateUser.handle);
export { router };