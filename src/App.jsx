import { useEffect, useRef, useState } from "react";
import "./style.css";

function Panda({ passwordFocused, gazePoint }) {
  const pandaRef = useRef(null);

  useEffect(() => {
    if (!pandaRef.current || passwordFocused) return;

    const pupils = pandaRef.current.querySelectorAll(".pupil");

    pupils.forEach((pupil) => {
      const eye = pupil.parentElement;
      const rect = eye.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = gazePoint.x - centerX;
      const dy = gazePoint.y - centerY;

      const angle = Math.atan2(dy, dx);
      const distance = Math.min(4, Math.hypot(dx, dy) / 35);

      pupil.style.transform = `translate(
        ${Math.cos(angle) * distance}px,
        ${Math.sin(angle) * distance}px
      )`;
    });
  }, [gazePoint, passwordFocused]);

  return (
    <div
      ref={pandaRef}
      className={`panda ${passwordFocused ? "closed" : ""}`}
    >
      <div className="ear left-ear"></div>
      <div className="ear right-ear"></div>

      <div className="panda-face">
        <div className="eye-patch left-patch">
          <div className="eye">
            <div className="pupil">
              <span></span>
            </div>
          </div>
          <div className="eyelid"></div>
        </div>

        <div className="eye-patch right-patch">
          <div className="eye">
            <div className="pupil">
              <span></span>
            </div>
          </div>
          <div className="eyelid"></div>
        </div>

        <div className="nose"></div>
        <div className="mouth"></div>
      </div>
    </div>
  );
}

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const [gazePoint, setGazePoint] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  // Panda follows the pointer anywhere on the screen.
  useEffect(() => {
    const handlePointerMove = (event) => {
      setGazePoint({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  // Panda looks toward the end of the text while typing.
  const handleUsernameChange = (event) => {
    const input = event.target;
    const value = input.value;

    setUsername(value);
    setMessage("");

    const rect = input.getBoundingClientRect();

    setGazePoint({
      x: Math.min(
        rect.left + 15 + value.length * 7,
        rect.right - 8
      ),
      y: rect.top + rect.height / 2,
    });
  };

  const handleSubmit = (event) => {
  event.preventDefault();
  alert("Incorrect username or password");


    if (!username.trim() || !password.trim()) {
      setMessage("Please enter your username and password.");
      return;
    }

    setMessage("Login form submitted successfully!");
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="cloud-panel">
          <div className="cloud-top"></div>
          <div className="cloud-bottom"></div>

          <div className="form-content">
            <h1>Welcome Back!</h1>
            <p className="subtitle">
              Please enter your details to sign in.
            </p>

            <Panda
              passwordFocused={passwordFocused}
              gazePoint={gazePoint}
            />

            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username or Email</label>

              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={handleUsernameChange}
                onFocus={() => setPasswordFocused(false)}
                autoComplete="username"
              />

              <label htmlFor="password">Password</label>

              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setMessage("");
                  }}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  autoComplete="current-password"
                />

                <button
                  className="password-toggle"
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="form-options">
                <label className="remember-option">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  className="text-button"
                  onClick={() =>
                    setMessage("Please contact the website administrator to reset your password.")
                  }
                >
                  Forgot password?
                </button>
              </div>

              <button className="login-button" type="submit">
                Sign In
              </button>

              {message && (
                <p className="message" role="status">
                  {message}
                </p>
              )}
            </form>

            <p className="signup-text">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-button"
                onClick={() =>
                  setMessage("Sign-up is not connected yet.")
                }
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        <div className="welcome-panel">
          <div className="welcome-decoration decoration-one"></div>
          <div className="welcome-decoration decoration-two"></div>

          <div className="welcome-content">
            <p className="welcome-label">YOUR SPACE, YOUR JOURNEY</p>
            <h2>Hello Again!</h2>
            <p>
              Welcome back to your little corner of the internet.
              Sign in and continue where you left off.
            </p>
            <div className="welcome-line"></div>
          </div>
        </div>
      </section>
    </main>
  );
}