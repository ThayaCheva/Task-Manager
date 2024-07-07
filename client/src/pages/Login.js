import { useLogin } from "../hooks/useLogin";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styling/login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p>Please enter your email and password to login</p>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder={"Email"}
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder={"Password"}
        />
        {error && <div className="error">{error}</div>}
        <p className="forgot-password">Forgot Password?</p>
        <button className="login-btn" disabled={isLoading}>
          Login
        </button>
        <p>
          Don't have an account?{" "}
          <span>
            <Link className="link sign-out" to="/signup">
              <span>Sign Up</span>
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
