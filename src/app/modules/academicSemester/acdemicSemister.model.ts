import { Schema, model } from 'mongoose';
import {
  TAcademicSemester,
} from './academicSemister.interface';
import { Months, AcademicSemesterCode, academicSemesterName } from './academicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: academicSemesterName,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
);


academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await academicSemester.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExists) {
    throw new Error('Semester is already exists!!')
  }

  next();
})

export const academicSemester = model<TAcademicSemester>(
  'Academic Semester',
  academicSemesterSchema,
);
