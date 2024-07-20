import joi from "joi";
import { generalFeilds } from "../../middleware/validation.js";

export const addregistrationSchema=joi.object({
    id:generalFeilds.id
});

export const deleteregistrationSchema=joi.object({
    id:generalFeilds.id
});
