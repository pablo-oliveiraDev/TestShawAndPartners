import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
interface userBody {
    name: string,
    city: string,
    country: string,
    favorite_sport: string
    fileName: string
}
export class UpadateUserController {
    async handle(request: Request, response: Response) {
        const {
            name,
            city,
            country,
            favorite_sport,
            fileName
        }: userBody = request.body;
        const { id } = request.params;
        if (!!id) {
            try {
                const users = await prismaClient.user.update({
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

                } else {
                    return response.status(404).json({ msg: 'id do not as empyt!' });
                };

            } catch (error) {
                console.log(error);
                return response.status(404).json({ msg: 'Find error!' });
            }
        } else {
            return response.status(404).json({ msg: 'id do not as empyt!' })
        };

    };
};