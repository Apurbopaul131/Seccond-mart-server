import { TMessages } from './messages.interface';
import { Messages } from './messages.model';

const createMessageIntoDB = async (payload: TMessages) => {
  const result = Messages.create(payload);
  return result;
};
export const MessageServices = {
  createMessageIntoDB,
};
