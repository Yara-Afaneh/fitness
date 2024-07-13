import { Router } from "express";
import * as classController from './class.controller.js'
import { asyncHandlar } from '../../ults/catcherror.js';
import validation from "../../middleware/validation.js";
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./class.role.js";
import { addclassSchema, deleteclassSchema, updateclassSchema } from "./class.validation.js";

const router=Router();


router.get('/',asyncHandlar(classController.get))
router.post('/add',validation(addclassSchema),auth(endPoints.add),asyncHandlar(classController.addClass))
router.patch('/update/:id',validation(updateclassSchema),auth(endPoints.add),asyncHandlar(classController.updateClass))
router.delete('/delete/:id',validation(deleteclassSchema),auth(endPoints.add),asyncHandlar(classController.destroy))


export default router;