import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { StudentRoutes } from "../modules/student/student.route";
import { AcademicSemesterRoute } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoute } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoute } from "../modules/academicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../modules/Faculty/faculty.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { CourseRoutes } from "../modules/Course/course.route";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegister.route";
import { offeredCourseRoutes } from "../modules/OfferedCourse/OfferedCourse.route";
import { AuthRoutes } from "../modules/Auth/auth.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/students',
        route: StudentRoutes,
    },
    {
        path: '/faculties',
        route: FacultyRoutes,
      },
      {
        path: '/admins',
        route: AdminRoutes,
      },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoute,
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRoute,
    },
    {
        path: '/academic-departments',
        route: AcademicDepartmentRoute,
    },
    {
        path: '/courses',
        route: CourseRoutes,
      },
      {
        path: '/semester-registrations',
        route: semesterRegistrationRoutes,
      },
      {
        path: '/offered-courses',
        route: offeredCourseRoutes,
      },
      {
        path: '/auth',
        route: AuthRoutes,
      },
]

moduleRoutes.forEach(route => router.use(route.path, route.route));


export default router;