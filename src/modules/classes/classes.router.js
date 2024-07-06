import { Router } from "express";
import * as classesController from './classes.controller.js'
import { asyncHandlar } from '../../ults/catcherror.js';

const router=Router();


router.get('/',asyncHandlar(classesController.get))



export default router;