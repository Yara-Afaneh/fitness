import joi from "joi";
import { generalFeilds } from "../../middleware/validation.js";

export const addclassSchema=joi.object({
    name:joi.string().required(),
    numberOfExercise:joi.number().required(),
    programId:generalFeilds.id,
})

export const updateclassSchema=joi.object({
    name:joi.string().required(),
    numberOfExercise:joi.number().required(),
    id:generalFeilds.id,
});

export const deleteclassSchema=joi.object({
    id:generalFeilds.id,
});

