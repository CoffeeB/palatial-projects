import { useState } from "react";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack"; // assuming you're using notistack for snackbar
import Cookies from "js-cookie";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic client-side validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      enqueueSnackbar("Please enter both email and password", {
        variant: "info",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Send a POST request to the login API route
      const res = await fetch("/api/adminLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response status is OK
      if (!res.ok) {
        // If status is not OK (like 4xx or 5xx), throw an error
        const data = await res.json();
        throw new Error(data.error || "An error occurred during login.");
      }

      // Parse the successful response

      const data = await res.json();
      // Successful login
      enqueueSnackbar("Login successful!", { variant: "success" });
      Cookies.set("loggedIn", "true");
      router.push("/admin/");
    } catch (err) {
      // If an error occurs, show the error message
      setError(err.message || "An error occurred. Please try again.");
      enqueueSnackbar(err.message || "An error occurred. Please try again.", {
        variant: "error",
      });
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
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-dark">
                Password
              </label>
              <div className="position-relative">
                <input
                  id="password"
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="password"
                  className="form-control bg-transparent border"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i
                  className={`bx ${
                    showPassword ? "bxs-hide" : "bxs-show"
                  } position-absolute end-0 top-50 translate-middle-y fs-5 me-1`}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
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
