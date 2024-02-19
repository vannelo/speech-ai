import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import axios from "axios";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
} as any);

export async function POST(request: Request) {
  const { speech } = await request.json();

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/audio/speech",
      {
        model: "tts-1",
        input: speech,
        text: speech,
        voice: "alloy",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer", // Handle binary data
      }
    );

    const randomKeyName = Math.random().toString(36).substring(7);
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${randomKeyName}.mp3`,
      Body: response.data,
      ACL: "public-read",
    });
    const resultUrl = `https://vannelo-speech-ai.s3.amazonaws.com/${randomKeyName}.mp3`;

    await s3.send(command);
    return new Response(resultUrl, {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(`Error!`, {
      status: 500,
    });
  }
}
