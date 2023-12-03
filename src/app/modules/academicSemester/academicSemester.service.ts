import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemister.interface";
import { academicSemester } from "./acdemicSemister.model";

const createAcademicSemesterIntoDB = async(payload: TAcademicSemester) => {

  // check semester name ----> semester code

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code!!!')
  }

  const result = await academicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = {
    createAcademicSemesterIntoDB,
}