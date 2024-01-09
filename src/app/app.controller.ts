import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '../model/role.enum';
import { RolesGuard } from '../auth/roles.guard';

@Controller()
export class AppController {
  constructor() {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @HasRoles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('admin')
  onlyAdmin(@Request() req) {
    return req.user;
  }

  @HasRoles(Role.User)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('user')
  onlyUser(@Request() req) {
    return req.user;
  }
}