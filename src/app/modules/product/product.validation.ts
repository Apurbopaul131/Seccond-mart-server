import { z } from 'zod';
import { productCategories, productCondition } from './product.constant';

//create product schema
const createProductValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Name is requird',
        invalid_type_error: 'Name must be a string',
      })
      .trim(),
    userId: z
      .string({
        required_error: 'userId is requird',
        invalid_type_error: 'User must be a string',
      })
      .trim(),
    condition: z.enum([...productCondition] as [string, ...string[]], {
      message:
        'Category value must be | New | Like New | Excellent | Good | Fair| For Parts',
    }),
    brand: z
      .string({
        required_error: 'Brand is requird',
        invalid_type_error: 'Name must be a string',
      })
      .trim(),

    price: z
      .number({
        required_error: 'Price is requird',
        invalid_type_error: 'Price must be a number',
      })
      .min(0, { message: 'Price must be a positive number' }),

    category: z.enum([...productCategories] as [string, ...string[]], {
      message:
        'Category value must be Writing | Office Supplies | Art Supplies | Educational | Technology',
    }),

    images: z.array(z.string()).nonempty('Tags array cannot be empty'),

    description: z
      .string({
        required_error: 'Description is requird',
        invalid_type_error: 'Description must be a string',
      })
      .trim(),
    location: z
      .string({
        required_error: 'Condition is requird',
        invalid_type_error: 'Description must be a string',
      })
      .trim(),
  }),
});

//update product schema
const updateProductValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Name is requird',
        invalid_type_error: 'Name must be a string',
      })
      .trim()
      .optional(),
    condition: z
      .enum([...productCondition] as [string, ...string[]], {
        message:
          'Category value must be | New | Like New | Excellent | Good | Fair| For Parts',
      })
      .optional(),
    brand: z
      .string({
        required_error: 'Brand is requird',
        invalid_type_error: 'Name must be a string',
      })
      .trim()
      .optional(),

    price: z
      .number({
        required_error: 'Price is requird',
        invalid_type_error: 'Price must be a number',
      })
      .min(0, { message: 'Price must be a positive number' })
      .optional(),

    category: z
      .enum([...productCategories] as [string, ...string[]], {
        message:
          'Category value must be Writing | Office Supplies | Art Supplies | Educational | Technology',
      })
      .optional(),

    image: z.string().trim().optional().default(''),

    description: z
      .string({
        required_error: 'Description is requird',
        invalid_type_error: 'Description must be a string',
      })
      .trim()
      .optional(),
  }),
});
//export
export const ProductValidatios = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
