import { Request, Response } from 'express';
import { studentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const {student: studentData} = req.body;
    // will call service function to send this data
    const result = await studentServices.createStudentIntoDB(studentData);
    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await studentServices.getAllStudentsFromDB()
        res.status(200).json({
            success: true,
            message: 'Student are retrieved successfully',
            data: result,
          });
    } catch (error) {
       console.log(error);
        
    }
};

const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const {studentId} = req.params;
        const result = await studentServices.getSingleStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: 'Student is retrieved successfully',
            data: result,
          });
    } catch (error) {
       console.log(error);
        
    }
};

export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
  };