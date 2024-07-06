import joi from "joi";
import { generalFeilds } from "../../middleware/validation.js";

export const registerSchema=joi.object({
        userName:joi.string().alphanum().min(3).max(20).required(),
        email:generalFeilds.email,
        password:generalFeilds.password,
        confirmPassword:joi.valid(joi.ref('password')).required(),
        address:joi.string().optional(),
        phoneNumber:joi.string().required(),
        weight:joi.number().integer().min(30).max(200).required(),
        dateOfBirth: joi.date().required().less('now').messages({
          'date.less': 'date must be in the past'
        }),
    });

export const loginSchema=joi.object({
    email:generalFeilds.email,
    password:generalFeilds.password,
});

export const sendCodeSchema=joi.object({
    email:generalFeilds.email,
});

export const forgetPasswordSchema=joi.object({
    email:generalFeilds.email,
    password:generalFeilds.password,
    code:joi.string().required().length(4),
})


