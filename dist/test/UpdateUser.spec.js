"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../database/prismaClient");
const UpdateUserController_1 = require("../Controllers/users/UpdateUserController");
const mockResponse = {};
mockResponse.status = jest.fn().mockReturnThis();
mockResponse.json = jest.fn();
prismaClient_1.prismaClient.user.update = jest.fn().mockResolvedValue({ id: 1, name: 'Alice', city: 'São Paulo', country: 'Brasil', favorite_sport: 'Futebol', fileName: 'arquivo.txt' });
describe('UpadateUserController', () => {
    it('deve retornar uma mensagem de sucesso quando o id existe e o usuário é atualizado', async () => {
        const mockRequest = {};
        mockRequest.params = { id: '1' };
        mockRequest.body = {
            name: 'Novo Nome',
            city: 'Nova Cidade',
            country: 'Novo País',
            favorite_sport: 'Novo Esporte',
            fileName: 'novo-arquivo.txt'
        };
        const controller = new UpdateUserController_1.UpadateUserController();
        await controller.handle(mockRequest, mockResponse);
        expect(prismaClient_1.prismaClient.user.update).toHaveBeenCalledWith({
            where: { id: '1' },
            data: {
                name: 'Novo Nome',
                city: 'Nova Cidade',
                country: 'Novo País',
                favorite_sport: 'Novo Esporte',
                fileName: 'novo-arquivo.txt'
            }
        });
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Update aplyed as sucessfuly!' });
    });
    it('deve retornar um erro 404 quando o id não existe', async () => {
        const mockRequest = {};
        mockRequest.params = { id: '100' };
        mockRequest.body = {
            name: 'Novo Nome',
            city: 'Nova Cidade',
            country: 'Novo País',
            favorite_sport: 'Novo Esporte',
            fileName: 'novo-arquivo.txt'
        };
        prismaClient_1.prismaClient.user.update = jest.fn().mockResolvedValue(null);
        const controller = new UpdateUserController_1.UpadateUserController();
        await controller.handle(mockRequest, mockResponse);
        expect(prismaClient_1.prismaClient.user.update).toHaveBeenCalledWith({
            where: { id: '100' },
            data: {
                name: 'Novo Nome',
                city: 'Nova Cidade',
                country: 'Novo País',
                favorite_sport: 'Novo Esporte',
                fileName: 'novo-arquivo.txt'
            }
        });
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'id do not as empyt!' });
    });
    it('deve retornar um erro 404 quando ocorrer um erro no banco de dados', async () => {
        const mockRequest = {};
        mockRequest.params = { id: '1' };
        mockRequest.body = {
            name: 'Novo Nome',
            city: 'Nova Cidade',
            country: 'Novo País',
            favorite_sport: 'Novo Esporte',
            fileName: 'novo-arquivo.txt'
        };
        prismaClient_1.prismaClient.user.update = jest.fn().mockRejectedValue(new Error('Erro no banco de dados'));
        const controller = new UpdateUserController_1.UpadateUserController();
        await controller.handle(mockRequest, mockResponse);
        expect(prismaClient_1.prismaClient.user.update).toHaveBeenCalledWith({
            where: { id: '1' },
            data: {
                name: 'Novo Nome',
                city: 'Nova Cidade',
                country: 'Novo País',
                favorite_sport: 'Novo Esporte',
                fileName: 'novo-arquivo.txt'
            }
        });
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Find error!' });
    });
});
