import { getDbConnection } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

export const logInRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) =>{
        const {email, password} = req.body

        const db = getDbConnection('react-db-auth')
        const user = await db.collection('users').findOne({email})
        console.log("user is not here login", user)
        
        if(!user) return res.sendStatus(401);

        const {_id: id, hashedPassword, initialInfo:{isVerfied}} = user

        const isCorrect = await bcrypt.compare(password, hashedPassword)
        console.log("isCorrect", isCorrect)

        if(isCorrect){
            jwt.sign({
                id,
                email,
                isVerfied,
            },
            `${process.env.JWT_KEY}`,
            {
                expiresIn: '2d'
            },
            (err, token) => {
                if(err) {
                    return res.status(500).json(err)
                } else {
                   return  res.status(200).json({token})
                }
            }
            )
        } else {
                return res.sendStatus(401)
        }
            
        
    }
}