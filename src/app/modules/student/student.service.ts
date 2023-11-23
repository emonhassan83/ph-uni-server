import { Student } from "../student.model";
import { TStudent } from "./student.interface";

const createStudentIntoDB = async(studentData: TStudent) => {
//    const result = await StudentModel.create(student); //build in static methods

const student =  new Student(studentData); //create an instance
if (await student.isUserExists(studentData.id)) {
    throw new Error("Student already exists")
}

const result = await student.save(); //build in instance methods
   return result;
}

const getAllStudentsFromDB = async () => {
    const result = await Student.find();
    return result;
}

const getSingleStudentFromDB = async (id: string) => {
    const result = await Student.findOne({id});
    return result;
}

export const studentServices = {
    createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB,
}