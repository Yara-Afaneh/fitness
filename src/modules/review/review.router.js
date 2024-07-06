import { Router } from "express";
import * as reviewController from './review.controller.js'
import { asyncHandlar } from './../../ults/catcherror.js';

const router=Router();


router.get('/',asyncHandlar(reviewController.get))



export default router;