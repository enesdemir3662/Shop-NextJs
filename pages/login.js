import Router from "next/router";
import { useState, React, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContextApi } from "../Context/contextApi";

const schema = yup.object().shape({
  email: yup
    .string("Geçersiz Değer Girdin")
    .required("Lütfen zorunlu alanları doldurunuz"),
  password: yup
    .string("Geçersiz Değer Girdin")
    .required("Lütfen zorunlu alanları doldurunuz"),
});

export default function login() {
  const { user, setUser } = useContextApi();
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!user) {
        return;
      } else {
        Router.push("/home");
      }
    }
  }, []);

  const [defaultValues, setDefaultValues] = useState({
    email: "01enesdemir05@gmail.com",
    password: "gTyj5S37Jk@",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = () => {
    let Users =
      localStorage.getItem("Users") == undefined
        ? []
        : JSON.parse(localStorage.getItem("Users"));

    if (
      Users.find(
        ({ email, password }) =>
          email === defaultValues.email && password === defaultValues.password
      ) == undefined
    ) {
      setUser({
        email: defaultValues.email,
        money: 100000,
        admin: "01enesdemir05@gmail.com" === defaultValues.email ? "yes" : "no",
      });
      localStorage.setItem(
        "Users",
        JSON.stringify([
          ...Users,
          {
            email: defaultValues.email,
            money: 100000,
            admin:
              "01enesdemir05@gmail.com" === defaultValues.email ? "yes" : "no",
          },
        ])
      );
    } else {
      let search = Users.find(
        ({ email, password }) =>
          email === defaultValues.email && password === defaultValues.password
      );
      setUser({
        email: defaultValues.email,
        money: search.money,
        admin: search.admin,
      });
    }
    Router.push("/home");
  };

  return (
    <div className="container container-2">
      <div className="brand-box">
        <h1>Hoşgeldiniz</h1>
        <p>Sizi aramızda görmek harika !</p>
      </div>
      <div
        className="magic-form"
        style={{ display: "flex", alignItems: "center" }}
      >
        <br />
        <br />
        <form className="magic-form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <input
                type="text"
                placeholder="email..."
                variant="outlined"
                value={value}
                className="form-control"
                onChange={onChange}
              />
            )}
          />
          {errors.email && (
            <div className="input-feedback">
              <p>{errors.email.message}</p>
            </div>
          )}
          <br />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <input
                type="password"
                placeholder="Şifre..."
                variant="outlined"
                value={value}
                className="form-control"
                onChange={onChange}
              />
            )}
          />
          {errors.password && (
            <div className="input-feedback">
              <p>{errors.password.message}</p>
            </div>
          )}
          <br />
          <Button
            type="submit"
            className="button"
            variant="contained"
            style={{
              backgroundColor: "#185a9d",
              boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.15)",
            }}
          >
            Gönder
          </Button>
        </form>
      </div>
    </div>
  );
}
