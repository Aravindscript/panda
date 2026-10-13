import { useEffect, useRef, useState } from "react";
import "./style.css";

function Panda({ passwordFocused, showPassword, gazePoint }) {
  const pandaRef = useRef(null);

  useEffect(() => {
    if (!pandaRef.current || passwordFocused) return;

    const pupils = pandaRef.current.querySelectorAll(".pupil");

    pupils.forEach((pupil) => {
      const eye = pupil.parentElement;
      const rect = eye.getBoundingClientRect();

      const dx = gazePoint.x - (rect.left + rect.width / 2);
      const dy = gazePoint.y - (rect.top + rect.height / 2);

      const angle = Math.atan2(dy, dx);
      const distance = Math.min(4, Math.hypot(dx, dy) / 35);

      pupil.style.transform = `translate(
        ${Math.cos(angle) * distance}px,
        ${Math.sin(angle) * distance}px
      )`;
    });
  }, [gazePoint, passwordFocused]);

  const pandaClass = passwordFocused
    ? showPassword
      ? "one-eye-open"
      : "closed"
    : "";

  return (
    <div
      ref={pandaRef}
      className={`panda ${pandaClass}`}
    >
      <div className="ear left-ear" />
      <div className="ear right-ear" />

      <div className="panda-face">
        <div className="eye-patch left-patch">
          <div className="eye">
            <div className="pupil">
              <span />
            </div>
          </div>
          <div className="eyelid" />
        </div>

        <div className="eye-patch right-patch">
          <div className="eye">
            <div className="pupil">
              <span />
            </div>
          </div>
          <div className="eyelid" />
        </div>

        <div className="nose" />
        <div className="mouth" />
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

  const handleUsernameChange = (event) => {
    const input = event.target;
    const value = input.value;

    setUsername(value);
    setMessage("");

    const rect = input.getBoundingClientRect();

    setGazePoint({
      x: Math.min(rect.left + 15 + value.length * 7, rect.right - 8),
      y: rect.top + rect.height / 2,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setMessage("Please enter your username and password.");
      return;
    }

    // Demo login only: no authentication backend is connected.
    setMessage("Login form submitted successfully!");
  };

  const raindrops = Array.from({ length: 350 }, (_, i) => ({
  id: i,
  left: `${(i * 37.7) % 100}%`,
  delay: `${-((i * 0.37) % 5)}s`,
  duration: `${(0.65 + ((i * 13) % 10) / 10) / 2}s`,
  height: `${25 + ((i * 7) % 20)}px`,
}));


  return (
    <main className="login-page">
      <div className="rain-layer" aria-hidden="true">
  {raindrops.map((drop) => (
    <span
      key={drop.id}
      className="raindrop"
      style={{
        left: drop.left,
        animationDelay: drop.delay,
        animationDuration: drop.duration,
        height: drop.height,
      }}
    />
  ))}
</div>

<div className="lightning-flash" aria-hidden="true" />

      {/* One cloud contains the entire login experience */}
      <section className="cloud-scene">
        <svg
          className="cloud-shape"
          viewBox="0 0 1200 760"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="cloudColor" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="48%" stopColor="#f3fffc" />
              <stop offset="100%" stopColor="#d7f6f0" />
            </linearGradient>

            <linearGradient id="cloudBlue" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#56b7c5" />
              <stop offset="55%" stopColor="#318e9e" />
              <stop offset="100%" stopColor="#17616e" />
            </linearGradient>

            <filter id="cloudShadow" x="-20%" y="-20%" width="140%" height="150%">
              <feDropShadow
                dx="0"
                dy="16"
                stdDeviation="20"
                floodColor="#205e63"
                floodOpacity="0.20"
              />
            </filter>
          </defs>

          {/* The outer cloud is the only main container */}
          <path
            className="cloud-base"
            d="
              M 150 175
              C 85 175, 45 125, 65 78
              C 82 35, 139 23, 183 48
              C 204 -3, 280 -15, 330 25
              C 373 -10, 440 0, 469 43
              C 533 8, 611 29, 631 83
              C 690 40, 763 51, 788 105
              C 841 67, 920 88, 934 147
              C 1014 113, 1094 160, 1082 222
              C 1148 246, 1170 308, 1130 352
              C 1185 409, 1151 472, 1102 485
              C 1130 555, 1080 607, 1016 606
              C 1005 672, 936 708, 879 676
              C 829 729, 748 733, 705 687
              C 645 736, 566 731, 528 688
              C 462 730, 389 714, 362 671
              C 292 711, 217 687, 205 631
              C 132 653, 77 607, 96 548
              C 35 516, 28 453, 72 413
              C 16 360, 42 298, 91 280
              C 52 229, 88 181, 150 175
              Z
            "
            fill="url(#cloudColor)"
            filter="url(#cloudShadow)"
          />

          {/* Blue area is painted inside the same cloud */}
          <path
            className="cloud-blue-area"
            d="
              M 635 84
              C 694 41, 764 53, 789 105
              C 843 68, 921 88, 935 147
              C 1013 114, 1094 160, 1082 222
              C 1148 246, 1170 308, 1130 352
              C 1184 409, 1151 472, 1102 485
              C 1129 555, 1080 607, 1016 606
              C 1005 672, 936 708, 879 676
              C 829 729, 748 733, 705 687
              C 680 651, 683 593, 690 542
              C 710 470, 696 398, 676 342
              C 652 270, 624 172, 635 84
              Z
            "
            fill="url(#cloudBlue)"
          />

          <path
            d="M 680 170 C 720 260, 730 350, 716 440"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            opacity="0.12"
          />
        </svg>

        {/* All content appears after the cloud opens */}
        <div className="cloud-content">
          <section className="login-content">
            <h1>Welcome Back!</h1>
            <p className="subtitle">
              Please enter your details to sign in.
            </p>

            <Panda
              passwordFocused={passwordFocused}
              showPassword={showPassword}
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
                    setMessage(
                      "Please contact the website administrator to reset your password."
                    )
                  }
                >
                  Forgot password?
                </button>
              </div>

              <button onClick={() => alert("Incorrect username or password!")} type="submit" className="submit-button">
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
                onClick={() => setMessage("Sign-up is not connected yet.")}
              >
                Sign up
              </button>
            </p>
          </section>

          <section className="welcome-content">
            <p className="welcome-label">YOUR SPACE, YOUR JOURNEY</p>
            <h2>Hello Again!</h2>
            <p>
              Welcome back to your little corner of the internet.
              Sign in and continue where you left off.
            </p>
            <div className="welcome-line" />
          </section>
        </div>
      </section>
    </main>
  );
}