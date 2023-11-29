import Joi from 'joi'

const userNameSchema = Joi.object({
    firstName: Joi.string().required().trim().max(20).pattern(/^[A-Z][a-z]*$/),
    middleName: Joi.string(),
    lastName: Joi.string().required().pattern(/^[A-Za-z]+$/),
  });
  
  // Define Joi schema for Guardian
  const guardianSchema = Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
  });
  
  // Define Joi schema for LocalGuardian
  const localGuardianSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
  });
  
  // Define Joi schema for Student
  const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    password: Joi.string().required().max(20)
    .messages({
      'any.required': 'Password is required',
      'string.max': 'Password cannot be more than 20 characters',
    }),
    name: userNameSchema.required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    dateOfBirth: Joi.string(),
    email: Joi.string().email().required(),
    contractNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    guardian: guardianSchema.required(),
    localGuardian: localGuardianSchema.required(),
    profileImg: Joi.string(),
    isActive: Joi.string().valid('active', 'blocked').default('active'),
    isDeleted: Joi.boolean(),
  });

  export default studentValidationSchema