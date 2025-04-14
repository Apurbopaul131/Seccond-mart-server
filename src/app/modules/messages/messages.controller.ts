import { Request, Response } from 'express';
import catchAsync from '../../uitls/catchAsync';
import sendResponse from '../../uitls/sendResponse';
import { MessageServices } from './message.service';

const createMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageServices.createMessageIntoDB(req.body);
  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Message send successfully.',
    data: result,
  });
});

export const MessageController = {
  createMessage,
};
