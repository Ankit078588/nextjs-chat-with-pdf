'use client'
import { handleGithubLogin, handleGoogleLogin } from "@/actions/authAction";
import GithubIcon from "@/icons/github";
import GoogleIcon from "@/icons/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    async function handleLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(!email.trim() || !password.trim()) {
            return toast.error("All fields are required.");
        }

        try {
            setLoading(true);
            const res = await signIn('credentials', {
                redirect: false,
                email,
                password
            })

            if(res?.error === "CredentialsSignin") {
                toast.error('Incorrect credetials.');
            } else {
                toast.success('Login successful.');
                router.push('/dashboard');
            }
        } catch(err) {
            console.log('Login error: ', err);
        } finally {
            setLoading(false);
        }  
    }

    return (
        <div className="w-[400px] p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 ring-1 ring-slate-200 animate-fade-in-up">
            
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
                <p className="text-slate-500 text-sm mt-1">Enter your details to access your account</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Email</label>
                    <input 
                        type="text" className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none block p-2.5" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Password</label>
                    <input 
                        type="password" 
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none block p-2.5" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" disabled={loading} className="cursor-pointer w-full text-white bg-indigo-600 hover:bg-indigo-700 font-bold rounded-lg text-sm px-5 py-3 shadow-lg shadow-indigo-500/20 transition-all">
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>

                <p className="text-center mt-4 text-sm text-slate-500">
                    Don't have an account? 
                    <Link href={'/signup'} className="text-indigo-600 font-semibold ml-1 hover:underline">Sign up</Link>
                </p>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-slate-400">Or continue with</span></div>
            </div>

            <div className="space-y-3">
                <form action={handleGoogleLogin}>
                    <button className="cursor-pointer w-full text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center gap-3 transition-all"> 
                        <GoogleIcon /> <span>Login with Google</span>
                    </button>
                </form>

                <form action={handleGithubLogin}>
                    <button className="cursor-pointer w-full text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center gap-3 transition-all"> 
                        <GithubIcon /> <span>Login with Github</span>
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Login;