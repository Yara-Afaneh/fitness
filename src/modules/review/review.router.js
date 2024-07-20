import { Router } from "express";
import * as reviewController from './review.controller.js'
import { asyncHandlar } from './../../ults/catcherror.js';
import validation from "../../middleware/validation.js";
import { endPoints } from './review.role.js';
import { addreviewSchema } from "./review.validation.js";
import { auth } from "../../middleware/auth.js";

const router=Router();


router.get('/:id',asyncHandlar(reviewController.get))
router.post('/add/:id',validation(addreviewSchema),auth(endPoints.add),asyncHandlar(reviewController.addreview))



export default router;