import { TAcademicSemesterCode } from "./academicSemister.interface";
import { academicSemester } from "./acdemicSemister.model";

const createAcademicSemesterIntoDB = async(payload: TAcademicSemesterCode) => {
  const result = await academicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = {
    createAcademicSemesterIntoDB,
}