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

}