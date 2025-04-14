import { Types } from 'mongoose';

export type TMessages = {
  senderID: Types.ObjectId;
  receiverID: Types.ObjectId;
  message: string;
};
