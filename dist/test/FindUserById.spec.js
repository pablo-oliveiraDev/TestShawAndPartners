"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../database/prismaClient");
const FindUserByIdController_1 = require("../Controllers/users/FindUserByIdController");
const mockResponse = {};
mockResponse.status = jest.fn().mockReturnThis();
mockResponse.json = jest.fn();
prismaClient_1.prismaClient.user.findUnique = jest.fn().mockResolvedValue({ id: 1, name: 'Alice', city: 'São Paulo', country: 'Brasil', favorite_sport: 'Futebol' });
describe('FindUserByIdController', () => {
    it('deve retornar um usuário válido quando o id existe', async () => {
        const mockRequest = {};
        mockRequest.params = { id: '1' };
        const controller = new FindUserByIdController_1.FindUserByIdController();
        await controller.handle(mockRequest, mockResponse);
        expect(prismaClient_1.prismaClient.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ id: 1, name: 'Alice', city: 'São Paulo', country: 'Brasil', favorite_sport: 'Futebol' });
    });
    it('deve retornar um erro 404 quando o id não existe', async () => {
        const mockRequest = {};
        mockRequest.params = { id: '' };
        const controller = new FindUserByIdController_1.FindUserByIdController();
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'id do not as empyt!' });
    });
    it('deve retornar um erro 404 quando ocorrer um erro no banco de dados', async () => {
        const mockRequest = {};
        mockRequest.params = { id: '1' };
        prismaClient_1.prismaClient.user.findUnique = jest.fn().mockRejectedValue(new Error('Erro no banco de dados'));
        const controller = new FindUserByIdController_1.FindUserByIdController();
        await controller.handle(mockRequest, mockResponse);
        expect(prismaClient_1.prismaClient.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Find error!' });
    });
});
