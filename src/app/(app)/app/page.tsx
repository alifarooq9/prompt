import { BeastModeForm } from "@/components/beast-mode-form";
import { NormalModeForm } from "@/components/normal-mode-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteUrls } from "@/config/urls";
import { validateAuth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function AppPage() {
    const { session } = await validateAuth();

    if (!session) {
        return redirect(siteUrls.signin);
    }

    return (
        <main className="container flex w-full max-w-2xl flex-col items-center pb-14">
            <Tabs
                defaultValue="normal-mode"
                className="flex w-full flex-col items-center gap-10"
            >
                <TabsList className="w-full">
                    <TabsTrigger value="normal-mode" className="w-full">
                        Normal Mode
                    </TabsTrigger>
                    <TabsTrigger value="beast-mode" className="w-full">
                        Beast Mode
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="normal-mode" className="w-full">
                    <NormalModeForm />
                </TabsContent>
                <TabsContent value="beast-mode" className="w-full">
                    <BeastModeForm />
                </TabsContent>
            </Tabs>
        </main>
    );
}
