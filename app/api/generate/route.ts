import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGING_FACE_API_TOKEN!);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const image = await hf.textToImage({
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: prompt,
    });

    return new Response(image, {
      headers: { "Content-Type": "image/png" },
    });

  } catch (error: any) {
    console.error("HF ERROR:", error);

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}