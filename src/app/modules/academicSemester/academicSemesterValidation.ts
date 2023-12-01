import { z } from 'zod';

const academicSemesterValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more 20 characters' })
    .optional(),
});

export const  AcademicSemesterValidation = {
  academicSemesterValidationSchema,
};
