import express from "express";
import axios from 'axios';

const app = express();
const PORT = 3005;

app.get('/', (req,res) => {
    res.send("Testing server");
});


app.get('/alldogs', async (req,res) => {
    const apiURL = 'https://dog.ceo/api/breeds/list/all';

    try {
        const response = await axios.get(apiURL);   
        res.json(response.data);

    } catch(error) {
        console.error(error, "response error")
        res.status(500).json({ error: 'Failed to fetch dogs' });
    };
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));