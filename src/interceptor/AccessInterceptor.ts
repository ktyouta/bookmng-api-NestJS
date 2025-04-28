import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Logger } from 'src/common/logger/Logger';

@Injectable()
export class AccessInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const req = context.switchToHttp().getRequest();

        console.log(`reqest: ${req.method} ${req.url}`);

        const userAgent = req.headers['user-agent'];
        const ip = req.ip;
        const queryParams = JSON.stringify(req.query);
        const requestBody = JSON.stringify(req.body);
        // 出力内容
        const output = `${req.method} ${req.originalUrl} | User-Agent: ${userAgent} | Query: ${queryParams} | Request Body: ${requestBody} | ip: ${ip}`;

        // ログに出力
        Logger.info(output);

        return next.handle().pipe(tap(() => { }));
    }
}
