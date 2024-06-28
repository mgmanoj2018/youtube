import { Router } from "express";
import {upload} from '../middlewares/multer.middleware.js'
import { registration } from "../controllers/user.controller.js";
const router = Router()

router.route('/register').post(
    upload.fields([
        {name:"avatar",maxCount:1},
        {name:"couver",maxCount:1}
    ]),
    registration)

export default router   