import "./Login.css";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import UseLogin from "../../Hooks/UseLogin";

const Login = () => {
  const {
    login,
    isLoading,
    password,
    setPassword,
    email,
    setEmail,

  } = UseLogin();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    await login();
  };

  return (
    <div className="all">
      <div className="auth-container">
        <div className="login-container">
          <h2>{"Login"}</h2>
          <form onSubmit={handleLoginSubmit}>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
              // required
            />
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              // required
            />

            <button type="submit">
              {isLoading ? <BeatLoader color="white" size={10} /> : "Login"}
            </button>
          </form>
          <p>
            <>
              New User?
              <Link to={"/signin"}>
                <button>Register</button>
              </Link>
            </>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
