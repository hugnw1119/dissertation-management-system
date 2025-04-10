import db from '../db.js'

export class TeacherController{
    constructor() { }

    getTeacher = async (req,res) => {
        const query = `SELECT user_id, email, name FROM user WHERE position = 'teacher'`
        const [rows] = await db.query(query)
        if(rows.length > 0){
            res.status(200).send({
                status: true,
                teacher: rows
            });
        } else {
            res.status(401).send({
                status: false,
            });
        }
    }

    getOwnStudent = async (req,res) => {
        const {user_id} = req.params
        const query = `SELECT * FROM student WHERE assignTeacher = ?`
        const [rows] = await db.query(query,[user_id]);
        if(rows.length > 0){
            const updatedRows = rows.map(row => ({
                ...row,
                pggrade: row.pggrade || 'N/A',  
                finalgrade: row.finalgrade || 'N/A' ,
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

    gradeAssign = async (req,res) => {
        try{
            const {student} = req.body;
            for(const stu of student){
                const {student_id, pggrade, finalgrade } = stu;
                const query = 'UPDATE student SET pggrade = ?, finalgrade = ? WHERE student_id = ?';
                await db.query(query, [pggrade, finalgrade, student_id]);
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