import "../styles/App.css";
// import "../styles/globals.css";
import Router from "next/router";
import { Toaster } from "react-hot-toast";
import { useState, React, useEffect } from "react";
import Layout from "../components/Layout";
import { ContextProvider } from "../Context/contextApi";
function app({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Toaster position="top-center" reverseOrder={false} />
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

export default app;
