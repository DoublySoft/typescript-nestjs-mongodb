import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Customer extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  lasName: string;

  @Prop()
  phone: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
