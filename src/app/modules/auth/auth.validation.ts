import { z } from 'zod';

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be string',
      })
      .email({ message: 'Invalid email address' }),
    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be string',
    }),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be string',
      })
      .optional(),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be string',
      })
      .email({ message: 'Invalid email address' })
      .optional(),
    phoneNumber: z
      .string({
        required_error: 'Number is required',
        invalid_type_error: 'Number must be string',
      })
      .min(10, { message: 'Must be a valid mobile number' })
      .max(14, { message: 'Must be a valid mobile number' })
      .optional(),
  }),
});
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});
export const AuthValidations = {
  loginUserValidationSchema,
  refreshTokenValidationSchema,
  updateUserValidationSchema,
};
