import "@/styles/globals.css";

import { Schibsted_Grotesk } from "next/font/google";

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
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
      <body className={`font-sans ${schibstedGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}
