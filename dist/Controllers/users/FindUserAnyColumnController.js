"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserAnyColumnController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
class FindUserAnyColumnController {
    async handle(request, response) {
        const column = request.query.column;
        console.log(column);
        const users = await prismaClient_1.prismaClient.user.findMany({
            where: {
                OR: [
                    {
                        name: column,
                    },
                    {
                        city: column,
                    },
                    {
                        country: column,
                    },
                    {
                        favorite_sport: column,
                    },
                    {
                        fileName: column
                    }
                ],
            },
        });
        return response.status(200).json(users);
    }
}
exports.FindUserAnyColumnController = FindUserAnyColumnController;
