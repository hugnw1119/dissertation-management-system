import db from '../db.js'

export class AdminController{
    constructor() { }

    getStudent = async (req,res) => {
        const query = `SELECT student.student_id, student.name, student.pggrade, student.finalgrade,user.user_id, user.name AS TeacherName 
         FROM student 
         LEFT  JOIN user ON student.assignTeacher = user.user_id`;
        const [rows] = await db.query(query)
        if(rows.length > 0){
            const updatedRows = rows.map(row => ({
                ...row,
                pggrade: row.pggrade || 'N/A',  
                finalgrade: row.finalgrade || 'N/A' ,
                TeacherName: row.TeacherName || 'N/A' ,
              }));
            res.status(200).send({
                status: true,
                student: updatedRows
            });
        } else {
            res.status(401).send({
                status: false,
            });
        }
    }

    addStudent = async (req,res) =>{
        try{
            const {student} = req.body;
            const query = 'INSERT INTO student (name) VALUES ?';
            const values = student.map(name => [name]);
            const [rows] = await db.query(query,[values]);
            if(rows){
                res.status(200).send({
                    status: true,
                });
            } else {
                res.status(401).send({
                    status: false,
                });
            }
        } catch(error) {
            console.log(error);
            res.status(500).send({
                message: "Internal server error"
            }) 
        }
    }

    assignTeacher = async (req,res) => {
        try{
            const {student} = req.body;
            for(const stu of student){
                const { student_id, assignTeacher } = stu;
                const query = 'UPDATE student SET assignTeacher = ? WHERE student_id = ?';
                await db.query(query, [assignTeacher, student_id]);
            }
            res.status(200).send({
                status: true,
            });
        } catch(error){
            console.log(error);
            res.status(500).send({
                status: false,
                message: "Internal server error"
            }) 
        }
    }
}