import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AnotationModule } from './app/anotations/anotation.module';
import { PrismaService } from './database/PrismaService';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthMiddleware } from './auth/auth.mddleware';



@Module({
  imports: [
   AnotationModule
  ],
  controllers: [AuthController],
  providers: [AuthService ,PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('anotations'); // Aplica o middleware aos endpoints desejados
  }
}