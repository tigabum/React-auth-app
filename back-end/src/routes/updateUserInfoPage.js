import jwt from 'jsonwebtoken'
import { getDbConnection } from '../db'
import {ObjectID} from 'mongodb'

export const updateUserInfoPage = {
    path: '/api/user/:userId',
    method: 'put',
    handler: async (req, res) => {
            const {authorization} = req.headers
            const {userId} = req.params

            const updates = (({
                favoriteFood,
                hairColor,
                bio,
            }) =>({
                favoriteFood,
                hairColor,
                bio
            }))(req.body)
                console.log("updates is", updates, req.body)
            if(!authorization){
               return res.status(401).json({message: 'No authorization headers'})
            }

            const token = authorization.split(" ")[1]

            jwt.verify(token, `${process.env.JWT_KEY}`, async (err, decoded)=>{
                if(err) return res.status(401).json({message: 'Unable to verify token'})
                const {id} = decoded

                if(id !== userId) return res.status(403).json({message: 'Unable to update that user db'})

                const db = getDbConnection('react-db-auth')
                const result = await db.collection('users').findOneAndUpdate(
                    {_id: ObjectID(id)},
                    {$set: {initialInfo: updates}},
                    {returnOriginal: false}
                     )

                     const {email, isVerfied, initialInfo,} =result.value

                     jwt.sign({id, email, isVerfied, initialInfo}, `${process.env.JWT_KEY}`,{expiresIn:'2d'} ,(err, token) => {
                         if(err){
                             return res.status(200).json(error)
                         }
                         res.status(200).json({token})
                     })
            })
        
    }
}