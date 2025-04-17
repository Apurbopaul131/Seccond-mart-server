import AppError from '../../error/AppError';
import { TMessages } from './messages.interface';
import { Messages } from './messages.model';

const createMessageIntoDB = async (payload: TMessages) => {
  if (payload.senderID === payload?.receiverID) {
    throw new AppError(409, 'user can not chat for his own product.');
  }
  const result = await Messages.create(payload);
  return result;
};

const getMessageFromDB = async (userId: string) => {
  const receivedMessage = await Messages.find({ receiverID: userId })
    .select('_id senderID receiverID message createdAt updatedAt')
    .populate({
      path: 'senderID receiverID',
      select: '_id name email phoneNumber role isBlocked',
    });
  if (!receivedMessage) {
    throw new AppError(404, 'User message not found!');
  }
  return receivedMessage;
};
export const MessageServices = {
  createMessageIntoDB,
  getMessageFromDB,
};
