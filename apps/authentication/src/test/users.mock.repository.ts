import { User } from "../entity/users.entity";

import {UserRepository} from "../repository/users.interface.repository";

export class UserMockRepository implements UserRepository {
  findOneByID(user_id: string): Promise<User> {
    const mockUser: User = {
      id: 1,
      name: "Mock User",
      user_id,
      password: "test",
      status_msg: "안녕",
      profile_img_url: "",
      background_img_url: "",
      createdAt: undefined,
      updateAt: undefined,
      refresh_token: "",
      access_token: "",
      oauth_refresh_token: "",
      oauth_access_token: "",
      refresh_token_expire: undefined,
    };

    return Promise.resolve(mockUser);
  }
  create(data: Partial<User>): Promise<User> {
    const mockData: User = {
      id: 0,
      user_id: "",
      password: "",
      name: "",
      status_msg: "",
      profile_img_url: "",
      background_img_url: "",
      createdAt: undefined,
      updateAt: undefined,
      refresh_token: "",
      access_token: "",
      oauth_refresh_token: "",
      oauth_access_token: "",
      refresh_token_expire: undefined,
    };

    return Promise.resolve(mockData);
  }
  findAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string | number): Promise<User> {
    const number_id = id as number;
    const mockUser: User = {
      id: number_id,
      name: "Mock User",
      user_id: "MockUserID",
      password: "test",
      status_msg: "안녕",
      profile_img_url: "",
      background_img_url: "",
      createdAt: undefined,
      updateAt: undefined,
      refresh_token: "",
      access_token: "",
      oauth_refresh_token: "",
      oauth_access_token: "",
      refresh_token_expire: undefined,
    };

    return Promise.resolve(mockUser);
  }
  update(id: string | number, data: Partial<User>): Promise<boolean | User> {
    throw new Error("Method not implemented.");
  }
  delete(id: string | number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
