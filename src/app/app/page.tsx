import { NormalModeForm } from "@/components/normal-mode-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AppPage() {
    return (
        <main className="container flex w-full max-w-2xl flex-col items-center">
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
                <TabsContent value="beast-mode">
                    Change your password here.
                </TabsContent>
            </Tabs>
        </main>
    );
}
