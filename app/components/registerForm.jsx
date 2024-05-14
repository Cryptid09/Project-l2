"use client";
import { register } from "@/lib/action";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success, router]);

  return (<div className="min-h-screen bg-[#393636] grid w-screen place-items-center font-mono">
    <form action={formAction}>
      <div className="grid gap-y-3">
        <div className="grid text-white">Enter a userName<input className='text-black' type="text" placeholder="username" name="username" /></div>
        <div className="grid text-white">Enter your E-mail address<input className="text-black" type="email" placeholder="email" name="email" /></div>
        <div className="grid text-white">Enter a password<input className='text-black' type="password" placeholder="password" name="password" /></div>
        <div className="grid text-white">Retype your password
          <input className="text-black"
          type="password"
          placeholder="password again"
          name="passwordRepeat"
        /></div>
      </div>
     <div><button className="relative inline-block px-2 py-2 font-medium group">
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                <span className="relative text-black group-hover:text-white">Register</span>
              </button></div>
      {state?.error}
      <Link href="/login">
        Have an account? <b>Login</b>
      </Link>
    </form></div>
  );
};

export default RegisterForm;