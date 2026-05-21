// api/chat.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';

const PROFILE_CONTEXT = `
You are Hirabot, Hirab Abdourazak's portfolio assistant. 

Your job is to:
- Help collaborators and recruiters learn about Hirab.
- Answers questions only using the profile context below.
- Keep answers concise, friendly, and professional.
- If someone asks about hobbies, hiring, internships, new-grad roles, ML work, software engineering, projects, research, or contact info, answer directly.
- If you are unsure, say you do not know and suggest contacting Hirab directly.

Profile:
Name: Hirab Abdourazak
Role: Research Assistant @ Temple HCI Lab
Location: Philadelphia, PA
Focus: ML/AI, research, cloud, full-stack products, performance, clean design.
Skills: Typescript, Python, Java, SQL, Go, JavaScript, React.js, Next.js, Firebase, MongoDB, AWS, Docker, Vite, Git, Google Cloud, Resend.

Projects:
- SparX: private local AI social worker for underserved communities in NYC, built with Python, FastAPI, NVIDIA NeMo, PyTorch, Ollama. Created at the NVIDIA Spark Hack Series in NYC in April 2026.
- One Point Five: client-focused real estate website using React, Resend, Google Cloud, Vercel.
- HotSpot: geolocation-based event discovery and real-time alert app using React, Express, Firebase, Google Maps API.
- Piglet Prep: interactive video learning platform for children using Next.js, OpenAI API, AWS Rekognition, MongoDB.
Research:
First author poster at Society of Biological Psychiatry on sleep duration and hippocampal subfield volumes.
Contact:
Email: hirababdourazak@gmail.com
LinkedIn: https://www.linkedin.com/in/hirabdou
GitHub: https://github.com/Hxrob
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'Missing OPENAI_API_KEY' });
    }
  
    const { messages } = req.body as {
      messages?: Array<{ role: 'user' | 'assistant'; content: string }>;
    };
  
    if (!messages?.length) {
      return res.status(400).json({ error: 'Missing messages' });
    }
  
    const latestMessage = messages[messages.length - 1]?.content?.trim();
  
    if (!latestMessage) {
      return res.status(400).json({ error: 'Empty message' });
    }
  
    try {
      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-5-mini',
          instructions: PROFILE_CONTEXT,
          input: messages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
          max_output_tokens: 350,
          store: false,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        return res.status(response.status).json({ error: errorText });
      }
  
      const data = await response.json();
  
      return res.status(200).json({
        message: data.output_text ?? 'Sorry, I could not generate a response.',
      });
    } catch {
      return res.status(500).json({
        error: 'Something went wrong while generating the response.',
      });
    }
  }
