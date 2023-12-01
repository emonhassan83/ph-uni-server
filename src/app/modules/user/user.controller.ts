import { RequestHandler } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  // creating a  schema validation using joi
  //   const { error, value } = createStudentValidationSchema.validate(studentData);

  // data validating using zod
  // const zodParsedData = createStudentValidationSchema.parse(studentData);

  // will call service function to send this data
  const result = await UserService.createStudentIntoDB(password, studentData);

  // send response
  // res.status(200).json({
  //   success: true,
  //   message: 'Student is created successfully',
  //   data: result,
  // });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
