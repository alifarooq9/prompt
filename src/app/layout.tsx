import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { Background } from "@/components/ui/background";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata = {
    title: "Prompt AI - Generate prompts for ChatGPT or AI Chatbots",
    description:
        "The best AI prompt generator for ChatGPT and AI chatbots. Generate prompts for any use case, including chatbots, creative writing, and more.",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                <Providers>
                    <Background>
                        {children}
                        <Toaster richColors closeButton />
                    </Background>
                </Providers>
            </body>
        </html>
    );
}
