import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FollowsService } from './follows.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import getApiEndpoint from '../../common/utils/getApiEndpoint';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('follows')
@UseGuards(JwtAuthGuard)
@Controller({
  path: getApiEndpoint('follows'),
})
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post()
  create(@Body() createFollowDto: CreateFollowDto) {
    return this.followsService.create(createFollowDto);
  }

  @Get()
  findAll() {
    return this.followsService.findAll();
  }

  @Post('user/:followedId/follow')
  @ApiOperation({ summary: 'Follow a user' })
  @ApiParam({
    name: 'followedId',
    type: Number,
    description: 'ID of the user to follow',
  })
  @ApiResponse({ status: 200, description: 'Follow successful' })
  follow(@Param('followedId') followedId: number, @Req() req: Request) {
    const user = req['user'];
    const followerId = user.id;

    return this.followsService.follow(+followedId, +followerId);
  }

  @Post('user/:followedId/unfollow')
  @ApiOperation({ summary: 'Unfollow a user' })
  @ApiParam({
    name: 'followedId',
    type: Number,
    description: 'ID of the user to unfollow',
  })
  @ApiResponse({ status: 200, description: 'Unfollow successful' })
  unfollow(@Param('followedId') followedId: number, @Req() req: Request) {
    const followerId = req['user'].id;

    return this.followsService.unfollow(followedId, followerId);
  }

  @ApiOperation({ summary: 'Get the users that a user is following' })
  @Get('user/:userId/following')
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'ID of the user',
  })
  @ApiResponse({ status: 200, description: 'Get following users successful' })
  getFollowing(@Param('userId') userId: number) {
    return this.followsService.getUserFollowing(userId);
  }

  @ApiOperation({ summary: 'Get the followers of a user' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'Get followers successful' })
  @Get('user/:userId/followers')
  getFollowers(@Param('userId') userId: number) {
    return this.followsService.getUserFollowers(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.followsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFollowDto: UpdateFollowDto) {
    return this.followsService.update(+id, updateFollowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followsService.remove(+id);
  }
}
