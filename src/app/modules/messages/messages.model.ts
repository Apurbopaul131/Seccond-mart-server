import mongoose, { model, Schema } from 'mongoose';
import { TMessages } from './messages.interface';

const MessageSchema = new mongoose.Schema<TMessages>(
  {
    senderID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'senderId is required'],
    },
    receiverID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'senderId is required'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
  },
  { timestamps: true },
);

export const Messages = model<TMessages>('Message', MessageSchema);
