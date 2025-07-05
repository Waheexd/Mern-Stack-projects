import express from 'express'
import cors from 'cors'
import {loginUser,registerUser,adminLogin} from '../controllers/UserController.js'

const UserRoute= express.Router();

UserRoute.post('/register',registerUser)
UserRoute.post('/login',loginUser)
UserRoute.post('/admin',adminLogin)

export default UserRoute;