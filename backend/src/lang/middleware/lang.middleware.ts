import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SetUserPreferredLanguage implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (token) {
      // extract the token payload
      const payload = this.jwtService.decode(token);

      const preferredLanguage = payload['preferredLanguage'] || 'es';
      req['preferredLanguage'] = preferredLanguage;
    }

    next();
  }
}
