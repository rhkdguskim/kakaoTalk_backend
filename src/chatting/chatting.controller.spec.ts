import { Test, TestingModule } from "@nestjs/testing";
import { ChattingController } from "./chatting.controller";
import { CacheAppModule } from "@src/cacheapp.module";
import { Logger } from "@nestjs/common";
import { ChattingService } from "./chatting.service";
import { DatabaseModule } from "@src/database.module";
import { Chatting } from "./chatting.entity";
import { Participant } from "./participant.entity";
import { RoomService } from "./room.service";
import { Room } from "./room.entity";
import { User } from "@src/users/users.entity";
import { ChattingModule } from "./chatting.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReadBy } from "./readby.entity";

describe("ChattingController", () => {
  let controller: ChattingController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[CacheAppModule, DatabaseModule, TypeOrmModule.forFeature([Chatting, Room, Participant, ReadBy]),],
      controllers: [ChattingController],
      providers:[Logger,ChattingService,RoomService],
    }).compile();
    
    controller = module.get<ChattingController>(ChattingController);
  });

  describe("ChattingController",  () => {
    it("should be defined", () => {
      expect(controller).toBeDefined();
    });

    it("GetChattingList", async ()=> {
      const result = await controller.GetChattingList(1, null)

      expect(result).toBeInstanceOf(Array);
    })
  })

});
