import Nav from "@/components/admin/Nav";
import PortfolioManager from "@/components/admin/Portfolios";
import ServicesManagement from "@/components/admin/Services";
import React from "react";

export default function portfolioManagementPage() {
  return (
    <>
      <Nav />
      <section className="row m-0 px-3 pt-10">
        <div className="mx-auto mt-10 position-relative">
          <div>
            {/* Pills Tabs Navigation */}
            <ul className="nav nav-pills" id="pills-tab" role="tablist">
              <li className="nav-item p-2" role="presentation">
                <button
                  className="nav-link active text-capitalize"
                  id="pills-portfolio-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-portfolio"
                  type="button"
                  role="tab"
                  aria-controls="pills-portfolio"
                  aria-selected="true"
                >
                  portfolio
                </button>
              </li>
              <li className="nav-item p-2 text-capitalize" role="presentation">
                <button
                  className="nav-link"
                  id="pills-services-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-services"
                  type="button"
                  role="tab"
                  aria-controls="pills-services"
                  aria-selected="false"
                >
                  services
                </button>
              </li>
            </ul>

            {/* Pills Tab Content */}
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-portfolio"
                role="tabpanel"
                aria-labelledby="pills-portfolio-tab"
                tabIndex="0"
              >
                <PortfolioManager />
              </div>
              <div
                className="tab-pane fade"
                id="pills-services"
                role="tabpanel"
                aria-labelledby="pills-services-tab"
                tabIndex="0"
              >
                <ServicesManagement />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const authStatus = req.cookies.loggedIn;

  if (!authStatus) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      isLoggedIn: true,
    },
  };
}
