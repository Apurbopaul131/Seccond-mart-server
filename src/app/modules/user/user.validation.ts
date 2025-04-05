import { z } from 'zod';
import { role } from './user.constant';

//user validation schema using zod
const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be string',
    }),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be string',
      })
      .email({ message: 'Invalid email address' }),
    phoneNumber: z
      .string({
        required_error: 'Number is required',
        invalid_type_error: 'Number must be string',
      })
      .min(10, { message: 'Must be a valid mobile number' })
      .max(14, { message: 'Must be a valid mobile number' }),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be string',
      })
      .min(8, 'Password must be at least 8 characters.'),
    role: z
      .enum([...role] as [string, ...string[]], {
        message: 'Role must be admin | user',
      })
      .optional(),
    isBlocked: z
      .boolean({
        invalid_type_error: 'isBlocked must be boolean',
      })
      .optional(),
  }),
});

//export
export const UserValidations = {
  createUserValidationSchema,
};
