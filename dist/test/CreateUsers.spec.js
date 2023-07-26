"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateUserController_1 = require("../Controllers/users/CreateUserController");
const stream_1 = require("stream");
const mockResponse = {};
mockResponse.status = jest.fn().mockReturnThis();
mockResponse.json = jest.fn();
function mockReadCSV(data) {
    const buffer = Buffer.from(data);
    const readableFile = new stream_1.Readable();
    readableFile.push(buffer);
    readableFile.push(null);
    return readableFile;
}
describe('CreateUserController', () => {
    it('deve criar usuários corretamente a partir de um arquivo CSV', async () => {
        const csvData = '\nAlice,São Paulo,Brasil,Futebol,timestamp_usuarios.csv\nBob,Rio de Janeiro,Brasil,Basquete,timestamp_usuarios.csv';
        const csvFile = mockReadCSV(csvData);
        const mockRequest = {};
        mockRequest.file = {
            buffer: csvFile.read(),
            originalname: 'usuarios.csv',
        };
        const controller = new CreateUserController_1.CreateUserController();
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Create user as sucessfully!' });
    });
    it('deve retornar erro ao falhar ao ler o arquivo CSV', async () => {
        const csvData = '';
        const csvFile = mockReadCSV(csvData);
        const mockRequest = {};
        mockRequest.file = {
            buffer: csvFile.read(),
            originalname: 'usuarios.csv',
        };
        const controller = new CreateUserController_1.CreateUserController();
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Input file csv failed!' });
    });
});
