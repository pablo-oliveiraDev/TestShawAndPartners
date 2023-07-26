import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';
import { DeleteUserController } from '../Controllers/users/DeleteUserController';

// Mock para o objeto Response
const mockResponse = {} as Response;
mockResponse.status = jest.fn().mockReturnThis();
mockResponse.json = jest.fn();

// Mock para o prismaClient.user.delete
prismaClient.user.delete = jest.fn().mockResolvedValue({ id: 1, name: 'Alice', city: 'São Paulo', country: 'Brasil', favorite_sport: 'Futebol' });

describe('DeleteUserController', () => {
    it('deve retornar uma mensagem de sucesso quando o id existe', async () => {
        // Configuração do mock para o objeto Request com o id existente
        const mockRequest = {} as Request;
        mockRequest.params = { id: '1' };

        // Cria uma instância do controlador
        const controller = new DeleteUserController();

        // Executa o método "handle" com o objeto de mock de Request e Response
        await controller.handle(mockRequest, mockResponse);

        // Verifica se o método prismaClient.user.delete foi chamado corretamente
        expect(prismaClient.user.delete).toHaveBeenCalledWith({ where: { id: '1' } });

        // Verifica se o status e o json da resposta foram chamados corretamente
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Delete aplyed as sucessfuly!' });
    });

    it('deve retornar um erro 404 quando o id não existe', async () => {
        // Configuração do mock para o objeto Request com o id inexistente
        const mockRequest = {} as Request;
        mockRequest.params = { id: '100' };

        // Configuração do mock para o prismaClient.user.delete retornar um resultado vazio
        prismaClient.user.delete = jest.fn().mockResolvedValue(null);

        // Cria uma instância do controlador
        const controller = new DeleteUserController();

        // Executa o método "handle" com o objeto de mock de Request e Response
        await controller.handle(mockRequest, mockResponse);

        // Verifica se o método prismaClient.user.delete foi chamado corretamente
        expect(prismaClient.user.delete).toHaveBeenCalledWith({ where: { id: '100' } });

        // Verifica se o status e o json da resposta de erro foram chamados corretamente
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'id do not as empyt!' });
    });

    it('deve retornar um erro 404 quando ocorrer um erro no banco de dados', async () => {
        // Configuração do mock para o objeto Request com o id existente
        const mockRequest = {} as Request;
        mockRequest.params = { id: '1' };

        // Configuração do mock para o prismaClient.user.delete retornar um erro
        prismaClient.user.delete = jest.fn().mockRejectedValue(new Error('Erro no banco de dados'));

        // Cria uma instância do controlador
        const controller = new DeleteUserController();

        // Executa o método "handle" com o objeto de mock de Request e Response
        await controller.handle(mockRequest, mockResponse);

        // Verifica se o método prismaClient.user.delete foi chamado corretamente
        expect(prismaClient.user.delete).toHaveBeenCalledWith({ where: { id: '1' } });

        // Verifica se o status e o json da resposta de erro foram chamados corretamente
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Find error!' });
    });
});