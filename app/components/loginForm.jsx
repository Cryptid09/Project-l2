"use client";

import { login } from "@/lib/action";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <div className=" min-h-screen bg-[#393636] grid w-screen place-items-center">
      <div>
        <form action={formAction} className="pt-20" >
          <div className="grid text-white font-mono gap-y-5" >
            <div className="grid">
            Enter your username
              <input className='text-black' type="text" placeholder="username" name="username" />
            </div>
            <div className="grid">Enter your password
              <input className="text-black" type="password" placeholder="password" name="password" />
            </div>
            <div className="grid place-items center">
              <button className="relative inline-block px-2 py-2 font-medium group">
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                <span className="relative text-black group-hover:text-white">Login</span>
              </button>
            </div>
          </div>

          {state?.error}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;