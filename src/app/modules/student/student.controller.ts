/* eslint-disable @typescript-eslint/no-explicit-any */
import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { RequestHandler } from 'express';
// import createStudentValidationSchema from './student.zod.validation';
// import createStudentValidationSchema from './student.joi.validation';

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentsFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'Student are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentServices.getSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await studentServices.updateStudentIntoDB(id, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentServices.deleteStudentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
