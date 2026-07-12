import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {

    e.preventDefault();

    if(email === "" || password === ""){

      alert("Please enter Email and Password");

      return;

    }

    // Skip backend login for demo
    navigate("/dashboard");

  };

  return (

    <div className="login-container">

      <div className="left-panel">

        <h1>TransitOps AI</h1>

        <p>Smart Fleet Management</p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3082/3082037.png"
          alt=""
        />

      </div>

      <div className="right-panel">

        <form onSubmit={loginUser}>

          <h2>Welcome Back</h2>

          <p>Login to continue</p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button type="submit">

            LOGIN

          </button>

        </form>

      </div>

    </div>

  );

}

export default Login;