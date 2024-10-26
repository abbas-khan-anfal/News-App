import userModel from '../models/User.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const isAuthenticated = async (req, res, next) =>
{
    try
    {
        const { token } = req.cookies

        if(!token)
        {
            return res.status(401).json({
                success : false,
                message : "Login First"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // get user
        req.user = await userModel.findById(decoded.id)
        next()
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}

export default isAuthenticated