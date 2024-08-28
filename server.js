import dotenv from 'dotenv';
dotenv.config();

import { OpenAI } from 'openai';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 5174;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI, // Ensure this environment variable is set
});

app.post('/fireshipProject', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "'prompt' is a required property" });
    }

    try {
        const aiResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
        });

        const image = aiResponse.data[0].url;
        res.json({ image });
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).send('An error occurred while generating the image.');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/fireshipProject`);
});
