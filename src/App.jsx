import { useEffect, useState } from "react";
import Category from "./components/Category";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import { DarkModeProvier } from "./context/DarkModeContext";
import ProductList from "./components/ProductList";
import FilterComponent from "./components/FilterComponent";
import { filteredSearchTitle, sortCategory, sortDate } from "./utils/functions";
import { Toaster } from "react-hot-toast";

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sort, setSort] = useState("latest");
  const [categoryId, setCategoryId] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    let result = products;
    result = filteredSearchTitle(result, searchValue);
    result = sortDate(result, sort);
    result = sortCategory(result, categoryId);
    console.log("result", result);
    setFilteredProducts(result);
  }, [products, sort, searchValue, categoryId]);

  const searchHandler = (e) => {
    setSearchValue(e.target.value.trim().toLowerCase());
  };

  const sortHandler = (e) => {
    setSort(e.target.value);
  };

  const categoryHandler = (e) => {
    setCategoryId(e.target.value);
  };

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const savedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    setProducts(savedProducts);
    setCategories(savedCategories);
  }, []);

  useEffect(() => {
    if (products.length) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (categories.length) {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [categories]);

  return (
    <DarkModeProvier>
      <Toaster />
      <div className="min-h-screen pb-8">
        <Navbar productsLength={products.length} />
        <div className="container max-w-screen-sm lg:max-w-screen-lg mx-auto flex flex-col gap-8">
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <Category setCategories={setCategories} categories={categories} />
            <Products
              categories={categories}
              setProducts={setProducts}
              products={products}
            />
          </div>
          <FilterComponent
            sort={sort}
            searchValue={searchValue}
            sortHandler={sortHandler}
            searchHandler={searchHandler}
            categories={categories}
            categoryId={categoryId}
            categoryHandler={categoryHandler}
          />
          <ProductList
            products={filteredProducts}
            categories={categories}
            setProducts={setProducts}
          />
        </div>
      </div>
    </DarkModeProvier>
  );
}

export default App;
