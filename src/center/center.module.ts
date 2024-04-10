import { Module } from '@nestjs/common';
import { CenterService } from './center.service';
import { CenterController } from './center.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CenterSchema } from './center.model';
import { CenterUserSchema } from 'src/center/center-user.model';
import { UserSchema } from 'src/user/user.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'centers', schema: CenterSchema },
    { name: 'centersUsers', schema: CenterUserSchema },
    { name: "users", schema: UserSchema }
  ])],
  providers: [CenterService],
  controllers: [CenterController]
})
export class CenterModule { }
