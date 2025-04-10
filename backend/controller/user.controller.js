import db from '../db.js'

export class UserController{
    constructor() { }

    login = async (req,res) =>{
        try{
            const {email, password} = req.body;
            const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
            const [rows] = await db.query(query,[email,password])
            if(rows.length === 1){
                res.status(200).send({
                    status: true,
                    user: rows[0],
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
}