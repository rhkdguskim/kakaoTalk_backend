import { UsersController } from "@app/authentication/controller/authentication.controller.interface";
import { MessagePattern } from "@nestjs/microservices";
import {
  DELETE_USER,
  FIND_ALL_USER,
  FIND_ONE_USER,
  SIGN_UP,
  UPDATE_USER,
} from "@app/authentication/authentication.message";
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserInfoResponse,
} from "@app/authentication/dto/authenticaion.dto";
import { Controller, Inject } from "@nestjs/common";
import { AUTHENTICATION_SERVICE } from "@app/authentication/authentication.metadata";
import { AuthenticationService } from "@app/authentication/providers/authentication.service.interface";

@Controller()
export class UsersMicroController implements UsersController {
  constructor(
    @Inject(AUTHENTICATION_SERVICE)
    private readonly authenticationService: AuthenticationService
  ) {}

  @MessagePattern({ cmd: SIGN_UP })
  async signUp(payload: CreateUserRequest): Promise<UserInfoResponse> {
    return await this.authenticationService.register(payload);
  }

  @MessagePattern({ cmd: UPDATE_USER })
  async updateUser(id: number, payload: UpdateUserRequest): Promise<void> {
    await this.authenticationService.updateUser(id, payload);
  }

  @MessagePattern({ cmd: DELETE_USER })
  async deleteUser(payload: number): Promise<void> {
    await this.authenticationService.deleteUser(payload);
  }

  @MessagePattern({ cmd: FIND_ONE_USER })
  async findUser(payload: number): Promise<UserInfoResponse> {
    return await this.authenticationService.findUserByID(payload);
  }

  @MessagePattern({ cmd: FIND_ALL_USER })
  async findAllUsers(): Promise<UserInfoResponse[]> {
    return await this.authenticationService.findAllUsers();
  }
}
