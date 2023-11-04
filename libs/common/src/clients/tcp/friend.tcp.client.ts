import { ClientTCP, TcpClientOptions } from "@nestjs/microservices";
import { IFriendClient } from "../friend.interface.client";
import {
  FindFriendAllRequest,
  CreateFriendRequest,
  CreateFriendResponse,
  DelteFriendRequest,
} from "@app/common/dto/friend.createfriend.dto";
import { Friend } from "@app/common/entity";
import { UserResponse } from "@app/common/dto";
import { lastValueFrom } from "rxjs";
import {
  ADD_FRIEND,
  DELETE_FRIEND,
  FIND_ALL_FRIEND,
  UPDATE_FRIEND,
} from "@app/common/message/friend";

export class FriendTCPClient extends ClientTCP implements IFriendClient {
  constructor(options: TcpClientOptions["options"]) {
    super(options);
  }
  findAllFriend(payload: FindFriendAllRequest): Promise<UserResponse[]> {
    return lastValueFrom<UserResponse[]>(
      this.send<UserResponse[]>({ cmd: FIND_ALL_FRIEND }, payload)
    );
  }
  addFriend(payload: CreateFriendRequest): Promise<CreateFriendResponse> {
    return lastValueFrom<CreateFriendResponse>(
      this.send<CreateFriendResponse>({ cmd: ADD_FRIEND }, payload)
    );
  }
  updateFriend(payload: CreateFriendRequest): Promise<Friend> {
    return lastValueFrom<Friend>(
      this.send<Friend>({ cmd: UPDATE_FRIEND }, payload)
    );
  }
  deleteFriend(payload: DelteFriendRequest): Promise<any> {
    return lastValueFrom<Friend>(
      this.send<Friend>({ cmd: DELETE_FRIEND }, payload)
    );
  }
}
