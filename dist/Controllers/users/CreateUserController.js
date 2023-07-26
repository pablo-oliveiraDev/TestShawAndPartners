"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
const stream_1 = require("stream");
const readline_1 = __importDefault(require("readline"));
;
class CreateUserController {
    async handle(request, response) {
        var _a, e_1, _b, _c, _d, e_2, _e, _f;
        const { file } = request;
        const { buffer } = file;
        const readableFile = new stream_1.Readable();
        readableFile.push(buffer);
        readableFile.push(null);
        const time = new Date().getTime();
        const fileName = `${time}_${file.originalname}`;
        const usersLine = readline_1.default.createInterface({
            input: readableFile,
        });
        const users = [];
        try {
            for (var _g = true, usersLine_1 = __asyncValues(usersLine), usersLine_1_1; usersLine_1_1 = await usersLine_1.next(), _a = usersLine_1_1.done, !_a;) {
                _c = usersLine_1_1.value;
                _g = false;
                try {
                    let line = _c;
                    const usersColumns = line.split(",");
                    users.push({
                        name: usersColumns[0],
                        city: usersColumns[1],
                        country: usersColumns[2],
                        favorite_sport: usersColumns[3],
                    });
                }
                finally {
                    _g = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_g && !_a && (_b = usersLine_1.return)) await _b.call(usersLine_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        ;
        const header = users.shift();
        console.log(users);
        if (users.length > 0) {
            try {
                try {
                    for (var _h = true, users_1 = __asyncValues(users), users_1_1; users_1_1 = await users_1.next(), _d = users_1_1.done, !_d;) {
                        _f = users_1_1.value;
                        _h = false;
                        try {
                            let { name, city, country, favorite_sport } = _f;
                            await prismaClient_1.prismaClient.user.createMany({
                                data: {
                                    name,
                                    city,
                                    country,
                                    favorite_sport,
                                    fileName,
                                },
                            });
                        }
                        finally {
                            _h = true;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (!_h && !_d && (_e = users_1.return)) await _e.call(users_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                ;
                return response.status(200).json({ msg: 'Create user as sucessfully!' });
            }
            catch (error) {
                console.log(error);
                return response.status(401).json({ msg: 'Input file csv failed!' });
            }
        }
        else {
            return response.status(401).json({ msg: 'Input file csv failed!' });
        }
    }
}
exports.CreateUserController = CreateUserController;
