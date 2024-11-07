import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic client-side validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Replace with actual login API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call

      // Placeholder login logic (replace with actual authentication)
      if (email === "admin@example.com" && password === "password") {
        // Successful login
        router.push("/admin/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vh-100 row m-0 px-3">
      <div className="card col-lg-4 m-auto">
        <div className="card-header text-center border-0 pb-0">
          <div className="mb-0">
            <i className="bx bx-lock h1 text-primary"></i>
          </div>
          <h2 className="card-title mt-0">Admin Login</h2>
          <p className="card-text">
            Enter your credentials to access the admin area
          </p>
        </div>
        <div className="card-body">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-dark">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-control bg-transparent border"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-dark">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="password"
                className="form-control bg-transparent border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div
                className="alert alert-danger d-flex align-items-center"
                role="alert"
              >
                <i className="bx bx-exclamation-circle me-2"></i>
                <span>{error}</span>
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              <span className="text-black">
                {isLoading ? "Logging in..." : "Log in"}
              </span>
            </button>
          </form>
        </div>
        <div className="card-footer border-0 text-center">
          <p className="text-muted">
            Forgot your password?{" "}
            <span href="/contact">Contact the system administrator</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
