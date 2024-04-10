import { Body, Controller, Post, Get, Param, UseGuards, Request, ValidationPipe, UsePipes } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/CreateUserDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService,private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }

    @Post('/signup')
    @UsePipes(new ValidationPipe({ transform: true }))
    async createUser(
        @Body() createUserDto: CreateUserDto
    ): Promise<User> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
        const result = await this.userService.createUser(
            createUserDto.username,
            hashedPassword,
            createUserDto.roles
        );
        return result;
    } 
}