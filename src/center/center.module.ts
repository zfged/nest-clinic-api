import { Module } from '@nestjs/common';
import { CenterService } from './center.service';
import { CenterController } from './center.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CenterSchema } from './center.model';
import { CenterUserRelation } from 'src/model/CenterUserRelation';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'centers', schema: CenterSchema },
    { name: 'centerUserRelation', schema: CenterUserRelation }])],
  providers: [CenterService],
  controllers: [CenterController]
})
export class CenterModule { }
