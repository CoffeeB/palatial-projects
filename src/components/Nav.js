import Image from "next/image";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom position-fixed w-100 p-3">
      <div className="d-flex m-0 w-100">
        <a className="navbar-brand" href="#">
          <Image
            src="/https://framerusercontent.com/images/ZdKIt0n5znnTHaYeT2a0mUudo.png"
            alt="Logo"
            width={100}
            height={30}
            style={{ objectFit: "cover" }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
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
            className="btn btn-info p-2 fw-normal rounded d-flex align-items-center w-auto"
            href="./#contact-us"
            role="button"
          >
            <span className="cursor-pointer text-info">
              Get in touch right away
            </span>
            <i className="bx bx-chevron-right text-black"></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
