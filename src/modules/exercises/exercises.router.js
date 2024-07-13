import { Router } from "express";
import * as exercisesController from './exercises.controller.js'
import fileUpload, { fileType } from "../../ults/multer.js";
import { asyncHandlar } from '../../ults/catcherror.js';
import validation from "../../middleware/validation.js";
import { addExerciseSchema, deleteExerciseSchema, updateExerciseSchema } from "./exercises.validation.js";
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./exercises.role.js";

const router=Router();


router.get('/',asyncHandlar(exercisesController.get))
router.post('/add',fileUpload(fileType.image).single('image'),validation(addExerciseSchema),auth(endPoints.add),asyncHandlar(exercisesController.addExersise))
router.patch('/update/:id',fileUpload(fileType.image).single('image'),validation(updateExerciseSchema),auth(endPoints.add),asyncHandlar(exercisesController.updateExercise))
router.delete('/delete/:id',validation(deleteExerciseSchema),auth(endPoints.add),asyncHandlar(exercisesController.destroy))


export default router;