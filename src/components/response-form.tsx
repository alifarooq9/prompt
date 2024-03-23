import { TextareaAutosize } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ResponseFormProps {
    response: string;
}

export function ResponseForm({ response }: ResponseFormProps) {
    const [textarea, setTextarea] = useState<string>(response);
    const [copied, setCopied] = useState<boolean>(false);
    const [isCopying, setIsCopying] = useState<boolean>(false);

    const copyPrompt = async () => {
        setIsCopying(true);
        try {
            await navigator.clipboard.writeText(textarea);
            setCopied(true);
        } catch (e) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsCopying(false);
        }
    };

    useEffect(() => {
        if (copied) {
            const timeout = setTimeout(() => {
                setCopied(false);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [copied]);

    return (
        <div className="mt-8 grid gap-4">
            <h2 className="text-lg font-semibold">
                Use this prompt to generate a response:
            </h2>
            <TextareaAutosize
                value={textarea}
                onChange={(e) => setTextarea(e.target.value)}
            />
            <Button className="w-fit" onClick={copyPrompt} type="button">
                {isCopying ? "Copying..." : copied ? "Copied!" : "Copy Prompt"}
            </Button>
        </div>
    );
}
