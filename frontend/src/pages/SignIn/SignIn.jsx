
import { Link, useNavigate } from "react-router-dom";

import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./SignIn.css";
import { BeatLoader } from "react-spinners";
import UseSignIn from "../../Hooks/UseSignIn";

export default function SignIn() {
const {signIn,
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUserNames,
    confirmPass,
    setConfirmPass,
    showPassword,
    setShowPassword,
    isLoading,}=UseSignIn()

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    await signIn()

  };

  return (
    <div className="all">
      <div className="auth-container">
        <div className="login-container">
          <h2>{"Register"}</h2>
          <form onSubmit={handleRegisterSubmit}>
            <input
              type="text"
              id="username"
              value={username}
              placeholder="Enter Your Name"
              onChange={(e) => setUserNames(e.target.value)}
              // required
              name="username"
            />
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
              // required
            />
            <div className="pass-container">
              <input
                type={`${showPassword ? "password" : "text"}`}
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                tabIndex={-1}
                // required
              />
              <div
                className="eye-icon"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
              </div>
            </div>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPass}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPass(e.target.value)}
              // required
            />
            <button type="submit">
              {isLoading ? <BeatLoader color="white" size={10} /> : "Register"}
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <Link to={"/"}>
              <button>Login</button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
