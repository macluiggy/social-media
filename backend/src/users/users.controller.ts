import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
  Req,
  Scope,
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/users.dto';
import { API_VERSION } from '../common/constants';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import ApiStandardResponse from '../common/interceptors/api-response';
import getMessages from '../lang/getMessages';
import Lang from '../lang/lang.type';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({
  path: `api/${API_VERSION}/users`,
  scope: Scope.REQUEST,
})
export class UsersController {
  private messages: Lang;
  constructor(
    private readonly userService: UsersService,
    @Inject(REQUEST) private request: Request,
  ) {
    const lang = this.request['preferredLanguage'];
    this.messages = getMessages(lang);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  async create(@Body() userDTO: UserDto) {
    const data = await this.userService.create(userDTO);

    return new ApiStandardResponse(data, this.messages.USER.CREATED);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userDTO: UserDto,
    @Req() req: any,
  ) {
    const preferredLanguage = req.user.preferredLanguage;
    const messages = getMessages(preferredLanguage);
    return new ApiStandardResponse(
      await this.userService.update(id, userDTO),
      messages.USER.UPDATED,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
