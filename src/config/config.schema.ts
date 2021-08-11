import * as Joi from 'joi';
import { DatabaseConfigSchema } from './config.database';

export const configSchema = Joi.object({
  ...DatabaseConfigSchema,
});
