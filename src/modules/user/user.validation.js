import joi from "joi";
import { generalFeilds } from "../../middleware/validation.js";

export const addAdminSchema=joi.object({
    id:generalFeilds.id,
  });

export const updateSchema=joi.object({
  userName:joi.string().alphanum().min(3).max(20).required(),
  password:joi.string().min(8).max(20).optional(),
  address:joi.string().optional(),
  phoneNumber:joi.string().optional(),
  weight:joi.number().integer().min(30).max(200).optional(),
})


