import express from "express";
import { UserController } from "./controller/user.controller.js";
import { AdminController } from "./controller/admin.controller.js";
import { TeacherController } from "./controller/teacher.controller.js"

const router = express.Router();
const userController = new UserController();
const adminController = new AdminController();
const teacherController = new TeacherController();

router.post("/login", userController.login)

router.get('/getStudent', adminController.getStudent)
router.post("/addStudent", adminController.addStudent)
router.put('/assignTeacher', adminController.assignTeacher)

router.get('/getTeacher', teacherController.getTeacher)
router.get('/getStudentByTeacher/:user_id',teacherController.getOwnStudent)
router.put('/gradeAssign', teacherController.gradeAssign)


export default router;