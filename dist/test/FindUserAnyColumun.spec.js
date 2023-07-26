"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FindUserAnyColumnController_1 = require("../Controllers/users/FindUserAnyColumnController");
const prismaClient_1 = require("../database/prismaClient");
const mockRequest = {};
const mockResponse = {};
mockResponse.status = jest.fn().mockReturnThis();
mockResponse.json = jest.fn();
prismaClient_1.prismaClient.user.findMany = jest.fn().mockResolvedValue([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
describe('FindUserAnyColumnController', () => {
    it('deve retornar usuários corretamente com base na coluna fornecida', async () => {
        mockRequest.query = { column: 'Alice' };
        const controller = new FindUserAnyColumnController_1.FindUserAnyColumnController();
        await controller.handle(mockRequest, mockResponse);
        expect(prismaClient_1.prismaClient.user.findMany).toHaveBeenCalledWith({
            where: {
                OR: [
                    { name: 'Alice' },
                    { city: 'Alice' },
                    { country: 'Alice' },
                    { favorite_sport: 'Alice' },
                    { fileName: 'Alice' }
                ],
            },
        });
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
    });
});
