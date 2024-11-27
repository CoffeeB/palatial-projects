import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Nav = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("loggedIn");
    router.push("/admin/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom position-fixed w-100 py-3 px-md-8 z-3">
      <div className="row d-flex m-0 w-100">
        <div className="d-flex col-auto">
          <a className="navbar-brand" href="#">
            <Image
              src="/assets/img/inner_logo.png"
              alt="Logo"
              width={1080}
              height={1080}
              style={{ height: "50px", width: "200px" }}
              priority={"high"}
            />
          </a>
        </div>
        <button
          className="navbar-toggler ms-auto col-auto me-5"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse col-8" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {["home"].map((link, index) => (
              <li className="nav-item" key={index}>
                <Link
                  className={`nav-link text-capitalize ${
                    router.pathname === `/admin/${link}` ? "active" : ""
                  } `}
                  href={`/admin/${link.replace(" ", "-").toLowerCase()}`}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => handleLogout()}
            className="btn btn-danger p-2 fw-normal rounded text-white d-flex align-items-center"
            href="#"
            role="button"
          >
            Log-out&nbsp;
            <i className="bx bx-log-out" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
