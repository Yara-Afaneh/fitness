import { Router } from "express";
import { endPoints } from '../user/user.role.js';
import { auth } from "../../middleware/auth.js";
import * as userController from './user.controller.js'
import { asyncHandlar } from './../../ults/catcherror.js';
import validation from "../../middleware/validation.js";
import { updateSchema } from './user.validation.js';

const router=Router();
router.get('/getuserdata',auth(endPoints.getdata),asyncHandlar(userController.getUserData))
router.patch('/updateAcount',validation(updateSchema),auth(endPoints.update),asyncHandlar(userController.updateAcount))


export default router;