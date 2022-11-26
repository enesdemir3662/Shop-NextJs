import Router from "next/router";
import { useState, React, useEffect } from "react";

export default function index() {
  useEffect(() => {
    Router.push("/home");
  }, []);

  return <div></div>;
}
