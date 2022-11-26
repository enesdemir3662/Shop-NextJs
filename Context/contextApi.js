import React, { useContext, useState } from "react";

export const login = () => {
  console.log("çalıştı");
};

export const contextApi = React.createContext({
  allProducts: undefined,
  setAllProducts: async (allProducts) => null,
});

export const useContextApi = () => useContext(contextApi);

export const ContextProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([
    {
      productName: "Asus ROG Strix",
      productImg: "/img/asus_0_pc.png",
      productInfo:
        'Asus ROG Strix G513IC-HN037 AMD Ryzen 7 4800H 16GB 512GB SSD RTX3050 Freedos 15.6"',
      productPrice: 19599,
      id: 1,
      productCategory: "pc",
    },
    {
      productName: "Monster Abra A5 V17.1.3",
      productImg: "/img/monster_0_pc.png",
      productInfo:
        'Monster Abra A5 V17.1.3 Intel Core i5-11400H 16GB RAM 500GB SSD 4GB RTX3050 FreeDOS 15.6" FHD 144Hz',
      productPrice: 16999,
      id: 2,
      productCategory: "pc",
    },
    {
      productName: "Huawei Matebook",
      productImg: "/img/huawei_0_pc.png",
      productInfo:
        'Huawei Matebook D15 Intel Core i7 1165G7 16GB 512GB SSD Windows 11 Home 15.6"',
      productPrice: 14987,
      id: 3,
      productCategory: "pc",
    },
    {
      productName: "Casper Excalibur",
      productImg: "/img/casper_0_pc.png",
      productInfo:
        'Casper Excalibur G770.1180-BVL0X-B Intel Core i7 11800H 16GB 500GB SSD RTX3050TI Freedos 15.6" FHD',
      productPrice: 21098,
      id: 4,
      productCategory: "pc",
    },
    {
      productName: "Acer Swift 1 SF114-34-C8DJ",
      productImg: "/img/acer_0_pc.png",
      productInfo:
        'Acer Swift 1 SF114-34-C8DJ Intel Celeron N4500 4GB 256GB SSD Windows 11 Home 14"',
      productPrice: 4999,
      id: 5,
      productCategory: "pc",
    },
    {
      productName: "HP Pavilion 15-DK207NT",
      productImg: "/img/hp_0_pc.png",
      productInfo:
        'HP Pavilion 15-DK207NT Intel Core i5 11300H 8GB 512GB SSD RTX3050 Freedos 15.6"',
      productPrice: 16499,
      id: 6,
      productCategory: "pc",
    },
    {
      productName: "Dell Vostro 3.515",
      productImg: "/img/dell_0_pc.png",
      productInfo: 'Dell Vostro 3515 Ryzen 3 3250U 4GB 256GB SSD Ubuntu 15.6"',
      productPrice: 6152,
      id: 7,
      productCategory: "pc",
    },
    {
      productName: "Lenovo V15",
      productImg: "/img/lenova_0_pc.png",
      productInfo:
        'Lenovo V15 Intel Core i5 10210U 8GB 512GB SSD MX330 15.6" FHD Windows 10 Home',
      productPrice: 12495,
      id: 8,
      productCategory: "pc",
    },
    {
      productName: "Apple MacBook Air M1",
      productImg: "/img/apple_0_pc.png",
      productInfo:
        'Apple MacBook Air M1 Çip 8GB 256GB SSD macOS 13" QHD Taşınabilir productInfosayar Altın MGND3TU/A',
      productPrice: 19399,
      id: 9,
      productCategory: "pc",
    },
    {
      productName: "MSI Bravo 15 B5DD-208XTR",
      productImg: "/img/msi_0_pc.png",
      productInfo:
        'MSI Bravo 15 B5DD-208XTR AMD Ryzen 5 5600H 8GB 512GB SSD RX5500M Freedos 15.6" FHD',
      productPrice: 16629,
      id: 10,
      productCategory: "pc",
    },
    {
      productName: "Lenovo IdeaPad Gaming 3",
      productImg: "/img/lenova_1_pc.png",
      productInfo:
        'Lenovo IdeaPad Gaming 3 AMD Ryzen 7 5800H 16GB 512GB SSD GTX1650 Freedos 15.6"',
      productPrice: 17899,
      id: 11,
      productCategory: "pc",
    },
    {
      productName: "Monster Huma H5 V3.1.3",
      productImg: "/img/monster_1_pc.png",
      productInfo:
        'Monster Huma H5 V3.1.3 Intel Core i5-1135G7 16GB RAM 500GB SSD FreeDOS 15.6" FHD 165Hz"',
      productPrice: 10975,
      id: 12,
      productCategory: "pc",
    },
    {
      productName: "Dell G15 5510 I5-10500H",
      productImg: "/img/dell_1_pc.png",
      productInfo:
        'Dell G15 5510 I5-10500H 8gb Ram 512GB SSD 4gb GTX1650 15.6" Fhd 120Hz',
      productPrice: 14299,
      id: 12,
      productCategory: "pc",
    },
    {
      productName: "Acer Nitro 5 AN515-57",
      productImg: "/img/acer_1_pc.png",
      productInfo:
        'Acer Nitro 5 AN515-57 Intel Core I7 11800H 16 GB 512 GB SSD RTX 3050TI 4 GB Freedos 15.6"',
      productPrice: 19999,
      id: 13,
      productCategory: "pc",
    },
    {
      productName: "Huawei Matebook D16",
      productImg: "/img/huawei_1_pc.png",
      productInfo:
        'Huawei Matebook D16 Intel Core i7 12700H 16GB 512GB SSD Windows 11 Home 16"',
      productPrice: 20300,
      id: 14,
      productCategory: "pc",
    },
    {
      productName: "Honor Magicbook X15",
      productImg: "/img/honor_0_pc.png",
      productInfo:
        'Honor Magicbook X15 Intel Core i3 10110U 8GB 256GB SSD Windows 10 Home 15.6"',
      productPrice: 12825,
      id: 15,
      productCategory: "pc",
    },
    {
      productName: "Vestel 55UA9600",
      productImg: "/img/vestel_0_tv.png",
      productInfo:
        'Vestel 55UA9600 55" 139 Ekran Uydu Alıcılı 4K Ultra HD Android Smart LED TV',
      productPrice: 7799,
      id: 16,
      productCategory: "tv",
    },
    {
      productName: "Oppo A54 128 GB",
      productImg: "/img/oppo_0_tel.png",
      productInfo: "128 GB depolama, 4 GB ram, 5000 mah pil",
      productPrice: 4890,
      id: 17,
      productCategory: "tel",
    },
    {
      productName: "Samsung Galaxy M32 128 GB",
      productImg: "/img/samsung_0_tel.png",
      productInfo: "128 GB depolama, 6 GB ram, 5000 mah pil",
      productPrice: 6980,
      id: 18,
      productCategory: "tel",
    },
    {
      productName: "Nokia 3310",
      productImg: "/img/nokia_0_tel.png",
      productInfo: "Her türlü saha görevine hazır",
      productPrice: 319,
      id: 19,
      productCategory: "tel",
    },
    {
      productName: "Xiaomi Redmi Note 10 Pro",
      productImg: "/img/xiaomi_0_tel.png",
      productInfo: "128 GB depolama, 8 GB ram, 5020 mah pil",
      productPrice: 8058,
      id: 20,
      productCategory: "tel",
    },
    {
      productName: "iPhone 14 Pro Max 128 GB ",
      productImg: "/img/iphone_0_tel.png",
      productInfo:
        "128 GB depolama, 6 GB ram, 4323 mah pil, 48 MP + 12 MP + 12 MP Kamera",
      productPrice: 49858,
      id: 21,
      productCategory: "tel",
    },
  ]);
  const [basket, setBasket] = useState([]);
  const [basketCount, setBasketCount] = useState(0);
  const [productSearch, setProductSearch] = useState([]);
  const [addModal, setAddModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [category, setCategory] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [user, setUser] = useState(null);
  const [allCategory, setAllCategory] = useState([
    { key: "pc", name: "Bilgisayar" },
    { key: "tel", name: "Telefon" },
    { key: "tv", name: "Televizyon" },
  ]);

  return (
    <contextApi.Provider
      value={{
        allProducts,
        setAllProducts,
        basket,
        setBasket,
        productSearch,
        setProductSearch,
        category,
        setCategory,
        allCategory,
        setAllCategory,
        basketCount,
        setBasketCount,
        user,
        setUser,
        inputValues,
        setInputValues,
        editModal,
        setEditModal,
        addModal,
        setAddModal,
      }}
    >
      {children}
    </contextApi.Provider>
  );
};
