import { Response } from 'express';
import { HttpStatus } from '../const/HttpStatusConst';


export class ApiResponse {

    /**
     * restapiのレスポンスを作成する
     * @param res 
     * @param status 
     * @param message 
     * @param data 
     * @returns 
     */
    public static create<T>(status: HttpStatus, message: string, data?: T) {

        return {
            statusCode: status,
            timestamp: new Date(),
            message,
            data: data
        };
    }
}