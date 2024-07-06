import { Router } from "express";
import * as plansController from './registration.controller.js'
import { asyncHandlar } from '../../ults/catcherror.js';

const router=Router();


router.get('/',asyncHandlar(plansController.get))



export default router;