import { useLogout } from "../hooks/useLogout";
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logout = useLogout();
  const { login, error, isLoading } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleClick = () => {
    logout();
  };
  return (
    <div>
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <button disabled={isLoading}>Login</button>
        {error && <div>{error}</div>}
      </form>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default Login;
