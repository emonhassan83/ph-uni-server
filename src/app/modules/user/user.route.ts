import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import { createStudentValidationSchema } from '../student/student.zod.validation';
import validateRequest from '../../middleware/validateRequest';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import { UserValidation } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

// will call controller function
router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  // auth(USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

router.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);

router.get('/me', auth('student', 'faculty', 'admin'), UserControllers.getMe);

export const UserRoutes = router;


/* {
  "password": "student123",
  "student": {
      "id": "123459",
      "name": {
          "firstName": "Simth",
          "middleName": "Doe",
          "lastName": "Johnson"
      },
      "gender": "male",
      "dateOfBirth": "1995-05-15",
      "email": "smith.doe@example.com",
      "contactNo": "9876543212",
      "emergencyContactNo": "1234567890",
      "bloodGroup": "A-",
      "presentAddress": "456 Oak Avenue, Townsville",
      "permanentAddress": "123 Main Street, Cityville",
      "guardian": {
          "fatherName": "David Johnson",
          "fatherOccupation": "Architect",
          "fatherContactNo": "3333333333",
          "motherName": "Emily Johnson",
          "motherOccupation": "Nurse",
          "motherContactNo": "4444444444"
      },
      "localGuardian": {
          "name": "Bob Brown",
          "occupation": "Professor",
          "contactNo": "5555555555",
          "address": "567 Maple Road, Countryside"
      },
      "admissionSemester": "657065d1348ef0610a8f65de",
      "academicDepartment": "65700fc9747f8cebd95adb05",
      "profileImg": "new/path/to/profile/image.jpg"
  }
}
 */