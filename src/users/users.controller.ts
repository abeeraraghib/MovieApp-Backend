import { 
  Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register-user')
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get('get-all-users')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('find-one/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() body: CreateUserDto) {
    return this.usersService.update(+id, body);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/me')
  getProfile(@Req() req) {
    return req.user; 
  }
}
