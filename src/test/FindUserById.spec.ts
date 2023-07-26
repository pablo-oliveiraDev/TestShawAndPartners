import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';
import { FindUserByIdController } from '../Controllers/users/FindUserByIdController';

// Mock para o objeto Response
const mockResponse = {} as Response;
mockResponse.status = jest.fn().mockReturnThis();
mockResponse.json = jest.fn();

// Mock para o prismaClient.user.findUnique
prismaClient.user.findUnique = jest.fn().mockResolvedValue({ id: 1, name: 'Alice', city: 'São Paulo', country: 'Brasil', favorite_sport: 'Futebol' });

describe('FindUserByIdController', () => {
    it('deve retornar um usuário válido quando o id existe', async () => {
        // Configuração do mock para o objeto Request com o id existente
        const mockRequest = {} as Request;
        mockRequest.params = { id: '1' };

        // Cria uma instância do controlador
        const controller = new FindUserByIdController();

        // Executa o método "handle" com o objeto de mock de Request e Response
        await controller.handle(mockRequest, mockResponse);

        // Verifica se o método prismaClient.user.findUnique foi chamado corretamente
        expect(prismaClient.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });

        // Verifica se o status e o json da resposta foram chamados corretamente
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ id: 1, name: 'Alice', city: 'São Paulo', country: 'Brasil', favorite_sport: 'Futebol' });
    });

    it('deve retornar um erro 404 quando o id não existe', async () => {
        // Configuração do mock para o objeto Request com o id inexistente
        const mockRequest = {} as Request;
        mockRequest.params = { id: '' };

        // Cria uma instância do controlador
        const controller = new FindUserByIdController();

        // Executa o método "handle" com o objeto de mock de Request e Response
        await controller.handle(mockRequest, mockResponse);
        
        // Verifica se o status e o json da resposta de erro foram chamados corretamente
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'id do not as empyt!' });
    });

    it('deve retornar um erro 404 quando ocorrer um erro no banco de dados', async () => {
        // Configuração do mock para o objeto Request com o id existente
        const mockRequest = {} as Request;
        mockRequest.params = { id: '1' };

        // Configuração do mock para o prismaClient.user.findUnique retornar um erro
        prismaClient.user.findUnique = jest.fn().mockRejectedValue(new Error('Erro no banco de dados'));

        // Cria uma instância do controlador
        const controller = new FindUserByIdController();

        // Executa o método "handle" com o objeto de mock de Request e Response
        await controller.handle(mockRequest, mockResponse);

        // Verifica se o método prismaClient.user.findUnique foi chamado corretamente
        expect(prismaClient.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });

        // Verifica se o status e o json da resposta de erro foram chamados corretamente
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Find error!' });
    });
});