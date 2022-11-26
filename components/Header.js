import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import Router, { useRouter } from "next/router";
import { useContextApi } from "../Context/contextApi";
import { v4 as uuidv4 } from "uuid";
import ModalExample from "../components/ModalExample";

const Header = () => {
  const {
    productSearch,
    setProductSearch,
    allCategory,
    setCategory,
    basketCount,
    user,
    setUser,
    allProducts,
    setAddModal,
    editModal,
    addModal,
  } = useContextApi();
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  let [active, setActive] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState([false, false]);
  const [windowControl, setWindowControl] = useState(false);

  useEffect(() => {
    router.pathname === "/home" ? setActive(1) : setActive(2);
    if (typeof window !== "undefined") {
      setWindowControl(true);
    }
  }, []);

  useEffect(() => {
    router.pathname === "/home" ? setActive(1) : setActive(2);
  }, [router.pathname]);

  useEffect(() => {
    if (searchText != "") {
      let newProducts = allProducts.filter((product) => {
        return (
          product.productName.includes(searchText) ||
          product.productInfo.includes(searchText)
        );
      });
      setProductSearch(newProducts);
      console.log(newProducts);
    } else {
      setProductSearch([]);
    }
  }, [searchText]);

  const controlActive = (page, number) => {
    setActive(number);
    Router.push(page);
  };
  const page = (category) => {
    setCategory(category);
    Router.push("/products");
  };

  return (
    <div>
      {(editModal || addModal) && <ModalExample />}
      {windowControl && (
        <header className="p-3 mb-3 border-bottom">
          <Nav tabs>
            <NavItem>
              <NavLink
                active={active == 1 ? true : false}
                onClick={() => controlActive("/", 1)}
              >
                Ana Sayfa
              </NavLink>
            </NavItem>
            <Dropdown
              nav
              isOpen={dropdownOpen[0]}
              toggle={() =>
                setDropdownOpen([!dropdownOpen[0], dropdownOpen[1]])
              }
            >
              <DropdownToggle nav caret>
                Ürünler
              </DropdownToggle>
              <DropdownMenu style={{ margin: 0 }}>
                {allCategory.map((val) => {
                  return (
                    <DropdownItem onClick={() => page(val.key)} key={uuidv4()}>
                      {val.name}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
            {user === null
              ? ""
              : user.admin === "yes" && (
                  <div className="ms-5">
                    <Button
                      color="primary"
                      outline
                      onClick={() => setAddModal(true)}
                    >
                      Ürün Ekle
                    </Button>
                  </div>
                )}
            <form
              className="d-flex"
              style={{ marginLeft: "auto", marginBottom: "10px" }}
            >
              <input
                name="search"
                placeholder="Ara"
                className="form-control"
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    console.log("enter a basıldı");
                  }
                }}
              />
            </form>
            <div className="ms-5">
              <Button
                color="primary"
                outline
                onClick={() => Router.push("/basket")}
              >
                Sepet <Badge>{basketCount}</Badge>
              </Button>
            </div>
            {!user && (
              <div>
                <Button
                  style={{
                    width: "6.5rem",
                    color: "#fff",
                    marginLeft: "5px",
                  }}
                  onClick={() => {
                    setUser(null);
                    Router.push("/login");
                  }}
                >
                  Giriş Yap
                </Button>
              </div>
            )}
            {user && (
              <Dropdown
                nav
                isOpen={dropdownOpen[1]}
                toggle={() =>
                  setDropdownOpen([dropdownOpen[0], !dropdownOpen[1]])
                }
              >
                <DropdownToggle nav caret>
                  <img
                    src="https://github.com/mdo.png"
                    alt="noway"
                    style={{ width: 32, height: 32 }}
                    className="rounded-circle"
                  />
                </DropdownToggle>
                <DropdownMenu style={{ margin: 0, minWidth: "300px" }}>
                  <DropdownItem>
                    <div
                      className="price input-group-text"
                      style={{ height: "45px" }}
                    >
                      <span className="input-group-text">$</span>
                      <p className="ms-5 mt-3 black-text">{user.money}</p>
                    </div>
                  </DropdownItem>
                  <DropdownItem
                    style={{ fontSize: "18px", width: "100%" }}
                    onClick={() => Router.push("/profile")}
                  >
                    Profil
                  </DropdownItem>
                  <DropdownItem
                    style={{ fontSize: "15px", color: "red", width: "100%" }}
                    onClick={() => {
                      setUser(null);
                      Router.push("/login");
                    }}
                  >
                    Çıkış Yap
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </Nav>
        </header>
      )}
    </div>
  );
};
export default Header;
