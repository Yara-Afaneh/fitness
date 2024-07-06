import { Router } from "express";
import { endPoints } from './admin.role.js';
import { auth } from "../../middleware/auth.js";
import * as userController from './admin.controller.js'
import { asyncHandlar } from '../../ults/catcherror.js';
import validation from "../../middleware/validation.js";
import { addAdminSchema, updateAdminSchema } from './admin.validation.js';

const router=Router();


router.get('/getall',auth(endPoints.getAll),asyncHandlar(userController.getAll))
router.patch('/addAdmin/:id',validation(addAdminSchema),auth(endPoints.update),asyncHandlar(userController.addAdmin))
router.patch('/updateAdmin/:id',validation(updateAdminSchema),auth(endPoints.update),asyncHandlar(userController.updateAdmin))
router.patch('/deleteAdmin/:id',validation(addAdminSchema),auth(endPoints.update),asyncHandlar(userController.deleteAdmin))

export default router;