import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { CookieModel } from 'src/cookie/model/CookieModel';

@Injectable()
export class CookieCheckGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {

        const request = context.switchToHttp().getRequest<Request>();

        const cookieModel = new CookieModel(request);

        if (!cookieModel) {
            throw new UnauthorizedException('クッキーが存在しません');
        }

        return true;
    }
}
