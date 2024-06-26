"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.catchErrors = void 0;
function catchErrors(fn) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fn(req, res, next);
            }
            catch (error) {
                next(error);
            }
        });
    };
}
exports.catchErrors = catchErrors;
function errorHandler(error, req, res, next) {
    let statusCode = 500;
    let message = "Une erreur à été intercepté dans le mw d'erreur";
    if (error.statusCode) {
        statusCode = error.statusCode;
    }
    if (error.message) {
        message = error.message;
    }
    res.status(statusCode).json({ error: message });
}
exports.errorHandler = errorHandler;
