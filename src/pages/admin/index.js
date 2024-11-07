import Nav from "@/components/admin/Nav";
import PortfolioManager from "@/components/admin/Portfolios";
import ServicesManagement from "@/components/admin/Services";
import React from "react";

export default function portfolioManagementPage() {
  return (
    <>
      <Nav />
      <PortfolioManager />
      <ServicesManagement />
    </>
  );
}
