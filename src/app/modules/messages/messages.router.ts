import express from 'express';
import auth from '../../middlewires/auth';
import validateRequest from '../../middlewires/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { MessageController } from './messages.controller';
import { MessageValidations } from './messages.validation';

const router = express.Router();

router.post(
  '/messages',
  auth(USER_ROLE?.user),
  validateRequest(MessageValidations.createMessageValidationSchema),
  MessageController.createMessage,
);
router.get(
  '/messages/:userId',
  auth(USER_ROLE?.user),
  MessageController.getMessage,
);

export const messageRouter = router;
