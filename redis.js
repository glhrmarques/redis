import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config()

const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('dogname', 'neguinha');
const result = await client.get('dogname');
console.log(result)  // >>> bar

// Get all keys in the database
//const keys = await client.keys('*');
//console.log('All keys:', keys);
//
// Then loop through and get each value
//for (const key of keys) {
//    const value = await client.get(key);
//    console.log(`${key}: ${value}`);
//}