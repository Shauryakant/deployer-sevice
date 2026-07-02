import {downloadFolder} from "./downloadFolder.js"
import { buildProjectLocal } from './buildProject.js';
import { Redis } from "@upstash/redis";
import 'dotenv/config'
import { rmSync } from "node:fs";
import path from "path";
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})


async function main() {
    while(1) {
        const response=await redis.rpop("build-queue");
        if(response!==null) {
            console.log(response);
            await downloadFolder(`output/${response}`)
            // await buildProjectLocal(`${response}`);
            // rmSync(path.join(__dirname, `output/${response}`), { recursive: true, force: true });
            // console.log("Cleaned up",response);
        }
        
    }
}

main();