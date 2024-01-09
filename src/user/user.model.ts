import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/model/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  secondName: string;

  @Prop()
  phone: string;

  @Prop()
  patronymic: string;

  @Prop({ type: [String], enum: Object.values(Role) })
  roles: Role[];

  @Prop()
  address_id: string; // assuming it's the ID of the address

  @Prop()
  birthday: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);