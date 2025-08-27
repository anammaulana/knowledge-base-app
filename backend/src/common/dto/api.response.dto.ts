export class ApiResponseDto<T = any> {
    success: boolean;
    message: string;
    data?: T;
    meta?: any; // optional kalau butuh pagination, dll

    constructor(success: boolean, message: string, data?: T, meta?: any) {
        this.success = success;
        this.message = message;
        if (data !== undefined) this.data = data;
        if (meta !== undefined) this.meta = meta;
    }

    static success<T>(message: string, data?: T, meta?: any) {
        return new ApiResponseDto<T>(true, message, data, meta);
    }

    static error(message: string, data?: any) {
        return new ApiResponseDto(false, message, data);
    }
}
