import React, { useDebugValue, useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FileImg from "./FileImg";
import Stack from "@mui/material/Stack";
import { useContextApi } from "../Context/contextApi";
import toast from "react-hot-toast";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
function ModelExample() {
  const {
    allProducts,
    setAllProducts,
    editModal,
    setEditModal,
    addModal,
    setAddModal,
    category,
    inputValues,
    setInputValues,
  } = useContextApi();
  const toggle = () => {
    setEditModal(false);
    setAddModal(false);
    setInputValues({});
  };
  let newProducts = allProducts.filter((product) => {
    return product.productCategory === category;
  });

  let copyProducts = allProducts.filter((product) => {
    return product.productCategory !== category;
  });

  const [age, setAge] = React.useState("");
  const [textModal, setTextModal] = useState({
    productName: "",
    productInfo: "",
    productPrice: "",
    productCategory: "",
    productImg: "",
  });
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const productDelete = () => {
    toggle();
    let newProducts = allProducts.filter((val) => {
      return val.id !== inputValues.id;
    });
    setAllProducts(newProducts);
  };
  useEffect(() => {
    inputValues.name != undefined
      ? setTextModal({
          productName: inputValues.name,
          productInfo: inputValues.info,
          productPrice: inputValues.price,
          productCategory: inputValues.category,
          productImg: inputValues.img,
        })
      : setTextModal({
          productName: "",
          productInfo: "",
          productPrice: "",
          productCategory: "",
          productImg: "",
        });
  }, [inputValues.name]);
  const onChange = (text, name_) => {
    switch (name_) {
      case "productName":
        setTextModal((prev) => ({ ...prev, productName: text }));
        break;
      case "productInfo":
        setTextModal((prev) => ({ ...prev, productInfo: text }));
        break;
      case "productPrice":
        setTextModal((prev) => ({ ...prev, productPrice: text }));
        break;
      case "productCategory":
        setTextModal((prev) => ({ ...prev, productCategory: text }));
        break;
      default:
        console.log("error modal");
        break;
    }
  };
  const saveModal = () => {
    toast.success("Başarıyla kaydedildi!");
    toggle();
    if (
      textModal.productName === "" ||
      textModal.productInfo === "" ||
      textModal.productPrice === "" ||
      textModal.productImg === "" ||
      textModal.productCategory === ""
    ) {
      toast.error("Gerekli bilgileri lütfen doldurun!");
    } else {
      if (inputValues.name == undefined) {
        setAllProducts([
          ...allProducts,
          {
            productName: textModal.productName,
            productImg: textModal.productImg,
            productInfo: textModal.productInfo,
            productPrice: textModal.productPrice,
            id: allProducts.length + 1,
            productCategory: textModal.productCategory,
          },
        ]);
      } else {
        newProducts[inputValues.index] = {
          productName: textModal.productName,
          productImg: textModal.productImg,
          productInfo: textModal.productInfo,
          productPrice: textModal.productPrice,
          id: newProducts[inputValues.index].id,
          productCategory: textModal.productCategory,
        };
        setAllProducts([...copyProducts, ...newProducts]);
      }
      setTextModal({
        productName: "",
        productInfo: "",
        productPrice: "",
        productCategory: "",
        productImg: "",
      });
    }
    // setControl(false);
  };
  return (
    <div>
      <Modal
        open={editModal || addModal}
        onClose={toggle}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <h2 id="parent-modal-title">
            {inputValues.name == undefined ? "Ürün Ekle" : "Düzenleme"}
          </h2>
          <br />

          <TextField
            label="Ürün Adı"
            id="outlined-size-small"
            className="input-height mt-5"
            defaultValue={inputValues.name != undefined ? inputValues.name : ""}
            size="small"
            type="text"
            name="productName"
            onChange={(e) => onChange(e.target.value, "productName")}
          />
          <TextField
            label="Ürün Bilgisi"
            id="outlined-size-small"
            className="input-height mt-5"
            defaultValue={inputValues.info != undefined ? inputValues.info : ""}
            size="small"
            type="text"
            name="productInfo"
            onChange={(e) => onChange(e.target.value, "productInfo")}
          />
          <TextField
            label="Ürün Fiyatı"
            id="outlined-size-small"
            className="input-height mt-5"
            defaultValue={
              inputValues.price != undefined ? inputValues.price : ""
            }
            size="small"
            type="number"
            name="productPrice"
            onChange={(e) => onChange(e.target.value, "productPrice")}
          />
          <FormControl
            sx={{ minWidth: 120 }}
            style={{ width: "430px" }}
            className="mt-5"
          >
            <Select
              value={
                inputValues.category != undefined ? inputValues.category : age
              }
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem
                value=""
                onClick={() => onChange("", "productCategory")}
              >
                <em>Kategori Seçin</em>
              </MenuItem>
              <MenuItem
                value={"pc"}
                onClick={() => onChange("pc", "productCategory")}
              >
                Bilgisayar
              </MenuItem>
              <MenuItem
                value={"tv"}
                onClick={() => onChange("tv", "productCategory")}
              >
                Televizyon
              </MenuItem>
              <MenuItem
                value={"tel"}
                onClick={() => onChange("tel", "productCategory")}
              >
                Telefon
              </MenuItem>
            </Select>
          </FormControl>
          <div className="mt-5 mb-5">
            <FileImg
              setTextModal={setTextModal}
              image={inputValues.img != undefined ? inputValues.img : ""}
            />
          </div>
          <Stack spacing={2} direction="row">
            <Button color="secondary" variant="contained" onClick={toggle}>
              Kapat
            </Button>
            {inputValues.name != undefined ? (
              <Button color="error" variant="contained" onClick={productDelete}>
                Ürünü Sil
              </Button>
            ) : (
              ""
            )}
            <Button
              color="primary"
              variant="contained"
              onClick={() => saveModal()}
            >
              Kaydet
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default ModelExample;
