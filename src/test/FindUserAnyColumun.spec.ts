import { Request, Response } from 'express';
import { FindUserAnyColumnController } from '../Controllers/users/FindUserAnyColumnController';
import { prismaClient } from '../database/prismaClient';

// Mock do objeto Request
const mockRequest = {} as Request;

// Mock do objeto Response
const mockResponse = {} as Response;
mockResponse.status = jest.fn().mockReturnThis();
mockResponse.json = jest.fn();

// Mock do prismaClient.user.findMany
prismaClient.user.findMany = jest.fn().mockResolvedValue([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);

describe('FindUserAnyColumnController', () => {
    it('deve retornar usuários corretamente com base na coluna fornecida', async () => {
        // Configuração do parâmetro de consulta "column"
        mockRequest.query = { column: 'Alice' };

        // Cria uma instância do controlador
        const controller = new FindUserAnyColumnController();

        // Executa o método "handle" com os objetos de mock de Request e Response
        await controller.handle(mockRequest, mockResponse);

        // Verifica se o método prismaClient.user.findMany foi chamado corretamente
        expect(prismaClient.user.findMany).toHaveBeenCalledWith({
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

        // Verifica se o status e o json da resposta foram chamados corretamente
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
    });
});