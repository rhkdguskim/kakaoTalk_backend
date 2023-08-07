import { Body, Controller, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChattingService } from './chatting.service';
import { ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateRoom } from './dto/chatting.createRoom.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/users.entity';
import { Room } from './room.entity';
import { InviteToRoom } from './dto/chatting.inviteToRoom.dto';

@Controller('chatting')
@UseGuards(AuthGuard())
export class ChattingController {
    constructor(private chattingService : ChattingService) {}

    @Post('add')
    @ApiOperation({ summary: '방 생성하기 API', description: '등록된 친구중 친구정보를 변경합니다.' })
    @ApiCreatedResponse({ description: '등록된 친구중 친구정보를 변경합니다.'})
    async CreateRoom(@Body() createRoom: CreateRoom, @GetUser() user: User) : Promise<Room> {
        return this.chattingService.createRoom(createRoom, user)
    }

    @Post('invite')
    @ApiOperation({ summary: '방에 초대하기 API', description: '방에 초대합니다.' })
    @ApiCreatedResponse({ description: '등록된 친구중 친구정보를 변경합니다.'})
    async Invite(@Body() inviteToRoom: InviteToRoom, @GetUser() user: User) : Promise<Room> {
        return this.chattingService.inviteToRoom(inviteToRoom)
    }
}