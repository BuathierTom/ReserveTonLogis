import { AppDataSource } from "./database-config";

export const connectToDatabase = async () => {
    try {
        console.log("Connect to database....");
        await AppDataSource.initialize();
        console.log("Succefully connected to database :)")
    } catch (error) {
        throw error;
    }
}