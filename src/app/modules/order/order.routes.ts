import express from 'express';
import auth from '../../middlewires/auth';
import validateRequest from '../../middlewires/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { OrderControllers } from './order.controller';
import { OrderValidations } from './order.validation';

//create router object
const router = express.Router();

//create a new transaction
router.post(
  '/transactions',
  auth(USER_ROLE.user),
  validateRequest(OrderValidations.createOrderValidationSchema),
  OrderControllers.createOrder,
);
//Fetch sales history
router.get('/sales/:userId', auth(USER_ROLE.user), OrderControllers.viewSales);

// Fetch purchase history
router.get(
  '/purchases/:userId',
  auth(USER_ROLE.user),
  OrderControllers.viewPurchases,
);
//Update transaction status
router.put(
  '/transactions/:id',
  auth(USER_ROLE?.user),
  validateRequest(OrderValidations.updateOrderValidationSchema),
  OrderControllers.updateOrderStatus,
);

router.get(
  '/transactions/verify',
  auth(USER_ROLE.user),
  OrderControllers.verifyPayment,
);

//export router
export const orderRouter = router;
