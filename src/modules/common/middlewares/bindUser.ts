import { Injectable, NestMiddleware } from '@nestjs/common';
import console from 'console';
import { Request, Response } from 'express';

import { enTokenType, TokenService } from '../services/token';

@Injectable()
export class BindUserMiddleware implements NestMiddleware {
  constructor(private tokenService: TokenService) {}

  public async use(req: Request, res: Response, next: Function) {
    const accessToken = req.get('Authorization');
    console.log('token', accessToken);

    if (!accessToken) {
      return next();
    }

    try {
      (req as any).user = await this.tokenService.verify(accessToken, enTokenType.accessToken);
    } catch (err) {
      console.log('erro');
    }

    next();
  }
}
