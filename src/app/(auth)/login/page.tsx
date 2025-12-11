import Login from "@/components/auth/Login";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";



const LoginPage = async () => {
  const session = await auth();       

  if(session) {
    redirect('/');
  }

  return <Login />
}


export default LoginPage;