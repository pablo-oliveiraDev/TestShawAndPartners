import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';
import { UpadateUserController } from '../Controllers/users/UpdateUserController';

// Mock para o objeto Response
const mockResponse = {} as Response;
mockResponse.status = jest.fn().mockReturnThis();
mockResponse.json = jest.fn();

// Mock para o prismaClient.user.update
prismaClient.user.update = jest.fn().mockResolvedValue({ id: 1, name: 'Alice', city: 'São Paulo', country: 'Brasil', favorite_sport: 'Futebol', fileName: 'arquivo.txt' });

describe('UpadateUserController', () => {
    it('deve retornar uma mensagem de sucesso quando o id existe e o usuário é atualizado', async () => {
        // Configuração do mock para o objeto Request com o id existente e o corpo da requisição
        const mockRequest = {} as Request;
        mockRequest.params = { id: '1' };
        mockRequest.body = {
            name: 'Novo Nome',
            city: 'Nova Cidade',
            country: 'Novo País',
            favorite_sport: 'Novo Esporte',
            fileName: 'novo-arquivo.txt'
        };

        // Cria uma instância do controlador
        const controller = new UpadateUserController();

        // Executa o método "handle" com o objeto de mock de Request e Response
        await controller.handle(mockRequest, mockResponse);

        // Verifica se o método prismaClient.user.update foi chamado corretamente
        expect(prismaClient.user.update).toHaveBeenCalledWith({
            where: { id: '1' },
            data: {
                name: 'Novo Nome',
                city: 'Nova Cidade',
                country: 'Novo País',
                favorite_sport: 'Novo Esporte',
                fileName: 'novo-arquivo.txt'
            }
        });

        // Verifica se o status e o json da resposta foram chamados corretamente
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Update aplyed as sucessfuly!' });
    });

    it('deve retornar um erro 404 quando o id não existe', async () => {
        // Configuração do mock para o objeto Request com o id inexistente
        const mockRequest = {} as Request;
        mockRequest.params = { id: '100' };
        mockRequest.body = {
            name: 'Novo Nome',
            city: 'Nova Cidade',
            country: 'Novo País',
            favorite_sport: 'Novo Esporte',
            fileName: 'novo-arquivo.txt'
        };

        // Configuração do mock para o prismaClient.user.update retornar um resultado vazio
        prismaClient.user.update = jest.fn().mockResolvedValue(null);

        // Cria uma instância do controlador
        const controller = new UpadateUserController();

        // Executa o método "handle" com o objeto de mock de Request e Response
        await controller.handle(mockRequest, mockResponse);

        // Verifica se o método prismaClient.user.update foi chamado corretamente
        expect(prismaClient.user.update).toHaveBeenCalledWith({
            where: { id: '100' },
            data: {
                name: 'Novo Nome',
                city: 'Nova Cidade',
                country: 'Novo País',
                favorite_sport: 'Novo Esporte',
                fileName: 'novo-arquivo.txt'
            }
        });

        // Verifica se o status e o json da resposta de erro foram chamados corretamente
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'id do not as empyt!' });
    });

    it('deve retornar um erro 404 quando ocorrer um erro no banco de dados', async () => {
        // Configuração do mock para o objeto Request com o id existente
        const mockRequest = {} as Request;
        mockRequest.params = { id: '1' };
        mockRequest.body = {
            name: 'Novo Nome',
            city: 'Nova Cidade',
            country: 'Novo País',
            favorite_sport: 'Novo Esporte',
            fileName: 'novo-arquivo.txt'
        };

        // Configuração do mock para o prismaClient.user.update retornar um erro
        prismaClient.user.update = jest.fn().mockRejectedValue(new Error('Erro no banco de dados'));

        // Cria uma instância do controlador
        const controller = new UpadateUserController();

        // Executa o método "handle" com o objeto de mock de Request e Response
        await controller.handle(mockRequest, mockResponse);

        // Verifica se o método prismaClient.user.update foi chamado corretamente
        expect(prismaClient.user.update).toHaveBeenCalledWith({
            where: { id: '1' },
            data: {
                name: 'Novo Nome',
                city: 'Nova Cidade',
                country: 'Novo País',
                favorite_sport: 'Novo Esporte',
                fileName: 'novo-arquivo.txt'
            }
        });

        // Verifica se o status e o json da resposta de erro foram chamados corretamente
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Find error!' });
    });
});