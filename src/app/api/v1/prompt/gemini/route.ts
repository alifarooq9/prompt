/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { env } from "@/env";
import type { Body } from "@/types/prompt-api";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Create a new HuggingFace Inference instance
const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
    const body: Body = await req.json();

    const model = genAI.getGenerativeModel({
        model: "gemini-pro",
    });

    if (body.mode === "normal") {
        const result = await model.generateContent(
            `Act as an experienced AI prompt engineer, Generate me a prompt for AI chatbot on the topic of "${body.topic}".
            
            `,
        );

        console.log(result.response);

        return new Response(
            JSON.stringify({
                content: result.response.candidates![0]?.content.parts[0]?.text,
            }),
            {
                status: 200,
            },
        );
    }

    const result = await model.generateContent(
        `Act as an experienced AI prompt engineer, Generate me a prompt for AI chatbot on the topic of "${body.topic}" with the following details:
        Role: Act as a(n): ${body.role}
        Objective in this scenario: ${body.objective}
        Audience in this scenario: ${body.audience}
        Format & structure of the content you need: ${body.format}
        Conciseness & tone of the content: ${body.conciseness}
        Context or background information: ${body.context}
        Additional information or requirements: ${body.additionalInfo}.
        
        `,
    );

    return new Response(
        JSON.stringify({
            content: result.response.candidates![0]?.content.parts[0]?.text,
        }),
        {
            status: 200,
        },
    );

    // if (body.mode === "normal") {
    //     const response = (await Hf.textGeneration({
    //         model: "mistralai/Mistral-7B-Instruct-v0.2",
    //         inputs: experimental_buildOpenAssistantPrompt([
    //             {
    //                 role: "user",
    //                 content: `You're an experienced AI prompt engineer. you only write medium DETAILED prompts. I want your to generate a reverse prompt on the topic of: "${body.topic}". do not give your answer just write a medium detailed prompt for the topic. Do not give a response. Just write a medium detailed prompt.
    //                 Use the details below and you must add more detials to prompt.
    //                 Things to Include in the Prompt:
    //                 Role: Act as a(n),
    //                 Objective in this scenario,
    //                 Audience in this scenario,
    //                 Format & structure of the content you need,
    //                 Conciseness & tone of the content,
    //                 Context or background information,
    //                 Additional information or requirements,
    //                 Always include in the end "Ask me atleast 10 question before answering it." Do Not add question by your self.
    //                 Add more details here...`,
    //             },
    //         ]),
    //         parameters: {
    //             max_new_tokens: 2048,
    //             typical_p: 0.2,
    //             repetition_penalty: 1,
    //             truncate: 1000,
    //             return_full_text: false,
    //             use_cache: false,
    //             wait_for_model: true,
    //         },
    //     })) as { generated_text: string };

    //     return new Response(
    //         JSON.stringify({ content: response.generated_text }),
    //         {
    //             status: 200,
    //         },
    //     );
    // }

    // const response = (await Hf.textGeneration({
    //     model: "mistralai/Mistral-7B-Instruct-v0.2",
    //     inputs: experimental_buildOpenAssistantPrompt([
    //         {
    //             role: "user",
    //             content: `You're an experienced AI prompt engineer. you only write medium DETAILED prompts. I want your to generate a reverse prompt on the topic of: "${body.topic}". do not give your answer just write a medium detailed prompt for the topic. Do not give a response. Just write a medium detailed prompt.
    //             Use the details below and you must add more detials to prompt.
    //                 Things to Include in the Prompt:
    //                 Role: Act as a(n): ${body.role}
    //                 Objective in this scenario: ${body.objective}
    //                 Audience in this scenario: ${body.audience}
    //                 Format & structure of the content you need: ${body.format}
    //                 Conciseness & tone of the content: ${body.conciseness}
    //                 Context or background information: ${body.context}
    //                 Additional information or requirements: ${body.additionalInfo}
    //                 Always include in the end "Ask me atleast 10 question before answering it." Do Not add question by your self.
    //                 Add more details here...`,
    //         },
    //     ]),
    //     parameters: {
    //         max_new_tokens: 2048,
    //         typical_p: 0.2,
    //         repetition_penalty: 1,
    //         truncate: 1000,
    //         return_full_text: false,
    //         use_cache: false,
    //         wait_for_model: true,
    //     },
    // })) as { generated_text: string };

    // return new Response(JSON.stringify({ content: response.generated_text }), {
    //     status: 200,
    // });
}
