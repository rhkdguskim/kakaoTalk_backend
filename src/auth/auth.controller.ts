import { Body, Controller, Get, Logger, Post, Query, Redirect, Req, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { User } from "../users/users.entity";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "../users/dto/users.loginuser.dto";
import { CreateUserDto } from "../users/dto/users.createuser.dto";
import { ApiTags, ApiOperation, ApiCreatedResponse } from "@nestjs/swagger";
import { GetOAuthData, GetUser } from "./get-user.decorator";
import { Request, Response  } from "express";
import { HttpCacheInterceptor } from "src/core/interceptors/httpcache.interceptor";
import { CacheEvict } from "src/core/interceptors/cache-decorator";
import { AuthGuard } from "@nestjs/passport";
import { OAuthData } from "./dto/OAuth.dto";

import * as config from "config";
const cors = config.get('cors')
const FRONT_END_HOST = cors.frontendHost

@Controller("auth")
@ApiTags("권한")
export class AuthController {
  constructor(private authService: AuthService,
    ) {}

  @Post("login")
  @ApiOperation({
    summary: "사용자 로그인 API",
    description: "사용자가 로그인을 한다.",
  })
  @ApiCreatedResponse({
    description: "JWT 토큰을 발급합니다",
    type: LoginUserDto,
  })
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() loginUser: LoginUserDto
  ) {
    const { access_token, refresh_token } = await this.authService.signIn(
      loginUser
    );
    response.cookie("jwt", access_token, {
      httpOnly: true,
    });
    return await { access_token, refresh_token };
  }

  @UseInterceptors(HttpCacheInterceptor)
  @CacheEvict("/users/")
  @Post("signup")
  @ApiOperation({
    summary: "사용자 생성 API",
    description: "사용자를 생성한다.",
  })
  @ApiCreatedResponse({ description: "사용자를 생성한다.", type: User })
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.authService.create(user);
  }

  @Post("refreshtoken")
  @ApiOperation({
    summary: "사용자 Token 재발급 API",
    description: "Refresh Token을 사용한 access Token 재발급",
  })
  @ApiCreatedResponse({
    description: "Refresh Token을 사용한 access Token 재발급 합니다",
  })
  getNewToken(@Body() refresh_Token: string, @GetUser() user: User) {
    return this.authService.getNewAccessToken(refresh_Token, user);
  }

  @Get("kakao/login")
  @UseGuards(AuthGuard("kakao"))
  @ApiOperation({
    summary: "OAuth 2.0 카카오톡 로그인 API",
    description: "카카오톡으로 인증하여 로그인을 구현합니다.",
  })
  async Kakao(@GetOAuthData() data : OAuthData, @Res() res: Response, @Req() req : Request) {
    const { access_token, refresh_token } = await this.authService.OAuthLogin(data)

    res.cookie("jwt", access_token, {
      httpOnly: true,
    });

    res.cookie("jwt2", refresh_token, {
      httpOnly: true,
    });

    res.redirect(`${FRONT_END_HOST}/login?access_token=${access_token}&refresh_token=${refresh_token}`)
  }

  @Get("naver/login")
  @UseGuards(AuthGuard("naver"))
  @ApiOperation({
    summary: "OAuth 2.0 네이버 로그인 API",
    description: "네이버으로 인증하여 로그인을 구현합니다.",
  })
  async Naver(@GetOAuthData() data : OAuthData, @Res() res: Response) {
    const { access_token, refresh_token } = await this.authService.OAuthLogin(data)

    res.cookie("jwt", access_token, {
      httpOnly: true,
    });
    res.redirect(`${FRONT_END_HOST}/login?access_token=${access_token}&refresh_token=${refresh_token}`)
  }

  @Get("google/login")
  @UseGuards(AuthGuard("google"))
  @ApiOperation({
    summary: "OAuth 2.0 구글 로그인 API",
    description: "구글으로 인증하여 로그인을 구현입니다.",
  })
  async Google(@GetOAuthData() data : OAuthData, @Res() res: Response) {
    const { access_token, refresh_token } = await this.authService.OAuthLogin(data)

    res.cookie("jwt", access_token, {
      httpOnly: true,
    });
    res.redirect(`${FRONT_END_HOST}/login?access_token=${access_token}&refresh_token=${refresh_token}`)
  }
}
