import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import "../styling/Signup.css";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, confirmPassword);
  };
  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <p>Please enter an email and a password to create a new account</p>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          placeholder="Confirm Password"
        />
        <button className="signup-btn" disable={isLoading}>
          Sign up
        </button>
        {error && <div className="error">{error}</div>}
        <p>
          Already have an account?{" "}
          <span>
            <Link className="link sign-out" to="/login">
              <span>Login</span>
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
