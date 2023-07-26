"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
class DeleteUserController {
    async handle(request, response) {
        const { id } = request.params;
        if (!!id) {
            try {
                const users = await prismaClient_1.prismaClient.user.delete({
                    where: {
                        id: id
                    },
                });
                if (!!users) {
                    return response.status(200).json({ msg: 'Delete aplyed as sucessfuly!' });
                }
                else {
                    return response.status(404).json({ msg: 'id do not as empyt!' });
                }
            }
            catch (error) {
                console.log(error);
                return response.status(404).json({ msg: 'Find error!' });
            }
        }
        else {
            return response.status(404).json({ msg: 'id do not as empyt!' });
        }
    }
}
exports.DeleteUserController = DeleteUserController;
