import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { Readable } from 'stream';
import { Readline } from 'readline/promises';
import readline from 'readline';

interface usersBody {
    name: string,
    city: string,
    country: string,
    favorite_sport: string
    fileName?:string
};

export class CreateUserController {
    async handle(request: Request, response: Response) {
        const { file }: any = request;
        const { buffer } = file;
        const readableFile = new Readable();
        readableFile.push(buffer);
        readableFile.push(null);
        const time = new Date().getTime();
        const fileName = `${time}_${file.originalname}`;

        const usersLine = readline.createInterface({
            input: readableFile,
        });
        const users: usersBody[] = []
        for await (let line of usersLine) {
            const usersColumns = line.split(",");
            users.push({
                name: usersColumns[0],
                city: usersColumns[1],
                country: usersColumns[2],
                favorite_sport: usersColumns[3],

            });

        };
        const header = users.shift();
        console.log(users)
        if (users.length > 0) {
            try {
                for await (let { name, city, country, favorite_sport } of users) {
                    await prismaClient.user.createMany({
                        data: {
                            name,
                            city,
                            country,
                            favorite_sport,
                            fileName,
                        },
                    });
                };
                return response.status(200).json({ msg: 'Create user as sucessfully!' })
            } catch (error) {
                console.log(error);
                return response.status(401).json({ msg: 'Input file csv failed!' })
            }
        } else {
            return response.status(401).json({ msg: 'Input file csv failed!' })
        }

    }
}