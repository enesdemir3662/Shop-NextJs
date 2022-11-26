import React, { useDebugValue, useState, useEffect, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FileImg from "./FileImg";
import { useContextApi } from "../Context/contextApi";
import toast from "react-hot-toast";

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
      <Modal isOpen={editModal || addModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {inputValues.name == undefined ? "Ürün Ekle" : "Düzenleme"}
        </ModalHeader>
        <ModalBody>
          <br />
          <input
            name="productName"
            type="text"
            placeholder="Ürün Adı"
            onChange={(e) => onChange(e.target.value, "productName")}
            className={"form-control"}
            defaultValue={inputValues.name != undefined ? inputValues.name : ""}
          />
          <br />
          <input
            name="productInfo"
            type="text"
            placeholder="Ürün Bilgisi"
            onChange={(e) => onChange(e.target.value, "productInfo")}
            className={"form-control"}
            defaultValue={inputValues.info != undefined ? inputValues.info : ""}
          />
          <br />
          <input
            name="productPrice"
            type="number"
            placeholder="Ürün Fiyatı"
            onChange={(e) => onChange(e.target.value, "productPrice")}
            className={"form-control"}
            defaultValue={
              inputValues.price != undefined ? inputValues.price : ""
            }
          />
          <br />
          <FormControl sx={{ minWidth: 120 }} style={{ width: "465px" }}>
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
          <FileImg
            setTextModal={setTextModal}
            image={inputValues.img != undefined ? inputValues.img : ""}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Kapat
          </Button>
          {inputValues.name != undefined ? (
            <Button color="danger" onClick={productDelete}>
              Ürünü Sil
            </Button>
          ) : (
            ""
          )}
          <Button color="primary" onClick={() => saveModal()}>
            Kaydet
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModelExample;
