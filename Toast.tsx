import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../assets/toastify.css";
import "react-toastify/dist/ReactToastify.css";

const Toast: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Fake credentials
  const validUsername = "duppala";
  const validPassword = "123456";

  const Login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === validUsername && password === validPassword) {
      toast.info("Successfully logged in!", {
        position: "bottom-left",
        autoClose: 2000,
        theme: "colored",
      });
      setUsername("");
      setPassword("");
    } else {
      toast.error("❌ Invalid login credentials!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="login-page">
      <h2>Login Form</h2>

      <form className="login-form" onSubmit={Login}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn info">
          Login
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Toast;
