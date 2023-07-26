"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllUsersController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
class FindAllUsersController {
    async handle(request, response) {
        const users = await prismaClient_1.prismaClient.user.findMany({});
        return response.status(200).json(users);
    }
}
exports.FindAllUsersController = FindAllUsersController;
