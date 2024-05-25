
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

const LoginForm = ({ csrfToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
      csrfToken, 
    });

    if (!result.ok) {
      setError(result.error);
    } else {
      
      console.log("Login successful:", result);
      window.location.href = "/"; 
    }
  };

  return (
    <div className="min-h-screen bg-[#393636] grid w-screen place-items-center">
      <div>
        <form onSubmit={handleLogin} className="pt-20">
          <input type="hidden" name="csrfToken" value={csrfToken} />
          <div className="grid text-white font-mono gap-y-5">
            <div className="grid">
              <label>Enter your username</label>
              <input
                className="text-black"
                type="text"
                placeholder="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid">
              <label>Enter your password</label>
              <input
                className="text-black"
                type="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid place-items-center">
              <button type="submit" className="relative inline-block px-2 py-2 font-medium group">
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                <span className="relative text-black group-hover:text-white">Login</span>
              </button>
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <Link href="/register">
            {"Don't have an account?"} <b>Register</b>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

