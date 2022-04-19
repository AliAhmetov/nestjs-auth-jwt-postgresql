import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv'
import * as fs from "fs";
import * as Joi from "joi";

@Injectable()
export class ConfigService {
  private readonly envConfig: any;

  constructor() {
    const config = dotenv.parse(fs.readFileSync(`.${process.env.NODE_ENV}.env`))
    this.envConfig = this.validateInput(config);
  }

  get(name: string): string {
    return this.envConfig[name];
  }

  private validateInput(envConfig: any): any {
    const envVarsSchema = Joi.object({
      PORT: Joi.string().required(),
      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_PORT: Joi.string().required(),
      SECRET_KEY: Joi.string().required(),
    }).unknown(false);
    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
