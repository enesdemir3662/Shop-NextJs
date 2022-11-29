import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useContextApi } from "../Context/contextApi";
import { v4 as uuidv4 } from "uuid";
import ModalExample from "../components/ModalExample";

//Material UI import
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import { styled, alpha } from "@mui/material/styles";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function ResponsiveAppBar() {
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

  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [searchText, setSearchText] = useState("");
  const [windowControl, setWindowControl] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowControl(true);
    }
  }, []);

  useEffect(() => {
    if (searchText != "") {
      let newProducts = allProducts.filter((product) => {
        return (
          product.productName
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          product.productInfo.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setProductSearch(newProducts);
      console.log(newProducts);
    } else {
      setProductSearch([]);
    }
  }, [searchText]);

  const page = (category) => {
    setCategory(category);
    Router.push("/products");
  };

  return (
    <>
      {(editModal || addModal) && <ModalExample />}
      {windowControl && (
        <>
          <AppBar position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Typography
                  variant="h6"
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                  onClick={() => Router.push("/")}
                >
                  AnaSayfa
                </Typography>
                <Box className="-">
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                    variant="contained"
                    color="info"
                  >
                    Ürünler
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {allCategory.map((val) => {
                      return (
                        <MenuItem
                          onClick={() => {
                            page(val.key);
                            handleClose();
                          }}
                          key={uuidv4()}
                        >
                          {val.name}
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </Box>
                {user === null
                  ? ""
                  : user.admin === "yes" && (
                      <Button
                        color="secondary"
                        outline
                        variant="contained"
                        onClick={() => setAddModal(true)}
                        className="ml-4"
                      >
                        Ürün Ekle
                      </Button>
                    )}
                <Box sx={{ flexGrow: 1 }} />
                <MenuItem onClick={() => Router.push("/basket")}>
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                  >
                    <Badge badgeContent={basketCount} color="error">
                      <ShoppingBasketIcon />
                    </Badge>
                  </IconButton>
                </MenuItem>
                <Stack spacing={3} direction="row" className="mt-3 mb-3">
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Ara…"
                      inputProps={{ "aria-label": "search" }}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </Search>
                  {!user && (
                    <div>
                      <Button
                        style={{
                          width: "6.5rem",
                          marginLeft: "5px",
                        }}
                        variant="contained"
                        color="success"
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
                    <Box sx={{ flexGrow: 0 }}>
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/2.jpg"
                          />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <MenuItem>
                          <div
                            className=" center input-group border"
                            style={{ width: "300px" }}
                          >
                            <p>
                              {user.money} <span>$</span>
                            </p>
                          </div>
                        </MenuItem>
                        <MenuItem
                          style={{ fontSize: "18px", width: "100%" }}
                          onClick={() => Router.push("/profile")}
                        >
                          Profil
                        </MenuItem>
                        <MenuItem
                          style={{
                            fontSize: "15px",
                            color: "red",
                            width: "100%",
                          }}
                          onClick={() => {
                            setUser(null);
                            Router.push("/login");
                          }}
                        >
                          Çıkış Yap
                        </MenuItem>
                      </Menu>
                    </Box>
                  )}
                </Stack>
              </Toolbar>
            </Container>
          </AppBar>
        </>
      )}
    </>
  );
}
export default ResponsiveAppBar;
