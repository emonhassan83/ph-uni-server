import express from 'express';
import { AcademicSemesterControllers } from './academicSemester..controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './academicSemesterValidation';

const router = express.Router();


router.post('/create-academic-semester', validateRequest(AcademicSemesterValidation.academicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester);
router.get(
    '/:semesterId',
    AcademicSemesterControllers.getSingleAcademicSemester,
  );
  
  router.patch(
    '/:semesterId',
    validateRequest(
      AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterControllers.updateAcademicSemester,
  );
  
  router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);


export const AcademicSemesterRoute = router;