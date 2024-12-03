export enum CodeResponseEnum {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500
}

export default class ResponseModel {
    constructor(
        private error: boolean,
        private code: CodeResponseEnum,
        private message: string,
        private data?: Object
    ) {}

    getCode() {
        return this.code;
    }
}