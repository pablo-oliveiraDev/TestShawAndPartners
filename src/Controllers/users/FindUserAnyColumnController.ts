import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';


export class FindUserAnyColumnController {
    async handle(request: Request, response: Response) {
        const column = request.query.column as string;
        console.log(column)
        const users = await prismaClient.user.findMany({
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
                        favorite_sport:column,
                    },
                    {
                        fileName:column
                    }
                ],

            },

        });
        return response.status(200).json(users);
    }
}
