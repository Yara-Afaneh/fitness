import joi from "joi";
import { generalFeilds } from "../../middleware/validation.js";

export const addExerciseSchema=joi.object({
    name:joi.string().required(),
    image:generalFeilds.image,
    description:joi.string().required(),
    duration:joi.string().optional().messages({
        'string.pattern.base': 'Duration must be in HH:MM:SS format'
    }),
    classId:generalFeilds.id,
});

export const updateExerciseSchema=joi.object({
    name:joi.string().optional(),
    image:joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype:joi.string().valid('image/png','image/jpeg','image/webp').required(),
        destination:joi.string().required(),
        filename:joi.string().required(),
        path:joi.string().required(),
        size:joi.number().max(500000).required(),
    }).optional(),
    description:joi.string().optional(),
    duration:joi.string().optional().messages({
        'string.pattern.base': 'Duration must be in HH:MM:SS format'
    }),
    id:generalFeilds.id,
});

export const deleteExerciseSchema=joi.object({
    id:generalFeilds.id,
});

