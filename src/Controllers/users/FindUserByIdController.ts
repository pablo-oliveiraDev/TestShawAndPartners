import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class FindUserByIdController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        if (!!id) {
            try {
                const users = await prismaClient.user.findUnique({
                    where: {
                        id: id
                    },
                });
                if (!!users) {
                    return response.status(200).json(users);

                } else {
                    return response.status(404).json({ msg: 'id do not as empyt!' });
                }


            } catch (error) {
                console.log(error);
                return response.status(404).json({ msg: 'Find error!' });
            }
        } else {
            return response.status(404).json({ msg: 'id do not as empyt!' })
        }

    }
}