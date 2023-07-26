"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../database/prismaClient");
const DeleteUserController_1 = require("../Controllers/users/DeleteUserController");
const mockResponse = {};
mockResponse.status = jest.fn().mockReturnThis();
mockResponse.json = jest.fn();
prismaClient_1.prismaClient.user.delete = jest.fn().mockResolvedValue({ id: 1, name: 'Alice', city: 'São Paulo', country: 'Brasil', favorite_sport: 'Futebol' });
describe('DeleteUserController', () => {
    it('deve retornar uma mensagem de sucesso quando o id existe', async () => {
        const mockRequest = {};
        mockRequest.params = { id: '1' };
        const controller = new DeleteUserController_1.DeleteUserController();
        await controller.handle(mockRequest, mockResponse);
        expect(prismaClient_1.prismaClient.user.delete).toHaveBeenCalledWith({ where: { id: '1' } });
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Delete aplyed as sucessfuly!' });
    });
    it('deve retornar um erro 404 quando o id não existe', async () => {
        const mockRequest = {};
        mockRequest.params = { id: '100' };
        prismaClient_1.prismaClient.user.delete = jest.fn().mockResolvedValue(null);
        const controller = new DeleteUserController_1.DeleteUserController();
        await controller.handle(mockRequest, mockResponse);
        expect(prismaClient_1.prismaClient.user.delete).toHaveBeenCalledWith({ where: { id: '100' } });
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'id do not as empyt!' });
    });
    it('deve retornar um erro 404 quando ocorrer um erro no banco de dados', async () => {
        const mockRequest = {};
        mockRequest.params = { id: '1' };
        prismaClient_1.prismaClient.user.delete = jest.fn().mockRejectedValue(new Error('Erro no banco de dados'));
        const controller = new DeleteUserController_1.DeleteUserController();
        await controller.handle(mockRequest, mockResponse);
        expect(prismaClient_1.prismaClient.user.delete).toHaveBeenCalledWith({ where: { id: '1' } });
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Find error!' });
    });
});
