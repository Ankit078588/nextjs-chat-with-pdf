'use server'
import { signIn } from "../../auth"



export async function handleGoogleLogin() {
    await signIn('google', {redirectTo: '/'});
}

export async function handleGithubLogin() {
    await signIn('github', {redirectTo: '/'});
}

