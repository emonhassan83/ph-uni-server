import config from '../../config';
import { Student } from '../student/student.model';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { academicSemester } from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  
  // if password is not provided, use default password
  userData.password = password || (config.default_password as string);

  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await academicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found');
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // set generate id
    userData.id = await generateStudentId(admissionSemester);

    // create a user (transaction-1)
    const newUser = await User.create([userData], {session}); //build in static methods (array)

    // create a student
    if (!newUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
      // set id, _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference id

      // create a student (transaction-2)
      const newStudent = await Student.create([payload], {session});

      if (!newStudent.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
      }
      await session.commitTransaction();
      await session.endSession();

      return newStudent;
  
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create user');
  }
};

export const UserService = {
  createStudentIntoDB,
};
