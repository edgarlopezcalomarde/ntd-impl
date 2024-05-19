export const HTTP_RESPONSE_CODE = {
    NOT_FOUND: 404,
    CREATED: 201,
    CONFLICT: 409,
    BAD_REQUEST: 400,
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500,
} as const;

export const enum HttpStatusCode {
    NOT_FOUND = 404,
    CREATED = 201,
    CONFLICT = 409,
    BAD_REQUEST = 400,
    SUCCESS = 200,
    UNAUTHORIZED = 401,
}

export const APP_ERROR_MESSAGE = {
    serverError: "Algo salió mal, inténtalo de nuevo más tarde",
    createdUser: "Usuario creado exitosamente",
    userAuthenticated: "Usuario autenticado exitosamente",
    userDoesntExist: "El usuario no existe",
    invalidCredentials: "Correo electrónico o contraseña de usuario no válidos",
    invalidEmail: "Ingresa una dirección de correo electrónico válida",
} as const;