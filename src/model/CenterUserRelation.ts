import { Prop, Schema } from '@nestjs/mongoose';
import { Document , Schema as MongooseSchema} from 'mongoose';
import { Center } from 'src/center/center.model';
import { User } from 'src/user/user.model';

// CenterUserRelation model (ассоциативная таблица)
@Schema()
export class CenterUserRelation extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Center' })
  center: Center;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;
}