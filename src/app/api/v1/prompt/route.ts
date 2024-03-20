/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { env } from "@/env";
import type { Body } from "@/types/prompt-api";
import { HfInference } from "@huggingface/inference";
import { experimental_buildOpenAssistantPrompt } from "ai/prompts";

// Create a new HuggingFace Inference instance
const Hf = new HfInference(env.HUGGINGFACE_API_KEY);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
    const body: Body = await req.json();

    if (body.mode === "normal") {
        const response = (await Hf.textGeneration({
            model: "mistralai/Mistral-7B-Instruct-v0.2",
            inputs: experimental_buildOpenAssistantPrompt([
                {
                    role: "user",
                    content: `You're an experienced AI prompt engineer. you only write medium DETAILED prompts. I want your to generate a reverse prompt on the topic of: "${body.topic}". do not give your answer just write a medium detailed prompt for the topic. Do not give a response. Just write a medium detailed prompt.
                    Use the details below and you must add more detials to prompt.
                    Things to Include in the Prompt:
                    Role: Act as a(n),
                    Objective in this scenario,
                    Audience in this scenario,
                    Format & structure of the content you need,
                    Conciseness & tone of the content,
                    Context or background information,
                    Additional information or requirements,
                    Cretria to follow: Define a role, For eg: Act as an Professional Copywrite, You are a professional Artist. Always include in the end "Ask me atleast 10 question before answering it"
                    Add more details here...`,
                },
            ]),
            parameters: {
                max_new_tokens: 2048,
                typical_p: 0.2,
                repetition_penalty: 1,
                truncate: 1000,
                return_full_text: false,
                use_cache: false,
                wait_for_model: true,
            },
        })) as { generated_text: string };

        return new Response(
            JSON.stringify({ content: response.generated_text }),
            {
                status: 200,
            },
        );
    }

    const response = (await Hf.textGeneration({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        inputs: experimental_buildOpenAssistantPrompt([
            {
                role: "user",
                content: `You're an experienced AI prompt engineer. you only write medium DETAILED prompts. I want your to generate a reverse prompt on the topic of: "${body.topic}". do not give your answer just write a medium detailed prompt for the topic. Do not give a response. Just write a medium detailed prompt.
                    Use the details below and you must add more detials to prompt.
                    Things to Include in the Prompt:
                    Role: Act as a(n): ${body.role}
                    Objective in this scenario: ${body.objective}
                    Audience in this scenario: ${body.audience}
                    Format & structure of the content you need: ${body.format}
                    Conciseness & tone of the content: ${body.conciseness}
                    Context or background information: ${body.context}
                    Additional information or requirements: ${body.additionalInfo}
                    Cretria to follow: Define a role, For eg: Act as an Professional Copywrite, You are a professional Artist. Always include in the end "Ask me atleast 10 question before answering it"
                    Add more details here...`,
            },
        ]),
        parameters: {
            max_new_tokens: 2048,
            typical_p: 0.2,
            repetition_penalty: 1,
            truncate: 1000,
            return_full_text: false,
            use_cache: false,
            wait_for_model: true,
        },
    })) as { generated_text: string };

    return new Response(JSON.stringify({ content: response.generated_text }), {
        status: 200,
    });
}
