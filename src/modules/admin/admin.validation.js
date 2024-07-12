import joi from "joi";
import { generalFeilds } from "../../middleware/validation.js";

export const addAdminSchema=joi.object({
     id:generalFeilds.id,
     role:joi.string().valid('admin','user','superadmin').required(),
})

export const updateAdminSchema=joi.object({
     id:generalFeilds.id,
     status:joi.string().valid('active','not_active').required(),
})


