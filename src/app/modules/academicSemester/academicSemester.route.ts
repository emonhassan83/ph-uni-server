import express from 'express';
import { AcademicSemesterControllers } from './academicSemester..controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './academicSemesterValidation';

const router = express.Router();


router.post('/create-academic-semester', validateRequest(AcademicSemesterValidation.academicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester);
// router.get('/', StudentControllers.getAllStudents);
// router.get('/:studentId', StudentControllers.getSingleStudent);
// router.delete('/:studentId', StudentControllers.deleteStudent);


export const AcademicSemesterRoute = router;