import { DataSource } from 'typeorm';
import ENV from "../env.json";
import * as dotenv from 'dotenv';
import { TYPEORM_CONFIG } from './typeorm.config';

dotenv.config();

export const AppDataSource = new DataSource(TYPEORM_CONFIG);