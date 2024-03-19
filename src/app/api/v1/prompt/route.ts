/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { env } from "@/env";
import { HfInference } from "@huggingface/inference";
import { experimental_buildOpenAssistantPrompt } from "ai/prompts";

// Create a new HuggingFace Inference instance
const Hf = new HfInference(env.HUGGINGFACE_API_KEY);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
    const { input } = (await req.json()) as { input: string };

    const response = (await Hf.textGeneration({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        inputs: experimental_buildOpenAssistantPrompt([
            {
                role: "user",
                content: `You're an experienced AI prompt engineer. you only write detailed prompts. I want your to generate a reverse prompt on the topic of: "${input}". do not give your answer just write a prompt for the topic. Do not write a response. Just write a prompt.
                Cretria to follow: Define a role, For eg: Act as an Professional Copywrite, You are a professional Artist. Always include in the end "Ask me atleast 10 question before answering it"`,
            },
        ]),
        parameters: {
            max_new_tokens: 2048,
            typical_p: 0.2,
            repetition_penalty: 1,
            truncate: 1000,
            return_full_text: false,
        },
    })) as { generated_text: string };

    return new Response(JSON.stringify({ content: response.generated_text }), {
        status: 200,
    });
}
