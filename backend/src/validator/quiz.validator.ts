import Joi from 'joi';

const questionSchema = Joi.object({
    text: Joi.string().trim().min(1).max(500).required().messages({
        'string.empty': 'Question text is required',
        'string.max': 'Question text must be under 500 characters',
    }),
    type: Joi.string().valid('BOOLEAN', 'INPUT', 'CHECKBOX').required().messages({
        'any.only': 'Question type must be BOOLEAN, INPUT or CHECKBOX',
    }),
    options: Joi.when('type', {
        is: 'CHECKBOX',
        then: Joi.array().items(Joi.string().trim()).min(2).required().messages({
            'array.min': 'CHECKBOX question must have at least 2 options',
        }),
        otherwise: Joi.array().optional(),
    }),
    answer: Joi.string().optional().allow(null, ''),
});

export const createQuizSchema = Joi.object({
    title: Joi.string().trim().min(1).max(200).required().messages({
        'string.empty': 'Quiz title is required',
        'string.max': 'Quiz title must be under 200 characters',
    }),
    questions: Joi.array().items(questionSchema).min(1).required().messages({
        'array.min': 'Quiz must have at least one question',
    }),
});