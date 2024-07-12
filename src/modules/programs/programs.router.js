import { Router } from "express";
import * as programsController from './programs.controller.js'
import fileUpload, { fileType } from "../../ults/multer.js";
import validation from "../../middleware/validation.js";
import { asyncHandlar } from '../../ults/catcherror.js';
import { endPoints } from "./programs.role.js";
import { auth } from "../../middleware/auth.js";
import { addProgramSchema, deleteProgramSchema, updateProgramSchema } from './programs.validation.js';

const router=Router();


router.get('/',asyncHandlar(programsController.get))
router.post('/add',fileUpload(fileType.image).single('image'),validation(addProgramSchema),auth(endPoints.add),asyncHandlar(programsController.addProgram))
router.patch('/update/:id',fileUpload(fileType.image).single('image'),validation(updateProgramSchema),auth(endPoints.add),asyncHandlar(programsController.updateProgram))
router.delete('/delete/:id',validation(deleteProgramSchema),auth(endPoints.add),asyncHandlar(programsController.destroy))



export default router;