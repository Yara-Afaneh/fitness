import { Router } from "express";
import * as exercisesController from './exercises.controller.js'
import { asyncHandlar } from '../../ults/catcherror.js';

const router=Router();


router.get('/',asyncHandlar(exercisesController.get))



export default router;