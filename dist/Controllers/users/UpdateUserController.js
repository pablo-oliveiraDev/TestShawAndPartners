"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpadateUserController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
class UpadateUserController {
    async handle(request, response) {
        const { name, city, country, favorite_sport, fileName } = request.body;
        const { id } = request.params;
        if (!!id) {
            try {
                const users = await prismaClient_1.prismaClient.user.update({
                    where: {
                        id: id
                    },
                    data: {
                        name: name,
                        city: city,
                        country: country,
                        favorite_sport: favorite_sport,
                        fileName: fileName
                    }
                });
                if (!!users) {
                    return response.status(200).json({ msg: 'Update aplyed as sucessfuly!' });
                }
                else {
                    return response.status(404).json({ msg: 'id do not as empyt!' });
                }
                ;
            }
            catch (error) {
                console.log(error);
                return response.status(404).json({ msg: 'Find error!' });
            }
        }
        else {
            return response.status(404).json({ msg: 'id do not as empyt!' });
        }
        ;
    }
    ;
}
exports.UpadateUserController = UpadateUserController;
;
