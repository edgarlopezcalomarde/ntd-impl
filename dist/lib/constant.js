"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_ERROR_MESSAGE = exports.HTTP_RESPONSE_CODE = void 0;
exports.HTTP_RESPONSE_CODE = {
    NOT_FOUND: 404,
    CREATED: 201,
    CONFLICT: 409,
    BAD_REQUEST: 400,
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500,
};
exports.APP_ERROR_MESSAGE = {
    serverError: "Algo salió mal, inténtalo de nuevo más tarde",
    createdUser: "Usuario creado exitosamente",
    userAuthenticated: "Usuario autenticado exitosamente",
    userDoesntExist: "El usuario no existe",
    invalidCredentials: "Correo electrónico o contraseña de usuario no válidos",
    invalidEmail: "Ingresa una dirección de correo electrónico válida",
};
