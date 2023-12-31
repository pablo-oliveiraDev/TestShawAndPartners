"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("../Controllers/users/CreateUserController");
const FindAllUsersController_1 = require("../Controllers/users/FindAllUsersController");
const FindUserByIdController_1 = require("../Controllers/users/FindUserByIdController");
const FindUserAnyColumnController_1 = require("../Controllers/users/FindUserAnyColumnController");
const DeleteUserController_1 = require("../Controllers/users/DeleteUserController");
const UpdateUserController_1 = require("../Controllers/users/UpdateUserController");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)();
const createUser = new CreateUserController_1.CreateUserController();
const findAllUsers = new FindAllUsersController_1.FindAllUsersController();
const findUserById = new FindUserByIdController_1.FindUserByIdController();
const findUserBYColumn = new FindUserAnyColumnController_1.FindUserAnyColumnController();
const deleteUser = new DeleteUserController_1.DeleteUserController();
const updateUser = new UpdateUserController_1.UpadateUserController();
router.post('/files', upload.single('file'), createUser.handle);
router.get('/users', findAllUsers.handle);
router.get('/users/:id', findUserById.handle);
router.get('/userByCol/col', findUserBYColumn.handle);
router.get('/users/:id', deleteUser.handle);
router.patch('/users/:id', updateUser.handle);
