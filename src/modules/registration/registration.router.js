import { Router } from "express";
import * as registrationController from './registration.controller.js'
import { asyncHandlar } from '../../ults/catcherror.js';
import validation from "../../middleware/validation.js";
import { addregistrationSchema, deleteregistrationSchema } from "./registration.validation.js";
import { endPoints } from './registration.role.js';
import { auth } from "../../middleware/auth.js";


const router=Router();


router.get('/',auth(endPoints.get),asyncHandlar(registrationController.get))
router.post('/add/:id',validation(addregistrationSchema),auth(endPoints.add),asyncHandlar(registrationController.addregistration))
router.delete('/delete/:id',validation(deleteregistrationSchema),auth(endPoints.add),asyncHandlar(registrationController.destroy))



export default router;