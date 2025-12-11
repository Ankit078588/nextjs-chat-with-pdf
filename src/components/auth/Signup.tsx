// 'use client'
// import { handleGithubLogin, handleGoogleLogin } from "@/actions/authAction";
// import GithubIcon from "@/icons/github"
// import GoogleIcon from "@/icons/google"
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { FormEvent, useState } from "react";
// import axios, { AxiosError } from "axios";
// import { toast } from "sonner"



// const Signup = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const router = useRouter();


//     async function handleSignup(e: FormEvent<HTMLFormElement>) {
//         e.preventDefault();
//         if(!name.trim() || !email.trim() || !password.trim()) {
//             return toast.error("All fields are required.");
//         }

//         try {
//             setLoading(true);
//             const res = await axios.post('/api/auth/signup', {name, email, password})
//             toast.success(res.data.message);
//             router.push('/login');
//         } catch(err) {
//             console.log(err);
//             const e = err as AxiosError<{message: string}>;
//             if(!e.response) return toast.error(e.message);
//             toast.error(e.response.data.message);
//         } finally {
//             setLoading(false);
//         }  
//     }

//     return (
//         <div className="bg-gray-200 h-screen w-screen flex items-center justify-center">
//             <div className="w-[400px] p-6  bg-white rounded-lg shadow-md">

//                 {/* 1. Credientials Signup */}
//                 <form onSubmit={handleSignup} className="flex flex-col">
//                     <label htmlFor="" className="text-sm">Name</label>
//                     <input type="text" className="border-1 border-gray-300 p-2 rounded mb-4 outline-none" value={name} onChange={(e) => {setName(e.target.value)}} />

//                     <label htmlFor="" className="text-sm">Email</label>
//                     <input type="text" className="border-1 border-gray-300 p-2 rounded mb-4  outline-none" value={email} onChange={(e) => {setEmail(e.target.value)}} />

//                     <label htmlFor="" className="text-sm">Password</label>
//                     <input type="password" className="border-1 border-gray-300 p-2 rounded mb-4  outline-none" value={password} onChange={(e) => {setPassword(e.target.value)}} />

//                     <button className="text-white bg-gray-800 cursor-pointer py-3 rounded-md">Signup</button>

//                     <p className="text-center mt-4 text-sm">Already have an account? 
//                         <Link href={'/login'} className="text-blue-700 cursor-pointer ml-1 underline">Login</Link>
//                     </p>
//                 </form>
//                 <hr className="mt-8 text-gray-300"/>
//                 <p className="text-gray-400 text-sm text-center my-3">OR</p>


//                 {/* 2. Google Login */}
//                 <form action={handleGoogleLogin}>
//                     <button className="py-3 w-full text-center border-1 border-gray-300 rounded-md mb-4 flex gap-5 justify-center items-center cursor-pointer"> 
//                         <GoogleIcon /> Login with Google
//                     </button>
//                 </form>

//                 {/* 3. Github Login */}
//                 <form action={handleGithubLogin}>
//                     <button className="py-3 w-full text-center border-1 border-gray-300 rounded-md mb-4 flex gap-5 justify-center items-center cursor-pointer"> 
//                         <GithubIcon /> Login with Github
//                     </button>
//                 </form>

//             </div>
//         </div>
//     )
// }

// export default Signup;





'use client'
import { handleGithubLogin, handleGoogleLogin } from "@/actions/authAction";
import GithubIcon from "@/icons/github"
import GoogleIcon from "@/icons/google"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner"

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSignup(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(!name.trim() || !email.trim() || !password.trim()) {
            return toast.error("All fields are required.");
        }

        try {
            setLoading(true);
            const res = await axios.post('/api/auth/signup', {name, email, password})
            toast.success(res.data.message);
            router.push('/login');
        } catch(err) {
            console.log(err);
            const e = err as AxiosError<{message: string}>;
            if(!e.response) return toast.error(e.message);
            toast.error(e.response.data.message);
        } finally {
            setLoading(false);
        }  
    }

    return (
        <div className="w-[400px] p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 ring-1 ring-slate-200 animate-fade-in-up">
            
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create an account</h2>
                <p className="text-slate-500 text-sm mt-1">Enter your details to get started</p>
            </div>

            {/* 1. Credentials Signup Form */}
            <form onSubmit={handleSignup} className="flex flex-col space-y-4">
                
                {/* Name Input */}
                <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Name</label>
                    <input 
                        type="text" 
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none block p-2.5" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>

                {/* Email Input */}
                <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Email</label>
                    <input 
                        type="text" 
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none block p-2.5" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>

                {/* Password Input */}
                <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Password</label>
                    <input 
                        type="password" 
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none block p-2.5" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="cursor-pointer w-full text-white bg-indigo-600 hover:bg-indigo-700 font-bold rounded-lg text-sm px-5 py-3 shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? 'Creating account...' : 'Create account'}
                </button>

                <p className="text-center mt-4 text-sm text-slate-500">
                    Already have an account? 
                    <Link href={'/login'} className="text-indigo-600 font-semibold ml-1 hover:underline">Login</Link>
                </p>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-slate-400">Or continue with</span></div>
            </div>

            <div className="space-y-3">
                {/* 2. Google Login */}
                <form action={handleGoogleLogin}>
                    <button className="cursor-pointer w-full text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center gap-3 transition-all"> 
                        <GoogleIcon /> <span>Sign up with Google</span>
                    </button>
                </form>

                {/* 3. Github Login */}
                <form action={handleGithubLogin}>
                    <button className="cursor-pointer w-full text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center gap-3 transition-all"> 
                        <GithubIcon /> <span>Sign up with Github</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signup;