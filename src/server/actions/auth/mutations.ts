"use server";

import { siteUrls } from "@/config/urls";
import { createUserMutation } from "@/server/actions/user/mutations";
import { redirect } from "next/navigation";

interface SignupMutationProps {
    email: string;
    password: string;
}

export async function SignupMutation(data: SignupMutationProps) {
    await createUserMutation({
        email: data.email,
        password: data.password,
    });

    return redirect(siteUrls.app);
}
