
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel('users') private readonly userModel: Model<UserDocument>) { }
    async createUser(username: string, password: string, roles: string[]): Promise<User> {
        return this.userModel.create({
            username,
            password,
            roles
        });
    }
    async findOne(username: string ): Promise<User> {
        return this.userModel.findOne({ username }).exec();
    }
}