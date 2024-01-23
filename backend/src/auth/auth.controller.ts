import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('anotations')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  generateToken(): { token: string } {
    const token = this.authService.generateToken();
    return { token };
  }
}
