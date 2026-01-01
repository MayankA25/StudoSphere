import IORedis from "ioredis"
import dotenv from "dotenv"

dotenv.config({ path: "D:\\Mayank Data\\CODING\\CodeFest'25\\server\\.env" })

let redis;

if(!redis){
    redis = new IORedis(process.env.REDIS_URI, {
        maxRetriesPerRequest: null
    });
};


export const connection = redis;