import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    author: string;

    @Prop({ required: true })
    publishedDate: Date;

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}
export const BookSchema = SchemaFactory.createForClass(Book);