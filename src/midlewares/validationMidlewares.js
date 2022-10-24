const Joi = require("joi");
const { ValidationError, WrongParametersError } = require("../helpers/errors");

const validateObjectId = (req, res, next) => {
    const schema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
    const validId = schema.validate(req.params.id);

    if (validId.error) {
        next(new WrongParametersError("Not found"));
    }
};

module.exports = {
    getByIdValidate: (req, res, next) => {
        validateObjectId(req, res, next);
        next();
    },

    addContactValidation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().alphanum().required(),
            email: Joi.string().email().required(),
            phone: Joi.number().required(),
            favorite: Joi.boolean(),
        });
        const validResult = schema.validate(req.body);

        if (validResult.error) {
            const [result] = validResult.error.details;
            const [missingParam] = result.path;
            return next(
                new ValidationError(`missing required ${missingParam} field`)
            );
        }
        next();
    },

    removeContactValidation: (req, res, next) => {
        validateObjectId(req, res, next);
        next();
    },

    updateContactValidation: async (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Missing fields" });
        }

        validateObjectId(req, res, next);
        next();
    },

    updateStatusContactValidation: async (req, res, next) => {
        validateObjectId(req, res, next);

        const schemaFavorite = Joi.object({
            favorite: Joi.boolean().required(),
        });
        const validResult = schemaFavorite.validate(req.body);

        if (validResult.error) {
            return next(new ValidationError("Missing field favorite"))
        }
        next();
    },
};