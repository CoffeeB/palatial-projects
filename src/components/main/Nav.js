import Image from "next/image";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom position-fixed w-100 py-3 px-md-8 z-3">
      <div className="row d-flex m-0 w-100">
        <div className="d-flex col-auto">
          <a className="navbar-brand" href="#">
            <Image
              src="/https://framerusercontent.com/images/ZdKIt0n5znnTHaYeT2a0mUudo.png"
              alt="Logo"
              width={100}
              height={30}
              style={{ objectFit: "cover" }}
            />
          </a>
          <div className="d-grid ms-2">
            <span className="text-info fs-5 fw-medium">Palatial Projects</span>
            <span className="fs-7 text-white">Associate Ltd</span>
          </div>
        </div>
        <button
          className="navbar-toggler ms-auto col-auto"
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
                  <a
                    className="nav-link"
                    href={`./#${link.replace(" ", "-").toLowerCase()}`}
                  >
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
          <a
            className="btn btn-info p-2 fw-normal rounded text-black"
            href="./#contact-us"
            role="button"
          >
              Get in touch right away
            <i className="bx bx-chevron-right"></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
