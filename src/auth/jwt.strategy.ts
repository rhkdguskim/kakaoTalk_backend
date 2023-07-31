import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as config from 'config';
import { UsersService } from "src/users/users.service";
import { User } from "src/users/users.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UsersService
    ) {
        super({
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) : Promise<User> {
        const { id } = payload;
        const user: User = await this.userService.findOne(id);

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}