import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document , Schema as MongooseSchema} from 'mongoose';
import { Center } from 'src/center/center.model';
import { User } from 'src/user/user.model';


@Schema()
 class CenterUser extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Center' })
  center: Center;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;
}


export const CenterUserSchema = SchemaFactory.createForClass(CenterUser);