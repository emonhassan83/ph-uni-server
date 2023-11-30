import config from "../../config";
import { Student } from "../student/student.model";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async( password: string ,studentData: TStudent) => {
    // set student role
    const userData: Partial<TUser> = {};

    // if password is not provided, use default password
    userData.password = password || (config.default_password as string);
    // set userData role
    userData.role = "student";

    // set manually generate id
    userData.id = '2030100001';

    // create a user
   const newUser = await User.create(userData); //build in static methods

    // create a student
    if (Object.keys(newUser).length) {
        // set id, _id as user
        studentData.id = newUser.id;
        studentData.user = newUser._id; //reference id

        const newStudent = await Student.create(studentData);
        return newStudent;
    }

}

export const UserService = {
    createStudentIntoDB,
}