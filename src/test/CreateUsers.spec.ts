import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';
import { CreateUserController } from '../Controllers/users/CreateUserController';
import { Readable } from 'stream';

// Tipo personalizado para simular a propriedade 'file' no objeto Request
type CustomRequest = Request & {
    file: {
        buffer: Buffer;
        originalname: string;
    };
};

// Mock para o objeto Response
const mockResponse = {} as Response;
mockResponse.status = jest.fn().mockReturnThis();
mockResponse.json = jest.fn();

// Função auxiliar para simular a leitura do arquivo CSV
function mockReadCSV(data: string): Readable {
    const buffer = Buffer.from(data);
    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);
    return readableFile;
}

describe('CreateUserController', () => {
    it('deve criar usuários corretamente a partir de um arquivo CSV', async () => {
        // Configuração do mock para o arquivo CSV
        const csvData = '\nAlice,São Paulo,Brasil,Futebol,timestamp_usuarios.csv\nBob,Rio de Janeiro,Brasil,Basquete,timestamp_usuarios.csv';
        const csvFile = mockReadCSV(csvData);

        // Configuração do objeto Request com a propriedade file simulada
        const mockRequest = {} as CustomRequest;
        mockRequest.file = {
            buffer: csvFile.read(),
            originalname: 'usuarios.csv',
        };

        // Cria uma instância do controlador
        const controller = new CreateUserController();

        // Executa o método "handle" com o objeto de mock de Request e Response
        await controller.handle(mockRequest, mockResponse);

      
        // Verifica se o status e o json da resposta foram chamados corretamente
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Create user as sucessfully!' });
    });

    it('deve retornar erro ao falhar ao ler o arquivo CSV', async () => {
        // Configuração do mock para o arquivo CSV vazio
        const csvData = '';
        const csvFile = mockReadCSV(csvData);

        // Configuração do objeto Request com a propriedade file simulada
        const mockRequest = {} as CustomRequest;
        mockRequest.file = {
            buffer: csvFile.read(),
            originalname: 'usuarios.csv',
        };

        // Cria uma instância do controlador
        const controller = new CreateUserController();

        // Executa o método "handle" com o objeto de mock de Request e Response
        await controller.handle(mockRequest, mockResponse);

        // Verifica se o status e o json da resposta de erro foram chamados corretamente
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Input file csv failed!' });
    });
});