import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  CardText,
  CardTitle,
  Button,
  CardBody,
  CardSubtitle,
  Row,
  Col,
} from "reactstrap";
import { useContextApi } from "../Context/contextApi";
import EditIcon from "@mui/icons-material/Edit";
const products = () => {
  const {
    allProducts,
    setAllProducts,
    productSearch,
    setProductSearch,
    basket,
    setBasket,
    category,
    setCategory,
    basketCount,
    setBasketCount,
    user,
    setInputValues,
    setEditModal,
  } = useContextApi();
  const [windowControl, setWindowControl] = useState(false);
  const [newProducts, setNewProducts] = useState(allProducts);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowControl(true);
    }
  }, []);

  useEffect(() => {
    if (category !== null) {
      let newProducts_ = allProducts.filter((product) => {
        return product.productCategory === category;
      });
      setNewProducts(newProducts_);
    }
    if (productSearch.length != 0) {
      setNewProducts(productSearch);
    }
  }, [productSearch, category]);

  useEffect(() => {
    setNewProducts(allProducts);
    setWindowControl(false);
    setWindowControl(true);
  }, [allProducts]);

  //edit product
  const edit = (id) => {
    newProducts.forEach((val, index) => {
      if (val.id === id) {
        setInputValues({
          name: val.productName,
          info: val.productInfo,
          price: val.productPrice,
          img: val.productImg,
          category: val.productCategory,
          index: index,
          id: val.id,
        });
      }
    });
    setEditModal(true);
  };

  // basket add function
  const addBasket = (product) => {
    setBasketCount(basketCount + 1);
    let result = basket.find(({ id }) => {
      return id === product.id;
    });

    if (result !== undefined) {
      basket.filter((val) => {
        if (val.id === product.id) {
          val.piece++;
        }
        return val;
      });
    } else {
      setBasket([
        ...basket,
        {
          name: product.productName,
          price: product.productPrice,
          id: product.id,
          piece: 1,
        },
      ]);
    }
  };

  return (
    <div>
      <Row>
        {windowControl &&
          newProducts.map((product, idx) => (
            <Col xs="3" key={idx}>
              <Card style={{ maxWidth: "18rem", maxHeight: "35rem" }}>
                <img alt="Sample" src={product.productImg} />
                <CardBody>
                  <CardTitle tag="h5">{product.productName}</CardTitle>
                  {product.productPrice + " ₺"}
                  <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                  ></CardSubtitle>
                  <CardText>{product.productInfo}</CardText>
                  <Button
                    className="btn btn-success"
                    onClick={() => addBasket(product)}
                  >
                    Sepete Ekle
                  </Button>
                  {user == null ? (
                    ""
                  ) : user.admin == "yes" ? (
                    <Button
                      className="btn btn-info ms-2"
                      onClick={() => edit(product.id)}
                    >
                      <EditIcon />
                    </Button>
                  ) : (
                    ""
                  )}
                </CardBody>
              </Card>
            </Col>
          ))}
        ;
      </Row>
    </div>
  );
};

export default products;
