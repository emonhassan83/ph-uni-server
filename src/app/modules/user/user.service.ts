import config from "../../config";
import { Student } from "../student/student.model";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { academicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async( password: string ,payload: TStudent) => {
    const userData: Partial<TUser> = {};

    // if password is not provided, use default password
    userData.password = password || (config.default_password as string);

    userData.role = "student";

    // find academic semester info
    const admissionSemester = await academicSemester.findById(payload.admissionSemester);

    if (!admissionSemester) {
        throw new Error("Academic semester not found");
      }

    // set generate id
    userData.id = await generateStudentId(admissionSemester);

    // create a user
   const newUser = await User.create(userData); //build in static methods

    // create a student
    if (Object.keys(newUser).length) {
        // set id, _id as user
        payload.id = newUser.id;
        payload.user = newUser._id; //reference id

        const newStudent = await Student.create(payload);
        return newStudent;
    }

}

export const UserService = {
    createStudentIntoDB,
}