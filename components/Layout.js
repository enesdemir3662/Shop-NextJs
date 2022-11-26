import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import React, { useState } from "react";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      {router.pathname !== "/" && <Header />}
      {children}
    </>
  );
};
export default Layout;
