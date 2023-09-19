import { DataSource } from "typeorm";
import { Chambre, Client, Hotes, Saison, Reservation } from '../entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type : "postgres",
    host : process.env.DB_HOST,
    port : parseInt(process.env.DB_PORT),
    username : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    synchronize : true,
    logging : false,
    entities  : [Client, Chambre, Hotes, Saison, Reservation],
    migrations : [],
    subscribers : []
})