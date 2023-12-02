import { z } from 'zod';
import { AcademicSemesterCode, Months, academicSemesterName } from './academicSemester.constant';

const academicSemesterValidationSchema = z.object({
 body: z.object({
  name: z.enum([...academicSemesterName] as [string, ...string[]]),
  year: z.string(),
  code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
  startMonth: z.enum([...Months] as [string, ...string[]]),
  endMonth: z.enum([...Months] as [string, ...string[]]),
 })
});

export const  AcademicSemesterValidation = {
  academicSemesterValidationSchema,
};
