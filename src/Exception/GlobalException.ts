import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'src/common/logger/Logger';

@Catch()
export class GlobalException implements ExceptionFilter {

    private static readonly _HTTP_STATUS_ERROR = 500;

    catch(exception: Error, host: ArgumentsHost) {

        const httpError = host.switchToHttp();
        const response = httpError.getResponse<Response>();
        const request = httpError.getRequest<Request>();

        const message = exception.message;
        const status = GlobalException._HTTP_STATUS_ERROR;

        const userAgent = request.headers['user-agent'];
        const ip = request.ip;
        const queryParams = JSON.stringify(request.query);
        const requestBody = JSON.stringify(request.body);
        // 出力内容
        const output = `${request.method} ${request.originalUrl} | User-Agent: ${userAgent} | Query: ${queryParams} | Request Body: ${requestBody} | ip: ${ip} | ERROR: ${message}`;

        console.log(`Error occurred: ${message}`);

        // エラーログに出力
        Logger.error(output);

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: `予期しないエラーが発生しました`,
        });
    }
}
