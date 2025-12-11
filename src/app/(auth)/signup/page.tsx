import Signup from '@/components/auth/Signup'
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";


const SignupPage = async () => {
    const session = await auth();

    if(session) {
        redirect('/');
    }
    
    return <Signup />;
}

export default SignupPage;