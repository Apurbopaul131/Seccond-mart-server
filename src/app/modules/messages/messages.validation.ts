import { z } from 'zod';

const createMessageValidationSchema = z.object({
  body: z.object({
    senderID: z.string({
      required_error: 'senderId is requird',
      invalid_type_error: 'senderID must be a string',
    }),
    receiverID: z.string({
      required_error: 'receiverID is requird',
      invalid_type_error: 'receiverID must be a string',
    }),
    message: z.string({
      required_error: 'Message is required',
      invalid_type_error: 'Message must be string',
    }),
  }),
});
export const MessageValidations = {
  createMessageValidationSchema,
};
