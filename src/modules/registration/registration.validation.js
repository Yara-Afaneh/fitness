import joi from "joi";
import { generalFeilds } from "../../middleware/validation.js";

export const addregistrationSchema=joi.object({
    id:generalFeilds.id,
    date: joi.date().required().greater('now').messages({
        'date.greater': 'date must be in the future'
      }),
});

export const deleteregistrationSchema=joi.object({
    id:generalFeilds.id
});


