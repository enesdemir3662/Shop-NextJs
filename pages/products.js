import React, { useState, useContext, useEffect } from "react";
import { useContextApi } from "../Context/contextApi";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";

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

  const categoryFilter = () => {
    if (category !== null) {
      let newProducts_ = allProducts.filter((product) => {
        return product.productCategory === category;
      });
      console.log(newProducts_);
      setNewProducts(newProducts_);
    }
  };

  useEffect(() => {
    categoryFilter();
    if (productSearch.length != 0) {
      setNewProducts(productSearch);
    }
  }, [productSearch, category]);

  useEffect(() => {
    setNewProducts(allProducts);
    categoryFilter();
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
      <br />
      <Grid container spacing={2}>
        {windowControl &&
          newProducts.map((product, idx) => (
            <Grid item xs={4} key={idx}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  image={product.productImg}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.productPrice + " ₺"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.productInfo}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    className="btn btn-success"
                    onClick={() => addBasket(product)}
                    variant="contained"
                  >
                    {" "}
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
                </CardActions>
              </Card>
            </Grid>
          ))}
        ;
      </Grid>
    </div>
  );
};

export default products;
