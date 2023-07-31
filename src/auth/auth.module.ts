import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config'
import { JwtStrategy } from './jwt.strategy';

const jwtConstants = config.get('jwt')

@Module({
  imports : [
    PassportModule.register({ defaultStrategy: 'jwt'}),
    UsersModule,
    JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: {expiresIn: jwtConstants.expiresIn},
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtStrategy]
})
export class AuthModule {}