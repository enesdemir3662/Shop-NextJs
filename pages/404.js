import React, { useEffect } from "react";
import Router from "next/router";

function NoPage() {
  useEffect(() => {
    Router.push("/");
  }, []);

  return <div></div>;
}
export default NoPage;
