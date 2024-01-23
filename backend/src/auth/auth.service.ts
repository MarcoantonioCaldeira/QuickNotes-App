import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly KayAuth = '3G5T8W7Y1K'; // Chave privada padrão

  generateToken(secretKey?: string): string {
    const keyToUse = secretKey || this.KayAuth;

    const payload = {
      secretKey: keyToUse,
    };

    return jwt.sign(payload, keyToUse, { expiresIn: '1h' }); 
  }
}
