import express from "express";
import axios from 'axios';
import dotenv from 'dotenv';
import { createClient } from 'redis';

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

const app = express();
const PORT = 3005;

app.get('/', (req,res) => {
    res.send("Testing server");
});

app.get('/dogbreed', async (req,res) => {
    
    const dogBreed = 'pug';
    const apiURL = `https://dog.ceo/api/breed/${dogBreed}/images/random`;

    try {
        const response = await axios.get(apiURL);
        //const sendRedis = await client.lPush('breed', JSON.stringify(response.data));
        const clientKeys = await client.lRange('breed', 0, -1);
        
        
        console.log(clientKeys);
        res.json(response.data);

    } catch(error) {
        console.error(error, "response error")
        res.status(500).json({ error: 'Failed to fetch dogs' });
    };
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));