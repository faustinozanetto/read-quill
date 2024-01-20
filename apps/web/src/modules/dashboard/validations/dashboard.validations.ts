import { z } from 'zod';

/* Read Targets */
export const createReadTargetsValidationSchema = z.object({
  daily: z.number({ required_error: 'Daily is required!' }).min(0, { message: 'Daily min is 0!' }),
  weekly: z.number({ required_error: 'Weekly is required!' }).min(0, { message: 'Weekly min is 0!' }),
  monthly: z.number({ required_error: 'Monthly is required!' }).min(0, { message: 'Monthly min is 0!' }),
});

export const editReadTargetsValidationSchema = z.object({
  daily: z.number().min(0, { message: 'Daily min is 0!' }).optional(),
  weekly: z.number().min(0, { message: 'Weekly min is 0!' }).optional(),
  monthly: z.number().min(0, { message: 'Monthly min is 0!' }).optional(),
});

/* Read Registries */
export const createReadRegistryValidationSchema = z.object({
  pagesRead: z.number({ required_error: 'Pages read is required!' }).min(0, { message: 'Pages read min is 0!' }),
  bookId: z.string({ required_error: 'Book id is required!' }),
});
