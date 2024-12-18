import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom position-fixed w-100 py-3 px-md-8 z-3">
      <div className="row d-flex m-0 w-100">
        <div className="d-flex col-auto">
          <Link className="navbar-brand" href="/#top">
            <Image
              src="/assets/img/inner_logo.png"
              alt="Logo"
              width={1080}
              height={1080}
              style={{ height: "50px", width: "200px" }}
            />
          </Link>
        </div>
        <button
          className="navbar-toggler ms-auto me-4 col-auto"
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
            {["About Us", "Our Services", "Portfolio", "Contact Us"].map(
              (link, index) => (
                <li className="nav-item" key={index}>
                  <Link
                    className="nav-link"
                    href={`/#${link.replace(" ", "-").toLowerCase()}`}
                  >
                    {link}
                  </Link>
                </li>
              )
            )}
          </ul>
          <Link
            className="btn btn-info p-2 fw-normal rounded text-black d-flex align-items-center"
            href="#contact-us"
            role="button"
          >
            <span className="text-black fw-bold px-2">
              Get in touch right away
            </span>
            <i className="bx bx-chevron-right text-black" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
