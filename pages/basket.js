import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { Table, Button } from "reactstrap";
import { useContextApi } from "../Context/contextApi";
import DeleteIcon from "@mui/icons-material/Delete";
function Basket() {
  const { basket, setBasket, basketCount, setBasketCount, user, setUser } =
    useContextApi();
  const removeBasket = (product) => {
    setBasketCount(basketCount - 1);
    basket.map((val) => {
      if (val.id === product.id) {
        if (parseInt(product.piece) > 1) {
          val.piece = parseInt(product.piece) - 1;
        } else {
          const newBasket = basket.filter((val) => val.id !== product.id);
          setBasket(newBasket);
        }
        return val;
      }
    });
  };
  const resetBasket = () => {
    setBasket([]);
    setBasketCount(0);
  };
  const BuyBasket = () => {
    if (user === null) {
      toast.error("Önce Giriş Yapmanız Gerekli !");
    } else {
      var newMoney = 0;
      basket.forEach((product) => {
        newMoney =
          newMoney + parseFloat(product.price) * parseFloat(product.piece);
      });
      if (newMoney == 0) {
        toast.error("Satın alınacak bir ürün bulunamadı!");
      } else {
        if (newMoney < parseFloat(user.money)) {
          setUser((prev) => ({ ...prev, money: newMoney }));
          let Users =
            JSON.parse(localStorage.getItem("Users")) == undefined
              ? []
              : JSON.parse(localStorage.getItem("Users"));

          let search = Users.filter(({ email, password, money }) => {
            if (email === user.email && password === user.password) {
              money = newMoney;
            }
            return;
          });
          localStorage.setItem("Users", JSON.stringify(search));
          localStorage.setItem(
            "User",
            JSON.stringify({
              email: user.email,
              password: user.password,
              money: newMoney,
              admin: user.admin,
            })
          );
          resetBasket();
        } else {
          toast.error("Paranız yetersiz!");
        }
      }
    }
  };

  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Ürün Adı</th>
            <th>Adet</th>
            <th>Toplam</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {basket.map((product, ind) => {
            return (
              <tr key={product.id}>
                <th scope="row">{ind + 1}</th>
                <td>{product.name}</td>
                <td>{product.piece}</td>
                <td>{parseInt(product.piece) * parseInt(product.price)}</td>
                <td>
                  <Button color="danger" onClick={() => removeBasket(product)}>
                    <DeleteIcon />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button
        color="primary"
        className="ms-1 mt-3"
        style={{ width: "120px" }}
        onClick={() => resetBasket()}
      >
        Sıfırla
      </Button>
      <Button
        color="success"
        className="ms-5 mt-3"
        style={{ width: "120px" }}
        onClick={() => BuyBasket()}
      >
        satın Al
      </Button>
    </div>
  );
}
export default Basket;
